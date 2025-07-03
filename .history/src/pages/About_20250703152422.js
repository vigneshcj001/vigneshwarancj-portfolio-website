import { useState, useEffect } from "react";
import { FaUniversity, FaGraduationCap } from "react-icons/fa";

const About = () => {
  const [dark, setDark] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  return (
    <div className="min-h-screen flex justify-center items-center text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-3xl w-full p-8 shadow-2xl rounded-3xl border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-transparent transition-all">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text animate-pulse">
          🚀 About Me
        </h1>

        {/* Education Section */}
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-6">
          🎓 Education Timeline
        </h2>

        <div className="relative space-y-10 before:absolute before:top-0 before:left-4 before:w-1 before:h-full before:bg-gradient-to-b from-blue-400 to-purple-500 before:rounded-full">
          {/* M.Tech */}
          <div className="relative pl-12">
            <div className="absolute left-0 top-1 text-blue-500">
              <FaGraduationCap size={24} />
            </div>
            <div className="p-5 bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-105">
              <h3 className="text-xl font-bold">
                Master of Technology in Big Data Biology
              </h3>
              <p className="text-sm mt-1 text-gray-800 dark:text-gray-200">
                SASTRA Deemed University, Thanjavur, Tamil Nadu, India
              </p>
              <p className="text-xs mt-1">Aug 2023 – Present</p>
              <p className="text-sm font-medium mt-1">Percentage: 79.67%</p>
            </div>
          </div>

          {/* B.Tech */}
          <div className="relative pl-12">
            <div className="absolute left-0 top-1 text-green-500">
              <FaUniversity size={24} />
            </div>
            <div className="p-5 bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-105">
              <h3 className="text-xl font-bold">Bachelor of Technology</h3>
              <p className="text-sm mt-1 text-gray-800 dark:text-gray-200">
                Prathyusha Engineering College, Tiruvallur, Tamil Nadu, India
              </p>
              <p className="text-xs mt-1">Aug 2019 – Apr 2023</p>
              <p className="text-sm font-medium mt-1">Percentage: 84.4%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
