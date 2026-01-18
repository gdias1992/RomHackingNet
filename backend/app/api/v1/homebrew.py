"""
Homebrew API endpoints.
Provides access to homebrew games with filtering and pagination.
"""

from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.schemas.common import PaginatedResponse
from app.schemas.homebrew import HomebrewDetail, HomebrewListItem
from app.services.homebrew_service import homebrew_service

router = APIRouter(prefix="/homebrew", tags=["Homebrew"])


@router.get(
    "",
    response_model=PaginatedResponse[HomebrewListItem],
    summary="List homebrew",
    description="Get a paginated list of homebrew games with optional filters.",
)
async def list_homebrew(
    session: AsyncSession = Depends(get_session),
    q: Optional[str] = Query(None, description="Search query for title"),
    category: Optional[int] = Query(None, description="Filter by category ID"),
    platform: Optional[int] = Query(None, description="Filter by platform ID"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=200, description="Items per page"),
    sort_by: str = Query("title", description="Sort field"),
    sort_order: str = Query("asc", description="Sort order (asc/desc)"),
) -> PaginatedResponse[HomebrewListItem]:
    """Get paginated list of homebrew games."""
    return await homebrew_service.get_homebrews(
        session,
        q=q,
        category=category,
        platform=platform,
        page=page,
        page_size=page_size,
        sort_by=sort_by,
        sort_order=sort_order,
    )


@router.get(
    "/{homebrewkey}",
    response_model=HomebrewDetail,
    summary="Get homebrew details",
    description="Get detailed information for a single homebrew game.",
)
async def get_homebrew(
    homebrewkey: int,
    session: AsyncSession = Depends(get_session),
) -> HomebrewDetail:
    """Get a single homebrew game by ID."""
    return await homebrew_service.get_homebrew(session, homebrewkey)
