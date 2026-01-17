"""
Hack service for ROM hack-related operations.
Handles fetching, filtering, and searching hacks.
"""

from typing import Optional

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Console, Game, Hack, HackImage, HacksCat, PatchHints
from app.schemas import HackDetail, HackImageResponse, HackListItem, PaginatedResponse


class HackService:
    """Service for hack-related database operations."""

    async def get_hacks(
        self,
        session: AsyncSession,
        *,
        q: Optional[str] = None,
        game: Optional[int] = None,
        console: Optional[int] = None,
        category: Optional[int] = None,
        page: int = 1,
        page_size: int = 50,
        sort_by: str = "hacktitle",
        sort_order: str = "asc",
    ) -> PaginatedResponse[HackListItem]:
        """
        Get paginated list of hacks with filters.
        
        Args:
            session: Database session
            q: Search query for title
            game: Filter by game ID
            console: Filter by console ID
            category: Filter by category ID
            page: Page number (1-indexed)
            page_size: Items per page
            sort_by: Field to sort by
            sort_order: Sort direction (asc/desc)
        
        Returns:
            Paginated response with hack list items
        """
        # Build base query with joins for resolved names
        query = (
            select(
                Hack,
                Game.gametitle.label("game_title"),
                Console.description.label("console_name"),
                HacksCat.catname.label("category_name"),
            )
            .outerjoin(Game, Hack.gamekey == Game.gamekey)
            .outerjoin(Console, Hack.consolekey == Console.consoleid)
            .outerjoin(HacksCat, Hack.category == HacksCat.categorykey)
        )

        # Apply filters
        if q:
            query = query.where(Hack.hacktitle.ilike(f"%{q}%"))
        if game:
            query = query.where(Hack.gamekey == game)
        if console:
            query = query.where(Hack.consolekey == console)
        if category:
            query = query.where(Hack.category == category)

        # Get total count
        count_query = select(func.count()).select_from(Hack)
        if q:
            count_query = count_query.where(Hack.hacktitle.ilike(f"%{q}%"))
        if game:
            count_query = count_query.where(Hack.gamekey == game)
        if console:
            count_query = count_query.where(Hack.consolekey == console)
        if category:
            count_query = count_query.where(Hack.category == category)

        total_result = await session.execute(count_query)
        total = total_result.scalar() or 0

        # Apply sorting
        sort_column = getattr(Hack, sort_by, Hack.hacktitle)
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
            hack = row[0]
            items.append(
                HackListItem(
                    hackkey=hack.hackkey,
                    hacktitle=hack.hacktitle,
                    version=hack.version,
                    description=hack.description,
                    gamekey=hack.gamekey,
                    consolekey=hack.consolekey,
                    category=hack.category,
                    game_title=row[1],
                    console_name=row[2],
                    category_name=row[3],
                    downloads=hack.downloads,
                    releasedate=hack.reldate,
                    created=hack.created,
                    lastmod=hack.lastmod,
                )
            )

        total_pages = (total + page_size - 1) // page_size

        return PaginatedResponse[HackListItem](
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    async def get_hack(self, session: AsyncSession, hackkey: int) -> HackDetail:
        """
        Get a single hack by ID with full details.
        
        Args:
            session: Database session
            hackkey: Hack primary key
        
        Returns:
            Detailed hack information
        
        Raises:
            HTTPException: If hack not found
        """
        query = (
            select(
                Hack,
                Game.gametitle.label("game_title"),
                Console.description.label("console_name"),
                HacksCat.catname.label("category_name"),
                PatchHints.description.label("patch_hint"),
            )
            .outerjoin(Game, Hack.gamekey == Game.gamekey)
            .outerjoin(Console, Hack.consolekey == Console.consoleid)
            .outerjoin(HacksCat, Hack.category == HacksCat.categorykey)
            .outerjoin(PatchHints, Hack.patchhint == PatchHints.id)
            .where(Hack.hackkey == hackkey)
        )

        result = await session.execute(query)
        row = result.first()

        if not row:
            raise HTTPException(status_code=404, detail=f"Hack with ID {hackkey} not found")

        hack = row[0]

        # Get image count
        image_count_result = await session.execute(
            select(func.count()).select_from(HackImage).where(HackImage.hackkey == hackkey)
        )
        image_count = image_count_result.scalar() or 0

        return HackDetail(
            hackkey=hack.hackkey,
            hacktitle=hack.hacktitle,
            version=hack.version,
            description=hack.description,
            gamekey=hack.gamekey,
            consolekey=hack.consolekey,
            authorkey=hack.authorkey,
            category=hack.category,
            game_title=row[1],
            console_name=row[2],
            category_name=row[3],
            patch_hint=row[4],
            filename=hack.filename,
            filesize=None,
            downloads=hack.downloads,
            releasedate=hack.reldate,
            patchtype=None,
            hintskey=hack.patchhint,
            nofile=hack.nofile,
            noreadme=0,
            created=hack.created,
            lastmod=hack.lastmod,
            image_count=image_count,
        )

    async def get_hack_images(
        self, session: AsyncSession, hackkey: int
    ) -> list[HackImageResponse]:
        """
        Get all images for a hack.
        
        Args:
            session: Database session
            hackkey: Hack primary key
        
        Returns:
            List of hack images
        """
        # Verify hack exists
        hack_result = await session.execute(
            select(Hack.hackkey).where(Hack.hackkey == hackkey)
        )
        if not hack_result.scalar():
            raise HTTPException(status_code=404, detail=f"Hack with ID {hackkey} not found")

        result = await session.execute(
            select(HackImage).where(HackImage.hackkey == hackkey)
        )
        images = result.scalars().all()

        return [
            HackImageResponse(
                imageid=img.imageid,
                filename=img.filename,
                caption=img.caption,
            )
            for img in images
        ]

    async def get_hacks_for_game(
        self,
        session: AsyncSession,
        gamekey: int,
        *,
        page: int = 1,
        page_size: int = 50,
    ) -> PaginatedResponse[HackListItem]:
        """
        Get all hacks for a specific game.
        
        Args:
            session: Database session
            gamekey: Game primary key
            page: Page number
            page_size: Items per page
        
        Returns:
            Paginated response with hack list items
        """
        return await self.get_hacks(
            session,
            game=gamekey,
            page=page,
            page_size=page_size,
        )


# Singleton instance
hack_service = HackService()
