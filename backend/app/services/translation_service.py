"""
Translation service for translation-related operations.
Handles fetching, filtering, and searching translations.
"""

from typing import Optional

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import (
    Console,
    Game,
    Language,
    PatchHints,
    PatchStatus,
    TransImage,
    Translation,
)
from app.schemas import (
    PaginatedResponse,
    TransImageResponse,
    TranslationDetail,
    TranslationListItem,
)


class TranslationService:
    """Service for translation-related database operations."""

    async def get_translations(
        self,
        session: AsyncSession,
        *,
        q: Optional[str] = None,
        game: Optional[int] = None,
        console: Optional[int] = None,
        language: Optional[int] = None,
        status: Optional[int] = None,
        page: int = 1,
        page_size: int = 50,
        sort_by: str = "created",
        sort_order: str = "desc",
    ) -> PaginatedResponse[TranslationListItem]:
        """
        Get paginated list of translations with filters.
        
        Args:
            session: Database session
            q: Search query for game title
            game: Filter by game ID
            console: Filter by console ID
            language: Filter by language ID
            status: Filter by patch status ID
            page: Page number (1-indexed)
            page_size: Items per page
            sort_by: Field to sort by
            sort_order: Sort direction (asc/desc)
        
        Returns:
            Paginated response with translation list items
        """
        # Build base query with joins for resolved names
        query = (
            select(
                Translation,
                Game.gametitle.label("game_title"),
                Console.description.label("console_name"),
                Language.name.label("language_name"),
                PatchStatus.description.label("status_name"),
            )
            .outerjoin(Game, Translation.gamekey == Game.gamekey)
            .outerjoin(Console, Translation.consolekey == Console.consoleid)
            .outerjoin(Language, Translation.language == Language.id)
            .outerjoin(PatchStatus, Translation.patchstatus == PatchStatus.id)
        )

        # Apply filters
        if q:
            query = query.where(Game.gametitle.ilike(f"%{q}%"))
        if game:
            query = query.where(Translation.gamekey == game)
        if console:
            query = query.where(Translation.consolekey == console)
        if language:
            query = query.where(Translation.language == language)
        if status:
            query = query.where(Translation.patchstatus == status)

        # Get total count
        count_query = (
            select(func.count())
            .select_from(Translation)
            .outerjoin(Game, Translation.gamekey == Game.gamekey)
        )
        if q:
            count_query = count_query.where(Game.gametitle.ilike(f"%{q}%"))
        if game:
            count_query = count_query.where(Translation.gamekey == game)
        if console:
            count_query = count_query.where(Translation.consolekey == console)
        if language:
            count_query = count_query.where(Translation.language == language)
        if status:
            count_query = count_query.where(Translation.patchstatus == status)

        total_result = await session.execute(count_query)
        total = total_result.scalar() or 0

        # Apply sorting
        sort_column = getattr(Translation, sort_by, Translation.created)
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
            trans = row[0]
            items.append(
                TranslationListItem(
                    transkey=trans.transkey,
                    version=trans.patchver,
                    description=trans.description,
                    gamekey=trans.gamekey,
                    consolekey=trans.consolekey,
                    language=trans.language,
                    patchstatus=trans.patchstatus,
                    game_title=row[1],
                    console_name=row[2],
                    language_name=row[3],
                    status_name=row[4],
                    downloads=trans.downloads,
                    releasedate=trans.patchrel,
                    created=trans.created,
                    lastmod=trans.lastmod,
                )
            )

        total_pages = (total + page_size - 1) // page_size

        return PaginatedResponse[TranslationListItem](
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    async def get_translation(
        self, session: AsyncSession, transkey: int
    ) -> TranslationDetail:
        """
        Get a single translation by ID with full details.
        
        Args:
            session: Database session
            transkey: Translation primary key
        
        Returns:
            Detailed translation information
        
        Raises:
            HTTPException: If translation not found
        """
        query = (
            select(
                Translation,
                Game.gametitle.label("game_title"),
                Console.description.label("console_name"),
                Language.name.label("language_name"),
                PatchStatus.description.label("status_name"),
                PatchHints.description.label("patch_hint"),
            )
            .outerjoin(Game, Translation.gamekey == Game.gamekey)
            .outerjoin(Console, Translation.consolekey == Console.consoleid)
            .outerjoin(Language, Translation.language == Language.id)
            .outerjoin(PatchStatus, Translation.patchstatus == PatchStatus.id)
            .outerjoin(PatchHints, Translation.patchhint == PatchHints.id)
            .where(Translation.transkey == transkey)
        )

        result = await session.execute(query)
        row = result.first()

        if not row:
            raise HTTPException(
                status_code=404, detail=f"Translation with ID {transkey} not found"
            )

        trans = row[0]

        # Get image count
        image_count_result = await session.execute(
            select(func.count())
            .select_from(TransImage)
            .where(TransImage.transkey == transkey)
        )
        image_count = image_count_result.scalar() or 0

        return TranslationDetail(
            transkey=trans.transkey,
            version=trans.patchver,
            description=trans.description,
            gamekey=trans.gamekey,
            consolekey=trans.consolekey,
            language=trans.language,
            groupkey=trans.groupkey,
            patchstatus=trans.patchstatus,
            game_title=row[1],
            console_name=row[2],
            language_name=row[3],
            status_name=row[4],
            patch_hint=row[5],
            filename=trans.patchfile,
            filesize=None,
            downloads=trans.downloads,
            releasedate=trans.patchrel,
            patchtype=None,
            hintskey=trans.patchhint,
            nofile=trans.nofile,
            noreadme=trans.noreadme,
            created=trans.created,
            lastmod=trans.lastmod,
            image_count=image_count,
        )

    async def get_translation_images(
        self, session: AsyncSession, transkey: int
    ) -> list[TransImageResponse]:
        """
        Get all images for a translation.
        
        Args:
            session: Database session
            transkey: Translation primary key
        
        Returns:
            List of translation images
        """
        # Verify translation exists
        trans_result = await session.execute(
            select(Translation.transkey).where(Translation.transkey == transkey)
        )
        if not trans_result.scalar():
            raise HTTPException(
                status_code=404, detail=f"Translation with ID {transkey} not found"
            )

        result = await session.execute(
            select(TransImage).where(TransImage.transkey == transkey)
        )
        images = result.scalars().all()

        return [
            TransImageResponse(
                imagekey=img.imagekey,
                filename=img.filename,
                transkey=img.transkey,
                gamekey=img.gamekey,
            )
            for img in images
        ]

    async def get_translations_for_game(
        self,
        session: AsyncSession,
        gamekey: int,
        *,
        page: int = 1,
        page_size: int = 50,
    ) -> PaginatedResponse[TranslationListItem]:
        """
        Get all translations for a specific game.
        
        Args:
            session: Database session
            gamekey: Game primary key
            page: Page number
            page_size: Items per page
        
        Returns:
            Paginated response with translation list items
        """
        return await self.get_translations(
            session,
            game=gamekey,
            page=page,
            page_size=page_size,
        )


# Singleton instance
translation_service = TranslationService()
