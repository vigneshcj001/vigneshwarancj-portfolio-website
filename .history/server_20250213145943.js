const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());

// Endpoint to fetch Instagram videos
app.get("/api/instagram-videos", async (req, res) => {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(500).json({ error: "Missing Instagram access token." });
    }

    const response = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,permalink,timestamp&access_token=${accessToken}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to fetch Instagram videos",
        details: error.message,
      });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
