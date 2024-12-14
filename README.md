# Task Management API (Backend)

This project is a REST API developed using **Node.js** and **NestJS** for managing tasks in a software development context. It includes features for task assignment, priority management, and tracking. The API leverages MongoDB for data persistence and provides endpoints for CRUD operations, including soft deletions and task restoration.



## Features

- Manage tasks with attributes like title, description, assignee, priority, and deadlines.
- Soft deletion and restoration for tasks.
- Validation of inputs using `class-validator` and `class-transformer`.
- Comprehensive Swagger UI documentation.

## Installation

Follow these steps to set up the project on your local machine:

1. Clone this repository:

   ```bash
   git clone https://github.com/inesmariao/backend_task_management.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-management-backend
   ```

3. Create a `.env` file in the root of the project and configure the environment variables:

   ```plaintext
   MONGODB_URI=<your-mongodb-connection-string>
   PORT=4000
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

## Running the Project

### Development Mode

Start the project in development mode with hot-reload:

```bash
npm run start:dev
```
