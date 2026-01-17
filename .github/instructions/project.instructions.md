---
applyTo: '**'
---

# 📜 Project Guidelines

This repository follows a strict organizational structure to ensure scalability and ease of use in a local environment.

## 📚 Documentation Standards
- **README.md**: Must be updated whenever there are changes to the project's high-level description, tech stack, or setup procedures. Reference: [README.md](../../README.md)
- **STRUCTURE.md**: Serves as the primary map for the repository. Any new directories or significant architectural shifts must be documented here immediately. Reference: [STRUCTURE.md](../../STRUCTURE.md)

## 🛠️ Technology & Architecture
- **Backend (Python/FastAPI)**: Adhere to the modular structure (`api`, `core`, `db`, `models`, `schemas`, `services`) defined in the structure guide.
- **Frontend (React/Vite)**: Adhere to the feature-based structure (`api`, `components`, `features`, `hooks`, `pages`, `utils`).

## 💾 Data Management
- **.romhacking/**: This directory is dedicated exclusively to storing the official RomHacking.net end-of-life data backup.
- **Access Policy**: The application should treat this directory as a read-only data source. No application logic should modify the contents of this folder.
- **Git Safety**: Ensure that these large datasets are never committed to the repository by maintaining the root `.gitignore`.
