"""
API v1 Routes.
Includes all endpoint routers for version 1 of the API.
"""

from fastapi import APIRouter

from app.api.v1 import games, hacks, health, metadata, translations

router = APIRouter(prefix="/v1")

# Health check
router.include_router(health.router, tags=["Health"])

# Metadata/lookup endpoints
router.include_router(metadata.router)

# Core content endpoints
router.include_router(games.router)
router.include_router(hacks.router)
router.include_router(translations.router)

