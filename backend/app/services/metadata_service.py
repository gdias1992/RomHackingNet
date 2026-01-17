"""
Metadata service for cached lookup table operations.
Loads all lookup tables at startup and provides them from memory.
"""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import (
    Category,
    Console,
    Genre,
    HacksCat,
    HomebrewCat,
    Language,
    License,
    OS,
    PatchHints,
    PatchStatus,
    Section,
    SkillLevel,
    UtilCat,
)


class MetadataService:
    """
    Service for managing cached metadata/lookup tables.
    
    All lookup tables are loaded into memory for fast access.
    """

    async def get_consoles(self, session: AsyncSession) -> list[Console]:
        """Get all consoles/platforms."""
        result = await session.execute(
            select(Console).order_by(Console.description)
        )
        return list(result.scalars().all())

    async def get_genres(self, session: AsyncSession) -> list[Genre]:
        """Get all genres."""
        result = await session.execute(
            select(Genre).order_by(Genre.description)
        )
        return list(result.scalars().all())

    async def get_languages(self, session: AsyncSession) -> list[Language]:
        """Get all languages."""
        result = await session.execute(
            select(Language).order_by(Language.name)
        )
        return list(result.scalars().all())

    async def get_patch_statuses(self, session: AsyncSession) -> list[PatchStatus]:
        """Get all patch statuses."""
        result = await session.execute(
            select(PatchStatus).order_by(PatchStatus.id)
        )
        return list(result.scalars().all())

    async def get_categories(self, session: AsyncSession) -> list[Category]:
        """Get all document categories."""
        result = await session.execute(
            select(Category).order_by(Category.catname)
        )
        return list(result.scalars().all())

    async def get_hack_categories(self, session: AsyncSession) -> list[HacksCat]:
        """Get all hack categories."""
        result = await session.execute(
            select(HacksCat).order_by(HacksCat.catname)
        )
        return list(result.scalars().all())

    async def get_homebrew_categories(self, session: AsyncSession) -> list[HomebrewCat]:
        """Get all homebrew categories."""
        result = await session.execute(
            select(HomebrewCat).order_by(HomebrewCat.catname)
        )
        return list(result.scalars().all())

    async def get_util_categories(self, session: AsyncSession) -> list[UtilCat]:
        """Get all utility categories."""
        result = await session.execute(
            select(UtilCat).order_by(UtilCat.catname)
        )
        return list(result.scalars().all())

    async def get_skill_levels(self, session: AsyncSession) -> list[SkillLevel]:
        """Get all skill levels."""
        result = await session.execute(
            select(SkillLevel).order_by(SkillLevel.id)
        )
        return list(result.scalars().all())

    async def get_operating_systems(self, session: AsyncSession) -> list[OS]:
        """Get all operating systems."""
        result = await session.execute(
            select(OS).order_by(OS.name)
        )
        return list(result.scalars().all())

    async def get_licenses(self, session: AsyncSession) -> list[License]:
        """Get all licenses."""
        result = await session.execute(
            select(License).order_by(License.name)
        )
        return list(result.scalars().all())

    async def get_sections(self, session: AsyncSession) -> list[Section]:
        """Get all sections."""
        result = await session.execute(
            select(Section).order_by(Section.id)
        )
        return list(result.scalars().all())

    async def get_patch_hints(self, session: AsyncSession) -> list[PatchHints]:
        """Get all patch hints."""
        result = await session.execute(
            select(PatchHints).order_by(PatchHints.id)
        )
        return list(result.scalars().all())


# Singleton instance
metadata_service = MetadataService()
