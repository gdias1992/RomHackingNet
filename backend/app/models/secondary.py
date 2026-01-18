"""
Secondary content models - Priority P2.
These are secondary content entities: Utility, Document, Homebrew.
"""

from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel


class Utility(SQLModel, table=True):
    """
    ROM hacking tools/utilities.
    
    Has FULLTEXT index on title.
    Links to gamedata, console, utilcat, os, licenses.
    """

    __tablename__ = "utilities"

    utilkey: int = Field(primary_key=True)
    title: str = Field(max_length=100, index=True)
    categorykey: Optional[int] = Field(default=None, foreign_key="utilcat.categoryid")
    consolekey: Optional[int] = Field(default=None, foreign_key="console.consoleid")
    gamekey: Optional[int] = Field(default=None, foreign_key="gamedata.gamekey")
    authorkey: Optional[int] = Field(default=None)  # References missing person table
    
    # Content details
    description: Optional[str] = Field(default=None)
    filename: Optional[str] = Field(default=None, max_length=100)
    explevel: Optional[int] = Field(default=None)  # Experience level
    version: Optional[str] = Field(default=None, max_length=10)
    recm: Optional[str] = Field(default=None, max_length=25)  # Recommended
    screenshot: Optional[str] = Field(default=None, max_length=50)
    os: Optional[int] = Field(default=None, foreign_key="os.osid")
    reldate: Optional[int] = Field(default=None)  # Unix timestamp
    language: Optional[int] = Field(default=None)
    license: Optional[str] = Field(default=None, max_length=100)
    source: Optional[str] = Field(default=None, max_length=100)
    
    # Stats
    downloads: int = Field(default=0)
    
    # Flags
    nofile: int = Field(default=0)
    
    # Timestamps
    created: Optional[datetime] = Field(default=None)
    lastmod: Optional[datetime] = Field(default=None)


class Document(SQLModel, table=True):
    """
    Technical guides and documentation.
    
    Has FULLTEXT index on title.
    Links to gamedata, console, category, skilllevel.
    """

    __tablename__ = "documents"

    dockey: int = Field(primary_key=True)
    title: str = Field(max_length=100, index=True)
    categorykey: Optional[int] = Field(default=None, foreign_key="category.categoryid")
    consolekey: Optional[int] = Field(default=None, foreign_key="console.consoleid")
    gamekey: Optional[int] = Field(default=None, foreign_key="gamedata.gamekey")
    authorkey: Optional[int] = Field(default=None)  # References missing person table
    
    # Content details
    description: Optional[str] = Field(default=None)
    filename: Optional[str] = Field(default=None, max_length=100)
    explevel: Optional[int] = Field(default=None, foreign_key="skilllevel.levelid")
    version: Optional[str] = Field(default=None, max_length=10)
    recm: Optional[str] = Field(default=None, max_length=25)  # Recommended
    reldate: Optional[int] = Field(default=None)  # Unix timestamp
    
    # Stats
    downloads: int = Field(default=0)
    
    # Flags
    nofile: int = Field(default=0)
    
    # Timestamps
    created: Optional[datetime] = Field(default=None)
    lastmod: Optional[datetime] = Field(default=None)


class Homebrew(SQLModel, table=True):
    """
    Homebrew game projects.
    
    Links to homebrewcat, console.
    """

    __tablename__ = "homebrew"

    homebrewkey: int = Field(primary_key=True)
    title: str = Field(max_length=100, index=True)
    filename: Optional[str] = Field(default=None, max_length=100)
    version: Optional[str] = Field(default=None, max_length=10)
    
    # Timestamps
    created: Optional[datetime] = Field(default=None)
    lastmod: Optional[datetime] = Field(default=None)
    reldate: Optional[str] = Field(default=None, max_length=50)
    reldateunix: Optional[int] = Field(default=None)
    
    # Relations
    authorkey: Optional[int] = Field(default=None)  # References missing person table
    categorykey: Optional[int] = Field(default=None, foreign_key="homebrewcat.categoryid")
    platformkey: Optional[int] = Field(default=None, foreign_key="console.consoleid")
    
    # Content details
    description: Optional[str] = Field(default=None)
    readme: Optional[str] = Field(default=None, max_length=100)
    titlescreen: Optional[str] = Field(default=None, max_length=100)
    
    # Stats
    downloads: int = Field(default=0)
    
    # Flags
    noreadme: int = Field(default=0)
    nofile: int = Field(default=0)
    
    # Content type flags
    graphics: int = Field(default=0)
    sound: int = Field(default=0)
    controller: int = Field(default=0)
    addon: int = Field(default=0)
    other: int = Field(default=0)
    
    # Source info
    source_included: int = Field(default=0)
    source_lang: Optional[str] = Field(default=None, max_length=100)
    source_utility: Optional[str] = Field(default=None, max_length=100)
    source_licenseid: Optional[str] = Field(default=None, max_length=100)
    source_url: Optional[str] = Field(default=None, max_length=100)
