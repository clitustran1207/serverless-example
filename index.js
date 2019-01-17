const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const { user: userModel } = require("./db");

app.use(bodyParser.json({ strict: false }));

app.get("/", function(req, res) {
  res.send("Hello World!");
});

// Get User endpoint
app.get("/users/:userId", async function(req, res) {
  const id = "" + req.params.userId;

  try {
    const user = await userModel.get(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 400).json({ error: error.message });
  }
});

// Create User endpoint
app.post("/users", async function(req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  try {
    const user = await userModel.add({ userId, name });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Could not create user" });
  }
});

module.exports.handler = serverless(app);
