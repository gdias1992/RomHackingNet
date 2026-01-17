"""
Frontend logging endpoint.
Receives error reports from the React application.
"""

from fastapi import APIRouter, status
from pydantic import BaseModel, Field
import logging

router = APIRouter(prefix="/logs", tags=["Logging"])

# Get the frontend logger
frontend_logger = logging.getLogger("frontend")


class FrontendLogEntry(BaseModel):
    """Schema for frontend log entries."""
    
    level: str = Field(
        ...,
        description="Log level (info, warn, error)",
        pattern="^(info|warn|error)$",
    )
    message: str = Field(..., description="Error message")
    stack: str | None = Field(None, description="Stack trace if available")
    url: str | None = Field(None, description="URL where error occurred")
    user_agent: str | None = Field(None, alias="userAgent", description="Browser user agent")
    timestamp: str | None = Field(None, description="Client-side timestamp")


class LogResponse(BaseModel):
    """Response schema for log submission."""
    
    status: str = "received"


@router.post(
    "",
    response_model=LogResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit frontend log",
    description="Receives error reports from the React frontend application.",
)
async def submit_frontend_log(entry: FrontendLogEntry) -> LogResponse:
    """
    Accept and store a frontend log entry.
    
    Args:
        entry: The log entry from the frontend
        
    Returns:
        Confirmation that the log was received
    """
    # Build log context
    context_parts = []
    if entry.url:
        context_parts.append(f"url={entry.url}")
    if entry.user_agent:
        # Truncate user agent to avoid overly long logs
        ua_short = entry.user_agent[:100] + "..." if len(entry.user_agent) > 100 else entry.user_agent
        context_parts.append(f"ua={ua_short}")
    if entry.timestamp:
        context_parts.append(f"client_time={entry.timestamp}")
    
    context = " | ".join(context_parts) if context_parts else "no-context"
    
    # Format the log message
    log_message = f"{entry.message} [{context}]"
    if entry.stack:
        log_message += f"\nStack trace:\n{entry.stack}"
    
    # Log based on level
    if entry.level == "error":
        frontend_logger.error(log_message)
    elif entry.level == "warn":
        frontend_logger.warning(log_message)
    else:
        frontend_logger.info(log_message)
    
    return LogResponse()
