from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime

from src.entities.claim import Claim
from src.entities.policy import Policy
from src.entities.policy_holder import PolicyHolder
from src.entities.fraud_indicator import FraudIndicator


# =====================================================
# SINGLE CLAIM FRAUD DETAILS
# =====================================================
async def get_claim_with_policy(db: AsyncSession, claim_id: int):

    claim_result = await db.execute(
        select(Claim).where(Claim.id == claim_id)
    )
    claim = claim_result.scalar_one_or_none()

    if not claim:
        return None

    # fetch policy explicitly (NO lazy loading)
    policy = None
    if claim.policy_id:
        policy_result = await db.execute(
            select(Policy).where(Policy.id == claim.policy_id)
        )
        policy = policy_result.scalar_one_or_none()

    # prior claims count
    prior_claims_result = await db.execute(
        select(Claim).where(
            Claim.policy_id == claim.policy_id,
            Claim.id != claim.id
        )
    )
    prior_claim_count = len(prior_claims_result.scalars().all())

    risk_score, risk_level = calculate_fraud_risk(
        claim, policy, prior_claim_count
    )

    # fraud indicators
    indicator_result = await db.execute(
        select(FraudIndicator.label, FraudIndicator.severity)
        .where(FraudIndicator.claim_id == claim.id)
    )
    indicators = [
        {"label": r[0], "severity": r[1]}
        for r in indicator_result.all()
    ]

    # policy holder
    holder_name = None
    if policy:
        holder_result = await db.execute(
            select(PolicyHolder.holder_name)
            .where(PolicyHolder.policy_id == policy.id)
        )
        holder_name = holder_result.scalar()

    data = {
        "claim_id": claim.id,
        "claim_number": claim.claim_number,
        "amount": float(claim.amount),
        "status": claim.status.value,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "indicators": indicators,
        "filed_date": claim.filed_date.isoformat(),
        "location": claim.location,
        "claim_type": claim.claim_type,
        "policy_holder": holder_name
    }

    if policy:
        data["policy"] = {
            "policy_type": policy.policy_type,
            "premium": float(policy.premium),
            "term_months": policy.term_months,
            "created_at": policy.created_at.isoformat()
        }

    return data


# =====================================================
# FRAUD RISK LOGIC (NO DB CALLS INSIDE)
# =====================================================
def calculate_fraud_risk(claim, policy, prior_claim_count=0):
    score = 0

    if policy:
        premium = float(policy.premium)
        claim_amount = float(claim.amount)

        if claim_amount > premium * 10:
            score += 40
        elif claim_amount > premium * 5:
            score += 25

        policy_age_days = (datetime.utcnow() - policy.created_at).days
        if policy_age_days < 30:
            score += 25
        elif policy_age_days < 60:
            score += 15

    if prior_claim_count > 2:
        score += 25
    elif prior_claim_count == 0:
        score += 10

    if claim.status.value.lower() in ["under review", "pending documents"]:
        score += 10

    if claim.description:
        desc = claim.description.lower()
        if any(k in desc for k in ["duplicate", "mismatch", "inconsistency"]):
            score += 20

    if score >= 70:
        level = "High"
    elif score >= 40:
        level = "Medium"
    else:
        level = "Low"

    return score, level


# =====================================================
# FRAUD DASHBOARD
# =====================================================
async def get_fraud_dashboard_data(db: AsyncSession):

    claims_result = await db.execute(select(Claim))
    claims = claims_result.scalars().all()

    dashboard_claims = []
    counts = {
        "total_flagged": 0,
        "high": 0,
        "medium": 0,
        "low": 0
    }

    for claim in claims:

        # fetch policy explicitly
        policy = None
        if claim.policy_id:
            policy_result = await db.execute(
                select(Policy).where(Policy.id == claim.policy_id)
            )
            policy = policy_result.scalar_one_or_none()

        # prior claims
        prior_claims_result = await db.execute(
            select(Claim).where(
                Claim.policy_id == claim.policy_id,
                Claim.id != claim.id
            )
        )
        prior_claim_count = len(prior_claims_result.scalars().all())

        risk_score, risk_level = calculate_fraud_risk(
            claim, policy, prior_claim_count
        )

        # indicators
        indicator_result = await db.execute(
            select(FraudIndicator.label, FraudIndicator.severity)
            .where(FraudIndicator.claim_id == claim.id)
        )
        indicators = [
            {"label": r[0], "severity": r[1]}
            for r in indicator_result.all()
        ]

        # policy holder
        holder_name = None
        if policy:
            holder_result = await db.execute(
                select(PolicyHolder.holder_name)
                .where(PolicyHolder.policy_id == policy.id)
            )
            holder_name = holder_result.scalar()

        if risk_level == "High":
            counts["high"] += 1
            counts["total_flagged"] += 1
        elif risk_level == "Medium":
            counts["medium"] += 1
            counts["total_flagged"] += 1
        else:
            counts["low"] += 1

        dashboard_claims.append({
            "claim_id": claim.id,
            "claim_number": claim.claim_number,
            "amount": float(claim.amount),
            "risk_score": risk_score,
            "risk_level": risk_level,
            "status": claim.status.value,
            "location": claim.location,
            "claim_type": claim.claim_type,
            "filed_date": claim.filed_date.isoformat(),
            "policy_holder": holder_name,
            "indicators": indicators
        })

    return {
        "summary": counts,
        "claims": dashboard_claims
    }


# =====================================================
# CLAIM ACTIONS
# =====================================================
async def mark_claim_safe(db: AsyncSession, claim_id: int):
    result = await db.execute(
        select(Claim).where(Claim.id == claim_id)
    )
    claim = result.scalar_one_or_none()
    if not claim:
        return None

    claim.status = claim.status.approved
    await db.commit()
    await db.refresh(claim)
    return claim


async def reject_claim(db: AsyncSession, claim_id: int):
    result = await db.execute(
        select(Claim).where(Claim.id == claim_id)
    )
    claim = result.scalar_one_or_none()
    if not claim:
        return None

    claim.status = claim.status.rejected
    await db.commit()
    await db.refresh(claim)
    return claim


async def request_more_info(db: AsyncSession, claim_id: int):
    result = await db.execute(
        select(Claim).where(Claim.id == claim_id)
    )
    claim = result.scalar_one_or_none()
    if not claim:
        return None

    claim.status = claim.status.pending_documents
    await db.commit()
    await db.refresh(claim)
    return claim
