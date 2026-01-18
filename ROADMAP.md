# 🗺️ Project Roadmap

This document tracks all tasks required to complete the RomHacking.net Archive Explorer.

> **Format Reference:** Each roadmap item **must** follow the exact format defined in [ROADMAP_ITEM_TEMPLATE.md](ROADMAP_ITEM_TEMPLATE.md).  
> When adding new items, copy the template and fill in all fields.

> **⚠️ Maintenance Policy:** This roadmap **must** be updated upon completion of every task. Mark items as `done`, fill in the completion date, and update the Progress Overview table accordingly.

---

## 📊 Progress Overview

| Area | Completed | In Progress | Pending | Total |
|------|-----------|-------------|---------|-------|
| Backend | 8 | 0 | 9 | 17 |
| Frontend | 8 | 0 | 7 | 15 |
| Infrastructure | 1 | 0 | 3 | 4 |
| Documentation | 4 | 0 | 1 | 5 |

## 📋 Priority Legend

| Symbol | Level | Meaning |
|--------|-------|---------|
| 🔺 | High | Blocking functionality, needed for core features |
| 🔸 | Medium | Important for completeness, not blocking |
| 🔻 | Low | Nice to have, polish items |

## 🗂️ Task Index

| ID | Task | Area | Status | Priority |
|----|------|------|--------|----------|
| [ITEM-001](#-item-001-core-fastapi-setup) | Core FastAPI Setup | `backend` | 🟢 `done` | 🔺 |
| [ITEM-002](#-item-002-games-api) | Games API | `backend` | 🟢 `done` | 🔺 |
| [ITEM-003](#-item-003-hacks-api) | Hacks API | `backend` | 🟢 `done` | 🔺 |
| [ITEM-004](#-item-004-translations-api) | Translations API | `backend` | 🟢 `done` | 🔺 |
| [ITEM-005](#-item-005-metadata-api) | Metadata API | `backend` | 🟢 `done` | 🔸 |
| [ITEM-006](#-item-006-react-project-scaffolding) | React Project Scaffolding | `frontend` | 🟢 `done` | 🔺 |
| [ITEM-007](#-item-007-dashboard-page) | Dashboard Page | `frontend` | 🟢 `done` | 🔸 |
| [ITEM-008](#-item-008-games-pages) | Games Pages | `frontend` | 🟢 `done` | 🔺 |
| [ITEM-009](#-item-009-hacks-pages) | Hacks Pages | `frontend` | 🟢 `done` | 🔺 |
| [ITEM-010](#-item-010-translations-pages) | Translations Pages | `frontend` | 🟢 `done` | 🔺 |
| [ITEM-011](#-item-011-logging-architecture) | Logging Architecture | `infrastructure` | 🟢 `done` | 🔸 |
| [ITEM-012](#-item-012-readme-documentation) | README Documentation | `docs` | 🟢 `done` | 🔸 |
| [ITEM-013](#-item-013-structuremd) | STRUCTURE.md | `docs` | 🟢 `done` | 🔸 |
| [ITEM-014](#-item-014-technologiesmd) | TECHNOLOGIES.md | `docs` | 🟢 `done` | 🔻 |
| [ITEM-015](#-item-015-loggingmd) | LOGGING.md | `docs` | 🟢 `done` | 🔻 |
| [ITEM-020](#-item-020-utilities-api) | Utilities API | `backend` | � `done` | 🔸 |
| [ITEM-021](#-item-021-documents-api) | Documents API | `backend` | 🟢 `done` | 🔸 |
| [ITEM-022](#-item-022-homebrew-api) | Homebrew API | `backend` | 🟢 `done` | 🔸 |
| [ITEM-023](#-item-023-fonts-api) | Fonts API | `backend` | 🔴 `pending` | 🔻 |
| [ITEM-024](#-item-024-extended-metadata-api) | Extended Metadata API | `backend` | 🔴 `pending` | 🔻 |
| [ITEM-025](#-item-025-sync-game-model) | Sync Game Model | `backend` | 🔴 `pending` | 🔸 |
| [ITEM-026](#-item-026-sync-hack-model) | Sync Hack Model | `backend` | 🔴 `pending` | 🔸 |
| [ITEM-027](#-item-027-sync-translation-model) | Sync Translation Model | `backend` | 🔴 `pending` | 🔸 |
| [ITEM-028](#-item-028-sync-secondary-models) | Sync Secondary Models | `backend` | 🔴 `pending` | 🔻 |
| [ITEM-030](#-item-030-static-file-serving) | Static File Serving | `backend` | 🔴 `pending` | 🔺 |
| [ITEM-031](#-item-031-download-endpoint) | Download Endpoint | `backend` | 🔴 `pending` | 🔺 |
| [ITEM-040](#-item-040-global-search-endpoint) | Global Search Endpoint | `backend` | 🔴 `pending` | 🔸 |
| [ITEM-041](#-item-041-advanced-filtering) | Advanced Filtering | `backend` | 🔴 `pending` | 🔻 |
| [ITEM-050](#-item-050-utilities-page) | Utilities Page | `frontend` | � `done` | 🔸 |
| [ITEM-051](#-item-051-documents-page) | Documents Page | `frontend` | 🟢 `done` | 🔸 |
| [ITEM-052](#-item-052-homebrew-page) | Homebrew Page | `frontend` | 🟢 `done` | 🔸 |
| [ITEM-053](#-item-053-fonts-page) | Fonts Page | `frontend` | 🔴 `pending` | 🔻 |
| [ITEM-060](#-item-060-functional-download-buttons) | Functional Download Buttons | `frontend` | 🔴 `pending` | 🔺 |
| [ITEM-061](#-item-061-file-preview) | File Preview | `frontend` | 🔴 `pending` | 🔻 |
| [ITEM-070](#-item-070-global-search-ui) | Global Search UI | `frontend` | 🔴 `pending` | 🔸 |
| [ITEM-071](#-item-071-dashboard-stats-completion) | Dashboard Stats Completion | `frontend` | 🔴 `pending` | 🔻 |
| [ITEM-080](#-item-080-image-error-handling) | Image Error Handling | `frontend` | 🔴 `pending` | 🔻 |
| [ITEM-081](#-item-081-mobile-navigation) | Mobile Navigation | `frontend` | 🔴 `pending` | 🔻 |
| [ITEM-090](#-item-090-cdn-path-configuration) | CDN Path Configuration | `infrastructure` | 🔴 `pending` | 🔺 |
| [ITEM-091](#-item-091-docker-compose-setup) | Docker Compose Setup | `infrastructure` | 🔴 `pending` | 🔻 |
| [ITEM-092](#-item-092-api-testing-suite) | API Testing Suite | `infrastructure` | 🔴 `pending` | 🔸 |
| [ITEM-100](#-item-100-cdn-structure-documentation) | CDN Structure Documentation | `docs` | 🔴 `pending` | 🔸 |

---

# ✅ Completed Items

---

## 🆔 [ITEM-001] Core FastAPI Setup

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🟢 `done` |
| **Priority** | 🔺 `high` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-01 |
| **Completed** | 2026-01-10 |

### 📝 Description
Set up the core FastAPI application with health endpoint, CORS configuration, and basic project structure.

### ✅ Subtasks
- [x] Initialize FastAPI application
- [x] Configure CORS middleware
- [x] Create health check endpoint
- [x] Set up database session management

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-10**
| What | Files | Outcome |
|------|-------|---------|
| FastAPI app with health endpoint | `backend/main.py`, `backend/app/api/v1/health.py` | API running at localhost:8000 |

---

## 🆔 [ITEM-002] Games API

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🟢 `done` |
| **Priority** | 🔺 `high` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-10 |
| **Completed** | 2026-01-12 |

### 📝 Description
Create Games API with filtering, pagination, and detail view endpoints.

### ✅ Subtasks
- [x] Create Game model
- [x] Create game service with filtering logic
- [x] Create list endpoint with pagination
- [x] Create detail endpoint

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-12**
| What | Files | Outcome |
|------|-------|---------|
| Games CRUD endpoints | `backend/app/api/v1/games.py`, `backend/app/services/game_service.py` | `/api/v1/games` working |

---

## 🆔 [ITEM-003] Hacks API

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🟢 `done` |
| **Priority** | 🔺 `high` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-12 |
| **Completed** | 2026-01-14 |

### 📝 Description
Create Hacks API with filtering, pagination, images, and detail view endpoints.

### ✅ Subtasks
- [x] Create Hack and HackImage models
- [x] Create hack service with filtering logic
- [x] Create list endpoint with pagination
- [x] Create detail endpoint
- [x] Create images endpoint

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-14**
| What | Files | Outcome |
|------|-------|---------|
| Hacks CRUD + images | `backend/app/api/v1/hacks.py`, `backend/app/services/hack_service.py` | `/api/v1/hacks` working |

---

## 🆔 [ITEM-004] Translations API

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🟢 `done` |
| **Priority** | 🔺 `high` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-14 |
| **Completed** | 2026-01-15 |

### 📝 Description
Create Translations API with language/status filters and detail view.

### ✅ Subtasks
- [x] Create Translation and TransImage models
- [x] Create translation service
- [x] Create list endpoint with language/status filters
- [x] Create detail endpoint

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-15**
| What | Files | Outcome |
|------|-------|---------|
| Translations CRUD | `backend/app/api/v1/translations.py`, `backend/app/services/translation_service.py` | `/api/v1/translations` working |

---

## 🆔 [ITEM-005] Metadata API

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🟢 `done` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-15 |
| **Completed** | 2026-01-15 |

### 📝 Description
Create Metadata API for lookup tables (consoles, genres, languages, categories).

### ✅ Subtasks
- [x] Create lookup models
- [x] Create metadata service with caching
- [x] Create combined metadata endpoint

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-15**
| What | Files | Outcome |
|------|-------|---------|
| Metadata endpoint | `backend/app/api/v1/metadata.py`, `backend/app/services/metadata_service.py` | `/api/v1/metadata` cached |

---

## 🆔 [ITEM-006] React Project Scaffolding

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | 🟢 `done` |
| **Priority** | 🔺 `high` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-10 |
| **Completed** | 2026-01-11 |

### 📝 Description
Set up React + Vite project with Tailwind CSS and Shadcn/UI components.

### ✅ Subtasks
- [x] Initialize Vite + React + TypeScript
- [x] Configure Tailwind CSS
- [x] Install and configure Shadcn/UI
- [x] Set up folder structure

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-11**
| What | Files | Outcome |
|------|-------|---------|
| Project scaffolding | `frontend/` directory | Vite dev server running |

---

## 🆔 [ITEM-007] Dashboard Page

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | 🟢 `done` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-12 |
| **Completed** | 2026-01-13 |

### 📝 Description
Create dashboard page with archive stats and system status display.

### ✅ Subtasks
- [x] Create stats cards for games/hacks/translations
- [x] Create system health status display
- [x] Create metadata overview
- [x] Create quick access links

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-13**
| What | Files | Outcome |
|------|-------|---------|
| Dashboard UI | `frontend/src/pages/DashboardPage.tsx` | Stats and status visible |

---

## 🆔 [ITEM-008] Games Pages

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | 🟢 `done` |
| **Priority** | 🔺 `high` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-13 |
| **Completed** | 2026-01-14 |

### 📝 Description
Create games list and detail pages with filtering capabilities.

### ✅ Subtasks
- [x] Create GamesPage with list view
- [x] Create GameDetailPage
- [x] Implement useGames hook
- [x] Add platform/genre filters

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-14**
| What | Files | Outcome |
|------|-------|---------|
| Games UI | `frontend/src/pages/GamesPage.tsx`, `GameDetailPage.tsx` | Browse and view games |

---

## 🆔 [ITEM-009] Hacks Pages

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | 🟢 `done` |
| **Priority** | 🔺 `high` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-14 |
| **Completed** | 2026-01-15 |

### 📝 Description
Create hacks list and detail pages with screenshot gallery.

### ✅ Subtasks
- [x] Create HacksPage with list view
- [x] Create HackDetailPage with screenshots
- [x] Implement useHacks hook
- [x] Add category/console filters

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-15**
| What | Files | Outcome |
|------|-------|---------|
| Hacks UI | `frontend/src/pages/HacksPage.tsx`, `HackDetailPage.tsx` | Browse hacks with screenshots |

---

## 🆔 [ITEM-010] Translations Pages

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | 🟢 `done` |
| **Priority** | 🔺 `high` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-15 |
| **Completed** | 2026-01-16 |

### 📝 Description
Create translations list and detail pages.

### ✅ Subtasks
- [x] Create TranslationsPage with list view
- [x] Create TranslationDetailPage
- [x] Implement useTranslations hook
- [x] Add language/status filters

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-16**
| What | Files | Outcome |
|------|-------|---------|
| Translations UI | `frontend/src/pages/TranslationsPage.tsx`, `TranslationDetailPage.tsx` | Browse translations |

---

## 🆔 [ITEM-011] Logging Architecture

| Field | Value |
|-------|-------|
| **Area** | `infrastructure` |
| **Status** | 🟢 `done` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-16 |
| **Completed** | 2026-01-17 |

### 📝 Description
Implement logging architecture with backend logs and frontend error forwarding.

### ✅ Subtasks
- [x] Configure Python logging with rotation
- [x] Create access/error/app log handlers
- [x] Create frontend logger utility
- [x] Create frontend error forwarding endpoint

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-17**
| What | Files | Outcome |
|------|-------|---------|
| Logging system | `backend/app/core/logging_config.py`, `frontend/src/utils/logger.ts` | Logs in `backend/logs/` |

---

## 🆔 [ITEM-012] README Documentation

| Field | Value |
|-------|-------|
| **Area** | `docs` |
| **Status** | 🟢 `done` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-01 |
| **Completed** | 2026-01-10 |

### 📝 Description
Create README with setup instructions and project overview.

### ✅ Subtasks
- [x] Write project description
- [x] Document prerequisites
- [x] Write installation steps
- [x] Document running instructions

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-10**
| What | Files | Outcome |
|------|-------|---------|
| Project README | `README.md` | Setup documented |

---

## 🆔 [ITEM-013] STRUCTURE.md

| Field | Value |
|-------|-------|
| **Area** | `docs` |
| **Status** | 🟢 `done` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-10 |
| **Completed** | 2026-01-15 |

### 📝 Description
Document project structure and directory layout.

### ✅ Subtasks
- [x] Create directory tree
- [x] Document each component
- [x] Explain architecture patterns

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-15**
| What | Files | Outcome |
|------|-------|---------|
| Structure docs | `STRUCTURE.md` | Layout documented |

---

## 🆔 [ITEM-014] TECHNOLOGIES.md

| Field | Value |
|-------|-------|
| **Area** | `docs` |
| **Status** | 🟢 `done` |
| **Priority** | 🔻 `low` |
| **Created** | 2026-01-01 |
| **Started** | 2026-01-10 |
| **Completed** | 2026-01-10 |

### 📝 Description
Document technology stack specification.

### ✅ Subtasks
- [x] List backend technologies
- [x] List frontend technologies
- [x] Document tools and standards

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-10**
| What | Files | Outcome |
|------|-------|---------|
| Tech stack docs | `TECHNOLOGIES.md` | Stack documented |

---

## 🆔 [ITEM-015] LOGGING.md

| Field | Value |
|-------|-------|
| **Area** | `docs` |
| **Status** | 🟢 `done` |
| **Priority** | 🔻 `low` |
| **Created** | 2026-01-17 |
| **Started** | 2026-01-17 |
| **Completed** | 2026-01-17 |

### 📝 Description
Document logging architecture and standards.

### ✅ Subtasks
- [x] Document backend logging
- [x] Document frontend logging
- [x] Document log file structure

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-17**
| What | Files | Outcome |
|------|-------|---------|
| Logging docs | `LOGGING.md` | Standards documented |

---

# 🔴 Pending Items

---

## 🆔 [ITEM-020] Utilities API

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | � `done` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | 2026-01-18 |
| **Completed** | 2026-01-18 |

### 📝 Description
Create `/api/v1/utilities` endpoints with list, detail, and filtering by category, console, OS. Models exist in `secondary.py`.

### ✅ Subtasks
- [x] Create utility service
- [x] Create list endpoint with filters
- [x] Create detail endpoint
- [x] Add to router

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-18**
| What | Files | Outcome |
|------|-------|---------|
| Utilities CRUD endpoints | `backend/app/api/v1/utilities.py`, `backend/app/services/utility_service.py`, `backend/app/schemas/utilities.py` | `/api/v1/utilities` working |

---

## 🆔 [ITEM-021] Documents API

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | � `done` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | 2026-01-18 |
| **Completed** | 2026-01-18 |

### 📝 Description
Create `/api/v1/documents` endpoints with list, detail, and filtering by category, console, skill level. Models exist in `secondary.py`.

### ✅ Subtasks
- [x] Create document service
- [x] Create list endpoint with filters
- [x] Create detail endpoint
- [x] Add to router

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-18**
| What | Files | Outcome |
|------|-------|---------|
| Documents CRUD endpoints | `backend/app/api/v1/documents.py`, `backend/app/services/document_service.py`, `backend/app/schemas/documents.py` | `/api/v1/documents` working |

---

## 🆔 [ITEM-022] Homebrew API

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | � `done` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | 2026-01-18 |
| **Completed** | 2026-01-18 |

### 📝 Description
Create `/api/v1/homebrew` endpoints with list, detail, and filtering by category, platform. Models exist in `secondary.py`.

### ✅ Subtasks
- [x] Create homebrew service
- [x] Create list endpoint with filters
- [x] Create detail endpoint
- [x] Add to router

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-023] Fonts API

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔻 `low` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Create `/api/v1/fonts` endpoints with list, detail, and filtering by language.

### ✅ Subtasks
- [ ] Create font service
- [ ] Create list endpoint with filters
- [ ] Create detail endpoint
- [ ] Add to router

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-024] Extended Metadata API

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔻 `low` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Add metadata endpoints for `utilcat`, `homebrewcat`, `skilllevel`, `os`, `licenses` lookup tables.

### ✅ Subtasks
- [ ] Add utilcat to metadata response
- [ ] Add homebrewcat to metadata response
- [ ] Add skilllevel to metadata response
- [ ] Add os to metadata response
- [ ] Add licenses to metadata response

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-025] Sync Game Model

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Add missing fields to `Game` model to match database schema: `description`, `gamerel`, `Day/Month/Year`, `titlescreen`, `titleext`, `titlewidth`, `titleheight`, `lastmod`, `reflectexist`.

### ✅ Subtasks
- [ ] Add description field
- [ ] Add date fields (gamerel, Day, Month, Year)
- [ ] Add title screen fields
- [ ] Add lastmod timestamp
- [ ] Add reflectexist flag

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-026] Sync Hack Model

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Add missing fields to `Hack` model: `patchrelunix`, `readme`, `graphics/music/levels/text/gameplay/other` flags, `tscreen`, `origtscreen`, `rominfo`, `theme`, `license`, `source`, `youtube`.

### ✅ Subtasks
- [ ] Add patchrelunix timestamp
- [ ] Add readme field
- [ ] Add content type flags (graphics, music, levels, text, gameplay, other)
- [ ] Add tscreen and origtscreen fields
- [ ] Add rominfo, theme, license, source, youtube fields

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-027] Sync Translation Model

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Add missing fields to `Translation` model: `readme`, `readmefile`, `patchrel_unix`, `lastmod_unix`, `hasrefl`, `tscreen`, `origtscreen`, `rominfo`, `license`, `source`, `youtube`.

### ✅ Subtasks
- [ ] Add readme and readmefile fields
- [ ] Add unix timestamp fields
- [ ] Add hasrefl flag
- [ ] Add tscreen and origtscreen fields
- [ ] Add rominfo, license, source, youtube fields

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-028] Sync Secondary Models

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔻 `low` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Sync `Utility`, `Document`, `Homebrew`, `Font`, `Screenshot`, `Abandoned` models with all database columns.

### ✅ Subtasks
- [ ] Sync Utility model fields
- [ ] Sync Document model fields
- [ ] Sync Homebrew model fields
- [ ] Sync Font model fields
- [ ] Fix Screenshot primary key (imagekey not screenshotid)
- [ ] Fix Abandoned type field (int not str)

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-030] Static File Serving

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔺 `high` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Configure FastAPI to serve files from `.romhacking/cdn/` directories (hacks, translations, utilities, documents, homebrew, fonts). Map `/files/{section}/{filename}` routes.

### ✅ Subtasks
- [ ] Create file serving router
- [ ] Map section paths to CDN directories
- [ ] Add proper MIME type detection
- [ ] Handle missing files gracefully

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-031] Download Endpoint

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔺 `high` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Create download endpoint that tracks download counts and serves files with proper headers (Content-Disposition, Content-Type).

### ✅ Subtasks
- [ ] Create download endpoint per content type
- [ ] Increment download counter in database
- [ ] Set Content-Disposition header for downloads
- [ ] Set appropriate Content-Type

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-040] Global Search Endpoint

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Create `/api/v1/search` endpoint that searches across games, hacks, translations, utilities, documents, and homebrew. Return categorized results.

### ✅ Subtasks
- [ ] Create search service
- [ ] Implement FULLTEXT search across tables
- [ ] Return categorized results
- [ ] Add result limiting per category

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-041] Advanced Filtering

| Field | Value |
|-------|-------|
| **Area** | `backend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔻 `low` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Add date range filters, download count sorting, and multi-value filters (e.g., multiple consoles) to existing APIs.

### ✅ Subtasks
- [ ] Add date range filter parameters
- [ ] Add download count sorting
- [ ] Support comma-separated multi-value filters
- [ ] Apply to all content endpoints

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-050] Utilities Page

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | � `done` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | 2026-01-18 |
| **Completed** | 2026-01-18 |

### 📝 Description
Create `UtilitiesPage.tsx` and `UtilityDetailPage.tsx`. Remove "Soon" badge from navigation. Add `useUtilities` hook.

### ✅ Subtasks
- [x] Create useUtilities hook
- [x] Create UtilitiesPage with list view
- [x] Create UtilityDetailPage
- [x] Remove disabled flag from navigation
- [x] Add routes to App.tsx

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-18**
| What | Files | Outcome |
|------|-------|---------|
| Utilities frontend pages | `frontend/src/hooks/useUtilities.ts`, `frontend/src/pages/UtilitiesPage.tsx`, `frontend/src/pages/UtilityDetailPage.tsx` | Utilities list and detail views working |

---

## 🆔 [ITEM-051] Documents Page

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | � `done` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | 2026-01-18 |
| **Completed** | 2026-01-18 |

### 📝 Description
Create `DocumentsPage.tsx` and `DocumentDetailPage.tsx`. Remove "Soon" badge from navigation. Add `useDocuments` hook.

### ✅ Subtasks
- [x] Create useDocuments hook
- [x] Create DocumentsPage with list view
- [x] Create DocumentDetailPage
- [x] Remove disabled flag from navigation
- [x] Add routes to App.tsx

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-18**
| What | Files | Outcome |
|------|-------|---------|
| Documents frontend pages | `frontend/src/hooks/useDocuments.ts`, `frontend/src/pages/DocumentsPage.tsx`, `frontend/src/pages/DocumentDetailPage.tsx` | Documents list and detail views working |

---

## 🆔 [ITEM-052] Homebrew Page

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | � `done` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | 2026-01-18 |
| **Completed** | 2026-01-18 |

### 📝 Description
Create `HomebrewPage.tsx` and `HomebrewDetailPage.tsx`. Remove "Soon" badge from navigation. Add `useHomebrew` hook.

### ✅ Subtasks
- [x] Create useHomebrew hook
- [x] Create HomebrewPage with list view
- [x] Create HomebrewDetailPage
- [x] Remove disabled flag from navigation
- [x] Add routes to App.tsx

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
**2026-01-18**
| What | Files | Outcome |
|------|-------|---------|
| Homebrew frontend pages | `frontend/src/hooks/useHomebrew.ts`, `frontend/src/pages/HomebrewPage.tsx`, `frontend/src/pages/HomebrewDetailPage.tsx` | Homebrew list and detail views working |

---

## 🆔 [ITEM-053] Fonts Page

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔻 `low` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Create `FontsPage.tsx` and `FontDetailPage.tsx`. Add navigation item and `useFonts` hook.

### ✅ Subtasks
- [ ] Create useFonts hook
- [ ] Create FontsPage with list view
- [ ] Create FontDetailPage
- [ ] Add navigation item
- [ ] Add routes to App.tsx

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | Requires ITEM-023 (Fonts API) |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-060] Functional Download Buttons

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔺 `high` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Wire up download buttons on detail pages (hacks, translations, utilities, etc.) to actual file URLs from CDN. Currently buttons are non-functional.

### ✅ Subtasks
- [ ] Create download URL builder utility
- [ ] Wire HackDetailPage download button
- [ ] Wire TranslationDetailPage download button
- [ ] Wire other detail page download buttons

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | Requires ITEM-030, ITEM-031 (File Serving) |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-061] File Preview

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔻 `low` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Add README preview on detail pages where available (parse and display readme files).

### ✅ Subtasks
- [ ] Create README fetch endpoint or static serving
- [ ] Create README display component
- [ ] Integrate into detail pages
- [ ] Handle missing READMEs gracefully

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | Requires file serving infrastructure |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-070] Global Search UI

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Implement `GlobalSearch.tsx` component with typeahead, categorized results, and keyboard navigation. Wire to global search endpoint.

### ✅ Subtasks
- [ ] Create GlobalSearch component
- [ ] Implement typeahead with debounce
- [ ] Display categorized results
- [ ] Add keyboard navigation
- [ ] Integrate into MainLayout

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | Requires ITEM-040 (Global Search Endpoint) |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-071] Dashboard Stats Completion

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔻 `low` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Add utilities, documents, and homebrew counts to dashboard stats grid once APIs are available.

### ✅ Subtasks
- [ ] Add utilities stat card
- [ ] Add documents stat card
- [ ] Add homebrew stat card
- [ ] Update grid layout

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | Requires secondary content APIs |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-080] Image Error Handling

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔻 `low` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Add fallback images and error states for broken screenshot URLs.

### ✅ Subtasks
- [ ] Create fallback image asset
- [ ] Add onError handler to image components
- [ ] Display graceful fallback UI

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-081] Mobile Navigation

| Field | Value |
|-------|-------|
| **Area** | `frontend` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔻 `low` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Improve mobile sidebar behavior and add swipe gestures.

### ✅ Subtasks
- [ ] Improve sidebar toggle behavior
- [ ] Add swipe-to-open gesture
- [ ] Add swipe-to-close gesture
- [ ] Test on various screen sizes

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-090] CDN Path Configuration

| Field | Value |
|-------|-------|
| **Area** | `infrastructure` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔺 `high` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Add environment variable for CDN root path (`.romhacking/cdn/`). Ensure path mapping works for all content types.

### ✅ Subtasks
- [ ] Add CDN_ROOT to config.py
- [ ] Add to .env.example
- [ ] Create path mapping for each content type
- [ ] Validate paths on startup

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-091] Docker Compose Setup

| Field | Value |
|-------|-------|
| **Area** | `infrastructure` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔻 `low` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Create `docker-compose.yml` for one-command local deployment (MySQL, backend, frontend).

### ✅ Subtasks
- [ ] Create backend Dockerfile
- [ ] Create frontend Dockerfile
- [ ] Create docker-compose.yml
- [ ] Document usage in README

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-092] API Testing Suite

| Field | Value |
|-------|-------|
| **Area** | `infrastructure` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Expand `scripts/test_api.py` to cover new endpoints (utilities, documents, homebrew, downloads).

### ✅ Subtasks
- [ ] Add utilities endpoint tests
- [ ] Add documents endpoint tests
- [ ] Add homebrew endpoint tests
- [ ] Add download endpoint tests
- [ ] Add search endpoint tests

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | Requires new endpoints to be implemented |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

## 🆔 [ITEM-100] CDN Structure Documentation

| Field | Value |
|-------|-------|
| **Area** | `docs` |
| **Status** | 🔴 `pending` |
| **Priority** | 🔸 `medium` |
| **Created** | 2026-01-18 |
| **Started** | — |
| **Completed** | — |

### 📝 Description
Document the `.romhacking/cdn/` directory structure and file organization for each content type.

### ✅ Subtasks
- [ ] Document directory structure
- [ ] Document file naming conventions
- [ ] Document content type mappings
- [ ] Add to STRUCTURE.md or create CDN.md

### 🚧 In Progress
| Aspect | Details |
|--------|---------|
| **Focus** | — |
| **Blockers** | — |
| **Decisions** | — |
| **Notes** | — |

### ✔️ Completed
| What | Files | Outcome |
|------|-------|---------|
| — | — | — |

---

# 🎯 Suggested Implementation Order

## Phase 1: File Downloads (Critical Path)
1. **ITEM-090** CDN Path Configuration
2. **ITEM-030** Static File Serving
3. **ITEM-031** Download Endpoint
4. **ITEM-060** Functional Download Buttons

## Phase 2: Model Schema Sync
1. **ITEM-025** Sync Game Model
2. **ITEM-026** Sync Hack Model
3. **ITEM-027** Sync Translation Model
4. **ITEM-028** Sync Secondary Models

## Phase 3: Secondary Content
1. **ITEM-020** Utilities API
2. **ITEM-050** Utilities Page
3. **ITEM-021** Documents API
4. **ITEM-051** Documents Page
5. **ITEM-022** Homebrew API
6. **ITEM-052** Homebrew Page

## Phase 4: Search & Discovery
1. **ITEM-040** Global Search Endpoint
2. **ITEM-070** Global Search UI

## Phase 5: Polish
1. Remaining low-priority items
