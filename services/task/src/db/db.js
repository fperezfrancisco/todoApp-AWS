const sqlite3 = require("sqlite3").verbose();
let sqlTasks;
let sqlTaskLists;

const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the tasks database.");

    sqlTasks = `CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task TEXT NOT NULL,
            userId INTEGER,
            taskListId INTEGER,
            taskListTitle TEXT,
            completed INTEGER NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            lastModified DATETIME DEFAULT CURRENT_TIMESTAMP
          )`;

    sqlTaskLists = `CREATE TABLE IF NOT EXISTS taskLists (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed INTEGER NOT NULL,
            userId INTEGER,
            state TEXT,
            tagsArray TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )`;

    db.run(sqlTasks, (err) => {
      if (err) {
        console.error("Error creating tasks table:", err.message);
      } else {
        console.log("Tasks table ready.");
      }
    });

    db.run(sqlTaskLists, (err) => {
      if (err) {
        console.error("Error creating taskLists table:", err.message);
      } else {
        console.log("Task Lists table ready.");
      }
    });
  }
});

module.exports = db;
