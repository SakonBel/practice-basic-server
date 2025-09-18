const fs = require("fs");
const express = require("express");

// Create app
const app = express();

// Parse JSON body to the app
app.use(express.json());

// Retrieve JSON file
const file = fs.readFileSync(`${__dirname}/users.json`, "utf-8");
const data = JSON.parse(file);

app.get("/api/v1/users", (req, res) => {
  res.status(200).json({
    status: "success",
    results: data.length,
    users: {
      data,
    },
  });
});

module.exports = app;
