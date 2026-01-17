"""
Schemas for hack-related API requests and responses.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class HackBase(BaseModel):
    """Base hack schema with common fields."""

    hackkey: int = Field(..., description="Unique hack identifier")
    hacktitle: str = Field(..., description="Hack title")
    version: Optional[str] = Field(None, description="Hack version")
    description: Optional[str] = Field(None, description="Hack description")

    model_config = {"from_attributes": True}


class HackListItem(HackBase):
    """Hack item for list views."""

    gamekey: Optional[int] = Field(None, description="Associated game ID")
    consolekey: Optional[int] = Field(None, description="Console ID")
    category: Optional[int] = Field(None, description="Category ID")
    
    # Resolved names
    game_title: Optional[str] = Field(None, description="Associated game title")
    console_name: Optional[str] = Field(None, description="Console name")
    category_name: Optional[str] = Field(None, description="Category name")
    
    # File info
    downloads: int = Field(0, description="Download count")
    releasedate: Optional[str] = Field(None, description="Release date")
    
    # Timestamps
    created: Optional[datetime] = Field(None, description="Creation timestamp")
    lastmod: Optional[datetime] = Field(None, description="Last modified timestamp")


class HackDetail(HackBase):
    """Detailed hack response."""

    gamekey: Optional[int] = Field(None, description="Associated game ID")
    consolekey: Optional[int] = Field(None, description="Console ID")
    authorkey: Optional[int] = Field(None, description="Author ID")
    category: Optional[int] = Field(None, description="Category ID")
    
    # Resolved names
    game_title: Optional[str] = Field(None, description="Associated game title")
    console_name: Optional[str] = Field(None, description="Console name")
    category_name: Optional[str] = Field(None, description="Category name")
    
    # File information
    filename: Optional[str] = Field(None, description="Patch filename")
    filesize: Optional[int] = Field(None, description="File size in bytes")
    downloads: int = Field(0, description="Download count")
    releasedate: Optional[str] = Field(None, description="Release date")
    
    # Patching information
    patchtype: Optional[str] = Field(None, description="Patch file type")
    hintskey: Optional[int] = Field(None, description="Patch hints ID")
    patch_hint: Optional[str] = Field(None, description="Patch application hint")
    
    # Flags
    nofile: int = Field(0, description="No file available flag")
    noreadme: int = Field(0, description="No readme available flag")
    
    # Timestamps
    created: Optional[datetime] = Field(None, description="Creation timestamp")
    lastmod: Optional[datetime] = Field(None, description="Last modified timestamp")
    
    # Related images count
    image_count: int = Field(0, description="Number of screenshots")


class HackImageResponse(BaseModel):
    """Hack image/screenshot response."""

    imagekey: int = Field(..., description="Image identifier")
    filename: str = Field(..., description="Image filename")
    hackkey: int = Field(..., description="Associated hack ID")
    gamekey: int = Field(..., description="Associated game ID")

    model_config = {"from_attributes": True}


class HackQueryParams(BaseModel):
    """Query parameters for hack list filtering."""

    q: Optional[str] = Field(None, description="Search query for title")
    game: Optional[int] = Field(None, description="Filter by game ID")
    console: Optional[int] = Field(None, description="Filter by console ID")
    category: Optional[int] = Field(None, description="Filter by category ID")
    page: int = Field(1, ge=1, description="Page number")
    page_size: int = Field(50, ge=1, le=200, description="Items per page")
    sort_by: str = Field("hacktitle", description="Sort field")
    sort_order: str = Field("asc", description="Sort order (asc/desc)")
