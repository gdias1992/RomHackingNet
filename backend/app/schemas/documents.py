"""
Schemas for document-related API requests and responses.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class DocumentBase(BaseModel):
    """Base document schema with common fields."""

    dockey: int = Field(..., description="Unique document identifier")
    title: str = Field(..., description="Document title")
    description: Optional[str] = Field(None, description="Document description")

    model_config = {"from_attributes": True}


class DocumentListItem(DocumentBase):
    """Document item for list views."""

    categorykey: Optional[int] = Field(None, description="Category ID")
    consolekey: Optional[int] = Field(None, description="Console ID")
    gamekey: Optional[int] = Field(None, description="Associated game ID")
    explevel: Optional[int] = Field(None, description="Skill level ID")

    # Resolved names
    category_name: Optional[str] = Field(None, description="Category name")
    console_name: Optional[str] = Field(None, description="Console name")
    game_title: Optional[str] = Field(None, description="Associated game title")
    skill_level: Optional[str] = Field(None, description="Skill level name")

    # File info
    downloads: int = Field(0, description="Download count")

    # Timestamps
    created: Optional[datetime] = Field(None, description="Creation timestamp")
    lastmod: Optional[datetime] = Field(None, description="Last modified timestamp")


class DocumentDetail(DocumentBase):
    """Detailed document response."""

    categorykey: Optional[int] = Field(None, description="Category ID")
    consolekey: Optional[int] = Field(None, description="Console ID")
    gamekey: Optional[int] = Field(None, description="Associated game ID")
    authorkey: Optional[int] = Field(None, description="Author ID")
    explevel: Optional[int] = Field(None, description="Skill level ID")
    version: Optional[str] = Field(None, description="Document version")

    # Resolved names
    category_name: Optional[str] = Field(None, description="Category name")
    console_name: Optional[str] = Field(None, description="Console name")
    game_title: Optional[str] = Field(None, description="Associated game title")
    skill_level: Optional[str] = Field(None, description="Skill level name")

    # File information
    filename: Optional[str] = Field(None, description="Document filename")
    downloads: int = Field(0, description="Download count")
    reldate: Optional[int] = Field(None, description="Release date (unix timestamp)")

    # Flags
    nofile: int = Field(0, description="No file available flag")

    # Timestamps
    created: Optional[datetime] = Field(None, description="Creation timestamp")
    lastmod: Optional[datetime] = Field(None, description="Last modified timestamp")


class DocumentQueryParams(BaseModel):
    """Query parameters for document list filtering."""

    q: Optional[str] = Field(None, description="Search query for title")
    category: Optional[int] = Field(None, description="Filter by category ID")
    console: Optional[int] = Field(None, description="Filter by console ID")
    skill_level: Optional[int] = Field(None, description="Filter by skill level ID")
    page: int = Field(1, ge=1, description="Page number")
    page_size: int = Field(50, ge=1, le=200, description="Items per page")
    sort_by: str = Field("title", description="Sort field")
    sort_order: str = Field("asc", description="Sort order (asc/desc)")
