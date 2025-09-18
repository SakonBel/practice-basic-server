const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "../users.json");

function loadUsers() {
  try {
    const file = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(file);
  } catch (err) {
    console.error("Error reading users.json:", err);
    return [];
  }
}

function saveUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing users.json:", err);
    return false;
  }
}

exports.getAllUsers = (req, res) => {
  const users = loadUsers();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
};

exports.createUser = (req, res) => {
  const users = loadUsers();
  const newUser = req.body;
  if (!newUser || !newUser.id) {
    return res
      .status(400)
      .json({ status: "fail", message: "User id required" });
  }
  if (users.find((u) => u.id === newUser.id)) {
    return res
      .status(409)
      .json({ status: "fail", message: "User id already exists" });
  }
  users.push(newUser);
  if (saveUsers(users)) {
    res.status(201).json({ status: "success", data: newUser });
  } else {
    res.status(500).json({ status: "error", message: "Failed to save user" });
  }
};

exports.updateUser = (req, res) => {
  const users = loadUsers();
  const userId = req.params.id;
  const update = req.body;
  const userIndex = users.findIndex((u) => u.id == userId);
  if (userIndex === -1) {
    return res.status(404).json({ status: "fail", message: "User not found" });
  }
  users[userIndex] = { ...users[userIndex], ...update };
  if (saveUsers(users)) {
    res.status(200).json({ status: "success", data: users[userIndex] });
  } else {
    res.status(500).json({ status: "error", message: "Failed to update user" });
  }
};

exports.deleteUser = (req, res) => {
  const users = loadUsers();
  const userId = req.params.id;
  const userIndex = users.findIndex((u) => u.id == userId);
  if (userIndex === -1) {
    return res.status(404).json({ status: "fail", message: "User not found" });
  }
  const deletedUser = users.splice(userIndex, 1)[0];
  if (saveUsers(users)) {
    res.status(200).json({ status: "success", data: deletedUser });
  } else {
    res.status(500).json({ status: "error", message: "Failed to delete user" });
  }
};
