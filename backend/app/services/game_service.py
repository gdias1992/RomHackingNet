"""
Game service for game-related operations.
Handles fetching, filtering, and searching games.
"""

from typing import Optional

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Console, Game, Genre, Hack, Translation
from app.schemas import GameDetail, GameListItem, PaginatedResponse


class GameService:
    """Service for game-related database operations."""

    async def get_games(
        self,
        session: AsyncSession,
        *,
        q: Optional[str] = None,
        platform: Optional[int] = None,
        genre: Optional[int] = None,
        has_hacks: Optional[bool] = None,
        has_translations: Optional[bool] = None,
        page: int = 1,
        page_size: int = 50,
        sort_by: str = "gametitle",
        sort_order: str = "asc",
    ) -> PaginatedResponse[GameListItem]:
        """
        Get paginated list of games with filters.
        
        Args:
            session: Database session
            q: Search query for title (uses LIKE)
            platform: Filter by platform ID
            genre: Filter by genre ID
            has_hacks: Filter games that have hacks
            has_translations: Filter games that have translations
            page: Page number (1-indexed)
            page_size: Items per page
            sort_by: Field to sort by
            sort_order: Sort direction (asc/desc)
        
        Returns:
            Paginated response with game list items
        """
        # Build base query with joins for resolved names
        query = (
            select(
                Game,
                Console.description.label("platform_name"),
                Genre.description.label("genre_name"),
            )
            .outerjoin(Console, Game.platformid == Console.consoleid)
            .outerjoin(Genre, Game.genreid == Genre.genreid)
        )

        # Apply filters
        if q:
            query = query.where(Game.gametitle.ilike(f"%{q}%"))
        if platform:
            query = query.where(Game.platformid == platform)
        if genre:
            query = query.where(Game.genreid == genre)
        if has_hacks is True:
            query = query.where(Game.hackexist > 0)
        if has_translations is True:
            query = query.where(Game.transexist > 0)

        # Get total count
        count_query = select(func.count()).select_from(Game)
        if q:
            count_query = count_query.where(Game.gametitle.ilike(f"%{q}%"))
        if platform:
            count_query = count_query.where(Game.platformid == platform)
        if genre:
            count_query = count_query.where(Game.genreid == genre)
        if has_hacks is True:
            count_query = count_query.where(Game.hackexist > 0)
        if has_translations is True:
            count_query = count_query.where(Game.transexist > 0)

        total_result = await session.execute(count_query)
        total = total_result.scalar() or 0

        # Apply sorting
        sort_column = getattr(Game, sort_by, Game.gametitle)
        if sort_order.lower() == "desc":
            query = query.order_by(sort_column.desc())
        else:
            query = query.order_by(sort_column.asc())

        # Apply pagination
        offset = (page - 1) * page_size
        query = query.offset(offset).limit(page_size)

        # Execute query
        result = await session.execute(query)
        rows = result.all()

        # Build response items
        items = []
        for row in rows:
            game = row[0]
            items.append(
                GameListItem(
                    gamekey=game.gamekey,
                    gametitle=game.gametitle,
                    japtitle=game.japtitle,
                    publisher=game.publisher,
                    platformid=game.platformid,
                    genreid=game.genreid,
                    platform_name=row[1],
                    genre_name=row[2],
                    transexist=game.transexist,
                    hackexist=game.hackexist,
                    utilexist=game.utilexist,
                    docexist=game.docexist,
                )
            )

        total_pages = (total + page_size - 1) // page_size

        return PaginatedResponse[GameListItem](
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    async def get_game(self, session: AsyncSession, gamekey: int) -> GameDetail:
        """
        Get a single game by ID with full details.
        
        Args:
            session: Database session
            gamekey: Game primary key
        
        Returns:
            Detailed game information
        
        Raises:
            HTTPException: If game not found
        """
        query = (
            select(
                Game,
                Console.description.label("platform_name"),
                Genre.description.label("genre_name"),
            )
            .outerjoin(Console, Game.platformid == Console.consoleid)
            .outerjoin(Genre, Game.genreid == Genre.genreid)
            .where(Game.gamekey == gamekey)
        )

        result = await session.execute(query)
        row = result.first()

        if not row:
            raise HTTPException(status_code=404, detail=f"Game with ID {gamekey} not found")

        game = row[0]

        # Get related content counts
        hack_count_result = await session.execute(
            select(func.count()).select_from(Hack).where(Hack.gamekey == gamekey)
        )
        hack_count = hack_count_result.scalar() or 0

        trans_count_result = await session.execute(
            select(func.count()).select_from(Translation).where(Translation.gamekey == gamekey)
        )
        translation_count = trans_count_result.scalar() or 0

        return GameDetail(
            gamekey=game.gamekey,
            gametitle=game.gametitle,
            japtitle=game.japtitle,
            publisher=game.publisher,
            platformid=game.platformid,
            genreid=game.genreid,
            platform_name=row[1],
            genre_name=row[2],
            transexist=game.transexist,
            hackexist=game.hackexist,
            utilexist=game.utilexist,
            docexist=game.docexist,
            hack_count=hack_count,
            translation_count=translation_count,
            utility_count=0,  # TODO: Add when utility service is implemented
            document_count=0,  # TODO: Add when document service is implemented
        )


# Singleton instance
game_service = GameService()
