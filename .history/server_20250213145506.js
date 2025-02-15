const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

app.get("/api/instagram-videos", async (req, res) => {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    return res.status(400).json({ error: "Missing Instagram Access Token" });
  }

  const apiUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

  try {
    console.log("📡 Fetching Instagram videos...");
    const response = await axios.get(apiUrl);
    const videoPosts =
      response.data.data?.filter((post) => post.media_type === "VIDEO") || [];

    if (videoPosts.length === 0) {
      return res.status(404).json({ error: "No videos found." });
    }

    res.json(videoPosts);
  } catch (error) {
    console.error("🚨 Error fetching Instagram videos:", error.message);
    res.status(500).json({ error: "Failed to fetch Instagram videos." });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
