"""
RomHacking.net Archive Explorer - Backend Entry Point

A high-performance API for browsing the RomHacking.net 2024 data archive.
"""

import logging
from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.core.logging_config import setup_logging, get_logger
from app.core.middleware import LoggingMiddleware
from app.api.v1 import router as v1_router

# Initialize logging before anything else
setup_logging()
logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan manager for startup and shutdown events."""
    # Startup
    logger.info(f"🚀 Starting {settings.app_name} v{settings.app_version}")
    logger.info(f"📦 Database: {settings.database_name}@{settings.database_host}")
    yield
    # Shutdown
    logger.info("👋 Shutting down...")


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="API for browsing the RomHacking.net 2024 end-of-life data archive.",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """
    Global exception handler for unhandled errors.
    
    Logs the full traceback to error.log and returns a generic 500 response.
    """
    logger.exception(f"Unhandled exception in {request.method} {request.url.path}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


# Add logging middleware (must be added before CORS)
app.add_middleware(LoggingMiddleware)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(v1_router, prefix="/api")


@app.get("/", include_in_schema=False)
async def root() -> dict[str, str]:
    """Root endpoint redirect to docs."""
    return {
        "message": f"Welcome to {settings.app_name}",
        "docs": "/docs",
        "health": "/api/v1/health",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=settings.debug,
    )
