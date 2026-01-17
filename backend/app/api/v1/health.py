"""
Health check endpoints.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.schemas import HealthResponse
from app.services import health_service

router = APIRouter()


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health Check",
    description="Check the health status of the API and database connection.",
)
async def health_check(
    session: AsyncSession = Depends(get_session),
) -> HealthResponse:
    """
    Perform a health check on the application.
    
    Returns:
        HealthResponse containing status, version, and database connectivity.
    """
    return await health_service.check_health(session)
