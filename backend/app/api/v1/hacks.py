"""
Hacks API endpoints.
Provides access to ROM hack data with filtering and pagination.
"""

from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.schemas import HackDetail, HackImageResponse, HackListItem, PaginatedResponse
from app.services import hack_service

router = APIRouter(prefix="/hacks", tags=["Hacks"])


@router.get(
    "",
    response_model=PaginatedResponse[HackListItem],
    summary="List hacks",
    description="Get a paginated list of ROM hacks with optional filters.",
)
async def list_hacks(
    session: AsyncSession = Depends(get_session),
    q: Optional[str] = Query(None, description="Search query for title"),
    game: Optional[int] = Query(None, description="Filter by game ID"),
    console: Optional[int] = Query(None, description="Filter by console ID"),
    category: Optional[int] = Query(None, description="Filter by category ID"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=200, description="Items per page"),
    sort_by: str = Query("hacktitle", description="Sort field"),
    sort_order: str = Query("asc", description="Sort order (asc/desc)"),
) -> PaginatedResponse[HackListItem]:
    """Get paginated list of hacks."""
    return await hack_service.get_hacks(
        session,
        q=q,
        game=game,
        console=console,
        category=category,
        page=page,
        page_size=page_size,
        sort_by=sort_by,
        sort_order=sort_order,
    )


@router.get(
    "/{hackkey}",
    response_model=HackDetail,
    summary="Get hack details",
    description="Get detailed information for a single ROM hack.",
)
async def get_hack(
    hackkey: int,
    session: AsyncSession = Depends(get_session),
) -> HackDetail:
    """Get a single hack by ID."""
    return await hack_service.get_hack(session, hackkey)


@router.get(
    "/{hackkey}/images",
    response_model=list[HackImageResponse],
    summary="Get hack images",
    description="Get all screenshots/images for a ROM hack.",
)
async def get_hack_images(
    hackkey: int,
    session: AsyncSession = Depends(get_session),
) -> list[HackImageResponse]:
    """Get images for a specific hack."""
    return await hack_service.get_hack_images(session, hackkey)
