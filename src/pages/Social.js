const Social = () => {
  return (
    <div className="p-6 text-center text-white h-screen">
      <h1 className="text-3xl font-bold">Connect with Me</h1>
      <p className="mt-4">Follow me on:</p>
      <div className="mt-4 space-x-4">
        <a
          href="https://github.com/vigneshcj001"
          className="text-blue-400 hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/vigneshwarancj1/"
          className="text-blue-400 hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="https://leetcode.com/vigneshcj001/"
          className="text-blue-400 hover:underline"
        >
          LeetCode
        </a>
      </div>
    </div>
  );
};

export default Social;
