from pydantic import BaseModel

class Policy(BaseModel):
    id: int
    name: str
    premium: float
    coverage: str
    hospitals: int
    icon: str = "🛡️"