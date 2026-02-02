import os

class Settings:
    PROJECT_NAME: str = "Nue-Japan Backend"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-super-secret-key-change-it")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    # JSON-encoded list of strings
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000"]
    
settings = Settings()
