"""
Health check service.
Provides database connectivity verification.
"""

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas import HealthResponse
from app.core.config import settings


async def check_health(session: AsyncSession) -> HealthResponse:
    """
    Check application health and database connectivity.
    
    Args:
        session: Async database session.
        
    Returns:
        HealthResponse with status information.
    """
    db_status = "disconnected"
    
    try:
        result = await session.execute(text("SELECT 1"))
        if result.scalar() == 1:
            db_status = "connected"
    except Exception:
        db_status = "error"
    
    return HealthResponse(
        status="healthy" if db_status == "connected" else "degraded",
        version=settings.app_version,
        database=db_status,
    )
