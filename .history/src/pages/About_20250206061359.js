const About = () => {
  return (
    <div className="min-h-screen w-full text-white flex justify-center items-center">
      <div className="w-full max-w-3xl p-8">
        <h1 className="text-3xl font-bold">About Me</h1>
        <h2 className="text-xl font-bold mt-4">Education</h2>
        <h4 className="mt-2 font-semibold">
          Master of Technology in Big Data Biology
        </h4>
        <p className="text-lg">
          SASTRA Deemed University, Thanjavur, Tamil Nadu, India
        </p>
        <p>Aug 2023 - Present</p>
        <p>Percentage: 78.33</p>

        <h4 className="mt-4 font-semibold">Bachelor of Technology</h4>
        <p>Prathyusha Engineering College, Tiruvallur, Tamil Nadu, India</p>
        <p>Aug 2019 - Apr 2023</p>
        <p>Percentage: 84.4</p>
      </div>
    </div>
  );
};

export default About;
