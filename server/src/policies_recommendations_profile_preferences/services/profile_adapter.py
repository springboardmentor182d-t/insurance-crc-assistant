class ProfileAdapter:
    """
    Converts Profile data into an object compatible with
    existing scoring functions.
    DOES NOT change scoring logic.
    """

    def __init__(self, profile):
        # COMMON / SHARED
        self.max_monthly_premium = profile["monthlyBudget"]
        self.monthly_premium_budget = profile["monthlyBudget"]

        self.annual_income = profile["monthlyBudget"] * 12 * 3
        self.number_of_dependents = max(profile["familySize"] - 1, 0)
        self.total_liabilities = 0

        # HEALTH
        self.cover_amount = 500000 * profile["familySize"]
        self.has_pre_existing_conditions = False
        self.maternity_required = profile["familySize"] > 2
        self.room_preference = "private"
        self.deductible_preference = None
        self.co_pay_acceptable = True

        # LIFE
        self.preferred_policy_term = 20
        self.critical_illness = profile["goal"] == "Family Protection"

        # MOTOR
        self.preferred_coverage_type = "comprehensive"
        self.idv_preference = "recommended"
        self.claim_last_year = False

        # HOME
        self.property_age = 10
        self.builtup_area = 1000
        self.need_structure = True
        self.need_contents = True
        self.need_valuables = False
        self.need_electronics = True
        self.need_rent_loss = False
        self.has_security = False
        self.ownership_type = "owned"

        # TRAVEL
        self.medical_cover_required = True
        self.trip_cancellation_required = True
        self.baggage_cover_required = True
        self.adventure_sports = False
        self.coverage_amount_preference = "medium"
        self.oldest_traveler_age = 35
