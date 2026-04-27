import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import Project from './models/Project.js';
import Experience from './models/Experience.js';

// Fix for MongoDB Atlas ECONNREFUSED on some systems
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Project.deleteMany({});
    await Experience.deleteMany({});

    await Project.create([
      {
        title: "IMAGIX",
        chapterNumber: "CHAPTER 1",
        description: "A powerful AI-driven image generation platform that transforms text prompts into stunning visuals. Leveraging cutting-edge generative models to create artwork, designs, and photorealistic images from natural language descriptions.",
        techStack: ["NEXT.JS", "AI/ML", "TAILWIND"],
        tags: ["AI", "IMAGE-GEN"],
        imageUrl: "/images/imagix-cover.png",
        detailImageUrl: "/images/imagix-detail.png",
        githubUrl: "https://github.com/SheinRG/imagix",
        liveUrl: "https://imagix-three.vercel.app/"
      },
      {
        title: "AGENTIC INTERVIEW COACH",
        chapterNumber: "CHAPTER 2",
        description: "Deployed a real-time AI agent leveraging Claude and Groq APIs to autonomously conduct role-specific interview simulations. Orchestrated a multi-API pipeline (Claude, ElevenLabs TTS, Web Speech API) with automated silence detection. Built an intelligent evaluation engine that analyzes behavioral signals and delivers granular performance metrics.",
        techStack: ["REACT.JS", "NODE.JS", "GROQ API", "ELEVENLABS", "MONGOOSE"],
        tags: ["AI/ML", "VOICE-AI"],
        imageUrl: "/images/orion-ai-cover.png",
        detailImageUrl: "/images/orion-ai-cover.png",
        githubUrl: "https://github.com/SheinRG/didallfornothing-",
        liveUrl: "https://didallfornothing-client.vercel.app"
      },
      {
        title: "RAG DOCUMENT ANALYZER",
        chapterNumber: "CHAPTER 3",
        description: "Engineered a production-grade Retrieval-Augmented Generation (RAG) pipeline from scratch ingesting PDFs via LangChain, chunking, and embedding into ChromaDB. Designed a FastAPI backend with async background workers and JWT-based auth deployed on Render with Docker. Integrated Groq API (LLaMA 3) with precision-engineered prompting and streaming SSE responses.",
        techStack: ["FASTAPI", "REACT.JS", "LANGCHAIN", "CHROMADB", "PGVECTOR", "DOCKER"],
        tags: ["AI/ML", "RAG", "FULLSTACK"],
        imageUrl: "/nexus-ai.png",
        detailImageUrl: "/nexus-ai.png",
        githubUrl: "https://github.com/SheinRG/Rag",
        liveUrl: "https://nexus-ai-theta-seven.vercel.app/"
      }
    ]);

    await Experience.create([
      {
        title: "FRONT-END DEVELOPER INTERN @ INTERNPE",
        description: "Architected 3+ responsive web applications using React.js and Tailwind CSS; automated asset optimization via lazy loading, cutting load times by ~40%. Built a reusable component library with centralized state management, reducing feature development cycles by ~30%.",
        projects: ["Asset Optimization Engine", "Component Library Toolkit"],
        certificateUrl: "/internpe.pdf",
        colorTheme: "blue"
      },
      {
        title: "WEB DEVELOPMENT INTERN (BACKEND) @ CODEALPHA",
        description: "Designed and deployed RESTful APIs with full CRUD operations using Node.js/Express.js following MVC architecture. Shipped a secure, end-to-end authentication system using JWT tokens and bcrypt hashing, forming an auth backbone reused across internal tools.",
        projects: ["RESTful API Architecture", "JWT Auth System"],
        certificateUrl: "/codealpha.pdf",
        colorTheme: "yellow"
      }
    ]);

    console.log("Database seeded successfully! KAPOW!");
    process.exit();
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seedData();
