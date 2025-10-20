const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello from your User Service!");
});

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});
