"""
Centralized logging configuration for the RomHacking.net Archive Explorer.

Provides rotating file handlers for:
- app.log: General application events (INFO+)
- error.log: Errors and exceptions (ERROR+)
- access.log: HTTP request/response logs (INFO)
- frontend.log: Frontend error reports (ERROR)
"""

import logging
import sys
from logging.handlers import RotatingFileHandler
from pathlib import Path

# Logging configuration constants
LOG_DIR = Path(__file__).parent.parent.parent / "logs"
MAX_BYTES = 10 * 1024 * 1024  # 10MB per file
BACKUP_COUNT = 5  # Keep 5 rotated files
LOG_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"
DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def setup_logging(reset_logs: bool = True) -> None:
    """
    Initialize the logging system with rotating file handlers.
    
    Creates the logs directory if it doesn't exist and configures
    handlers for application, error, access, and frontend logs.
    
    Args:
        reset_logs: If True, clear all log files on startup (default: True)
    """
    # Create logs directory if it doesn't exist
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    
    # Reset log files if requested
    if reset_logs:
        for log_file in ["app.log", "error.log", "access.log", "frontend.log"]:
            log_path = LOG_DIR / log_file
            if log_path.exists():
                log_path.write_text("", encoding="utf-8")
    
    # Create formatter
    formatter = logging.Formatter(LOG_FORMAT, datefmt=DATE_FORMAT)
    
    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.DEBUG)
    
    # Clear any existing handlers
    root_logger.handlers.clear()
    
    # Console handler (for development visibility)
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(formatter)
    root_logger.addHandler(console_handler)
    
    # App log handler (INFO+)
    app_handler = RotatingFileHandler(
        LOG_DIR / "app.log",
        maxBytes=MAX_BYTES,
        backupCount=BACKUP_COUNT,
        encoding="utf-8",
    )
    app_handler.setLevel(logging.INFO)
    app_handler.setFormatter(formatter)
    root_logger.addHandler(app_handler)
    
    # Error log handler (ERROR+)
    error_handler = RotatingFileHandler(
        LOG_DIR / "error.log",
        maxBytes=MAX_BYTES,
        backupCount=BACKUP_COUNT,
        encoding="utf-8",
    )
    error_handler.setLevel(logging.ERROR)
    error_handler.setFormatter(formatter)
    root_logger.addHandler(error_handler)
    
    # Access log (separate logger for HTTP traffic)
    access_logger = logging.getLogger("access")
    access_logger.setLevel(logging.INFO)
    access_logger.propagate = False  # Don't duplicate to root logger
    
    access_handler = RotatingFileHandler(
        LOG_DIR / "access.log",
        maxBytes=MAX_BYTES,
        backupCount=BACKUP_COUNT,
        encoding="utf-8",
    )
    access_handler.setFormatter(formatter)
    access_logger.addHandler(access_handler)
    
    # Frontend log (separate logger for client-side errors)
    frontend_logger = logging.getLogger("frontend")
    frontend_logger.setLevel(logging.ERROR)
    frontend_logger.propagate = False
    
    frontend_handler = RotatingFileHandler(
        LOG_DIR / "frontend.log",
        maxBytes=MAX_BYTES,
        backupCount=BACKUP_COUNT,
        encoding="utf-8",
    )
    frontend_handler.setFormatter(formatter)
    frontend_logger.addHandler(frontend_handler)
    
    # Suppress noisy third-party loggers
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)


def get_logger(name: str) -> logging.Logger:
    """
    Get a logger instance with the given name.
    
    Args:
        name: Logger name (typically __name__ of the calling module)
        
    Returns:
        Configured logger instance
    """
    return logging.getLogger(name)
