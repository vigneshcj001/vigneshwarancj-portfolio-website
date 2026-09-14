export const caseStudies = {
  syncly: {
    title: "Syncly", index: 0, label: "Full-stack engineering",
    summary: "A professional network connecting discovery, real-time conversation, and a personal portfolio.",
    problem: "Professionals across technology, biology, commerce, and IT need a way to discover relevant people and turn introductions into conversations.",
    role: "Independent full-stack development across the React frontend, REST APIs, real-time messaging, and AWS deployment.",
    steps: ["Discover professionals with Vibe / Ghost matching", "Chat with typing and activity indicators", "Build a portfolio without writing code"],
    architecture: ["React + Redux", "Node.js + Socket.IO", "MongoDB", "AWS EC2 + SES"],
    decisions: ["Use REST APIs for application data and Socket.IO for live conversation events.", "Place a portfolio builder alongside networking so members can show their work.", "Deliver scheduled email summaries to surface activity outside the app."],
    result: "Delivered matching, real-time chat, a no-code portfolio builder, and scheduled email summaries in a deployed platform.",
    caveat: "Usage, latency, and conversion measurements are not published here.",
  },
  glycanbench: {
    title: "GlycanBench", index: 1, label: "AI + computational biology",
    summary: "An integrated web server and Python package for exploring, comparing, and modelling glycans.",
    problem: "Glycan research combines structure visualisation, molecular comparison, and predictive modelling. A shared interface brings these workflows together.",
    role: "Developed under the guidance of Ashok Palaniappan at SASTRA University’s Systems Computational Biology Lab.",
    steps: ["Create and visualise glycans in 2D and 3D", "Compare fingerprints, sequences, and clusters", "Explore MPNN predictions with explainable outputs"],
    architecture: ["React interface", "FastAPI services", "RDKit analysis", "PyTorch MPNN"],
    decisions: ["Offer a web server and Python package for interactive and programmatic work.", "Support several fingerprint families for comparing molecular representations.", "Combine prediction outputs with explanations to support interpretation."],
    result: "Made glycan creation, visualisation, comparison, clustering, and prediction available through a web server and Python package.",
    caveat: "Model evaluation metrics are not reproduced on this page; consult the project materials for methodology and limitations.",
  },
};

// Publish only real media and explicitly approved quotes. Empty sections stay hidden.
export const testimonials = [];
export const projectMedia = {
  syncly: { liveAvailable: false },
  glycanbench: { liveAvailable: false },
};

export const articles = [
  { slug: "rest-and-real-time", title: "Where REST ends and real-time messaging begins", project: "syncly", intro: "A technical note using Syncly’s published stack to explain complementary communication patterns.", sections: [
    ["Two different jobs", "Loading a profile is a request for a resource. A typing indicator is an event that matters while another person is looking at a conversation. REST and Socket.IO serve these different needs in Syncly’s stack."],
    ["Delivery is only part of the problem", "Persistence, authorisation, reconnect behaviour, and duplicate handling need explicit design in a chat system. A live connection alone does not guarantee that a message has been stored or read. These are useful questions when evaluating messaging architecture."],
    ["Keep the user informed", "Interfaces should distinguish sending, failure, and confirmed delivery. An honest connection status and retry path help users recover when connectivity drops."],
  ]},
  { slug: "interpreting-research-models", title: "A prediction needs context", project: "glycanbench", intro: "A technical note on communicating model outputs in research software.", sections: [
    ["Start with the representation", "Molecular models depend on how structures are encoded. GlycanBench supports fingerprint comparison and an MPNN prediction workflow. Different representations expose different aspects of a structure; choosing a representation is part of the modelling question."],
    ["Explain the scope", "An explanation can help inspect an output, but it is not proof of causality or generalisation. Reports should make the dataset, evaluation split, and limitations clear before presenting a score as evidence."],
    ["Make exploration reproducible", "A useful research workflow records its input, parameters, and model version. A web interface and Python package can support both exploration and repeatable analysis."],
  ]},
];
