import React, { useEffect, useState } from "react";
import axios from "axios";

const InstagramVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstagramVideos = async () => {
      const accessToken = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN; // Use .env for security
      const apiUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${accessToken}`;

      try {
        const response = await axios.get(apiUrl);
        console.log("API Response:", response.data); // Debugging
        const videoPosts = response.data.data.filter(post => post.media_type === "VIDEO");
        setVideos(videoPosts);
      } catch (err) {
        console.error("Error fetching Instagram videos:", err);
        setError("Failed to load Instagram videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramVideos();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Latest Instagram Videos</h2>
      {loading && <p>Loading videos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-4">
        {videos.length > 0 ? (
          videos.map(video => (
            <div key={video.id} className="w-80">
              <video width="100%" controls className="rounded-lg shadow-md">
                <source src={video.media_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <a
                href={video.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-blue-500 hover:underline"
              >
                View on Instagram
              </a>
            </div>
          ))
        ) : !loading ? (
          <p>No videos found.</p>
        ) : null}
      </div>
    </div>
  );
};

const Social = () => {
  return (
    <div className="p-6 text-center text-white min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold">Connect with Me</h1>
      <p className="mt-4">Follow me on:</p>
      <div className="mt-4 flex justify-center space-x-6">
        <a href="https://github.com/vigneshcj001" className="text-blue-400 hover:underline">GitHub</a>
        <a href="https://www.linkedin.com/in/vigneshwarancj1/" className="text-blue-400 hover:underline">LinkedIn</a>
        <a href="https://leetcode.com/vigneshcj001/" className="text-blue-400 hover:underline">LeetCode</a>
      </div>
      <InstagramVideos />
    </div>
  );
};

export default Social;
