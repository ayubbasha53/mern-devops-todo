import express from "express";
import Task from "../models/Task.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, owner: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { owner: req.user.id };
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (req.user.role !== "admin" && task.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to view this task" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (req.user.role !== "admin" && task.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to update this task" });
    }
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (req.user.role !== "admin" && task.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this task" });
    }
    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;