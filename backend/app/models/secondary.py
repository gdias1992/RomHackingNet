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
    title: str = Field(max_length=255, index=True)
    categorykey: Optional[int] = Field(default=None, foreign_key="utilcat.categoryid")
    consolekey: Optional[int] = Field(default=None, foreign_key="console.consoleid")
    gamekey: Optional[int] = Field(default=None, foreign_key="gamedata.gamekey")
    authorkey: Optional[int] = Field(default=None)  # References missing person table
    os: Optional[int] = Field(default=None, foreign_key="os.osid")
    
    # Content details
    version: Optional[str] = Field(default=None, max_length=50)
    description: Optional[str] = Field(default=None)
    releasedate: Optional[str] = Field(default=None, max_length=50)
    license: Optional[int] = Field(default=None, foreign_key="licenses.licenseid")
    
    # File information
    filename: Optional[str] = Field(default=None, max_length=255)
    filesize: Optional[int] = Field(default=None)
    downloads: int = Field(default=0)
    
    # Flags
    nofile: int = Field(default=0)
    noreadme: int = Field(default=0)
    
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
    title: str = Field(max_length=255, index=True)
    categorykey: Optional[int] = Field(default=None, foreign_key="category.categoryid")
    consolekey: Optional[int] = Field(default=None, foreign_key="console.consoleid")
    gamekey: Optional[int] = Field(default=None, foreign_key="gamedata.gamekey")
    authorkey: Optional[int] = Field(default=None)  # References missing person table
    explevel: Optional[int] = Field(default=None, foreign_key="skilllevel.levelid")
    
    # Content details
    description: Optional[str] = Field(default=None)
    
    # File information
    filename: Optional[str] = Field(default=None, max_length=255)
    filesize: Optional[int] = Field(default=None)
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
    title: str = Field(max_length=255, index=True)
    authorkey: Optional[int] = Field(default=None)  # References missing person table
    categorykey: Optional[int] = Field(default=None, foreign_key="homebrewcat.categoryid")
    platformkey: Optional[int] = Field(default=None, foreign_key="console.consoleid")
    
    # Content details
    version: Optional[str] = Field(default=None, max_length=50)
    description: Optional[str] = Field(default=None)
    releasedate: Optional[str] = Field(default=None, max_length=50)
    
    # File information
    filename: Optional[str] = Field(default=None, max_length=255)
    filesize: Optional[int] = Field(default=None)
    downloads: int = Field(default=0)
    
    # Flags
    nofile: int = Field(default=0)
    noreadme: int = Field(default=0)
    
    # Timestamps
    created: Optional[datetime] = Field(default=None)
    lastmod: Optional[datetime] = Field(default=None)
