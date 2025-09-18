const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "../users.json");

// Utility: Load users from file
function loadUsers() {
  try {
    const file = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(file);
  } catch (err) {
    console.error("Error reading users.json:", err);
    return [];
  }
}

// Utility: Save users to file
function saveUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing users.json:", err);
    return false;
  }
}

// Utility: Validate user object
function isValidUser(user) {
  return user && typeof user.id !== "undefined";
}

// Utility: Send error response
function sendError(res, status, message) {
  return res.status(status).json({ status: "fail", message });
}

// GET /api/v1/users
exports.getAllUsers = (req, res) => {
  const users = loadUsers();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
};

// POST /api/v1/users
exports.createUser = (req, res) => {
  const users = loadUsers();
  const newUser = req.body;
  if (!isValidUser(newUser)) {
    return sendError(res, 400, "User id required");
  }
  if (users.find((u) => u.id === newUser.id)) {
    return sendError(res, 409, "User id already exists");
  }
  users.push(newUser);
  if (saveUsers(users)) {
    res.status(201).json({ status: "success", data: newUser });
  } else {
    res.status(500).json({ status: "error", message: "Failed to save user" });
  }
};

// PATCH /api/v1/users/:id
exports.updateUser = (req, res) => {
  const users = loadUsers();
  const userId = req.params.id;
  const update = req.body;
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return sendError(res, 404, "User not found");
  }
  users[userIndex] = { ...users[userIndex], ...update };
  if (saveUsers(users)) {
    res.status(200).json({ status: "success", data: users[userIndex] });
  } else {
    res.status(500).json({ status: "error", message: "Failed to update user" });
  }
};

// PUT /api/v1/users/:id
exports.replaceUser = (req, res) => {
  const users = loadUsers();
  const userId = req.params.id;
  const newUser = req.body;
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return sendError(res, 404, "User not found");
  }
  if (!isValidUser(newUser)) {
    return sendError(res, 400, "User id required");
  }
  users[userIndex] = newUser;
  if (saveUsers(users)) {
    res.status(200).json({ status: "success", data: newUser });
  } else {
    res
      .status(500)
      .json({ status: "error", message: "Failed to replace user" });
  }
};

// DELETE /api/v1/users/:id
exports.deleteUser = (req, res) => {
  const users = loadUsers();
  const userId = req.params.id;
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return sendError(res, 404, "User not found");
  }
  const deletedUser = users.splice(userIndex, 1)[0];
  if (saveUsers(users)) {
    res.status(200).json({ status: "success", data: deletedUser });
  } else {
    res.status(500).json({ status: "error", message: "Failed to delete user" });
  }
};
