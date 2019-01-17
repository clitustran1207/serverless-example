const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const user = require("./models/user");

app.use(bodyParser.json({ strict: false }));

app.get("/", function(req, res) {
  res.send("Hello World!");
});

// Get User endpoint
app.get("/users/:userId", function(req, res) {
  user.get(req, res);
});

// Create User endpoint
app.post("/users", function(req, res) {
  user.add(req, res);
});


module.exports.handler = serverless(app);
