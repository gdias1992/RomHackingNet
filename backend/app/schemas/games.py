"""
Schemas for game-related API requests and responses.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class GameBase(BaseModel):
    """Base game schema with common fields."""

    gamekey: int = Field(..., description="Unique game identifier")
    gametitle: str = Field(..., description="Game title")
    japtitle: Optional[str] = Field(None, description="Japanese title")
    publisher: Optional[str] = Field(None, description="Game publisher")

    model_config = {"from_attributes": True}


class GameListItem(GameBase):
    """Game item for list views."""

    platformid: Optional[int] = Field(None, description="Console/platform ID")
    genreid: Optional[int] = Field(None, description="Genre ID")
    platform_name: Optional[str] = Field(None, description="Console/platform name")
    genre_name: Optional[str] = Field(None, description="Genre name")
    
    # Content counts
    transexist: int = Field(0, description="Has translations flag")
    hackexist: int = Field(0, description="Has hacks flag")
    utilexist: int = Field(0, description="Has utilities flag")
    docexist: int = Field(0, description="Has documents flag")


class GameDetail(GameBase):
    """Detailed game response with all related content counts."""

    platformid: Optional[int] = Field(None, description="Console/platform ID")
    genreid: Optional[int] = Field(None, description="Genre ID")
    platform_name: Optional[str] = Field(None, description="Console/platform name")
    genre_name: Optional[str] = Field(None, description="Genre name")
    
    # Content counts
    transexist: int = Field(0, description="Has translations flag")
    hackexist: int = Field(0, description="Has hacks flag")
    utilexist: int = Field(0, description="Has utilities flag")
    docexist: int = Field(0, description="Has documents flag")
    
    # Computed counts from related tables
    hack_count: int = Field(0, description="Number of hacks for this game")
    translation_count: int = Field(0, description="Number of translations for this game")
    utility_count: int = Field(0, description="Number of utilities for this game")
    document_count: int = Field(0, description="Number of documents for this game")


class GameQueryParams(BaseModel):
    """Query parameters for game list filtering."""

    q: Optional[str] = Field(None, description="Search query for title")
    platform: Optional[int] = Field(None, description="Filter by platform ID")
    genre: Optional[int] = Field(None, description="Filter by genre ID")
    has_hacks: Optional[bool] = Field(None, description="Filter games with hacks")
    has_translations: Optional[bool] = Field(None, description="Filter games with translations")
    page: int = Field(1, ge=1, description="Page number")
    page_size: int = Field(50, ge=1, le=200, description="Items per page")
    sort_by: str = Field("gametitle", description="Sort field")
    sort_order: str = Field("asc", description="Sort order (asc/desc)")
