"""
Translations API endpoints.
Provides access to translation data with filtering and pagination.
"""

from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.schemas import (
    PaginatedResponse,
    TransImageResponse,
    TranslationDetail,
    TranslationListItem,
)
from app.services import translation_service

router = APIRouter(prefix="/translations", tags=["Translations"])


@router.get(
    "",
    response_model=PaginatedResponse[TranslationListItem],
    summary="List translations",
    description="Get a paginated list of translations with optional filters.",
)
async def list_translations(
    session: AsyncSession = Depends(get_session),
    q: Optional[str] = Query(None, description="Search query (game title)"),
    game: Optional[int] = Query(None, description="Filter by game ID"),
    console: Optional[int] = Query(None, description="Filter by console ID"),
    language: Optional[int] = Query(None, description="Filter by language ID"),
    status: Optional[int] = Query(None, description="Filter by patch status ID"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=200, description="Items per page"),
    sort_by: str = Query("created", description="Sort field"),
    sort_order: str = Query("desc", description="Sort order (asc/desc)"),
) -> PaginatedResponse[TranslationListItem]:
    """Get paginated list of translations."""
    return await translation_service.get_translations(
        session,
        q=q,
        game=game,
        console=console,
        language=language,
        status=status,
        page=page,
        page_size=page_size,
        sort_by=sort_by,
        sort_order=sort_order,
    )


@router.get(
    "/{transkey}",
    response_model=TranslationDetail,
    summary="Get translation details",
    description="Get detailed information for a single translation.",
)
async def get_translation(
    transkey: int,
    session: AsyncSession = Depends(get_session),
) -> TranslationDetail:
    """Get a single translation by ID."""
    return await translation_service.get_translation(session, transkey)


@router.get(
    "/{transkey}/images",
    response_model=list[TransImageResponse],
    summary="Get translation images",
    description="Get all screenshots/images for a translation.",
)
async def get_translation_images(
    transkey: int,
    session: AsyncSession = Depends(get_session),
) -> list[TransImageResponse]:
    """Get images for a specific translation."""
    return await translation_service.get_translation_images(session, transkey)
