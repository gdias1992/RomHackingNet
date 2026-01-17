# Project Structure

This document outlines the organization of the RomHackingNet repository.

```text
RomHackingNet/
├── .github/              # GitHub Actions and repository-specific configurations
│   └── instructions/     # Custom project and language guidelines
├── .romhacking/         # Raw data storage for the RomHacking.net archive
│   └── romhacking.net-20240801/
│       ├── rhdn_20240801/           # Original asset files and archives
│       ├── romhacking.net-20240801_meta.sqlite # Main metadata database
│       └── romhacking.sql.zip        # Raw SQL archive dump
├── .gitignore           # Root git exclude rules
├── backend/             # Python (FastAPI) Backend
│   ├── app/             # Main application logic
│   │   ├── api/         # Route definitions (v1)
│   │   │   └── v1/      # Version 1 API endpoints
│   │   │       ├── games.py         # Game CRUD endpoints
│   │   │       ├── hacks.py         # ROM hack endpoints
│   │   │       ├── health.py        # Health check endpoint
│   │   │       ├── metadata.py      # Lookup table endpoints
│   │   │       └── translations.py  # Translation endpoints
│   │   ├── core/        # Configuration and security settings
│   │   ├── db/          # Database engine and sessions
│   │   ├── models/      # ORM / Data models
│   │   │   ├── assets.py    # Image and font models
│   │   │   ├── content.py   # Game, Hack, Translation models
│   │   │   ├── lookup.py    # Console, Genre, Language, etc.
│   │   │   └── secondary.py # Utility, Document, Homebrew models
│   │   ├── schemas/     # Pydantic validation schemas
│   │   │   ├── common.py        # Shared response schemas
│   │   │   ├── games.py         # Game request/response schemas
│   │   │   ├── hacks.py         # Hack request/response schemas
│   │   │   ├── metadata.py      # Lookup table schemas
│   │   │   └── translations.py  # Translation schemas
│   │   └── services/    # Business logic and search services
│   │       ├── game_service.py        # Game queries and filtering
│   │       ├── hack_service.py        # Hack queries and filtering
│   │       ├── health_service.py      # Health check logic
│   │       ├── metadata_service.py    # Cached lookup data
│   │       └── translation_service.py # Translation queries
│   ├── .gitignore       # Backend-specific git exclude rules
│   ├── main.py          # Application entry point
│   └── requirements.txt # Python dependencies
├── frontend/            # React + Vite Frontend
│   ├── src/             # Application source code
│   │   ├── api/         # Network client and type definitions
│   │   │   ├── client.ts  # Axios client configuration
│   │   │   └── types.ts   # TypeScript interfaces for API
│   │   ├── components/  # Shared UI components
│   │   ├── features/    # Business modules (ROM explorer, etc.)
│   │   ├── hooks/       # Custom React hooks
│   │   │   ├── useGames.ts        # Game data fetching
│   │   │   ├── useHacks.ts        # Hack data fetching
│   │   │   ├── useHealth.ts       # Health check hook
│   │   │   ├── useMetadata.ts     # Cached metadata hooks
│   │   │   └── useTranslations.ts # Translation data fetching
│   │   ├── pages/       # Page-level containers
│   │   └── utils/       # Utility functions and formatters
│   ├── .gitignore       # Frontend-specific git exclude rules
│   ├── index.html       # Application entry point
│   ├── package.json     # Node dependencies
│   └── vite.config.ts   # Vite build configuration
├── scripts/             # Utility scripts
│   ├── Run-ApiTests.ps1 # PowerShell script to run API tests
│   └── test_api.py      # Python API test script
├── README.md            # General project overview
├── STRUCTURE.md         # Directory map and documentation
├── TECHNOLOGIES.md      # Detailed technology stack specification
└── RomHackingNet.postman_collection.json  # Postman collection for all endpoints


```

## Component Breakdown

### `.github/`
Holds project-level metadata, including specialized instructions for AI coding assistants and GitHub Actions.

### `.romhacking/`
Reserved exclusively for storing the 2024 RomHacking.net end-of-life data backup. This directory is used solely for storage and as the read-only data source for the application. It is ignored by Git due to its massive size.

### `backend/`
A modular Python backend using **FastAPI**.

#### `app/` (Main logic)
- **`api/`**: Contains the REST API route handlers. Organized by version (e.g., `v1/`) to allow for future updates without breaking the frontend.
- **`core/`**: Global configuration settings. This is where `.env` variables are loaded, and shared constants or security/authentication logic reside.
- **`db/`**: Handles the database lifecycle. It contains the logic for creating the engine and providing database sessions to the rest of the app.
- **`models/`**: SQLModel ORM definitions for all 26 database tables, organized by purpose:
  - `lookup.py`: Reference tables (Console, Genre, Language, PatchStatus, etc.)
  - `content.py`: Core content (Game, Hack, Translation)
  - `secondary.py`: Secondary content (Utility, Document, Homebrew)
  - `assets.py`: Media and misc (HackImage, TransImage, Font, Abandoned)
- **`schemas/`**: Pydantic models used for API validation:
  - Request parameter schemas for filtering and pagination
  - Response schemas with resolved foreign key names
  - Generic pagination wrapper
- **`services/`**: Business logic layer with async database operations:
  - `metadata_service.py`: Cached lookup tables
  - `game_service.py`: Game queries with filters
  - `hack_service.py`: ROM hack queries with related data
  - `translation_service.py`: Translation queries with language/status info

### `frontend/`
A modern React application built with **Vite**.

#### Key Modules
- **`src/api/`**: Axios client configuration and TypeScript type definitions for all API responses
- **`src/hooks/`**: TanStack Query hooks for data fetching with caching:
  - `useMetadata.ts`: Cached metadata (consoles, genres, languages)
  - `useGames.ts`: Game list and detail queries
  - `useHacks.ts`: ROM hack queries with filtering
  - `useTranslations.ts`: Translation queries with language/status
- **`src/features/`**: Follows a modular architecture where UI and logic are grouped by domain
- **Performance**: Optimized for fast local browsing of large datasets with TanStack Query caching

### `scripts/`
Utility scripts for development and testing:
- **`test_api.py`**: Python script that runs automated tests against all API endpoints
- **`Run-ApiTests.ps1`**: PowerShell wrapper to activate the virtual environment and run tests

