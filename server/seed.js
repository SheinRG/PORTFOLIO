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
        title: "OIRION AI",
        chapterNumber: "CHAPTER 2",
        description: "An AI-powered interview coaching platform that simulates real interview scenarios with voice-based conversational AI. Features real-time speech-to-text, intelligent follow-up questions, STAR method evaluation, and comprehensive performance feedback to help candidates ace their interviews.",
        techStack: ["REACT", "TAILWIND", "FRAMER MOTION", "EXPRESS", "MONGODB", "GROQ API", "ELEVENLABS TTS"],
        tags: ["AI", "FULLSTACK", "VOICE-AI"],
        imageUrl: "/images/orion-ai-cover.png",
        detailImageUrl: "/images/orion-ai-cover.png",
        githubUrl: "https://github.com/SheinRG/didallfornothing-",
        liveUrl: "https://didallfornothing-client.vercel.app"
      },
      {
        title: "COMING SOON",
        chapterNumber: "CHAPTER 3",
        description: "The next big project is currently being forged in the lab. Stay tuned — something epic is on the way that will push the boundaries of what's possible.",
        techStack: [],
        tags: ["TBA"],
        imageUrl: "",
        githubUrl: "",
        liveUrl: ""
      }
    ]);

    await Experience.create([
      {
        title: "SOFTWARE ENGINEERING INTERN: TECH-TITANS HQ",
        description: "Infiltrated the front-lines of a fast-paced development squad. Mastered the art of high-performance UI architecture and squashed legacy dependencies with precision.",
        projects: ["Comic-Style Dashboard Prototype", "Real-time Mission Tracker"],
        certificateUrl: "https://certificates.demo/internship-01",
        colorTheme: "yellow"
      },
      {
        title: "AI/ML DEVELOPMENT INTERN: NEURAL NEXUS",
        description: "Harnessed the power of LLMs and neural architectures to automate mission-critical analysis. Training advanced models to recognize technical debt at a glance.",
        projects: ["Neural Bug-Squasher API", "Multiverse Sentiment Analyzer"],
        certificateUrl: "https://certificates.demo/internship-02",
        colorTheme: "blue"
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
