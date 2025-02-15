const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/instagram", async (req, res) => {
  try {
    const accessToken = "YOUR_ACCESS_TOKEN";
    const apiUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${accessToken}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Instagram data" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
