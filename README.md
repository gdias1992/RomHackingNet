# RomHacking.net Archive Explorer

A high-performance, local-first web interface designed to browse, search, and manage the 2024 RomHacking.net data backup.

## 🚀 The Goal

To replace the original web interface with a snappy, modern experience optimized for `localhost` usage. This project allows you to navigate the massive collection of ROM hacks, translations, and utilities entirely offline.

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

| Requirement | Version |
|-------------|---------|
| **Python** | 3.10+ |
| **Node.js** | 18+ |
| **MySQL** | 8.0+ |

The `romhackingnet` MySQL database must be running and populated with the archive data.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/RomHackingNet.git
cd RomHackingNet
```

### 2. Backend Setup

```bash
# Create and activate a virtual environment (from project root)
python -m venv .venv
.venv/Scripts/activate  # Windows
# source .venv/bin/activate  # Linux/macOS

# Install dependencies
pip install -r backend/requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

---

## 🔧 Configuration

### Backend Environment

Create or edit `backend/.env` with your database credentials:

```env
# Database Configuration
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=romhackingnet

# Application Settings
APP_NAME="RomHacking.net Archive Explorer"
APP_VERSION=0.1.0
DEBUG=true

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

---

## 🚀 Running the Application

### Start the Backend

```bash
cd backend
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

The API will be available at:
- **API Root:** http://127.0.0.1:8000
- **Swagger Docs:** http://127.0.0.1:8000/docs
- **ReDoc:** http://127.0.0.1:8000/redoc

### Start the Frontend

```bash
cd frontend
npm run dev
```

The web interface will be available at:
- **Application:** http://localhost:5173

---

## 🩺 Health Check

Verify the system is running correctly:

```bash
curl http://127.0.0.1:8000/api/v1/health
```

Expected response:

```json
{
  "status": "healthy",
  "version": "0.1.0",
  "database": "connected"
}
```

---

## 📁 Project Structure

See [STRUCTURE.md](STRUCTURE.md) for a detailed breakdown of the repository layout.

## 🛠️ Technology Stack

See [TECHNOLOGIES.md](TECHNOLOGIES.md) for a complete list of frameworks and libraries used.