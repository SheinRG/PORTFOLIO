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
      },
      {
        title: "AI RESEARCH AGENT",
        chapterNumber: "CHAPTER 4",
        description: "An autonomous, Perplexity-style research agent that decomposes a question into 2–4 parallel sub-queries, searches the web, neural re-ranks the sources, and streams back a fully cited answer with verifiable [n] markers. Built on a LangGraph agent pipeline with a two-tier LLM strategy — Llama 3.1 8B for fast triage/routing, Llama 3.3 70B for synthesis. Cut end-to-end latency from 35s to 4.5s (~87% faster) by collapsing the agent graph and fixing async bottlenecks, and hardened it with stateless JWT + Google OAuth, per-user rate limiting, and a single canonical source list so citations never drift.",
        techStack: ["NEXT.JS", "FASTAPI", "LANGGRAPH", "GROQ API", "POSTGRESQL", "DOCKER"],
        tags: ["AI/ML", "AGENTIC", "RAG"],
        imageUrl: "/images/research-agent-cover.png",
        detailImageUrl: "/images/research-agent-cover.png",
        githubUrl: "https://github.com/SheinRG/AI-ResearchAgent",
        liveUrl: "https://ai-research-agent-gray.vercel.app"
      },
      {
        title: "AMAZÔNIA: LIVING ARCHIVE",
        chapterNumber: "CHAPTER 5",
        description: "An immersive, design-first single-page scrollytelling experience that takes you through the Amazon rainforest's keystone species. Features bioluminescent 3D scenes — a living hero, an interactive canopy, and a specimen gallery — built with Three.js via react-three-fiber, with scroll-driven animation choreographed in GSAP ScrollTrigger and an animated 'Lumen Tree'. Includes a searchable, filterable species atlas backed by IUCN Red List conservation data. Built with React 19, TypeScript, and Vite.",
        techStack: ["REACT 19", "TYPESCRIPT", "THREE.JS", "GSAP", "TAILWIND", "FRAMER MOTION"],
        tags: ["3D / WEBGL", "FRONTEND", "CREATIVE"],
        imageUrl: "/images/amazonia-cover.png",
        detailImageUrl: "/images/amazonia-cover.png",
        githubUrl: "https://github.com/SheinRG/amazonia",
        liveUrl: "https://amazonia-hazel.vercel.app"
      }
    ]);

    await Experience.create([
      {
        title: "FULL STACK ENGINEER INTERN @ MEDULANCE",
        description: "Developed RESTful APIs and database schemas using Node.js, Express.js, and MongoDB for healthcare application features, ensuring robust data persistence and API reliability. • Built responsive UI with React.js and Tailwind CSS, implemented secure user authentication using JWT tokens and bcrypt hashing for session management. • Collaborated with cross functional teams to validate technical requirements and ensure code quality through reviews and best practices documentation.",
        projects: ["Healthcare Application Features", "Secure User Authentication"],
        certificateUrl: "/medulance.png",
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
