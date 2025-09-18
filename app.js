const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/api/v1/users", userRoutes);

module.exports = app;
