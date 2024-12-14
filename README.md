# Task Management API (Backend)

This project is a REST API developed using **Node.js** and **NestJS** for managing tasks in a software development context. It includes features for task assignment, priority management, and tracking. The API leverages MongoDB for data persistence and provides endpoints for CRUD operations, including soft deletions and task restoration.

Developed by ❤️ **Ing. Inés María Oliveros**.

## Features

- Manage tasks with attributes like title, description, assignee, priority, and deadlines.
- Soft deletion and restoration for tasks.
- Validation of inputs using `class-validator` and `class-transformer`.
- Comprehensive Swagger UI documentation.

## Deploy

Backend deployed at:

```plaintext
   https://backend-task-management-2xvy.onrender.com
   ```

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
The API will be available at:

   ```plaintext
   http://localhost:4000
   ```
## Swagger Documentation

Explore the API documentation via Swagger by navigating to:

   ```plaintext
   http://localhost:4000/api
   ```
This interactive documentation allows you to test API endpoints directly in the browser.

## Project Structure

- src: Contains the main source code for the API.
   - tasks: Module for managing task-related features.
   - common: Shared utilities, DTOs, and validation logic.
- test: Contains unit and integration tests.
- docs: Configuration for API documentation using Swagger.


## How to Use

1. Get All Tasks: Send a GET request to /tasks to retrieve all active tasks.
2. Create a Task: Send a POST request to /tasks with task details.
3. Edit a Task: Send a PATCH request to /tasks/:id to update specific fields of a task.
4. Delete a Task: Send a DELETE request to /tasks/:id for soft deletion.
5. View Deleted Tasks: Send a GET request to /tasks/deleted to view all soft-deleted tasks.
6. Restore a Task: Send a PATCH request to /tasks/:id/restore to restore a soft-deleted task.

## Technologies Used

- Node.js: For building the backend application.
- NestJS: For a modular and scalable architecture.
- MongoDB: For data persistence.
- Mongoose: For MongoDB object modeling.
- Swagger: For API documentation.
- TypeScript: For static typing and better developer experience.

## Contributing

Contributions are welcome! If you have suggestions or encounter any issues, feel free to submit a pull request or open an issue in this repository.


## License

This project is licensed under the MIT License.

## Acknowledgements
- Frontend developed as part of the Task Management project.
- Special thanks to the open-source community for tools and libraries used in this project.

Developed ❤️ by Ing. Inés María Oliveros