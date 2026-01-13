import json_logic
from src.entities.rules import Severity

def evaluate_rule(logic: dict, payload: dict, severity: str = "medium") -> dict:
    """
    Evaluate a rule logic against a payload using json-logic.

    Args:
        logic: The rule logic structure (nested dict with groups and conditions)
        payload: The input data to evaluate against
        severity: Default severity if not specified in logic

    Returns:
        dict: {
            "result": bool,  # True if rule triggered
            "severity": str, # Severity level
            "details": dict  # Additional evaluation details
        }
    """
    try:
        # Extract severity from logic if present, otherwise use default
        rule_severity = logic.get("severity", severity)
        groups = logic.get("groups", [])

        # Evaluate each group
        group_results = []
        trigger_reasons = []

        for group in groups:
            group_logic = group.get("logicOperator", "AND")
            conditions = group.get("conditions", [])

            # Build json-logic structure for the group
            json_logic_expr = build_json_logic_group(conditions, group_logic)

            # Evaluate the group
            group_result = json_logic.jsonLogic(json_logic_expr, payload)

            group_results.append(bool(group_result))

            # Collect trigger reasons (condition IDs that matched)
            if group_result:
                for condition in conditions:
                    condition_expr = build_json_logic_condition(condition)
                    if json_logic.jsonLogic(condition_expr, payload):
                        trigger_reasons.append(condition.get("id", "unknown"))

        # Determine overall result based on groups
        # For now, if any group triggers, the rule triggers
        result = any(group_results)

        return {
            "result": result,
            "severity": rule_severity,
            "trigger_reasons": trigger_reasons if result else [],
            "details": {
                "groups_evaluated": len(groups),
                "groups_triggered": sum(group_results),
                "trigger_reasons": trigger_reasons
            }
        }

    except Exception as e:
        # Log error and return safe default
        print(f"Rule evaluation error: {e}")
        return {
            "result": False,
            "severity": severity,
            "trigger_reasons": [],
            "details": {"error": str(e)}
        }

def build_json_logic_group(conditions: list, logic_operator: str) -> dict:
    """
    Build json-logic expression for a group of conditions.

    Args:
        conditions: List of condition dicts
        logic_operator: "AND" or "OR"

    Returns:
        dict: json-logic expression
    """
    if not conditions:
        return False

    condition_exprs = [build_json_logic_condition(cond) for cond in conditions]

    if logic_operator.upper() == "AND":
        return {"and": condition_exprs}
    elif logic_operator.upper() == "OR":
        return {"or": condition_exprs}
    else:
        # Default to AND
        return {"and": condition_exprs}

def build_json_logic_condition(condition: dict) -> dict:
    """
    Build json-logic expression for a single condition.

    Args:
        condition: Condition dict with field, operator, value, unit

    Returns:
        dict: json-logic expression
    """
    field = condition.get("field", "")
    operator = condition.get("operator", "==")
    value = condition.get("value")
    unit = condition.get("unit", "")

    # Map common operators to json-logic
    operator_map = {
        "equals": "==",
        "not_equals": "!=",
        "greater_than": ">",
        "less_than": "<",
        "greater_than_equal": ">=",
        "less_than_equal": "<=",
        "contains": "in",
        "not_contains": {"!": {"in": [value, {"var": field}]}},
        "starts_with": {"cat": [{"var": field}, {"substr": [0, len(str(value))]}]},
        "ends_with": {"cat": [{"substr": [-len(str(value))]}, {"var": field}]},
        "is_empty": {"or": [{"!": {"var": field}}, {"==": [{"var": field}, ""]}]},
        "is_not_empty": {"and": [{"var": field}, {"!=": [{"var": field}, ""]}]},
    }

    # Get the json-logic operator
    json_op = operator_map.get(operator, operator)

    # Handle special cases
    if operator == "not_contains":
        return json_op
    elif operator in ["starts_with", "ends_with"]:
        return {"==": [json_op, value]}
    elif operator in ["is_empty", "is_not_empty"]:
        return json_op
    else:
        # Standard binary operators
        return {json_op: [{"var": field}, value]}

def validate_rule_logic(logic: dict) -> dict:
    """
    Validate rule logic structure.

    Args:
        logic: Rule logic dict

    Returns:
        dict: {"valid": bool, "errors": list}
    """
    errors = []

    if not isinstance(logic, dict):
        errors.append("Logic must be a dictionary")
        return {"valid": False, "errors": errors}

    groups = logic.get("groups", [])
    if not isinstance(groups, list):
        errors.append("Groups must be a list")
        return {"valid": False, "errors": errors}

    for i, group in enumerate(groups):
        if not isinstance(group, dict):
            errors.append(f"Group {i} must be a dictionary")
            continue

        logic_op = group.get("logicOperator")
        if logic_op not in ["AND", "OR", "IF"]:
            errors.append(f"Group {i}: Invalid logic operator '{logic_op}'")

        conditions = group.get("conditions", [])
        if not isinstance(conditions, list):
            errors.append(f"Group {i}: Conditions must be a list")
            continue

        for j, condition in enumerate(conditions):
            if not isinstance(condition, dict):
                errors.append(f"Group {i}, Condition {j}: Must be a dictionary")
                continue

            required_fields = ["id", "field", "operator", "value"]
            for field in required_fields:
                if field not in condition:
                    errors.append(f"Group {i}, Condition {j}: Missing required field '{field}'")

    return {"valid": len(errors) == 0, "errors": errors}
