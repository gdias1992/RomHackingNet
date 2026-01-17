"""
Games API endpoints.
Provides access to game data with filtering and pagination.
"""

from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.schemas import GameDetail, GameListItem, HackListItem, PaginatedResponse, TranslationListItem
from app.services import game_service, hack_service, translation_service

router = APIRouter(prefix="/games", tags=["Games"])


@router.get(
    "",
    response_model=PaginatedResponse[GameListItem],
    summary="List games",
    description="Get a paginated list of games with optional filters.",
)
async def list_games(
    session: AsyncSession = Depends(get_session),
    q: Optional[str] = Query(None, description="Search query for title"),
    platform: Optional[int] = Query(None, description="Filter by platform ID"),
    genre: Optional[int] = Query(None, description="Filter by genre ID"),
    has_hacks: Optional[bool] = Query(None, description="Filter games with hacks"),
    has_translations: Optional[bool] = Query(None, description="Filter games with translations"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=200, description="Items per page"),
    sort_by: str = Query("gametitle", description="Sort field"),
    sort_order: str = Query("asc", description="Sort order (asc/desc)"),
) -> PaginatedResponse[GameListItem]:
    """Get paginated list of games."""
    return await game_service.get_games(
        session,
        q=q,
        platform=platform,
        genre=genre,
        has_hacks=has_hacks,
        has_translations=has_translations,
        page=page,
        page_size=page_size,
        sort_by=sort_by,
        sort_order=sort_order,
    )


@router.get(
    "/{gamekey}",
    response_model=GameDetail,
    summary="Get game details",
    description="Get detailed information for a single game.",
)
async def get_game(
    gamekey: int,
    session: AsyncSession = Depends(get_session),
) -> GameDetail:
    """Get a single game by ID."""
    return await game_service.get_game(session, gamekey)


@router.get(
    "/{gamekey}/hacks",
    response_model=PaginatedResponse[HackListItem],
    summary="Get game hacks",
    description="Get all ROM hacks for a specific game.",
)
async def get_game_hacks(
    gamekey: int,
    session: AsyncSession = Depends(get_session),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=200, description="Items per page"),
) -> PaginatedResponse[HackListItem]:
    """Get hacks for a specific game."""
    return await hack_service.get_hacks_for_game(
        session, gamekey, page=page, page_size=page_size
    )


@router.get(
    "/{gamekey}/translations",
    response_model=PaginatedResponse[TranslationListItem],
    summary="Get game translations",
    description="Get all translations for a specific game.",
)
async def get_game_translations(
    gamekey: int,
    session: AsyncSession = Depends(get_session),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=200, description="Items per page"),
) -> PaginatedResponse[TranslationListItem]:
    """Get translations for a specific game."""
    return await translation_service.get_translations_for_game(
        session, gamekey, page=page, page_size=page_size
    )
