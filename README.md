# Practice Basic Server - Step-by-Step Concept Guide

This README explains the conceptual steps taken to build a simple Node.js REST API server for user management, with a clean project structure and a basic HTML frontend.

## 1. Project Initialization

- Create a new Node.js project folder.
- Initialize with `npm init` and install Express (`npm install express`).

## 2. Basic Server Setup

- Create `app.js` to set up the Express application.
- Add middleware to parse JSON request bodies.

## 3. User Data Storage

- Store user data in a local `users.json` file.
- Implement functions to read and write user data safely.

## 4. RESTful API Endpoints

- Implement GET, POST, PUT, PATCH, and DELETE endpoints for `/api/v1/users`:
  - **GET**: Retrieve all users.
  - **POST**: Add a new user.
  - **PUT**: Fully replace an existing user by ID.
  - **PATCH**: Update an existing user by ID (partial update).
  - **DELETE**: Remove a user by ID.

## 5. Project Structure Refactor

- Create `controllers/` for business logic (userController.js).
- Create `routes/` for route definitions (userRoutes.js).
- Refactor `app.js` to use modular routes and controllers.

## 6. HTML Frontend

- Create `views/users.html` as a basic template to display users in a table.
- Use JavaScript in the HTML to fetch user data from the API and inject it into the table.

## 7. How It Works Together

- The server exposes RESTful endpoints for user management.
- The HTML page fetches user data from the API and displays it dynamically.
- All user data is stored in `users.json` and updated via API requests.

## 8. Next Steps (Optional)

- Add validation, error handling, or authentication.
- Serve the HTML file directly from Express.
- Expand the API or frontend features as needed.

---

This guide covers the conceptual steps from start to finish for building and structuring a basic Node.js REST API project with a simple frontend.
