import React, { useEffect, useState } from "react";
import axios from "axios";

const InstagramVideos = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstagramVideos = async () => {
      try {
        console.log("📡 Fetching Instagram videos...");
        const response = await axios.get("http://localhost:5000/api/instagram-videos");
        console.log("✅ API Response:", response.data);

        if (response.data.length === 0) {
          setError("No videos found.");
        } else {
          setVideos(response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching videos:", error.message);
        setError("Failed to load Instagram videos.");
      }
    };

    fetchInstagramVideos();
  }, []);

  return (
    <div>
      <h2>Latest Instagram Videos</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {videos.length > 0 ? (
            videos.map(video => (
              <div key={video.id}>
                <video width="300" controls>
                  <source src={video.media_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))
          ) : (
            <p>Loading videos...</p>
          )}
        </div>
      )}
    </div>
  );
};

const Social = () => {
  return (
    <div className="p-6 text-center text-white h-screen">
      <h1 className="text-3xl font-bold">Connect with Me</h1>
      <p className="mt-4">Follow me on:</p>
      <div className="mt-4 space-x-4">
        <a href="https://github.com/vigneshcj001" className="text-blue-400 hover:underline">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/vigneshwarancj1/" className="text-blue-400 hover:underline">
          LinkedIn
        </a>
        <a href="https://leetcode.com/vigneshcj001/" className="text-blue-400 hover:underline">
          LeetCode
        </a>
      </div>
      <InstagramVideos />
    </div>
  );
};

export default Social;
