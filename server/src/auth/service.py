from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

# ======================
# JWT CONFIG
# ======================
SECRET_KEY = "super-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# ======================
# PASSWORD CONFIG (NO BCRYPT)
# ======================
pwd_context = CryptContext(
    schemes=["sha256_crypt"],
    deprecated="auto"
)

# ======================
# PASSWORD HELPERS
# ======================
def hash_password(password: str) -> str:
    if not password:
        raise ValueError("Password cannot be empty")
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    if not password or not hashed_password:
        return False
    return pwd_context.verify(password, hashed_password)


# ======================
# JWT HELPERS
# ======================
def create_access_token(
    data: dict,
    expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES
):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
