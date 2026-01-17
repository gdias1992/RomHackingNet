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
│   │   ├── core/        # Configuration and security settings
│   │   ├── db/          # Database engine and sessions
│   │   ├── models/      # ORM / Data models
│   │   ├── schemas/     # Pydantic validation schemas
│   │   └── services/    # Business logic and search services
│   ├── .gitignore       # Backend-specific git exclude rules
│   ├── main.py          # Application entry point
│   └── requirements.txt # Python dependencies
├── frontend/            # React + Vite Frontend
│   ├── src/             # Application source code
│   │   ├── api/         # Network client instances
│   │   ├── components/  # Shared UI components
│   │   ├── features/    # Business modules (ROM explorer, etc.)
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page-level containers
│   │   └── utils/       # Utility functions and formatters
│   ├── .gitignore       # Frontend-specific git exclude rules
│   ├── index.html       # Application entry point
│   ├── package.json     # Node dependencies
│   └── vite.config.ts   # Vite build configuration
├── README.md            # General project overview
└── STRUCTURE.md         # Directory map and documentation
```

## Component Breakdown

### `.github/`
Holds project-level metadata, including specialized instructions for AI coding assistants and GitHub Actions.

### `.romhacking/`
Reserved for the massive 2024 data backup. This folder is ignored by Git to keep the repository lightweight, but it is the primary source of data for the application.

### `backend/`
A modular Python backend using **FastAPI**.

#### `app/` (Main logic)
- **`api/`**: Contains the REST API route handlers. Organized by version (e.g., `v1/`) to allow for future updates without breaking the frontend.
- **`core/`**: Global configuration settings. This is where `.env` variables are loaded, and shared constants or security/authentication logic reside.
- **`db/`**: Handles the database lifecycle. It contains the logic for creating the engine and providing database sessions to the rest of the app.
- **`models/`**: SQL database models (SQLAlchemy/SQLModel). These define the actual structure of the tables in your SQLite or MySQL database.
- **`schemas/`**: Pydantic models used for data validation. They define exactly what data the API expects to receive and what it promises to return.
- **`services/`**: The "brain" of the application. All complex search logic, filtering of ROM hacks, and data processing happens here, keeping the `api` routes clean.

### `frontend/`
A modern React application built with **Vite**.
- **`src/features/`**: Follows a modular architecture where UI and logic are grouped by domain (e.g., `rom-explorer`).
- **Performance**: Optimized for fast local browsing of large datasets.
