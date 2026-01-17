"""
Metadata API endpoints.
Provides cached lookup data for consoles, genres, languages, etc.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.schemas import (
    AllMetadataResponse,
    CategoryResponse,
    ConsoleResponse,
    GenreResponse,
    HacksCatResponse,
    HomebrewCatResponse,
    LanguageResponse,
    OSResponse,
    PatchStatusResponse,
    SkillLevelResponse,
    UtilCatResponse,
)
from app.services import metadata_service

router = APIRouter(prefix="/metadata", tags=["Metadata"])


@router.get(
    "",
    response_model=AllMetadataResponse,
    summary="Get all metadata",
    description="Returns all lookup tables in a single request for initial app load.",
)
async def get_all_metadata(
    session: AsyncSession = Depends(get_session),
) -> AllMetadataResponse:
    """Get all metadata for initial app load."""
    consoles = await metadata_service.get_consoles(session)
    genres = await metadata_service.get_genres(session)
    languages = await metadata_service.get_languages(session)
    patch_statuses = await metadata_service.get_patch_statuses(session)
    hack_categories = await metadata_service.get_hack_categories(session)
    util_categories = await metadata_service.get_util_categories(session)
    doc_categories = await metadata_service.get_categories(session)
    homebrew_categories = await metadata_service.get_homebrew_categories(session)
    skill_levels = await metadata_service.get_skill_levels(session)
    operating_systems = await metadata_service.get_operating_systems(session)

    return AllMetadataResponse(
        consoles=[ConsoleResponse.model_validate(c) for c in consoles],
        genres=[GenreResponse.model_validate(g) for g in genres],
        languages=[LanguageResponse.model_validate(l) for l in languages],
        patch_statuses=[PatchStatusResponse.model_validate(p) for p in patch_statuses],
        hack_categories=[HacksCatResponse.model_validate(h) for h in hack_categories],
        util_categories=[UtilCatResponse.model_validate(u) for u in util_categories],
        doc_categories=[CategoryResponse.model_validate(d) for d in doc_categories],
        homebrew_categories=[HomebrewCatResponse.model_validate(h) for h in homebrew_categories],
        skill_levels=[SkillLevelResponse.model_validate(s) for s in skill_levels],
        operating_systems=[OSResponse.model_validate(o) for o in operating_systems],
    )


@router.get(
    "/consoles",
    response_model=list[ConsoleResponse],
    summary="Get all consoles",
    description="Returns all gaming platforms/consoles.",
)
async def get_consoles(
    session: AsyncSession = Depends(get_session),
) -> list[ConsoleResponse]:
    """Get all consoles."""
    consoles = await metadata_service.get_consoles(session)
    return [ConsoleResponse.model_validate(c) for c in consoles]


@router.get(
    "/genres",
    response_model=list[GenreResponse],
    summary="Get all genres",
    description="Returns all game genres.",
)
async def get_genres(
    session: AsyncSession = Depends(get_session),
) -> list[GenreResponse]:
    """Get all genres."""
    genres = await metadata_service.get_genres(session)
    return [GenreResponse.model_validate(g) for g in genres]


@router.get(
    "/languages",
    response_model=list[LanguageResponse],
    summary="Get all languages",
    description="Returns all translation languages.",
)
async def get_languages(
    session: AsyncSession = Depends(get_session),
) -> list[LanguageResponse]:
    """Get all languages."""
    languages = await metadata_service.get_languages(session)
    return [LanguageResponse.model_validate(l) for l in languages]


@router.get(
    "/patch-statuses",
    response_model=list[PatchStatusResponse],
    summary="Get all patch statuses",
    description="Returns all translation patch status options.",
)
async def get_patch_statuses(
    session: AsyncSession = Depends(get_session),
) -> list[PatchStatusResponse]:
    """Get all patch statuses."""
    statuses = await metadata_service.get_patch_statuses(session)
    return [PatchStatusResponse.model_validate(s) for s in statuses]


@router.get(
    "/categories/hacks",
    response_model=list[HacksCatResponse],
    summary="Get hack categories",
    description="Returns all ROM hack categories.",
)
async def get_hack_categories(
    session: AsyncSession = Depends(get_session),
) -> list[HacksCatResponse]:
    """Get hack categories."""
    categories = await metadata_service.get_hack_categories(session)
    return [HacksCatResponse.model_validate(c) for c in categories]


@router.get(
    "/categories/utilities",
    response_model=list[UtilCatResponse],
    summary="Get utility categories",
    description="Returns all utility categories.",
)
async def get_util_categories(
    session: AsyncSession = Depends(get_session),
) -> list[UtilCatResponse]:
    """Get utility categories."""
    categories = await metadata_service.get_util_categories(session)
    return [UtilCatResponse.model_validate(c) for c in categories]


@router.get(
    "/categories/documents",
    response_model=list[CategoryResponse],
    summary="Get document categories",
    description="Returns all document categories.",
)
async def get_doc_categories(
    session: AsyncSession = Depends(get_session),
) -> list[CategoryResponse]:
    """Get document categories."""
    categories = await metadata_service.get_categories(session)
    return [CategoryResponse.model_validate(c) for c in categories]


@router.get(
    "/categories/homebrew",
    response_model=list[HomebrewCatResponse],
    summary="Get homebrew categories",
    description="Returns all homebrew categories.",
)
async def get_homebrew_categories(
    session: AsyncSession = Depends(get_session),
) -> list[HomebrewCatResponse]:
    """Get homebrew categories."""
    categories = await metadata_service.get_homebrew_categories(session)
    return [HomebrewCatResponse.model_validate(c) for c in categories]


@router.get(
    "/skill-levels",
    response_model=list[SkillLevelResponse],
    summary="Get skill levels",
    description="Returns all document skill/experience levels.",
)
async def get_skill_levels(
    session: AsyncSession = Depends(get_session),
) -> list[SkillLevelResponse]:
    """Get skill levels."""
    levels = await metadata_service.get_skill_levels(session)
    return [SkillLevelResponse.model_validate(l) for l in levels]


@router.get(
    "/operating-systems",
    response_model=list[OSResponse],
    summary="Get operating systems",
    description="Returns all operating systems (for utilities).",
)
async def get_operating_systems(
    session: AsyncSession = Depends(get_session),
) -> list[OSResponse]:
    """Get operating systems."""
    operating_systems = await metadata_service.get_operating_systems(session)
    return [OSResponse.model_validate(o) for o in operating_systems]
