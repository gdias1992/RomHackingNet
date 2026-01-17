---
applyTo: '**'
---

# 📜 Project Guidelines

This repository follows a strict organizational structure to ensure scalability and ease of use in a local environment.

## 📚 General Standards
- **Maintenance Policy**: Any core project document (README, STRUCTURE, TECHNOLOGIES) must be updated whenever changes occur in the project's scope, architecture, or tools.

## 📝 Core Documentation
- **README.md**: High-level project description, tech stack overview, and setup procedures. Reference: [README.md](../../README.md)
- **STRUCTURE.md**: The primary map for the repository. Documents all directories and architectural patterns. Reference: [STRUCTURE.md](../../STRUCTURE.md)
- **TECHNOLOGIES.md**: Detailed specification of all major libraries, frameworks, and tools used. Reference: [TECHNOLOGIES.md](../../TECHNOLOGIES.md)
- **LOGGING.md**: Logging architecture and standards for backend and frontend. Reference: [LOGGING.md](../../LOGGING.md)

## 📊 Data Management
- **.romhacking/**: This directory is dedicated exclusively to storing the official RomHacking.net end-of-life data backup.
- **Access Policy**: The application should treat this directory as a read-only data source.
- **Git Safety**: Ensure that these large datasets and all `.env` files are never committed to the repository.
