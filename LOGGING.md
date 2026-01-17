# 📋 Logging Standards

This document defines the logging architecture and standards for the RomHacking.net Archive Explorer.

## 🎯 Objectives

- **Centralized Storage**: All logs (Backend & Frontend) stored in `backend/logs/` for easy local access.
- **Categorization**: Separation between general application flow, critical errors, and frontend issues.
- **Maintainability**: Automated log rotation to prevent storage exhaustion.
- **Visibility**: Clear formatting with timestamps and contextual metadata.

---

## 🖥️ Backend Logging

The backend uses Python's built-in `logging` module with custom configuration.

### 📁 Log Files

All logs reside in `backend/logs/` (ignored by Git).

| File | Level | Description |
| :--- | :--- | :--- |
| `app.log` | `INFO+` | General runtime logs, startup sequence, and business logic events. |
| `error.log` | `ERROR+` | Unhandled exceptions and critical failures (e.g., database connection loss). |
| `access.log` | `INFO` | HTTP request/response details (Method, URL, Status, Latency). |
| `frontend.log` | `ERROR` | Forwarded errors from the React application via `/api/v1/logs`. |

### ⚙️ Configuration

Located in `backend/app/core/logging_config.py`:

```python
# Key settings
LOG_DIR = "logs"
MAX_BYTES = 10 * 1024 * 1024  # 10MB per file
BACKUP_COUNT = 5              # Keep 5 rotated files
LOG_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"
```

### 🔄 Rotating Handlers

- **`RotatingFileHandler`**: 10MB limit per file, 5-file retention policy.
- Prevents unbounded log growth in long-running local environments.

### 📡 Middleware

`LoggingMiddleware` intercepts every HTTP request:

```python
# Logged to access.log
2026-01-17 10:30:45 | INFO     | access | GET /api/v1/games 200 45ms
2026-01-17 10:30:46 | INFO     | access | GET /api/v1/hacks?page=2 200 32ms
```

### 🚨 Exception Handling

Global exception handler catches unhandled `500` errors:

```python
# Logged to error.log with full traceback
2026-01-17 10:31:00 | ERROR    | app | Unhandled exception in /api/v1/games/999
Traceback (most recent call last):
  File "...", line XX, in ...
    ...
sqlalchemy.exc.NoResultFound: No row was found
```

### 📝 Usage in Services

```python
import logging

logger = logging.getLogger(__name__)

async def get_game_by_id(game_id: int) -> Game:
    logger.info(f"Fetching game with ID: {game_id}")
    # ... business logic
    logger.error(f"Game not found: {game_id}")
```

---

## ⚛️ Frontend Logging

The frontend uses a centralized logger utility that forwards errors to the backend.

### 🛠️ Components

| File | Purpose |
| :--- | :--- |
| `src/utils/logger.ts` | Logger utility with `info`, `warn`, `error` methods. |
| `src/components/ErrorBoundary.tsx` | React error boundary for catching UI crashes. |

### 📤 Remote Logging

Frontend errors are sent to `POST /api/v1/logs`:

```typescript
// Request payload
{
  "level": "error",
  "message": "TypeError: Cannot read property 'name' of undefined",
  "stack": "TypeError: Cannot read property...\n    at GameCard (GameCard.tsx:25)",
  "url": "/games/123",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2026-01-17T10:32:00.000Z"
}
```

### 🔄 Error Boundary Flow

1. **React Runtime Error** → `ErrorBoundary` catches it.
2. **Logger Utility** → Forwards error, stack trace, and current URL to `/api/v1/logs`.
3. **Backend API** → Validates and writes to `logs/frontend.log`.
4. **Fallback UI** → User sees a friendly error message with recovery options.

### 📝 Usage in Components

```typescript
import { logger } from '@/utils/logger';

// Informational (console only in dev)
logger.info('Game list loaded', { count: games.length });

// Warning (console only)
logger.warn('Deprecated API response format detected');

// Error (sent to backend)
logger.error('Failed to load game details', error);
```

---

## 🔒 Security & Privacy

- **No PII**: User environment variables or sensitive inputs are never logged.
- **Masking**: Sensitive config values (e.g., `database_password`) are filtered from logs.
- **Local Only**: All logs remain on the local machine; no external transmission.

---

## 📁 Directory Structure

```
backend/
├── logs/                    # Log files (Git-ignored)
│   ├── app.log              # Application events
│   ├── error.log            # Errors and exceptions
│   ├── access.log           # HTTP request logs
│   └── frontend.log         # Frontend error reports
└── app/
    └── core/
        └── logging_config.py  # Logging configuration

frontend/
└── src/
    ├── utils/
    │   └── logger.ts        # Logger utility
    └── components/
        └── ErrorBoundary.tsx  # Error boundary component
```

---

## 🧹 Maintenance

- **Log Rotation**: Automatic via `RotatingFileHandler` (10MB × 5 files = 50MB max per log type).
- **Manual Cleanup**: Safe to delete contents of `backend/logs/` at any time.
- **Git Ignore**: `backend/logs/` is excluded from version control.
