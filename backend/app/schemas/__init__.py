"""
Pydantic Schemas: Request/Response validation models.
"""

from app.schemas.common import HealthResponse, MessageResponse, PaginatedResponse
from app.schemas.games import (
    GameBase,
    GameDetail,
    GameListItem,
    GameQueryParams,
)
from app.schemas.hacks import (
    HackBase,
    HackDetail,
    HackImageResponse,
    HackListItem,
    HackQueryParams,
)
from app.schemas.metadata import (
    AllMetadataResponse,
    CategoryResponse,
    ConsoleResponse,
    GenreResponse,
    HacksCatResponse,
    HomebrewCatResponse,
    LanguageResponse,
    LicenseResponse,
    OSResponse,
    PatchHintsResponse,
    PatchStatusResponse,
    SectionResponse,
    SkillLevelResponse,
    UtilCatResponse,
)
from app.schemas.translations import (
    TransImageResponse,
    TranslationBase,
    TranslationDetail,
    TranslationListItem,
    TranslationQueryParams,
)

__all__ = [
    # Common
    "HealthResponse",
    "MessageResponse",
    "PaginatedResponse",
    # Metadata
    "AllMetadataResponse",
    "CategoryResponse",
    "ConsoleResponse",
    "GenreResponse",
    "HacksCatResponse",
    "HomebrewCatResponse",
    "LanguageResponse",
    "LicenseResponse",
    "OSResponse",
    "PatchHintsResponse",
    "PatchStatusResponse",
    "SectionResponse",
    "SkillLevelResponse",
    "UtilCatResponse",
    # Games
    "GameBase",
    "GameDetail",
    "GameListItem",
    "GameQueryParams",
    # Hacks
    "HackBase",
    "HackDetail",
    "HackImageResponse",
    "HackListItem",
    "HackQueryParams",
    # Translations
    "TransImageResponse",
    "TranslationBase",
    "TranslationDetail",
    "TranslationListItem",
    "TranslationQueryParams",
]
