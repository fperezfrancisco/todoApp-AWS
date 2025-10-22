const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from your Task Service!");
});

//routes
app.use("/api/v1/tasks", require("./routes/tasks"));
app.use("/api/v1/taskLists", require("./routes/taskLists"));

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});
