"""
Schemas for translation-related API requests and responses.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class TranslationBase(BaseModel):
    """Base translation schema with common fields."""

    transkey: int = Field(..., description="Unique translation identifier")
    version: Optional[str] = Field(None, description="Translation version")
    description: Optional[str] = Field(None, description="Translation description")

    model_config = {"from_attributes": True}


class TranslationListItem(TranslationBase):
    """Translation item for list views."""

    gamekey: Optional[int] = Field(None, description="Associated game ID")
    consolekey: Optional[int] = Field(None, description="Console ID")
    language: Optional[int] = Field(None, description="Language ID")
    patchstatus: Optional[int] = Field(None, description="Patch status ID")
    
    # Resolved names
    game_title: Optional[str] = Field(None, description="Associated game title")
    console_name: Optional[str] = Field(None, description="Console name")
    language_name: Optional[str] = Field(None, description="Language name")
    status_name: Optional[str] = Field(None, description="Patch status name")
    
    # File info
    downloads: int = Field(0, description="Download count")
    releasedate: Optional[str] = Field(None, description="Release date")
    
    # Timestamps
    created: Optional[datetime] = Field(None, description="Creation timestamp")
    lastmod: Optional[datetime] = Field(None, description="Last modified timestamp")


class TranslationDetail(TranslationBase):
    """Detailed translation response."""

    gamekey: Optional[int] = Field(None, description="Associated game ID")
    consolekey: Optional[int] = Field(None, description="Console ID")
    language: Optional[int] = Field(None, description="Language ID")
    groupkey: Optional[int] = Field(None, description="Translation group ID")
    patchstatus: Optional[int] = Field(None, description="Patch status ID")
    
    # Resolved names
    game_title: Optional[str] = Field(None, description="Associated game title")
    console_name: Optional[str] = Field(None, description="Console name")
    language_name: Optional[str] = Field(None, description="Language name")
    status_name: Optional[str] = Field(None, description="Patch status name")
    
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


class TransImageResponse(BaseModel):
    """Translation image/screenshot response."""

    imagekey: int = Field(..., description="Image identifier")
    filename: Optional[str] = Field(None, description="Image filename")
    transkey: int = Field(..., description="Associated translation ID")
    gamekey: int = Field(..., description="Associated game ID")

    model_config = {"from_attributes": True}


class TranslationQueryParams(BaseModel):
    """Query parameters for translation list filtering."""

    q: Optional[str] = Field(None, description="Search query (game title)")
    game: Optional[int] = Field(None, description="Filter by game ID")
    console: Optional[int] = Field(None, description="Filter by console ID")
    language: Optional[int] = Field(None, description="Filter by language ID")
    status: Optional[int] = Field(None, description="Filter by patch status ID")
    page: int = Field(1, ge=1, description="Page number")
    page_size: int = Field(50, ge=1, le=200, description="Items per page")
    sort_by: str = Field("created", description="Sort field")
    sort_order: str = Field("desc", description="Sort order (asc/desc)")
