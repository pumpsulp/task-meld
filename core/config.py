from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    SALT: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    
    SMTP_SERVER: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASS: str
    

    class Config:
        env_file = ".env"


settings = Settings()
