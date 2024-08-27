const express = require("express");
const mongoose = require("mongoose");
const Actor = require("./models/actor.js");

// const uri = "mongodb://localhost:27017/CBIT";
const uri =
  "mongodb://127.0.0.1:27020,127.0.0.1:27021,127.0.0.1:27022/cbitit1?replicaSet=m101";

const app = express();

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello NODE API!");
});

app.get("/blog", (req, res) => {
  res.send("Blog API");
});

app.post("/actor", async (req, res) => {
  try {
    const actor = await Actor.create(req.body);
    res.status(200).json(actor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    res.status(200).json(actor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
