const { Router } = require("express");

const router = Router();
const db = require("../db/db");

// setup Create, Read, UPDATE, DELETE (CRUD) routes for tasks

// Create a new task
router.post("/", (req, res) => {
  // create a new task, e.g., extract task details from req.body
  const { task, userId, taskListId, taskListTitle, completed } = req.body;
  const newTask = { task, userId, taskListId, taskListTitle, completed };
  // Save the new task to the database (pseudo-code)
  db.run(
    "INSERT INTO tasks (task, userId, taskListId, taskListTitle, completed) VALUES (?, ?, ?, ?, ?)",
    [task, userId, taskListId, taskListTitle, completed],
    function (err) {
      if (err) {
        console.error("Error creating task:", err.message);
        res.status(500).json({ error: "Failed to create task" });
      } else {
        res.status(201).json(newTask);
      }
    }
  );
});
// Get all tasks
router.get("/", (req, res) => {
  // Retrieve all tasks from the database (pseudo-code)
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      console.error("Error retrieving tasks:", err.message);
      res.status(500).json({ error: "Failed to retrieve tasks" });
    } else {
      res.status(200).json(rows);
    }
  });
});
// Get a specific task by ID
router.get("/:id", (req, res) => {
  // Retrieve a specific task by ID (pseudo-code)
  const taskId = req.params.id;
  db.get("SELECT * FROM tasks WHERE id = ?", [taskId], (err, row) => {
    if (err) {
      console.error("Error retrieving task:", err.message);
      res.status(500).json({ error: "Failed to retrieve task" });
    } else if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  });
});
// Get tasks by taskListId
router.get("/:taskListId/tasks", (req, res) => {
  // Retrieve tasks by taskListId (pseudo-code)
  const taskListId = req.params.taskListId;
  db.all(
    "SELECT * FROM tasks WHERE taskListId = ?",
    [taskListId],
    (err, rows) => {
      if (err) {
        console.error("Error retrieving tasks:", err.message);
        res.status(500).json({ error: "Failed to retrieve tasks" });
      } else {
        res.status(200).json(rows);
      }
    }
  );
});
// Update a task by ID
router.put("/:id", (req, res) => {
  const updatedTask = req.body;
  db.run(
    "UPDATE tasks SET task = ?, userId = ?, taskListId = ?, taskListTitle = ?, completed = ? WHERE id = ?",
    [
      updatedTask.task,
      updatedTask.userId,
      updatedTask.taskListId,
      updatedTask.taskListTitle,
      updatedTask.completed,
      req.params.id,
    ],
    function (err) {
      if (err) {
        console.error("Error updating task:", err.message);
        res.status(500).json({ error: "Failed to update task" });
      } else {
        res.status(200).json(updatedTask);
      }
    }
  );
});
// Delete a task by ID
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM tasks WHERE id = ?", [req.params.id], function (err) {
    if (err) {
      console.error("Error deleting task:", err.message);
      res.status(500).json({ error: "Failed to delete task" });
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
