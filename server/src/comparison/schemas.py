from pydantic import BaseModel
from typing import List, Literal, Optional


class ComparisonRule(BaseModel):
    key: str
    label: str
    applicable_to: List[Literal["health", "travel", "life", "auto"]]
    display_type: Literal["boolean", "text", "currency"]
    description: Optional[str] = None


class ComparisonRulesResponse(BaseModel):
    rules: List[ComparisonRule]
