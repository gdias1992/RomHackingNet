"""
Utility service for utility-related operations.
Handles fetching, filtering, and searching utilities.
"""

from typing import Optional

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Console, Game, OS, UtilCat, Utility
from app.schemas.common import PaginatedResponse
from app.schemas.utilities import UtilityDetail, UtilityListItem


class UtilityService:
    """Service for utility-related database operations."""

    async def get_utilities(
        self,
        session: AsyncSession,
        *,
        q: Optional[str] = None,
        category: Optional[int] = None,
        console: Optional[int] = None,
        os: Optional[int] = None,
        page: int = 1,
        page_size: int = 50,
        sort_by: str = "title",
        sort_order: str = "asc",
    ) -> PaginatedResponse[UtilityListItem]:
        """
        Get paginated list of utilities with filters.

        Args:
            session: Database session
            q: Search query for title
            category: Filter by category ID
            console: Filter by console ID
            os: Filter by OS ID
            page: Page number (1-indexed)
            page_size: Items per page
            sort_by: Field to sort by
            sort_order: Sort direction (asc/desc)

        Returns:
            Paginated response with utility list items
        """
        # Build base query with joins for resolved names
        query = (
            select(
                Utility,
                UtilCat.catname.label("category_name"),
                Console.description.label("console_name"),
                Game.gametitle.label("game_title"),
                OS.name.label("os_name"),
            )
            .outerjoin(UtilCat, Utility.categorykey == UtilCat.categorykey)
            .outerjoin(Console, Utility.consolekey == Console.consoleid)
            .outerjoin(Game, Utility.gamekey == Game.gamekey)
            .outerjoin(OS, Utility.os == OS.oskey)
        )

        # Apply filters
        if q:
            query = query.where(Utility.title.ilike(f"%{q}%"))
        if category:
            query = query.where(Utility.categorykey == category)
        if console:
            query = query.where(Utility.consolekey == console)
        if os:
            query = query.where(Utility.os == os)

        # Get total count
        count_query = select(func.count()).select_from(Utility)
        if q:
            count_query = count_query.where(Utility.title.ilike(f"%{q}%"))
        if category:
            count_query = count_query.where(Utility.categorykey == category)
        if console:
            count_query = count_query.where(Utility.consolekey == console)
        if os:
            count_query = count_query.where(Utility.os == os)

        total_result = await session.execute(count_query)
        total = total_result.scalar() or 0

        # Apply sorting
        sort_column = getattr(Utility, sort_by, Utility.title)
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
            util = row[0]
            items.append(
                UtilityListItem(
                    utilkey=util.utilkey,
                    title=util.title,
                    version=util.version,
                    description=util.description,
                    categorykey=util.categorykey,
                    consolekey=util.consolekey,
                    gamekey=util.gamekey,
                    os=util.os,
                    category_name=row[1],
                    console_name=row[2],
                    game_title=row[3],
                    os_name=row[4],
                    downloads=util.downloads,
                    reldate=util.reldate,
                    created=util.created,
                    lastmod=util.lastmod,
                )
            )

        total_pages = (total + page_size - 1) // page_size

        return PaginatedResponse[UtilityListItem](
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    async def get_utility(self, session: AsyncSession, utilkey: int) -> UtilityDetail:
        """
        Get a single utility by ID with full details.

        Args:
            session: Database session
            utilkey: Utility primary key

        Returns:
            Detailed utility information

        Raises:
            HTTPException: If utility not found
        """
        query = (
            select(
                Utility,
                UtilCat.catname.label("category_name"),
                Console.description.label("console_name"),
                Game.gametitle.label("game_title"),
                OS.name.label("os_name"),
            )
            .outerjoin(UtilCat, Utility.categorykey == UtilCat.categorykey)
            .outerjoin(Console, Utility.consolekey == Console.consoleid)
            .outerjoin(Game, Utility.gamekey == Game.gamekey)
            .outerjoin(OS, Utility.os == OS.oskey)
            .where(Utility.utilkey == utilkey)
        )

        result = await session.execute(query)
        row = result.first()

        if not row:
            raise HTTPException(
                status_code=404, detail=f"Utility with ID {utilkey} not found"
            )

        util = row[0]

        return UtilityDetail(
            utilkey=util.utilkey,
            title=util.title,
            version=util.version,
            description=util.description,
            categorykey=util.categorykey,
            consolekey=util.consolekey,
            gamekey=util.gamekey,
            authorkey=util.authorkey,
            os=util.os,
            license=util.license,
            source=util.source,
            category_name=row[1],
            console_name=row[2],
            game_title=row[3],
            os_name=row[4],
            filename=util.filename,
            downloads=util.downloads,
            reldate=util.reldate,
            nofile=util.nofile,
            created=util.created,
            lastmod=util.lastmod,
        )


# Singleton instance
utility_service = UtilityService()
