const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;

app.get("/", (req, res) => {
  res.send("Hello from your Task Service!");
});

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});
