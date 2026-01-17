"""
Core content models - Priority P1.
These are the primary content entities: Game, Hack, Translation.
"""

from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel


class Game(SQLModel, table=True):
    """
    Master game information - the central hub for all content.
    
    Most content tables reference gamedata.gamekey as a foreign key.
    Has FULLTEXT index on gametitle and japtitle.
    """

    __tablename__ = "gamedata"

    gamekey: int = Field(primary_key=True)
    gametitle: str = Field(max_length=255, index=True)
    japtitle: Optional[str] = Field(default=None, max_length=255)
    platformid: Optional[int] = Field(default=None, foreign_key="console.consoleid")
    genreid: Optional[int] = Field(default=None, foreign_key="genres.genrekey")
    publisher: Optional[str] = Field(default=None, max_length=255)
    
    # Existence flags for related content
    transexist: int = Field(default=0)  # Has translations
    hackexist: int = Field(default=0)  # Has hacks
    utilexist: int = Field(default=0)  # Has utilities
    docexist: int = Field(default=0)  # Has documents


class Hack(SQLModel, table=True):
    """
    ROM hack projects.
    
    Has FULLTEXT index on hacktitle.
    Links to gamedata, console, hackscat.
    """

    __tablename__ = "hacks"

    hackkey: int = Field(primary_key=True)
    hacktitle: str = Field(max_length=255, index=True)
    gamekey: Optional[int] = Field(default=None, foreign_key="gamedata.gamekey")
    consolekey: Optional[int] = Field(default=None, foreign_key="console.consoleid")
    authorkey: Optional[int] = Field(default=None)  # References missing person table
    category: Optional[int] = Field(default=None, foreign_key="hackscat.categoryid")
    
    # Content details
    version: Optional[str] = Field(default=None, max_length=50)
    description: Optional[str] = Field(default=None)
    reldate: Optional[str] = Field(default=None, max_length=50)
    
    # File information
    filename: Optional[str] = Field(default=None, max_length=255)
    downloads: int = Field(default=0)
    
    # Patching information
    patchhint: Optional[int] = Field(default=None, foreign_key="patchhints.hintid")
    
    # Flags
    nofile: int = Field(default=0)
    
    # Timestamps
    created: Optional[datetime] = Field(default=None)
    lastmod: Optional[datetime] = Field(default=None)


class Translation(SQLModel, table=True):
    """
    Translation projects.
    
    Links to gamedata, console, language, patchstatus.
    """

    __tablename__ = "transdata"

    transkey: int = Field(primary_key=True)
    gamekey: Optional[int] = Field(default=None, foreign_key="gamedata.gamekey")
    consolekey: Optional[int] = Field(default=None, foreign_key="console.consoleid")
    language: Optional[int] = Field(default=None, foreign_key="language.languageid")
    groupkey: Optional[int] = Field(default=None)  # References missing person/group table
    patchstatus: Optional[int] = Field(default=None, foreign_key="patchstatus.statusid")
    
    # Content details
    patchver: Optional[str] = Field(default=None, max_length=50)
    description: Optional[str] = Field(default=None)
    patchrel: Optional[str] = Field(default=None, max_length=50)
    
    # File information
    patchfile: Optional[str] = Field(default=None, max_length=255)
    downloads: int = Field(default=0)
    
    # Patching information
    patchhint: Optional[int] = Field(default=None, foreign_key="patchhints.hintid")
    
    # Flags
    nofile: int = Field(default=0)
    noreadme: int = Field(default=0)
    
    # Timestamps
    created: Optional[datetime] = Field(default=None)
    lastmod: Optional[datetime] = Field(default=None)


class HackAuthorProject(SQLModel, table=True):
    """
    Junction table linking authors to hack projects.
    
    Note: The 'person' column references a missing author/person table.
    """

    __tablename__ = "hackauthor-project"

    person: int = Field(primary_key=True)
    project: int = Field(primary_key=True, foreign_key="hacks.hackkey")


class TransAuthorProject(SQLModel, table=True):
    """
    Junction table linking authors to translation projects.
    
    Note: The 'person' column references a missing author/person table.
    """

    __tablename__ = "transauthor-project"

    person: int = Field(primary_key=True)
    project: int = Field(primary_key=True, foreign_key="transdata.transkey")
