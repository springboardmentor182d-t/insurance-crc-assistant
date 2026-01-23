from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from src.database.core import Base


class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)

    # user who filed the claim
    user_id = Column(Integer, nullable=False, index=True)

    # 🔑 UUID FK → user_policies.id
    user_policy_id = Column(
        UUID(as_uuid=True),
        ForeignKey("user_policies.id", ondelete="RESTRICT"),
        nullable=False,
        index=True
    )

    claim_type = Column(String, nullable=False)
    incident_date = Column(Date, nullable=False)
    description = Column(String)

    amount_claimed = Column(Float)

    # draft | submitted | under_review | approved | rejected
    status = Column(String, nullable=False, default="draft", index=True)

    created_at = Column(Date, server_default=func.current_date())
    submitted_at = Column(Date, nullable=True)

    # 🔗 relationships
    documents = relationship(
        "ClaimDocument",
        back_populates="claim",
        cascade="all, delete-orphan"
    )

    user_policy = relationship(
        "UserPolicy",
        backref="claims"
    )

    def __repr__(self):
        return f"<Claim id={self.id} status={self.status} user_policy_id={self.user_policy_id}>"


class ClaimDocument(Base):
    __tablename__ = "claim_documents"

    id = Column(Integer, primary_key=True, index=True)

    claim_id = Column(
        Integer,
        ForeignKey("claims.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    file_name = Column(String, nullable=False)
    file_path = Column(String, nullable=False)

    uploaded_at = Column(Date, server_default=func.current_date())

    # 🔗 relationship
    claim = relationship(
        "Claim",
        back_populates="documents"
    )

    def __repr__(self):
        return f"<ClaimDocument id={self.id} claim_id={self.claim_id}>"
