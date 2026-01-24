// src/config/PolicyFieldConfig.js

export const POLICY_FIELDS = {
  business: [
    { key: "policy_name", label: "Policy Name", type: "text", required: true },
    { key: "insurer", label: "Insurer", type: "text", required: true },

    { key: "business_type", label: "Business Type", type: "text" },
    { key: "business_size", label: "Business Size", type: "text" },
    { key: "ownership_type", label: "Ownership Type", type: "text" },
    { key: "risk_intensity", label: "Risk Intensity", type: "text" },

    { key: "min_annual_revenue", label: "Min Annual Revenue", type: "number" },
    { key: "max_annual_revenue", label: "Max Annual Revenue", type: "number" },
    { key: "min_asset_value", label: "Min Asset Value", type: "number" },
    { key: "max_asset_value", label: "Max Asset Value", type: "number" },

    { key: "covers_property_damage", label: "Property Damage", type: "boolean" },
    { key: "covers_fire", label: "Fire", type: "boolean" },
    { key: "covers_machinery_breakdown", label: "Machinery Breakdown", type: "boolean" },
    { key: "covers_theft", label: "Theft", type: "boolean" },
    { key: "covers_liability", label: "Liability", type: "boolean" },
    { key: "covers_employee_safety", label: "Employee Safety", type: "boolean" },
    { key: "covers_cyber", label: "Cyber", type: "boolean" },
    { key: "covers_business_interruption", label: "Business Interruption", type: "boolean" },

    { key: "base_premium", label: "Base Premium", type: "number", required: true },
    { key: "status", label: "Status", type: "status" },
  ],

  health: [
    { key: "policy_name", label: "Policy Name", type: "text", required: true },
    { key: "insurer_name", label: "Insurer", type: "text", required: true },

    { key: "supported_coverage_types", label: "Coverage Types", type: "array", required: true },

    { key: "max_adults", label: "Max Adults", type: "number", required: true },
    { key: "max_children", label: "Max Children", type: "number", required: true },
    { key: "max_parents", label: "Max Parents", type: "number", required: true },

    { key: "min_cover_amount", label: "Min Cover Amount", type: "number", required: true },
    { key: "max_cover_amount", label: "Max Cover Amount", type: "number", required: true },

    { key: "monthly_premium", label: "Monthly Premium", type: "number", required: true },

    { key: "deductible_type", label: "Deductible Type", type: "select", options: ["low", "high"] },
    { key: "co_pay_percentage", label: "Co-pay %", type: "number" },

    { key: "pre_existing_waiting_months", label: "Waiting Period (months)", type: "number" },
    { key: "maternity_supported", label: "Maternity Supported", type: "boolean" },
    { key: "maternity_waiting_months", label: "Maternity Waiting (months)", type: "number" },

    { key: "room_rent_limit", label: "Room Rent Limit", type: "number" },
    { key: "status", label: "Status", type: "status" },
  ],

  life: [
    { key: "policy_name", label: "Policy Name", type: "text", required: true },
    { key: "insurer_name", label: "Insurer", type: "text", required: true },

    { key: "policy_type", label: "Policy Type", type: "select", options: ["term", "whole_life", "endowment"], required: true },

    { key: "min_entry_age", label: "Min Entry Age", type: "number", required: true },
    { key: "max_entry_age", label: "Max Entry Age", type: "number", required: true },

    { key: "min_policy_term", label: "Min Policy Term", type: "number", required: true },
    { key: "max_policy_term", label: "Max Policy Term", type: "number", required: true },

    { key: "min_sum_assured", label: "Min Sum Assured", type: "number", required: true },
    { key: "max_sum_assured", label: "Max Sum Assured", type: "number", required: true },

    { key: "min_monthly_premium", label: "Min Monthly Premium", type: "number", required: true },
    { key: "max_monthly_premium", label: "Max Monthly Premium", type: "number", required: true },

    { key: "smoker_allowed", label: "Smoker Allowed", type: "boolean", required: true },
    { key: "critical_illness_allowed", label: "Critical Illness Allowed", type: "boolean", required: true },

    { key: "status", label: "Status", type: "status" },
  ],

  motor: [
    { key: "policy_name", label: "Policy Name", type: "text", required: true },
    { key: "insurer_name", label: "Insurer", type: "text", required: true },

    { key: "vehicle_type", label: "Vehicle Type", type: "select", options: ["car", "bike"], required: true },
    { key: "fuel_type", label: "Fuel Type", type: "select", options: ["petrol", "diesel", "electric", "hybrid"], required: true },
    { key: "coverage_type", label: "Coverage Type", type: "select", options: ["third_party", "comprehensive", "own_damage"], required: true },

    { key: "min_vehicle_age", label: "Min Vehicle Age", type: "number", required: true },
    { key: "max_vehicle_age", label: "Max Vehicle Age", type: "number", required: true },

    { key: "min_annual_premium", label: "Min Annual Premium", type: "number", required: true },
    { key: "max_annual_premium", label: "Max Annual Premium", type: "number", required: true },

    { key: "status", label: "Status", type: "status" },
  ],

  home: [
    { key: "policy_name", label: "Policy Name", type: "text", required: true },
    { key: "insurer_name", label: "Insurer", type: "text", required: true },

    { key: "property_type", label: "Property Type", type: "select", options: ["apartment", "villa_house", "penthouse"], required: true },
    { key: "ownership_type", label: "Ownership Type", type: "select", options: ["owned", "rented"], required: true },

    { key: "min_property_age", label: "Min Property Age", type: "number", required: true },
    { key: "max_property_age", label: "Max Property Age", type: "number", required: true },

    { key: "min_builtup_area", label: "Min Built-up Area", type: "number", required: true },
    { key: "max_builtup_area", label: "Max Built-up Area", type: "number", required: true },

    { key: "covers_structure", label: "Covers Structure", type: "boolean", required: true },
    { key: "covers_contents", label: "Covers Contents", type: "boolean", required: true },
    { key: "covers_valuables", label: "Covers Valuables", type: "boolean", required: true },
    { key: "covers_electronics", label: "Covers Electronics", type: "boolean", required: true },
    { key: "covers_rent_loss", label: "Covers Rent Loss", type: "boolean", required: true },

    { key: "min_sum_insured", label: "Min Sum Insured", type: "number", required: true },
    { key: "max_sum_insured", label: "Max Sum Insured", type: "number", required: true },

    { key: "min_annual_premium", label: "Min Annual Premium", type: "number", required: true },
    { key: "max_annual_premium", label: "Max Annual Premium", type: "number", required: true },

    { key: "status", label: "Status", type: "status" },
  ],

  travel: [
    { key: "policy_name", label: "Policy Name", type: "text", required: true },
    { key: "insurer_name", label: "Insurer", type: "text", required: true },

    { key: "trip_type", label: "Trip Type", type: "select", options: ["single", "multi", "student"], required: true },
    { key: "destination_type", label: "Destination Type", type: "select", options: ["domestic", "international", "schengen", "usa_canada"], required: true },

    { key: "min_trip_days", label: "Min Trip Days", type: "number", required: true },
    { key: "max_trip_days", label: "Max Trip Days", type: "number", required: true },

    { key: "min_entry_age", label: "Min Entry Age", type: "number", required: true },
    { key: "max_entry_age", label: "Max Entry Age", type: "number", required: true },

    { key: "max_travelers", label: "Max Travelers", type: "number", required: true },

    { key: "pre_existing_allowed", label: "Pre-existing Allowed", type: "boolean", required: true },
    { key: "senior_citizen_allowed", label: "Senior Citizen Allowed", type: "boolean", required: true },
    { key: "adventure_sports_allowed", label: "Adventure Sports Allowed", type: "boolean", required: true },
    { key: "medical_cover", label: "Medical Cover", type: "boolean", required: true },
    { key: "trip_cancellation_cover", label: "Trip Cancellation", type: "boolean", required: true },
    { key: "baggage_cover", label: "Baggage Cover", type: "boolean", required: true },

    { key: "min_premium", label: "Min Premium", type: "number", required: true },
    { key: "max_premium", label: "Max Premium", type: "number", required: true },

    { key: "status", label: "Status", type: "status" },
  ],

  fire: [
    { key: "policy_name", label: "Policy Name", type: "text", required: true },
    { key: "insurer", label: "Insurer", type: "text", required: true },

    { key: "property_type", label: "Property Type", type: "select", options: ["residential", "commercial", "industrial"] },
    { key: "occupancy_type", label: "Occupancy Type", type: "text" },

    { key: "min_property_age", label: "Min Property Age", type: "number" },
    { key: "max_property_age", label: "Max Property Age", type: "number" },

    { key: "construction_type", label: "Construction Type", type: "select", options: ["rcc", "mixed", "wooden"] },

    { key: "covers_fire", label: "Fire", type: "boolean" },
    { key: "covers_explosion", label: "Explosion", type: "boolean" },
    { key: "covers_lightning", label: "Lightning", type: "boolean" },
    { key: "covers_natural_disaster", label: "Natural Disaster", type: "boolean" },
    { key: "covers_burglary", label: "Burglary", type: "boolean" },
    { key: "covers_electronic_equipment", label: "Electronic Equipment", type: "boolean" },

    { key: "min_sum_insured", label: "Min Sum Insured", type: "number", required: true },
    { key: "max_sum_insured", label: "Max Sum Insured", type: "number", required: true },

    { key: "base_premium", label: "Base Premium", type: "number", required: true },
    { key: "status", label: "Status", type: "status" },
  ],
};
