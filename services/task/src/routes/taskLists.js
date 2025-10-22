const { Router } = require("express");

const router = Router();
const db = require("../db/db");

// Create a new task list
router.post("/", (req, res) => {
  const { title, userId, completed, state, tags } = req.body;
  const newTaskList = { title, userId, completed, state, tags, id: null };
  db.run(
    "INSERT INTO taskLists (title, userId, completed, state, tagsArray) VALUES (?, ?, ?, ?, ?)",
    [title, userId, completed, state, JSON.stringify(tags)],
    function (err) {
      if (err) {
        console.error("Error creating task list:", err.message);
        res.status(500).json({ error: "Failed to create task list" });
      } else {
        res.status(201).json({ ...newTaskList, id: this.lastID });
      }
    }
  );
});

// Get all task lists
router.get("/", (req, res) => {
  db.all("SELECT * FROM taskLists", [], (err, rows) => {
    if (err) {
      console.error("Error retrieving task lists:", err.message);
      res.status(500).json({ error: "Failed to retrieve task lists" });
    } else {
      res.status(200).json(rows);
    }
  });
});
// Get task lists by userId
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  db.all("SELECT * FROM taskLists WHERE userId = ?", [userId], (err, rows) => {
    if (err) {
      console.error("Error retrieving task lists:", err.message);
      res.status(500).json({ error: "Failed to retrieve task lists" });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Get a specific task list by ID
router.get("/:id", (req, res) => {
  const taskListId = req.params.id;
  db.get("SELECT * FROM taskLists WHERE id = ?", [taskListId], (err, row) => {
    if (err) {
      console.error("Error retrieving task list:", err.message);
      res.status(500).json({ error: "Failed to retrieve task list" });
    } else if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ error: "Task list not found" });
    }
  });
});

router.delete("/:id", (req, res) => {
  const taskListId = req.params.id;
  db.run("DELETE FROM taskLists WHERE id = ?", [taskListId], function (err) {
    if (err) {
      console.error("Error deleting task list:", err.message);
      res.status(500).json({ error: "Failed to delete task list" });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Task list not found" });
    } else {
      res.status(200).json({ message: "Task list deleted successfully" });
    }
  });
});

module.exports = router;
