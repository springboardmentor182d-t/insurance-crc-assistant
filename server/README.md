# 🚀 Insurance CRC Assistant — FastAPI Backend

Backend service for the **Insurance Comparison, Recommendation & Claim Assistant** platform.

This service provides APIs for:
- 🔐 Authentication & authorization  
- 📊 Insurance policy comparison  
- 🎯 Personalized policy recommendations  
- 📝 Claims workflow management  
- 🕵️ Fraud detection logic (planned)

The backend communicates with the **React frontend** located in the `client/` directory.

---

## 🧱 Tech Stack

| Layer | Technology |
|------|-----------|
| API Framework | FastAPI |
| Server | Uvicorn |
| Data Validation | Pydantic v2 |
| Database | PostgreSQL (upcoming) |
| Authentication | JWT (planned) |
| Testing | pytest, httpx |
| DevOps | Docker, docker-compose (optional) |

---

## ▶️ How to Run the Server (Windows PowerShell)

### 1️⃣ Navigate to backend directory
```powershell
cd server
```

### 2️⃣ Create & activate virtual environment
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 3️⃣ Install dependencies
```powershell
pip install -r requirements.txt
```

### 4️⃣ Start FastAPI server
```powershell
uvicorn src.main:app --reload --port 8000
```

---

## 🌐 Available URLs

| Service | URL |
|-------|-----|
| API Root | http://127.0.0.1:8000 |
| Swagger UI | http://127.0.0.1:8000/docs |
| Health Check | http://127.0.0.1:8000/health |
| Test Endpoint | http://127.0.0.1:8000/api/test |

---
