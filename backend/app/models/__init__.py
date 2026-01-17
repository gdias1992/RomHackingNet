"""
Database models module.
Exports all SQLModel ORM models for the application.
"""

# Base model
from app.models.base import BaseModel

# Lookup tables (P0)
from app.models.lookup import (
    Category,
    Console,
    Genre,
    HacksCat,
    HomebrewCat,
    Language,
    License,
    OS,
    PatchHints,
    PatchStatus,
    Section,
    SkillLevel,
    UtilCat,
)

# Core content (P1)
from app.models.content import (
    Game,
    Hack,
    HackAuthorProject,
    TransAuthorProject,
    Translation,
)

# Secondary content (P2)
from app.models.secondary import (
    Document,
    Homebrew,
    Utility,
)

# Assets and edge cases (P3)
from app.models.assets import (
    Abandoned,
    Font,
    HackImage,
    Screenshot,
    TransImage,
)

__all__ = [
    # Base
    "BaseModel",
    # Lookup
    "Category",
    "Console",
    "Genre",
    "HacksCat",
    "HomebrewCat",
    "Language",
    "License",
    "OS",
    "PatchHints",
    "PatchStatus",
    "Section",
    "SkillLevel",
    "UtilCat",
    # Core content
    "Game",
    "Hack",
    "HackAuthorProject",
    "TransAuthorProject",
    "Translation",
    # Secondary content
    "Document",
    "Homebrew",
    "Utility",
    # Assets
    "Abandoned",
    "Font",
    "HackImage",
    "Screenshot",
    "TransImage",
]
