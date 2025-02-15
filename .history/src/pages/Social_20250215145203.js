import React, { useEffect, useState } from "react";
import axios from "axios";

const Social = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInstagramVideos = async () => {
      try {
        console.log("📡 Fetching Instagram videos...");
        const response = await axios.get(
          "http://localhost:5000/api/instagram-videos"
        );
        setVideos(response.data.data);
      } catch (err) {
        console.error("❌ Error fetching videos:", err.message);
        setError("Failed to load videos.");
      }
    };
    fetchInstagramVideos();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <h2 className="text-3xl font-bold">📸 Instagram Videos</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id}>
              {video.media_type === "VIDEO" ? (
                <video width="320" height="240" controls>
                  <source src={video.media_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={video.media_url}
                  alt={video.caption}
                  width="320"
                  height="240"
                />
              )}
              <p>{video.caption}</p>
              <a
                href={video.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Instagram
              </a>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Social;
