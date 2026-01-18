"""
Homebrew service for homebrew-related operations.
Handles fetching, filtering, and searching homebrew content.
"""

from typing import Optional

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Console, Homebrew, HomebrewCat
from app.schemas.common import PaginatedResponse
from app.schemas.homebrew import HomebrewDetail, HomebrewListItem


class HomebrewService:
    """Service for homebrew-related database operations."""

    async def get_homebrews(
        self,
        session: AsyncSession,
        *,
        q: Optional[str] = None,
        category: Optional[int] = None,
        platform: Optional[int] = None,
        page: int = 1,
        page_size: int = 50,
        sort_by: str = "title",
        sort_order: str = "asc",
    ) -> PaginatedResponse[HomebrewListItem]:
        """
        Get paginated list of homebrew content with filters.

        Args:
            session: Database session
            q: Search query for title
            category: Filter by category ID
            platform: Filter by platform ID
            page: Page number (1-indexed)
            page_size: Items per page
            sort_by: Field to sort by
            sort_order: Sort direction (asc/desc)

        Returns:
            Paginated response with homebrew list items
        """
        # Build base query with joins for resolved names
        query = (
            select(
                Homebrew,
                HomebrewCat.catname.label("category_name"),
                Console.description.label("platform_name"),
            )
            .outerjoin(HomebrewCat, Homebrew.categorykey == HomebrewCat.categorykey)
            .outerjoin(Console, Homebrew.platformkey == Console.consoleid)
        )

        # Apply filters
        if q:
            query = query.where(Homebrew.title.ilike(f"%{q}%"))
        if category:
            query = query.where(Homebrew.categorykey == category)
        if platform:
            query = query.where(Homebrew.platformkey == platform)

        # Get total count
        count_query = select(func.count()).select_from(Homebrew)
        if q:
            count_query = count_query.where(Homebrew.title.ilike(f"%{q}%"))
        if category:
            count_query = count_query.where(Homebrew.categorykey == category)
        if platform:
            count_query = count_query.where(Homebrew.platformkey == platform)

        total_result = await session.execute(count_query)
        total = total_result.scalar() or 0

        # Apply sorting
        sort_column = getattr(Homebrew, sort_by, Homebrew.title)
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
            hb = row[0]
            items.append(
                HomebrewListItem(
                    homebrewkey=hb.homebrewkey,
                    title=hb.title,
                    version=hb.version,
                    description=hb.description,
                    categorykey=hb.categorykey,
                    platformkey=hb.platformkey,
                    category_name=row[1],
                    platform_name=row[2],
                    downloads=hb.downloads,
                    reldate=hb.reldate,
                    created=hb.created,
                    lastmod=hb.lastmod,
                )
            )

        total_pages = (total + page_size - 1) // page_size

        return PaginatedResponse[HomebrewListItem](
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    async def get_homebrew(
        self, session: AsyncSession, homebrewkey: int
    ) -> HomebrewDetail:
        """
        Get a single homebrew by ID with full details.

        Args:
            session: Database session
            homebrewkey: Homebrew primary key

        Returns:
            Detailed homebrew information

        Raises:
            HTTPException: If homebrew not found
        """
        query = (
            select(
                Homebrew,
                HomebrewCat.catname.label("category_name"),
                Console.description.label("platform_name"),
            )
            .outerjoin(HomebrewCat, Homebrew.categorykey == HomebrewCat.categorykey)
            .outerjoin(Console, Homebrew.platformkey == Console.consoleid)
            .where(Homebrew.homebrewkey == homebrewkey)
        )

        result = await session.execute(query)
        row = result.first()

        if not row:
            raise HTTPException(
                status_code=404, detail=f"Homebrew with ID {homebrewkey} not found"
            )

        hb = row[0]

        return HomebrewDetail(
            homebrewkey=hb.homebrewkey,
            title=hb.title,
            version=hb.version,
            description=hb.description,
            categorykey=hb.categorykey,
            platformkey=hb.platformkey,
            authorkey=hb.authorkey,
            category_name=row[1],
            platform_name=row[2],
            filename=hb.filename,
            downloads=hb.downloads,
            reldate=hb.reldate,
            titlescreen=hb.titlescreen,
            readme=hb.readme,
            nofile=hb.nofile,
            noreadme=hb.noreadme,
            created=hb.created,
            lastmod=hb.lastmod,
        )


# Singleton instance
homebrew_service = HomebrewService()
