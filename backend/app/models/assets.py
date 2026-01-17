"""
Asset and edge case models - Priority P3.
These include image assets and miscellaneous content: HackImage, TransImage, Font, Abandoned, Screenshot.
"""

from typing import Optional

from sqlmodel import Field, SQLModel


class HackImage(SQLModel, table=True):
    """
    Screenshots for ROM hacks.
    
    Links to hacks via hackkey.
    """

    __tablename__ = "hackimages"

    imagekey: int = Field(primary_key=True)
    hackkey: int = Field(default=0, foreign_key="hacks.hackkey")
    gamekey: int = Field(default=0, foreign_key="gamedata.gamekey")
    groupkey: int = Field(default=0)
    filename: str = Field(default="", max_length=50)


class TransImage(SQLModel, table=True):
    """
    Screenshots for translations.
    
    Links to transdata via transkey.
    """

    __tablename__ = "transimage"

    imagekey: int = Field(primary_key=True)
    gamekey: int = Field(default=0, foreign_key="gamedata.gamekey")
    transkey: int = Field(default=0, foreign_key="transdata.transkey")
    groupkey: Optional[str] = Field(default=None, max_length=64)
    filename: Optional[str] = Field(default=None, max_length=64)


class Screenshot(SQLModel, table=True):
    """
    General-purpose screenshots.
    
    Uses section + itemkey for generic linking.
    """

    __tablename__ = "screenshots"

    screenshotid: int = Field(primary_key=True)
    section: Optional[int] = Field(default=None, foreign_key="sections.sectionid")
    itemkey: Optional[int] = Field(default=None)  # Generic reference to content items
    filename: str = Field(max_length=255)
    caption: Optional[str] = Field(default=None, max_length=255)


class Font(SQLModel, table=True):
    """
    Custom fonts for hacks/translations.
    
    Links to language.
    """

    __tablename__ = "fonts"

    fontkey: int = Field(primary_key=True)
    title: str = Field(max_length=255, index=True)
    language: Optional[int] = Field(default=None, foreign_key="language.languageid")
    width: Optional[int] = Field(default=None)
    height: Optional[int] = Field(default=None)
    
    # Content details
    description: Optional[str] = Field(default=None)
    
    # File information
    filename: Optional[str] = Field(default=None, max_length=255)
    filesize: Optional[int] = Field(default=None)
    downloads: int = Field(default=0)


class Abandoned(SQLModel, table=True):
    """
    Metadata for abandoned/unfinished projects.
    
    Standalone table with no FK references.
    """

    __tablename__ = "abandoned"

    id: int = Field(primary_key=True)
    title: str = Field(max_length=255, index=True)
    author: Optional[str] = Field(default=None, max_length=255)
    type: Optional[str] = Field(default=None, max_length=100)
    
    # File information
    file: Optional[str] = Field(default=None, max_length=255)
    
    # Content details
    description: Optional[str] = Field(default=None)
