"""
Documents API endpoints.
Provides access to ROM hacking documentation with filtering and pagination.
"""

from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.schemas.common import PaginatedResponse
from app.schemas.documents import DocumentDetail, DocumentListItem
from app.services.document_service import document_service

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.get(
    "",
    response_model=PaginatedResponse[DocumentListItem],
    summary="List documents",
    description="Get a paginated list of ROM hacking documents with optional filters.",
)
async def list_documents(
    session: AsyncSession = Depends(get_session),
    q: Optional[str] = Query(None, description="Search query for title"),
    category: Optional[int] = Query(None, description="Filter by category ID"),
    console: Optional[int] = Query(None, description="Filter by console ID"),
    skill_level: Optional[int] = Query(None, description="Filter by skill level ID"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=200, description="Items per page"),
    sort_by: str = Query("title", description="Sort field"),
    sort_order: str = Query("asc", description="Sort order (asc/desc)"),
) -> PaginatedResponse[DocumentListItem]:
    """Get paginated list of documents."""
    return await document_service.get_documents(
        session,
        q=q,
        category=category,
        console=console,
        skill_level=skill_level,
        page=page,
        page_size=page_size,
        sort_by=sort_by,
        sort_order=sort_order,
    )


@router.get(
    "/{dockey}",
    response_model=DocumentDetail,
    summary="Get document details",
    description="Get detailed information for a single document.",
)
async def get_document(
    dockey: int,
    session: AsyncSession = Depends(get_session),
) -> DocumentDetail:
    """Get a single document by ID."""
    return await document_service.get_document(session, dockey)
