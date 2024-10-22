const express = require("express");
const mongoose = require("mongoose");
const Actor = require("./models/actor.js");
const cors = require("cors");

// const uri = "mongodb://localhost:27017/CBIT";
const uri =
  "mongodb://127.0.0.1:27020,127.0.0.1:27021,127.0.0.1:27022/cbitit1?replicaSet=m101";

const app = express();
app.use(cors());

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
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

app.put("/:id", async (req, res) => {
  try {
    const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(actor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(actor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await Actor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Actor deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: "Actor not found" });
  }
});

app.get("/actors", async (req, res) => {
  try {
    const actors = await Actor.find();
    res.status(200).json(actors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
