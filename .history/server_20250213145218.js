const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

// Basic route to test if the server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
