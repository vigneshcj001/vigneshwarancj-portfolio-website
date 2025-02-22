import { useState, useEffect } from "react";

const About = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all">
      <div className="max-w-3xl w-full p-8 bg-white dark:bg-gray-800 shadow-xl dark:shadow-2xl rounded-lg border border-gray-300 dark:border-gray-700 transition-all">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          About Me
        </h1>

        <h2 className="text-xl font-bold mt-6 border-b-2 border-gray-300 dark:border-gray-600 pb-2">
          Education
        </h2>

        <div className="mt-4 space-y-4">
          <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md transition-all">
            <h4 className="font-semibold text-lg">
              Master of Technology in Big Data Biology
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              SASTRA Deemed University, Thanjavur, Tamil Nadu, India
            </p>
            <p className="text-sm">Aug 2023 - Present</p>
            <p className="text-sm font-medium">Percentage: 78.33%</p>
          </div>

          <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md transition-all">
            <h4 className="font-semibold text-lg">Bachelor of Technology</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Prathyusha Engineering College, Tiruvallur, Tamil Nadu, India
            </p>
            <p className="text-sm">Aug 2019 - Apr 2023</p>
            <p className="text-sm font-medium">Percentage: 84.4%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
