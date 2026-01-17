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
├── backend/             # Python (FastAPI) Backend
│   ├── app/             # API routes and logic
│   └── main.py          # Application entry point
├── frontend/            # React + Vite Frontend
│   ├── src/             # Components, pages, and assets
│   └── index.html       # Entry point for the React app
├── README.md            # General project overview
└── STRUCTURE.md         # Directory map and documentation
```

## Component Breakdown

### `.github/`
Holds project-level metadata, including specialized instructions for AI coding assistants and GitHub Actions.

### `.romhacking/`
Reserved for the massive 2024 data backup. This folder is ignored by Git to keep the repository lightweight, but it is the primary source of data for the application.

### `backend/`
The Python backend. It handles all database connections (SQLite/MySQL) and serves JSON data to the frontend via a REST API.

### `frontend/`
The React frontend. It focuses on performance and ease of use, allowing for instantaneous filtering and browsing of the ROM hacking archive.
