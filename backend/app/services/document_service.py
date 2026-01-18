"""
Document service for document-related operations.
Handles fetching, filtering, and searching documents.
"""

from typing import Optional

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Category, Console, Document, Game, SkillLevel
from app.schemas.common import PaginatedResponse
from app.schemas.documents import DocumentDetail, DocumentListItem


class DocumentService:
    """Service for document-related database operations."""

    async def get_documents(
        self,
        session: AsyncSession,
        *,
        q: Optional[str] = None,
        category: Optional[int] = None,
        console: Optional[int] = None,
        skill_level: Optional[int] = None,
        page: int = 1,
        page_size: int = 50,
        sort_by: str = "title",
        sort_order: str = "asc",
    ) -> PaginatedResponse[DocumentListItem]:
        """
        Get paginated list of documents with filters.

        Args:
            session: Database session
            q: Search query for title
            category: Filter by category ID
            console: Filter by console ID
            skill_level: Filter by skill level ID
            page: Page number (1-indexed)
            page_size: Items per page
            sort_by: Field to sort by
            sort_order: Sort direction (asc/desc)

        Returns:
            Paginated response with document list items
        """
        # Build base query with joins for resolved names
        query = (
            select(
                Document,
                Category.catname.label("category_name"),
                Console.description.label("console_name"),
                Game.gametitle.label("game_title"),
                SkillLevel.name.label("skill_level"),
            )
            .outerjoin(Category, Document.categorykey == Category.categorykey)
            .outerjoin(Console, Document.consolekey == Console.consoleid)
            .outerjoin(Game, Document.gamekey == Game.gamekey)
            .outerjoin(SkillLevel, Document.explevel == SkillLevel.id)
        )

        # Apply filters
        if q:
            query = query.where(Document.title.ilike(f"%{q}%"))
        if category:
            query = query.where(Document.categorykey == category)
        if console:
            query = query.where(Document.consolekey == console)
        if skill_level:
            query = query.where(Document.explevel == skill_level)

        # Get total count
        count_query = select(func.count()).select_from(Document)
        if q:
            count_query = count_query.where(Document.title.ilike(f"%{q}%"))
        if category:
            count_query = count_query.where(Document.categorykey == category)
        if console:
            count_query = count_query.where(Document.consolekey == console)
        if skill_level:
            count_query = count_query.where(Document.explevel == skill_level)

        total_result = await session.execute(count_query)
        total = total_result.scalar() or 0

        # Apply sorting
        sort_column = getattr(Document, sort_by, Document.title)
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
            doc = row[0]
            items.append(
                DocumentListItem(
                    dockey=doc.dockey,
                    title=doc.title,
                    description=doc.description,
                    categorykey=doc.categorykey,
                    consolekey=doc.consolekey,
                    gamekey=doc.gamekey,
                    explevel=doc.explevel,
                    category_name=row[1],
                    console_name=row[2],
                    game_title=row[3],
                    skill_level=row[4],
                    downloads=doc.downloads,
                    created=doc.created,
                    lastmod=doc.lastmod,
                )
            )

        total_pages = (total + page_size - 1) // page_size

        return PaginatedResponse[DocumentListItem](
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    async def get_document(self, session: AsyncSession, dockey: int) -> DocumentDetail:
        """
        Get a single document by ID with full details.

        Args:
            session: Database session
            dockey: Document primary key

        Returns:
            Detailed document information

        Raises:
            HTTPException: If document not found
        """
        query = (
            select(
                Document,
                Category.catname.label("category_name"),
                Console.description.label("console_name"),
                Game.gametitle.label("game_title"),
                SkillLevel.name.label("skill_level"),
            )
            .outerjoin(Category, Document.categorykey == Category.categorykey)
            .outerjoin(Console, Document.consolekey == Console.consoleid)
            .outerjoin(Game, Document.gamekey == Game.gamekey)
            .outerjoin(SkillLevel, Document.explevel == SkillLevel.id)
            .where(Document.dockey == dockey)
        )

        result = await session.execute(query)
        row = result.first()

        if not row:
            raise HTTPException(
                status_code=404, detail=f"Document with ID {dockey} not found"
            )

        doc = row[0]

        return DocumentDetail(
            dockey=doc.dockey,
            title=doc.title,
            description=doc.description,
            categorykey=doc.categorykey,
            consolekey=doc.consolekey,
            gamekey=doc.gamekey,
            authorkey=doc.authorkey,
            explevel=doc.explevel,
            version=doc.version,
            category_name=row[1],
            console_name=row[2],
            game_title=row[3],
            skill_level=row[4],
            filename=doc.filename,
            downloads=doc.downloads,
            reldate=doc.reldate,
            nofile=doc.nofile,
            created=doc.created,
            lastmod=doc.lastmod,
        )


# Singleton instance
document_service = DocumentService()
