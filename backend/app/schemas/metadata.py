"""
Schemas for lookup/metadata tables.
Used for API responses when serving cached lookup data.
"""

from typing import Optional

from pydantic import BaseModel, Field


class ConsoleResponse(BaseModel):
    """Console/platform response schema."""

    consoleid: int = Field(..., description="Unique console identifier")
    description: str = Field(..., description="Console name")
    manufacturer: Optional[str] = Field(None, description="Console manufacturer")
    abb: Optional[str] = Field(None, description="Console abbreviation")

    model_config = {"from_attributes": True}


class GenreResponse(BaseModel):
    """Genre response schema."""

    genreid: int = Field(..., description="Unique genre identifier")
    description: str = Field(..., description="Genre name")

    model_config = {"from_attributes": True}


class LanguageResponse(BaseModel):
    """Language response schema."""

    languageid: int = Field(..., description="Unique language identifier")
    description: str = Field(..., description="Language name")

    model_config = {"from_attributes": True}


class PatchStatusResponse(BaseModel):
    """Patch status response schema."""

    statusid: int = Field(..., description="Unique status identifier")
    description: str = Field(..., description="Status description")

    model_config = {"from_attributes": True}


class CategoryResponse(BaseModel):
    """Generic category response schema (used for documents)."""

    categoryid: int = Field(..., description="Unique category identifier")
    description: str = Field(..., description="Category name")

    model_config = {"from_attributes": True}


class HacksCatResponse(BaseModel):
    """Hacks category response schema."""

    categoryid: int = Field(..., description="Unique category identifier")
    description: str = Field(..., description="Category name")

    model_config = {"from_attributes": True}


class HomebrewCatResponse(BaseModel):
    """Homebrew category response schema."""

    categoryid: int = Field(..., description="Unique category identifier")
    description: str = Field(..., description="Category name")

    model_config = {"from_attributes": True}


class UtilCatResponse(BaseModel):
    """Utility category response schema."""

    categoryid: int = Field(..., description="Unique category identifier")
    description: str = Field(..., description="Category name")

    model_config = {"from_attributes": True}


class SkillLevelResponse(BaseModel):
    """Skill level response schema."""

    levelid: int = Field(..., description="Unique level identifier")
    description: str = Field(..., description="Skill level description")

    model_config = {"from_attributes": True}


class OSResponse(BaseModel):
    """Operating system response schema."""

    osid: int = Field(..., description="Unique OS identifier")
    description: str = Field(..., description="OS name")

    model_config = {"from_attributes": True}


class LicenseResponse(BaseModel):
    """License response schema."""

    licenseid: int = Field(..., description="Unique license identifier")
    description: str = Field(..., description="License name")

    model_config = {"from_attributes": True}


class SectionResponse(BaseModel):
    """Section response schema."""

    sectionid: int = Field(..., description="Unique section identifier")
    description: str = Field(..., description="Section name")

    model_config = {"from_attributes": True}


class PatchHintsResponse(BaseModel):
    """Patch hints response schema."""

    hintid: int = Field(..., description="Unique hint identifier")
    description: str = Field(..., description="Hint description")

    model_config = {"from_attributes": True}


class AllMetadataResponse(BaseModel):
    """Combined metadata response for initial app load."""

    consoles: list[ConsoleResponse] = Field(..., description="All consoles")
    genres: list[GenreResponse] = Field(..., description="All genres")
    languages: list[LanguageResponse] = Field(..., description="All languages")
    patch_statuses: list[PatchStatusResponse] = Field(..., description="All patch statuses")
    hack_categories: list[HacksCatResponse] = Field(..., description="All hack categories")
    util_categories: list[UtilCatResponse] = Field(..., description="All utility categories")
    doc_categories: list[CategoryResponse] = Field(..., description="All document categories")
    homebrew_categories: list[HomebrewCatResponse] = Field(..., description="All homebrew categories")
    skill_levels: list[SkillLevelResponse] = Field(..., description="All skill levels")
    operating_systems: list[OSResponse] = Field(..., description="All operating systems")
