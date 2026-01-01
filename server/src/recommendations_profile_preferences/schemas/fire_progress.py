from pydantic import BaseModel
from typing import List, Optional

class FireProgressRequest(BaseModel):
    propertyType: str
    constructionType: str
    propertyAge: Optional[int] = None
    location: Optional[str] = None
    coverage: List[str]
    stockValue: Optional[int] = None
    machineryValue: Optional[int] = None
    totalSum: Optional[int] = None
    premium: int
