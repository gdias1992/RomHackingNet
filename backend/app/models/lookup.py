"""
Lookup/Reference table models.
These are cached at startup and used for filtering/display purposes.

Priority P0: Console, Genre, Language, PatchStatus
Additional: Category, HacksCat, HomebrewCat, UtilCat, SkillLevel, OS, License, Section, PatchHints
"""

from typing import Optional

from sqlmodel import Field, SQLModel


class Console(SQLModel, table=True):
    """
    Gaming platforms/consoles lookup table.
    
    Referenced by: gamedata, hacks, transdata, utilities, documents, homebrew
    """

    __tablename__ = "console"

    consoleid: int = Field(primary_key=True)
    description: str = Field(max_length=100)
    manufacturer: Optional[str] = Field(default=None, max_length=100)
    abb: Optional[str] = Field(default=None, max_length=10)


class Genre(SQLModel, table=True):
    """
    Game genres lookup table.
    
    Referenced by: gamedata
    """

    __tablename__ = "genres"

    genrekey: int = Field(primary_key=True)
    description: str = Field(max_length=100)


class Language(SQLModel, table=True):
    """
    Languages for translations lookup table.
    
    Referenced by: transdata, fonts
    """

    __tablename__ = "language"

    id: int = Field(primary_key=True)
    name: str = Field(max_length=25)
    abbrev: Optional[str] = Field(default=None, max_length=10)


class PatchStatus(SQLModel, table=True):
    """
    Translation completion status lookup table.
    
    Referenced by: transdata
    """

    __tablename__ = "patchstatus"

    id: int = Field(primary_key=True)
    statusletter: str = Field(max_length=1)
    description: str = Field(max_length=50)


class Category(SQLModel, table=True):
    """
    Categories for documents lookup table.
    
    Referenced by: documents
    """

    __tablename__ = "category"

    categorykey: int = Field(primary_key=True)
    catname: str = Field(max_length=100)


class HacksCat(SQLModel, table=True):
    """
    Categories for ROM hacks lookup table.
    
    Referenced by: hacks
    """

    __tablename__ = "hackscat"

    categorykey: int = Field(primary_key=True)
    catname: str = Field(max_length=100)


class HomebrewCat(SQLModel, table=True):
    """
    Categories for homebrew lookup table.
    
    Referenced by: homebrew
    """

    __tablename__ = "homebrewcat"

    categorykey: int = Field(primary_key=True)
    catname: str = Field(max_length=100)


class UtilCat(SQLModel, table=True):
    """
    Categories for utilities lookup table.
    
    Referenced by: utilities
    """

    __tablename__ = "utilcat"

    categorykey: int = Field(primary_key=True)
    catname: str = Field(max_length=50)


class SkillLevel(SQLModel, table=True):
    """
    Experience levels for documents lookup table.
    
    Referenced by: documents
    """

    __tablename__ = "skilllevel"

    id: int = Field(primary_key=True)
    name: str = Field(max_length=50)


class OS(SQLModel, table=True):
    """
    Operating systems lookup table (for utilities).
    
    Referenced by: utilities
    """

    __tablename__ = "os"

    oskey: int = Field(primary_key=True)
    name: str = Field(max_length=50)
    description: str = Field(max_length=50)


class License(SQLModel, table=True):
    """
    Software licenses lookup table.
    
    Referenced by: utilities
    """

    __tablename__ = "licenses"

    id: str = Field(primary_key=True, max_length=50)
    name: str = Field(max_length=255)


class Section(SQLModel, table=True):
    """
    Site sections lookup table.
    
    Referenced by: screenshots
    """

    __tablename__ = "sections"

    id: int = Field(primary_key=True)
    name: str = Field(max_length=50)
    abb: str = Field(max_length=50)


class PatchHints(SQLModel, table=True):
    """
    Hints for applying patches lookup table.
    
    Referenced by: hacks, transdata
    """

    __tablename__ = "patchhints"

    id: int = Field(primary_key=True)
    description: str = Field(max_length=100)
