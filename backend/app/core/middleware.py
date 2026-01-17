"""
HTTP logging middleware for tracking request/response metrics.

Logs all HTTP traffic to access.log with method, path, status, and latency.
"""

import time
import logging
from collections.abc import Callable, Awaitable

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

# Get the access logger
access_logger = logging.getLogger("access")


class LoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware that logs HTTP request/response details.
    
    Captures:
    - HTTP method
    - Request path
    - Response status code
    - Request latency in milliseconds
    """
    
    async def dispatch(
        self, request: Request, call_next: Callable[[Request], Awaitable[Response]]
    ) -> Response:
        """
        Process the request and log access information.
        
        Args:
            request: The incoming HTTP request
            call_next: The next middleware/route handler
            
        Returns:
            The HTTP response
        """
        start_time = time.perf_counter()
        
        # Process the request
        response = await call_next(request)
        
        # Calculate latency
        latency_ms = (time.perf_counter() - start_time) * 1000
        
        # Build log message
        client_host = request.client.host if request.client else "unknown"
        log_message = (
            f"{request.method} {request.url.path} "
            f"{response.status_code} {latency_ms:.0f}ms "
            f"[{client_host}]"
        )
        
        # Log based on status code
        if response.status_code >= 500:
            access_logger.error(log_message)
        elif response.status_code >= 400:
            access_logger.warning(log_message)
        else:
            access_logger.info(log_message)
        
        return response
