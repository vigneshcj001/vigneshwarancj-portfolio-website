require("dotenv").config(); // Load environment variables
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

// 🔹 Set Instagram Access Token

const INSTAGRAM_ACCESS_TOKEN =
  "IGAAG3yhugKo1BZAE43RkQ1Wmh2QU1jclFzQVFKaXF6M21Ya0xrd2tSMkxYMWhrLVdqZAmJzTFYyR0NLR0xNMTIyelBaWnF0QlZAwLTVQN0F5UmpaZA0FOOTNTMi1HYmMwdmhCMkxIaU4zOUc0MGxNRGF1UWRvYkphX1FxeUJqeWFPYwZDZD"
// Middleware
app.use(cors());
app.use(express.json());

// ✅ Instagram Videos API Route
app.get("/api/instagram-videos", async (req, res) => {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    return res.status(400).json({ error: "Missing Instagram access token." });
  }

  try {
    const response = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching Instagram videos:", error.message);
    res.status(500).json({ error: "Failed to fetch Instagram videos." });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
