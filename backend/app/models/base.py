"""
Base model class for SQLModel ORM entities.
Provides common configuration and utilities for all models.
"""

from sqlmodel import SQLModel


class BaseModel(SQLModel):
    """Base class for all database models."""

    class Config:
        """SQLModel configuration."""

        from_attributes = True
