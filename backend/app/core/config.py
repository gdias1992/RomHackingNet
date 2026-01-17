"""
Application configuration settings.
Loads environment variables and provides typed configuration.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # Database Configuration
    database_host: str = "127.0.0.1"
    database_port: int = 3306
    database_user: str = "root"
    database_password: str = ""
    database_name: str = "romhackingnet"

    # Application Settings
    app_name: str = "RomHacking.net Archive Explorer"
    app_version: str = "0.1.0"
    debug: bool = False

    # CORS Origins
    cors_origins: str = "http://localhost:5173"

    @property
    def database_url(self) -> str:
        """Construct the async MySQL database URL."""
        password_part = f":{self.database_password}" if self.database_password else ""
        return (
            f"mysql+aiomysql://{self.database_user}{password_part}"
            f"@{self.database_host}:{self.database_port}/{self.database_name}"
        )

    @property
    def cors_origins_list(self) -> list[str]:
        """Parse CORS origins from comma-separated string."""
        return [origin.strip() for origin in self.cors_origins.split(",")]


# Global settings instance
settings = Settings()
