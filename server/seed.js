import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Experience from './models/Experience.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Project.deleteMany({});
    await Experience.deleteMany({});

    await Project.create([
      {
        title: "PROJECT 01: AI NEXUS",
        chapterNumber: "CHAPTER 1",
        description: "A high-performance neural network designed to identify and eliminate UI bugs before they reach production. It uses a bespoke attention mechanism for pinpoint accuracy.",
        techStack: ["PYTHON", "TENSORFLOW", "FASTAPI"],
        tags: ["LLM", "OPS"],
        imageUrl: "https://res.cloudinary.com/dzvk7f4jx/image/upload/v1/projects/ai-nexus.jpg", // Placeholder URL structure
        githubUrl: "https://github.com/raghav/ai-nexus",
        liveUrl: "https://ai-nexus.demo"
      },
      {
        title: "PROJECT 02: MARKET MANIA",
        chapterNumber: "CHAPTER 2",
        description: "A blazingly fast e-commerce engine optimized for high-concurrency event-driven sales. Features a custom comic-book UI with a seamless Stripe integration.",
        techStack: ["NEXT.JS", "TAILWIND", "REDIS"],
        tags: ["ECOMMERCE", "STRIPE"],
        imageUrl: "https://res.cloudinary.com/dzvk7f4jx/image/upload/v1/projects/market-mania.jpg",
        githubUrl: "https://github.com/raghav/market-mania",
        liveUrl: "https://market-mania.demo"
      },
      {
        title: "PROJECT 03: DATA PRISM",
        chapterNumber: "CHAPTER 3",
        description: "A real-time data visualization platform that turns complex metrics into stunning interactive comic graphs. Used by heroes across the digital multiverse.",
        techStack: ["D3.JS", "TYPESCRIPT", "AWS LAMBDA"],
        tags: ["BI", "DATAVIZ"],
        imageUrl: "https://res.cloudinary.com/dzvk7f4jx/image/upload/v1/projects/data-prism.jpg",
        githubUrl: "https://github.com/raghav/data-prism",
        liveUrl: "https://data-prism.demo"
      }
    ]);

    await Experience.create([
      {
        title: "LEAD ENGINEER: XYZ CORP.",
        description: "Spearheaded the transformation of a monolithic legacy system into a high-octane microservices architecture. Reduced technical debt by 40%.",
        colorTheme: "blue"
      },
      {
        title: "OPEN SOURCE AVENGER",
        description: "Contributed over 50+ PRs to major open-source projects including React and Framer Motion. Championing the developer community one bug at a time.",
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
