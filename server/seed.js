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
        title: "MARKET MANIA",
        chapterNumber: "CHAPTER 2",
        description: "A blazingly fast e-commerce engine optimized for high-concurrency event-driven sales. Features a custom comic-book UI with a seamless Stripe integration.",
        techStack: ["NEXT.JS", "TAILWIND", "REDIS"],
        tags: ["ECOMMERCE", "STRIPE"],
        imageUrl: "https://res.cloudinary.com/dzvk7f4jx/image/upload/v1/projects/market-mania.jpg",
        githubUrl: "https://github.com/raghav/market-mania",
        liveUrl: "https://market-mania.demo"
      },
      {
        title: "DATA PRISM",
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
