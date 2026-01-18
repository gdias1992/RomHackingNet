"""
Schemas for utility-related API requests and responses.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class UtilityBase(BaseModel):
    """Base utility schema with common fields."""

    utilkey: int = Field(..., description="Unique utility identifier")
    title: str = Field(..., description="Utility title")
    version: Optional[str] = Field(None, description="Utility version")
    description: Optional[str] = Field(None, description="Utility description")

    model_config = {"from_attributes": True}


class UtilityListItem(UtilityBase):
    """Utility item for list views."""

    categorykey: Optional[int] = Field(None, description="Category ID")
    consolekey: Optional[int] = Field(None, description="Console ID")
    gamekey: Optional[int] = Field(None, description="Associated game ID")
    os: Optional[int] = Field(None, description="Operating system ID")

    # Resolved names
    category_name: Optional[str] = Field(None, description="Category name")
    console_name: Optional[str] = Field(None, description="Console name")
    game_title: Optional[str] = Field(None, description="Associated game title")
    os_name: Optional[str] = Field(None, description="Operating system name")

    # File info
    downloads: int = Field(0, description="Download count")
    reldate: Optional[int] = Field(None, description="Release date (unix timestamp)")

    # Timestamps
    created: Optional[datetime] = Field(None, description="Creation timestamp")
    lastmod: Optional[datetime] = Field(None, description="Last modified timestamp")


class UtilityDetail(UtilityBase):
    """Detailed utility response."""

    categorykey: Optional[int] = Field(None, description="Category ID")
    consolekey: Optional[int] = Field(None, description="Console ID")
    gamekey: Optional[int] = Field(None, description="Associated game ID")
    authorkey: Optional[int] = Field(None, description="Author ID")
    os: Optional[int] = Field(None, description="Operating system ID")
    license: Optional[str] = Field(None, description="License text")
    source: Optional[str] = Field(None, description="Source URL")

    # Resolved names
    category_name: Optional[str] = Field(None, description="Category name")
    console_name: Optional[str] = Field(None, description="Console name")
    game_title: Optional[str] = Field(None, description="Associated game title")
    os_name: Optional[str] = Field(None, description="Operating system name")

    # File information
    filename: Optional[str] = Field(None, description="Utility filename")
    downloads: int = Field(0, description="Download count")
    reldate: Optional[int] = Field(None, description="Release date (unix timestamp)")

    # Flags
    nofile: int = Field(0, description="No file available flag")

    # Timestamps
    created: Optional[datetime] = Field(None, description="Creation timestamp")
    lastmod: Optional[datetime] = Field(None, description="Last modified timestamp")


class UtilityQueryParams(BaseModel):
    """Query parameters for utility list filtering."""

    q: Optional[str] = Field(None, description="Search query for title")
    category: Optional[int] = Field(None, description="Filter by category ID")
    console: Optional[int] = Field(None, description="Filter by console ID")
    os: Optional[int] = Field(None, description="Filter by OS ID")
    page: int = Field(1, ge=1, description="Page number")
    page_size: int = Field(50, ge=1, le=200, description="Items per page")
    sort_by: str = Field("title", description="Sort field")
    sort_order: str = Field("asc", description="Sort order (asc/desc)")
