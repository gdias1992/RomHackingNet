"""
Schemas for homebrew-related API requests and responses.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class HomebrewBase(BaseModel):
    """Base homebrew schema with common fields."""

    homebrewkey: int = Field(..., description="Unique homebrew identifier")
    title: str = Field(..., description="Homebrew title")
    version: Optional[str] = Field(None, description="Homebrew version")
    description: Optional[str] = Field(None, description="Homebrew description")

    model_config = {"from_attributes": True}


class HomebrewListItem(HomebrewBase):
    """Homebrew item for list views."""

    categorykey: Optional[int] = Field(None, description="Category ID")
    platformkey: Optional[int] = Field(None, description="Platform ID")

    # Resolved names
    category_name: Optional[str] = Field(None, description="Category name")
    platform_name: Optional[str] = Field(None, description="Platform name")

    # File info
    downloads: int = Field(0, description="Download count")
    reldate: Optional[str] = Field(None, description="Release date")

    # Timestamps
    created: Optional[datetime] = Field(None, description="Creation timestamp")
    lastmod: Optional[datetime] = Field(None, description="Last modified timestamp")


class HomebrewDetail(HomebrewBase):
    """Detailed homebrew response."""

    categorykey: Optional[int] = Field(None, description="Category ID")
    platformkey: Optional[int] = Field(None, description="Platform ID")
    authorkey: Optional[int] = Field(None, description="Author ID")

    # Resolved names
    category_name: Optional[str] = Field(None, description="Category name")
    platform_name: Optional[str] = Field(None, description="Platform name")

    # File information
    filename: Optional[str] = Field(None, description="Homebrew filename")
    downloads: int = Field(0, description="Download count")
    reldate: Optional[str] = Field(None, description="Release date")
    titlescreen: Optional[str] = Field(None, description="Title screen image")
    readme: Optional[str] = Field(None, description="Readme file")

    # Flags
    nofile: int = Field(0, description="No file available flag")
    noreadme: int = Field(0, description="No readme available flag")

    # Timestamps
    created: Optional[datetime] = Field(None, description="Creation timestamp")
    lastmod: Optional[datetime] = Field(None, description="Last modified timestamp")


class HomebrewQueryParams(BaseModel):
    """Query parameters for homebrew list filtering."""

    q: Optional[str] = Field(None, description="Search query for title")
    category: Optional[int] = Field(None, description="Filter by category ID")
    platform: Optional[int] = Field(None, description="Filter by platform ID")
    page: int = Field(1, ge=1, description="Page number")
    page_size: int = Field(50, ge=1, le=200, description="Items per page")
    sort_by: str = Field("title", description="Sort field")
    sort_order: str = Field("asc", description="Sort order (asc/desc)")
