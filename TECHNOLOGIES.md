# 🛠️ Project Technologies

This document specifies the technology stack and libraries used in the RomHackingNet Archive Explorer.

## 🐍 Backend (Python)

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Python 3.10+ | Primary programming language. |
| **Framework** | [FastAPI](https://fastapi.tiangolo.com/) | High-performance, async web framework. |
| **ORM** | [SQLModel](https://sqlmodel.tiangolo.com/) | Combines Pydantic and SQLAlchemy for type-safe database interactions. |
| **Database** | MySQL | Local instance storing RomHacking.net metadata. |
| **Async Driver** | `aiomysql` | Enables asynchronous communication with MySQL. |
| **Server** | `uvicorn` | ASGI server for running the FastAPI application. |
| **Validation** | [Pydantic v2](https://docs.pydantic.dev/) | Data validation and settings management. |

## ⚛️ Frontend (React)

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Node.js | Javascript execution environment. |
| **Build Tool** | [Vite](https://vitejs.dev/) | Ultra-fast frontend build tool and dev server. |
| **Library** | [React](https://react.dev/) | UI component library. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework for custom design. |
| **UI Components** | [Shadcn/UI](https://ui.shadcn.com/) | Accessible and customizable UI components. |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) | Async state management and server-side data caching. |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, minimalist icon set. |

## 📐 Standards & Tools
- **Project Governance**: [STRUCTURE.md](STRUCTURE.md) & [.github/instructions/](.github/instructions/)
- **Version Control**: Git
- **Linting/Formatting**: ESLint (Frontend), Black/Ruff (Backend)
