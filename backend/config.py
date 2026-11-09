import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    SMTP_HOST: str = os.getenv("SMTP_HOST", "")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASS: str = os.getenv("SMTP_PASS", "")
    CONTACT_EMAIL: str = os.getenv("CONTACT_EMAIL", "")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///portfolio.db")
    CORS_ORIGIN: str = os.getenv(
        "CORS_ORIGIN",
        "http://localhost:5173,http://localhost:4173,http://localhost:4175,http://localhost:4178,http://localhost:5500",
    )
    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me-in-production")
    PORT: int = int(os.getenv("PORT", "5000"))

    @property
    def cors_origins(self):
        return [origin.strip() for origin in self.CORS_ORIGIN.split(",") if origin.strip()]


settings = Settings()
