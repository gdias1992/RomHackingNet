# RomHacking.net Archive Explorer

A high-performance, local-first web interface designed to browse, search, and manage the 2024 RomHacking.net data backup.

## 🚀 The Goal
To replace the original web interface with a snappy, modern experience optimized for `localhost` usage. This project allows you to navigate the massive collection of ROM hacks, translations, and utilities entirely offline.

## 🛠️ Tech Stack
This project uses a fast and lightweight architecture:
- **Backend:** [Python](https://www.python.org/) with **FastAPI** — chosen for high performance, ease of use, and first-class support for the project's data formats.
- **Frontend:** [React](https://react.dev/) powered by **Vite** — providing a near-instant development experience and a responsive UI.
- **Database:** Directly interfaces with the **SQLite** metadata and **MySQL** dumps found in the project's archive.

## 📁 Data Source
This explorer is built to work with the data located in:
- `.romhacking/sql/`
- Includes metadata from [romhacking.sql](.romhacking/sql/romhacking.sql) and asset