# Task Management CRUD API

A clean, robust RESTful CRUD API for managing tasks built with **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and **TypeScript**, using **Yarn** as the package manager.

---

## Features

- **Create**: Add new tasks with `title`, `description`, `status`, and `dueDate`.
- **Read**:
  - Fetch all tasks (with optional filtering by `status` and `title`).
  - Retrieve a specific task by **ID**.
  - Retrieve a specific task by **Title** (case-insensitive).
- **Update**: Modify existing task details and status by **ID**.
- **Delete**: Remove tasks by **ID**.
- **Proper RESTful Routing & Status Codes**: `200`, `201`, `400`, `404`, and `500`.
- **Comprehensive Error Handling**: Centralized error middleware handling invalid IDs, validation errors, and missing resources.
- **Robust Input Validation**: Strict validation for required fields, allowed status enums, valid dates, and MongoDB ObjectId formats.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Language**: TypeScript
- **Package Manager**: Yarn

---

## Project Structure

```
├── dist/                          # Compiled JavaScript output
├── src/
│   ├── config/
│   │   ├── db.ts                  # MongoDB connection helper
│   │   └── swagger.ts             # OpenAPI/Swagger specification
│   ├── controllers/
│   │   └── task.controller.ts     # CRUD controllers (create, getAll, getById, getByTitle, update, delete)
│   ├── middleware/
│   │   ├── error.middleware.ts    # Centralized error and 404 handlers
│   │   └── validation.middleware.ts # Request body and ObjectId validators
│   ├── models/
│   │   └── task.model.ts          # Mongoose schema and TypeScript interface
│   ├── routes/
│   │   └── task.routes.ts         # RESTful router definitions
│   ├── app.ts                     # Express application setup
│   └── server.ts                  # Server entry point & listener
├── .env.example                   # Environment configuration template
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or newer)
- [MongoDB](https://www.mongodb.com/) running locally or via connection string

### Installation & Setup

1. Install dependencies:
   ```bash
   bun install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Ensure `.env` matches your MongoDB configuration:
   ```ini
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/task_db
   ```

3. Run in Development Mode (with hot reloading):
   ```bash
   bun dev
   ```

4. Run in Production:
   ```bash
   bun start
   ```

---

## Web User Interface

A modern, responsive web UI is included to perform all CRUD operations directly in your browser:
- **Web App**: Open [http://localhost:3000/](http://localhost:3000/)
- **Features**:
  - Create tasks with title, description, status, and due date.
  - View live task list with status badges and due dates.
  - Filter tasks by status (`All`, `Pending`, `In Progress`, `Completed`) and search by title.
  - Edit existing tasks via an edit dialog.
  - Quick-toggle task completion via checkbox.
  - Delete tasks with confirmation.

---

## API Documentation (Swagger)

Once the server is running, you can access the interactive Swagger UI and OpenAPI JSON spec:
- **Swagger UI**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **OpenAPI JSON Spec**: [http://localhost:3000/api/docs.json](http://localhost:3000/api/docs.json)

---

## Testing with Thunder Client

The repository includes ready-to-import Thunder Client collections:
- **Collection file**: `thunder-collection_task_management_api.json` (covers all CRUD endpoints, status filtering, title lookups, and error cases)
- **Environment file**: `thunder-environment_task_management_api.json` (defines `baseUrl = http://localhost:3000` and automatically tracks `taskId`)

**How to import in VS Code**:
1. Open the **Thunder Client** extension in VS Code.
2. Go to the **Collections** tab, click **...** (Menu) -> **Import**.
3. Select `thunder-collection_task_management_api.json`.
4. Go to the **Env** tab, click **...** -> **Import**, and select `thunder-environment_task_management_api.json`.
5. Select the **Task API Local** environment and run any request.

---

## API Endpoints

| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `POST` | `/api/tasks` | Create a new task | `201 Created` / `400 Bad Request` |
| `GET` | `/api/tasks` | Fetch all tasks (supports `?status=` and `?title=`) | `200 OK` |
| `GET` | `/api/tasks/:id` | Retrieve task by ID | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `GET` | `/api/tasks/title/:title` | Retrieve task by title | `200 OK` / `404 Not Found` |
| `PUT` | `/api/tasks/:id` | Update task details & status | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `DELETE` | `/api/tasks/:id` | Remove task by ID | `200 OK` / `400 Bad Request` / `404 Not Found` |

---

## Data Model & Constraints

| Field | Type | Required | Constraints |
|---|---|---|---|
| `title` | String | **Yes** | Non-empty, trimmed string |
| `description` | String | No | Defaults to `""` |
| `status` | String | No | `pending`, `in_progress`, or `completed` (default: `pending`) |
| `dueDate` | Date / ISO String | No | Valid date format or `null` |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last modification timestamp |

---

## Example Requests (cURL)

### 1. Create a Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build CRUD API",
    "description": "Complete recruitment task in Node.js, Express, MongoDB, and TypeScript",
    "status": "in_progress",
    "dueDate": "2026-10-01T12:00:00.000Z"
  }'
```

### 2. Fetch All Tasks
```bash
# All tasks
curl http://localhost:3000/api/tasks

# Filter by status
curl "http://localhost:3000/api/tasks?status=in_progress"

# Filter by title
curl "http://localhost:3000/api/tasks?title=Build"
```

### 3. Retrieve Task by ID
```bash
curl http://localhost:3000/api/tasks/<TASK_ID>
```

### 4. Retrieve Task by Title
```bash
curl "http://localhost:3000/api/tasks/title/Build%20CRUD%20API"
```

### 5. Update Task
```bash
curl -X PUT http://localhost:3000/api/tasks/<TASK_ID> \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed",
    "description": "Task completed successfully"
  }'
```

### 6. Delete Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/<TASK_ID>
```
