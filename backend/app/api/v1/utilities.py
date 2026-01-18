"""
Utilities API endpoints.
Provides access to ROM hacking utilities/tools with filtering and pagination.
"""

from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.schemas.common import PaginatedResponse
from app.schemas.utilities import UtilityDetail, UtilityListItem
from app.services.utility_service import utility_service

router = APIRouter(prefix="/utilities", tags=["Utilities"])


@router.get(
    "",
    response_model=PaginatedResponse[UtilityListItem],
    summary="List utilities",
    description="Get a paginated list of ROM hacking utilities with optional filters.",
)
async def list_utilities(
    session: AsyncSession = Depends(get_session),
    q: Optional[str] = Query(None, description="Search query for title"),
    category: Optional[int] = Query(None, description="Filter by category ID"),
    console: Optional[int] = Query(None, description="Filter by console ID"),
    os: Optional[int] = Query(None, description="Filter by operating system ID"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=200, description="Items per page"),
    sort_by: str = Query("title", description="Sort field"),
    sort_order: str = Query("asc", description="Sort order (asc/desc)"),
) -> PaginatedResponse[UtilityListItem]:
    """Get paginated list of utilities."""
    return await utility_service.get_utilities(
        session,
        q=q,
        category=category,
        console=console,
        os=os,
        page=page,
        page_size=page_size,
        sort_by=sort_by,
        sort_order=sort_order,
    )


@router.get(
    "/{utilkey}",
    response_model=UtilityDetail,
    summary="Get utility details",
    description="Get detailed information for a single utility.",
)
async def get_utility(
    utilkey: int,
    session: AsyncSession = Depends(get_session),
) -> UtilityDetail:
    """Get a single utility by ID."""
    return await utility_service.get_utility(session, utilkey)
