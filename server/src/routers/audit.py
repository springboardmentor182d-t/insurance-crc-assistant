from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from ..database.core import SessionLocal
from ..auth.service import get_current_user
from ..users.models import User

# Models
from pydantic import BaseModel

class AuditLog(BaseModel):
    id: int
    user_id: int
    action: str
    resource: str
    resource_id: Optional[str]
    details: dict
    timestamp: datetime
    ip_address: Optional[str]

router = APIRouter(prefix="/api/audit", tags=["audit"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Mock audit logs
mock_audit_logs = [
    {
        "id": 1,
        "user_id": 1,
        "action": "CREATE_RULE",
        "resource": "rule",
        "resource_id": "1",
        "details": {"rule_name": "High Amount Transaction"},
        "timestamp": datetime.now(),
        "ip_address": "192.168.1.1",
    },
    {
        "id": 2,
        "user_id": 1,
        "action": "UPDATE_RULE",
        "resource": "rule",
        "resource_id": "1",
        "details": {"changes": ["severity", "logic"]},
        "timestamp": datetime.now(),
        "ip_address": "192.168.1.1",
    },
]

@router.get("/", response_model=List[AuditLog])
def get_audit_logs(
    skip: int = 0,
    limit: int = 100,
    user_id: Optional[int] = None,
    action: Optional[str] = None,
    resource: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Filter logs based on query parameters
    filtered_logs = mock_audit_logs
    
    if user_id:
        filtered_logs = [log for log in filtered_logs if log["user_id"] == user_id]
    if action:
        filtered_logs = [log for log in filtered_logs if log["action"] == action]
    if resource:
        filtered_logs = [log for log in filtered_logs if log["resource"] == resource]
    
    return filtered_logs[skip:skip + limit]

@router.get("/{log_id}", response_model=AuditLog)
def get_audit_log(log_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    log = next((log for log in mock_audit_logs if log["id"] == log_id), None)
    if not log:
        raise HTTPException(status_code=404, detail="Audit log not found")
    return log
