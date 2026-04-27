"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';

// Spring animation config reused across hero elements
const springPop = (delay) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: 'spring', bounce: 0.55, duration: 0.8, delay },
});

// Manga panel placeholder data — 3 panels only
const mangaPanels = [
  { id: 1, gridArea: '1 / 1 / 3 / 2', label: 'CHAPTER 01' }, // tall left panel
  { id: 2, gridArea: '1 / 2 / 2 / 3', label: 'CHAPTER 02' }, // top right
  { id: 3, gridArea: '2 / 2 / 3 / 3', label: 'CHAPTER 03' }, // bottom right
];

// Static experience card placeholders
const expCards = [
  { id: 1, accentColor: 'bg-comicYellow' },
  { id: 2, accentColor: 'bg-[#6dbbfc]' },
];

const MangaPanel = ({ children, image, title, sub, className, side = 'left', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -100 : 100, rotate: side === 'left' ? -5 : 5 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: 'spring', bounce: 0.4, duration: 1, delay }}
      className={`relative border-[8px] border-comicBlack dark:border-border bg-card shadow-[12px_12px_0_var(--border)] overflow-hidden group cursor-crosshair ${className}`}
    >
      <div className="absolute inset-0 z-0 bg-comicBlack/5 group-hover:bg-transparent transition-colors duration-500"></div>
      {image && <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />}

      <div className="absolute inset-0 z-10 pointer-events-none p-4 flex flex-col justify-end bg-gradient-to-t from-comicBlack/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h4 className="font-bangers text-2xl text-comicYellow tracking-widest leading-none drop-shadow-[2px_2px_0_#000]">{title}</h4>
        <p className="font-comic font-bold text-xs text-white uppercase mt-1 tracking-tighter italic">{sub}</p>
      </div>

      {/* Comic Border Accents */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-comicBlack rotate-45 translate-x-6 -translate-y-6"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-comicBlack rotate-45 -translate-x-6 translate-y-6"></div>
    </motion.div>
  );
};

const SpeechBubble = ({ children, className, side = 'left', delay = 0 }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', bounce: 0.6, duration: 0.8, delay: delay + 0.5 }}
    className={`absolute z-20 bg-card border-4 border-comicBlack dark:border-border p-4 shadow-[4px_4px_0_var(--border)] max-w-[200px] ${className}`}
  >
    <div className={`absolute bottom-[-16px] ${side === 'left' ? 'left-4' : 'right-4'} w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-comicBlack`}></div>
    <div className={`absolute bottom-[-10px] ${side === 'left' ? 'left-[18px]' : 'right-[18px]'} w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-card`}></div>
    <p className="font-comic font-bold text-sm tracking-tight leading-tight text-foreground uppercase italic">{children}</p>
  </motion.div>
);

const SoundEffect = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ scale: 0, rotate: -20, opacity: 0 }}
    whileInView={{ scale: [0, 1.5, 1], rotate: [-20, 10, 0], opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: delay + 0.3 }}
    className={`absolute z-30 font-bangers text-4xl md:text-6xl tracking-widest italic antialiased drop-shadow-[4px_4px_0_var(--border)] pointer-events-none ${className}`}
  >
    {children}
  </motion.div>
);

export default function PortfolioUI() {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSecretIdentityOpen, setIsSecretIdentityOpen] = useState(false);
  const [isPowersOpen, setIsPowersOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedCertificateUrl, setSelectedCertificateUrl] = useState(null);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [actionWords, setActionWords] = useState([]);
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const gridY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const heroLeftY = useTransform(smoothProgress, [0, 0.2], [0, 100]);
  const heroRightY = useTransform(smoothProgress, [0, 0.2], [0, -100]);
  const projectParallaxEven = useTransform(smoothProgress, [0.1, 0.5], [0, 40]);
  const projectParallaxOdd = useTransform(smoothProgress, [0.1, 0.5], [0, -40]);
  const expParallaxEven = useTransform(smoothProgress, [0.3, 0.8], [0, 40]);
  const expParallaxOdd = useTransform(smoothProgress, [0.3, 0.8], [0, -40]);


  // Trigger floating action words (POW, ZAP, BOOM)
  const triggerActionWord = (x, y) => {
    const words = ['POW!', 'ZAP!', 'BOOM!', 'WHAM!', 'KAPOW!'];
    const newWord = {
      id: Date.now(),
      text: words[Math.floor(Math.random() * words.length)],
      x, y,
      rotate: Math.random() * 40 - 20
    };
    setActionWords(prev => [...prev, newWord]);
    setTimeout(() => {
      setActionWords(prev => prev.filter(w => w.id !== newWord.id));
    }, 1000);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5001/api/projects').then(res => res.json()).catch(() => []),
      fetch('http://localhost:5001/api/experiences').then(res => res.json()).catch(() => [])
    ]).then(([projData, expData]) => {
      setProjects(Array.isArray(projData) ? projData : []);
      setExperiences(Array.isArray(expData) ? expData : []);
      setLoading(false);
    });
  }, []);

  if (!mounted) return null;

  const darkMode = theme === 'dark';

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsMessageSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setIsMessageSent(false);
          setIsContactOpen(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Transmission Interrupted!", err);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 bg-background text-foreground relative`}
      onClick={(e) => triggerActionWord(e.clientX, e.clientY)}
    >
      {/* Full Page Halftone Grid Background with Parallax */}
      <motion.div className="fixed inset-0 halftone-bg opacity-[0.03] pointer-events-none z-0" style={{ y: gridY }}></motion.div>
      {/* Floating Action Words Layer */}
      <AnimatePresence>
        {actionWords.map(word => (
          <motion.div
            key={word.id}
            initial={{ scale: 0, opacity: 0, x: word.x - 50, y: word.y - 50 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="fixed z-[100] pointer-events-none font-bangers text-4xl md:text-6xl text-comicYellow"
            style={{
              rotate: word.rotate,
              textShadow: '4px 4px 0px var(--primary), 8px 8px 0px var(--border)'
            }}
          >
            {word.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* TopNavBar */}
      <nav className="w-full sticky top-0 z-50 border-b-4 border-zinc-950 shadow-[0px_4px_0px_0px_rgba(255,222,0,1)] bg-white dark:bg-zinc-900 flex justify-between items-center h-20 px-6 md:px-12">
        <a className="text-3xl font-black italic tracking-widest text-zinc-950 bg-[#FFDE00] px-4 border-4 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" href="#">PORTFOLIO</a>
        <div className="hidden md:flex gap-6 font-headline-md text-sm font-bold tracking-tighter uppercase text-zinc-950 dark:text-white items-center">
          <button onClick={() => setIsSecretIdentityOpen(true)} className="bg-surface dark:bg-zinc-800 text-on-surface px-4 py-2 brutal-border brutal-shadow hover:-translate-y-1 hover:bg-[#FFDE00] hover:text-zinc-950 transition-all duration-200 cursor-pointer">ABOUT</button>
          <button onClick={() => setIsContactOpen(true)} className="bg-surface dark:bg-zinc-800 text-on-surface px-4 py-2 brutal-border brutal-shadow hover:-translate-y-1 hover:bg-[#FFDE00] hover:text-zinc-950 transition-all duration-200 cursor-pointer">CONTACT</button>
          <button onClick={() => setIsPowersOpen(true)} className="bg-surface dark:bg-zinc-800 text-on-surface px-4 py-2 brutal-border brutal-shadow hover:-translate-y-1 hover:bg-[#FFDE00] hover:text-zinc-950 transition-all duration-200 cursor-pointer">POWERS</button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => setIsResumeOpen(true)} className="bg-primary text-on-primary font-headline-md text-sm font-bold tracking-tighter uppercase px-6 py-2 brutal-border brutal-shadow hover:-translate-y-1 transition-all duration-200 flex items-center gap-2">
            VIEW RESUME <span className="text-xs">→</span>
          </button>
        </div>

        <button className="md:hidden p-2 brutal-border bg-[#FFDE00] brutal-shadow">
          <span className="font-bold text-zinc-950">MENU</span>
        </button>
      </nav>

      <main className="flex-grow w-full max-w-container-max mx-auto px-6 md:px-12 py-12 flex flex-col gap-24 relative z-10">
        {/* Hero Section */}
        <section className="relative w-full min-h-[614px] grid grid-cols-1 md:grid-cols-2 items-center gap-12 py-20 border-b-4 border-on-background">
          
          {/* Left Content */}
          <motion.div 
            className="flex flex-col justify-center items-start gap-8 z-10" 
            style={{ y: heroLeftY }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative inline-block brutal-border bg-primary-container brutal-shadow px-8 py-4 rotate-[-2deg]">
              <h1 className="font-headline-xl text-headline-xl text-on-background uppercase m-0 leading-none">
                Hello! <br /> I&apos;M RAGHAV.
              </h1>
              <div className="absolute -top-6 -right-6 bg-tertiary text-on-tertiary font-label-bold text-label-bold px-4 py-2 brutal-border rotate-[12deg] shadow-[4px_4px_0px_0px_#1b1b1c]">
                AVAILABLE NOW!
              </div>
            </div>

            <p className="font-body-lg text-body-lg text-on-background max-w-2xl mt-6 bg-surface dark:bg-black p-6 brutal-border shadow-[4px_4px_0px_0px_#1b1b1c] relative">
              Pre-final year Computer Science student at Amity University Rajasthan with hands-on experience building and deploying full-stack applications using the MERN stack, FastAPI, and cloud infrastructure. Experienced in backend engineering, REST API design, and LLM API integration across production systems. Proficient in JavaScript, C++, and Python. Solved 150+ problems on Leetcode with a focus on data structures and algorithms.
              <span className="absolute -bottom-4 left-12 w-8 h-8 bg-surface dark:bg-black brutal-border rotate-45 border-t-0 border-l-0"></span>
            </p>

            <div className="flex gap-6 mt-8">
              <button onClick={() => setIsContactOpen(true)} className="bg-secondary text-on-secondary font-headline-md text-headline-md px-8 py-4 brutal-border brutal-shadow brutal-button-hover uppercase">
                LET&apos;S CONNECT
              </button>
            </div>
          </motion.div>

          {/* Right Content: Profile Picture */}
          <motion.div 
            className="relative flex justify-center items-center z-10" 
            style={{ y: heroRightY }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Decorative Starburst */}
            <div className="absolute -top-10 -right-10 w-32 h-32 text-primary opacity-20 animate-pulse">
              <svg fill="currentColor" viewBox="0 0 100 100">
                <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z"></path>
              </svg>
            </div>

            {/* Image Container */}
            <div className="relative w-full max-w-[400px] aspect-square brutal-border bg-white rotate-3 brutal-shadow overflow-hidden group">
              <div className="absolute inset-0 halftone-bg opacity-20 z-0"></div>
              <img alt="Raghav Profile" className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply relative z-10 group-hover:grayscale-0 transition-all duration-300" src="/profile.jpg" />
            </div>

            {/* Action Lines / Accents */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-8 border-b-8 border-zinc-950 dark:border-white"></div>
            <div className="absolute top-1/4 -right-8 flex flex-col gap-2">
              <div className="w-12 h-3 bg-zinc-950 dark:bg-white skew-x-[-20deg]"></div>
              <div className="w-16 h-3 bg-zinc-950 dark:bg-white skew-x-[-20deg]"></div>
              <div className="w-10 h-3 bg-zinc-950 dark:bg-white skew-x-[-20deg]"></div>
            </div>
          </motion.div>
        </section>

        {/* Work Section */}
        <section className="w-full flex flex-col gap-12" id="work">
          <div className="flex items-center gap-6">
            <h2 className="font-headline-lg text-headline-lg text-on-background uppercase bg-primary-fixed px-6 py-2 brutal-border shadow-[4px_4px_0px_0px_#1b1b1c] inline-block skew-x-[-5deg]">
              FEATURED PROJECTS
            </h2>
            <div className="h-1 bg-on-background flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {projects.map((project, idx) => (
              <motion.article
                key={project._id || idx}
                className={`bg-surface dark:bg-zinc-900 brutal-border brutal-shadow flex flex-col h-full group overflow-hidden relative cursor-pointer`}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, scale: 0.95, rotate: idx % 2 === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ y: idx % 2 === 0 ? projectParallaxEven : projectParallaxOdd }}
              >
                <div className={`absolute top-4 right-4 ${idx % 2 === 0 ? 'bg-tertiary-container text-on-tertiary-container rotate-3' : 'bg-primary-container text-on-primary-container -rotate-2'} font-label-bold text-label-bold px-3 py-1 brutal-border z-10`}>
                  {project.tags?.[0] || 'FULL-STACK'}
                </div>
                <div className="h-64 w-full bg-surface-variant border-b-3 border-on-background relative overflow-hidden">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 scale-105 group-hover:scale-100" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-30">
                      <span className="font-headline-md">NO IMAGE</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col gap-4 bg-white dark:bg-black relative flex-grow">
                  <div className={`absolute ${idx % 2 === 0 ? 'top-0 right-0 w-16 h-16' : 'bottom-0 left-0 w-24 h-24'} halftone-bg opacity-20`}></div>
                  <h3 className="font-headline-md text-[28px] leading-tight text-on-background uppercase">{project.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{project.description}</p>
                  <div className="font-label-bold text-label-bold text-secondary uppercase flex items-center gap-2 mt-auto hover:underline decoration-3 underline-offset-4 w-max">
                    READ CASE STUDY →
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <div className="flex-grow w-full max-w-container-max mx-auto px-6 md:px-12 py-12 flex flex-col gap-24">
        {/* ═══════════════════════════════════════════════════ */}
        {/* BATTLE LOG — EXPERIENCE SECTION                    */}
        {/* ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary-fixed text-on-background font-headline-lg px-6 py-2 brutal-border shadow-[4px_4px_0px_0px_#1b1b1c] inline-block skew-x-[-5deg] uppercase">
              BATTLE LOG
            </div>
            <div className="flex-1 h-1 bg-on-background"></div>
          </div>

          {/* Experience Cards */}
          <div className="flex flex-col gap-16">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp._id}
                className={`bg-surface dark:bg-zinc-900 brutal-border brutal-shadow flex flex-col md:flex-row overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}
                initial={{ opacity: 0, scale: 0.9, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.35, delay: idx * 0.15 }}
                style={{ y: idx % 2 === 0 ? expParallaxEven : expParallaxOdd }}
              >
                {/* Specialized 'No Image' Icon Section for Internships */}
                <div className={`${exp.colorTheme === 'yellow' ? 'bg-primary-container' : 'bg-secondary-container'} border-b-3 md:border-b-0 md:border-r-3 border-on-background flex-shrink-0 w-full md:w-56 h-48 md:h-auto relative flex flex-col items-center justify-center gap-3 p-6`}>
                  <div className="absolute inset-0 halftone-bg opacity-20"></div>
                  {/* Comic-style Badge instead of Logo */}
                  <div className="relative z-10 w-24 h-24 brutal-border rounded-xl flex items-center justify-center bg-white dark:bg-black rotate-3 shadow-[4px_4px_0px_0px_#1b1b1c]">
                    <span className="text-5xl text-on-background">
                      {exp.title.includes('SOFTWARE') ? '👾' : '🧠'}
                    </span>
                  </div>
                  <div className="relative z-10 bg-on-background text-white px-3 py-1 font-label-bold text-xs tracking-widest transform -rotate-2">
                    LEVEL {idx + 1}
                  </div>
                </div>

                {/* Text content area */}
                <div className="flex-1 p-8 flex flex-col gap-4 justify-center bg-white dark:bg-black">
                  <div>
                    <h3 className="font-headline-md text-[28px] leading-tight text-on-background uppercase">{exp.title}</h3>
                    <p className={`font-label-bold text-on-surface-variant uppercase mt-1`}>Active Mission Profile</p>
                  </div>

                  <p className={`font-body-md text-on-background`}>
                    {exp.description}
                  </p>

                  {/* Projects done during internship */}
                  {exp.projects && exp.projects.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2">
                      <span className="font-label-bold text-secondary uppercase">MISSION ACCOMPLISHED:</span>
                      <div className="flex flex-wrap gap-2">
                        {exp.projects.map(p => (
                          <span key={p} className="bg-surface-variant text-on-surface-variant px-3 py-1 brutal-border font-label-bold text-xs uppercase">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certificate Link */}
                  {exp.certificateUrl && (
                    <button onClick={() => setSelectedCertificateUrl(exp.certificateUrl)}
                      className="self-start mt-4 bg-on-background text-white px-6 py-2 font-label-bold tracking-widest text-sm hover:bg-secondary transition-colors brutal-border brutal-shadow brutal-button-hover flex items-center gap-2">
                      VIEW CERTIFICATE →
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* PROJECT DETAIL MODAL                                */}
      {/* ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            ></div>

            {/* Modal Content */}
            <motion.div
              className="relative bg-surface dark:bg-zinc-900 brutal-border brutal-shadow max-w-2xl w-full max-h-[85vh] overflow-y-auto z-10"
              initial={{ scale: 0, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 5 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              {/* Header */}
              <div className="bg-primary-container p-6 border-b-3 border-on-background relative">
                <button
                  className="absolute top-4 right-4 bg-on-background text-white font-label-bold text-xl w-10 h-10 flex items-center justify-center border-2 border-on-background hover:bg-secondary hover:text-on-secondary transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
                <h2 className="font-headline-xl text-[40px] leading-none text-on-primary-container uppercase pr-12">
                  {selectedProject.title}
                </h2>
              </div>

              {/* Image */}
              {(selectedProject.detailImageUrl || selectedProject.imageUrl) && (
                <div className="h-64 w-full bg-surface-variant border-b-3 border-on-background overflow-hidden flex items-center justify-center relative">
                  <div className="absolute inset-0 halftone-bg opacity-10"></div>
                  <img src={selectedProject.detailImageUrl || selectedProject.imageUrl} alt={selectedProject.title} className={`relative z-10 ${selectedProject.detailImageUrl ? 'h-full w-auto object-contain p-4' : 'w-full h-full object-cover'}`} />
                </div>
              )}

              {/* Body */}
              <div className="p-8 flex flex-col gap-6 bg-white dark:bg-black">
                <p className="font-body-lg text-on-background">
                  {selectedProject.description}
                </p>

                {/* Tech Stack */}
                {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="font-label-bold text-primary uppercase">TECH ARSENAL:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map(tech => (
                        <span key={tech} className="bg-surface-variant text-on-surface-variant px-3 py-1 brutal-border font-label-bold text-xs uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="bg-tertiary-container text-on-tertiary-container px-4 py-1 brutal-border font-label-bold text-xs uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-4 mt-2">
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="bg-secondary text-on-secondary brutal-border brutal-shadow brutal-button-hover px-6 py-3 font-label-bold text-sm tracking-widest uppercase flex items-center gap-2 transition-all">
                      LIVE DEMO →
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="bg-on-background text-white brutal-border brutal-shadow brutal-button-hover hover:bg-primary px-6 py-3 font-label-bold text-sm tracking-widest uppercase flex items-center gap-2 transition-all">
                      SOURCE CODE 💻
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CONTACT MODAL                                     */}
      {/* ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsContactOpen(false)}></div>

            <motion.div
              className="relative bg-surface dark:bg-zinc-900 brutal-border brutal-shadow max-w-xl w-full z-10 overflow-hidden"
              initial={{ y: 100, rotate: 2 }} animate={{ y: 0, rotate: 0 }} exit={{ y: 100, rotate: -2 }}
            >
              {/* Header */}
              <div className="bg-secondary-container p-6 border-b-3 border-on-background flex justify-between items-center text-on-secondary-container">
                <h2 className="font-headline-lg text-3xl uppercase m-0 leading-none">
                  SEND A SOS!
                </h2>
                <button onClick={() => setIsContactOpen(false)} className="bg-on-background text-white font-label-bold text-xl w-10 h-10 border-2 border-on-background hover:bg-primary transition-colors flex justify-center items-center">✕</button>
              </div>

              {/* Form Body */}
              <div className="p-8 bg-white dark:bg-black">
                {isMessageSent ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-12 gap-6 text-center"
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                  >
                    <div className="bg-primary-container text-on-primary-container font-headline-xl text-6xl px-12 py-6 brutal-border brutal-shadow transform rotate-[-3deg]">
                      KAPOW!
                    </div>
                    <p className="font-body-lg text-on-background mt-4">
                      Transmission Successful, Hero! <br /> I&apos;ll get back to you across the multiverse.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-label-bold text-on-surface-variant uppercase">NAME / IDENTITY:</label>
                      <input
                        type="text" required value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-surface border-3 border-on-background p-4 font-body-md focus:bg-white dark:focus:bg-zinc-900 outline-none transition-colors"
                        placeholder="E.G. PETER PARKER"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-bold text-on-surface-variant uppercase">COMM CHANNEL (EMAIL):</label>
                      <input
                        type="email" required value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-surface border-3 border-on-background p-4 font-body-md focus:bg-white dark:focus:bg-zinc-900 outline-none transition-colors"
                        placeholder="AVENGER@HQ.COM"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-bold text-on-surface-variant uppercase">TRANSMISSION (MESSAGE):</label>
                      <textarea
                        rows="4" required value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-surface border-3 border-on-background p-4 font-body-md focus:bg-white dark:focus:bg-zinc-900 outline-none transition-colors resize-none"
                        placeholder="WHAT'S THE MISSION, BOSS?"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 bg-primary text-on-primary px-8 py-4 brutal-border brutal-shadow brutal-button-hover font-label-bold text-sm tracking-widest uppercase transition-all"
                    >
                      SEND TRANSMISSION! 🚀
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECRET IDENTITY MODAL (ABOUT ME)                   */}
      {/* ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isSecretIdentityOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsSecretIdentityOpen(false)}></div>
            <motion.div
              className={`relative bg-surface dark:bg-zinc-900 border-3 border-on-background brutal-shadow max-w-2xl w-full z-10 overflow-hidden`}
              initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }}
            >
              <div className="bg-tertiary-container text-on-tertiary-container p-6 border-b-3 border-on-background flex justify-between items-center">
                <h2 className="font-headline-lg text-3xl uppercase m-0 leading-none">AGENT DOSSIER: RAGHAV</h2>
                <button onClick={() => setIsSecretIdentityOpen(false)} className="bg-on-background text-white font-label-bold text-xl w-10 h-10 border-2 border-on-background flex items-center justify-center">✕</button>
              </div>
              <div className="p-8 flex flex-col gap-6 bg-white dark:bg-black">
                <div className="flex gap-6 items-start">
                  <div className="w-32 h-32 brutal-border bg-surface flex-shrink-0 rotate-2 overflow-hidden shadow-[4px_4px_0_#1b1b1c]">
                    <img src="/profile.jpg" alt="Agent Profile" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300 scale-110" />
                  </div>
                  <div className="flex-1">
                    <p className="font-headline-md text-2xl text-secondary mb-2 uppercase italic">&quot;The Code-Squashing Avenger&quot;</p>
                    <p className="font-body-md text-on-background">
                      A high-octane Fullstack Developer with a passion for building cinematic, interactive web experiences.
                      Focused on merging the art of storytelling with the precision of engineering.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="border-3 border-dashed border-on-background/20 p-4">
                    <span className="font-label-bold text-primary block mb-1 uppercase">EDUCATION</span>
                    <p className="font-body-md text-sm text-on-background">B.Tech CSE @ Amity University Rajasthan (2023-2027)<br/>CGPA: 7.56</p>
                  </div>
                  <div className="border-3 border-dashed border-on-background/20 p-4">
                    <span className="font-label-bold text-primary block mb-1 uppercase">MISSION LOG</span>
                    <p className="font-body-md text-sm text-on-background">150+ LeetCode Challenges Crushed. Multiple Successful Deployments.</p>
                  </div>
                </div>
                <div className="bg-surface-variant p-4 brutal-border relative overflow-hidden">
                  <div className="absolute inset-0 halftone-bg opacity-10"></div>
                  <p className="font-body-md italic text-center text-on-background relative z-10">
                    &quot;I don&apos;t just write code; I craft digital narratives that resonate. Every bug squashed is a step toward a more seamless multiverse.&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* POWERS & ABILITIES MODAL (SKILLS)                  */}
      {/* ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isPowersOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsPowersOpen(false)}></div>
            <motion.div
              className={`relative bg-surface dark:bg-zinc-900 border-3 border-on-background brutal-shadow max-w-2xl w-full z-10 overflow-hidden`}
              initial={{ scale: 0.8, rotate: 2 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.8, rotate: -2 }}
            >
              <div className="bg-primary-container text-on-primary-container p-6 border-b-3 border-on-background flex justify-between items-center">
                <h2 className="font-headline-lg text-3xl uppercase m-0 leading-none">POWERS & ABILITIES</h2>
                <button onClick={() => setIsPowersOpen(false)} className="bg-on-background text-white font-label-bold text-xl w-10 h-10 border-2 border-on-background flex items-center justify-center">✕</button>
              </div>
              <div className="p-8 flex flex-col gap-8 bg-white dark:bg-black">
                {/* DSA Power Card */}
                <div className="bg-surface-variant text-on-surface-variant brutal-border p-6 shadow-[6px_6px_0px_#1b1b1c] transform rotate-[-1deg]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-headline-md text-2xl uppercase">ALGORITHMIC MASTERY</span>
                    <span className="bg-on-background text-white px-3 py-1 font-label-bold text-xl">150+</span>
                  </div>
                  <div className="w-full bg-surface h-6 border-3 border-on-background relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 bottom-0 bg-secondary"
                      initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1.5, delay: 0.2 }}
                    />
                  </div>
                  <p className="font-label-bold text-xs mt-3 uppercase">LeetCode Challenges Crushed in the Digital Arena</p>
                </div>

                {/* Tech Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-4">
                    <span className="font-label-bold text-primary uppercase text-xl">LANGUAGES & AI</span>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'TypeScript', 'Python', 'C++', 'Claude API', 'Groq API', 'LangChain', 'RAG'].map(tech => (
                        <span key={tech} className={`px-3 py-1 brutal-border font-label-bold text-xs uppercase bg-surface text-on-surface`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="font-body-md text-sm italic text-on-background">Integrating LLMs and deploying semantic search pipelines.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="font-label-bold text-secondary uppercase text-xl">FRAMEWORKS & CLOUD</span>
                    <div className="flex flex-wrap gap-2">
                      {['React.js', 'Next.js', 'Node.js', 'FastAPI', 'Tailwind', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'].map(tech => (
                        <span key={tech} className={`px-3 py-1 brutal-border font-label-bold text-xs uppercase bg-surface text-on-surface`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Training Stats */}
                <div className="bg-surface p-4 border-3 border-dashed border-on-background flex items-center justify-around relative overflow-hidden">
                  <div className="absolute inset-0 halftone-bg opacity-10"></div>
                  <div className="text-center relative z-10">
                    <span className="font-headline-lg text-3xl block text-secondary">100%</span>
                    <span className="font-label-bold text-xs text-on-background">DETERMINATION</span>
                  </div>
                  <div className="text-center relative z-10">
                    <span className="font-headline-lg text-3xl block text-primary">∞</span>
                    <span className="font-label-bold text-xs text-on-background">IMAGINATION</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* RESUME PDF VIEWER MODAL                            */}
      {/* ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsResumeOpen(false)}></div>
            <motion.div
              className={`relative bg-surface dark:bg-zinc-900 border-4 border-on-background brutal-shadow w-full max-w-5xl h-[90vh] z-10 flex flex-col`}
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            >
              <div className="bg-primary-container text-on-primary-container p-4 border-b-4 border-on-background flex justify-between items-center">
                <h2 className="font-headline-lg text-2xl uppercase m-0 leading-none">RAGHAV_RESUME.PDF</h2>
                <button onClick={() => setIsResumeOpen(false)} className="bg-on-background text-white font-label-bold text-xl w-10 h-10 border-2 border-on-background flex items-center justify-center brutal-button-hover">✕</button>
              </div>
              <div className="flex-1 w-full bg-zinc-200 dark:bg-zinc-800">
                <iframe src="/resume.pdf" className="w-full h-full border-0" title="Resume PDF"></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CERTIFICATE PDF VIEWER MODAL                       */}
      {/* ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedCertificateUrl && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedCertificateUrl(null)}></div>
            <motion.div
              className={`relative bg-surface dark:bg-zinc-900 border-4 border-on-background brutal-shadow w-full max-w-5xl h-[90vh] z-10 flex flex-col`}
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            >
              <div className="bg-secondary-container text-on-secondary-container p-4 border-b-4 border-on-background flex justify-between items-center">
                <h2 className="font-headline-lg text-2xl uppercase m-0 leading-none">VERIFIED_CREDENTIAL.PDF</h2>
                <button onClick={() => setSelectedCertificateUrl(null)} className="bg-on-background text-white font-label-bold text-xl w-10 h-10 border-2 border-on-background flex items-center justify-center brutal-button-hover">✕</button>
              </div>
              <div className="flex-1 w-full bg-zinc-200 dark:bg-zinc-800">
                <iframe src={selectedCertificateUrl} className="w-full h-full border-0" title="Certificate PDF"></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="w-full border-t-4 border-zinc-950 py-12 bg-zinc-950 dark:bg-black flex flex-col md:flex-row justify-between items-center px-12 max-w-full gap-8">
        <div className="text-[#FFDE00] font-black italic text-2xl">
          HERO_PORTFOLIO
        </div>
        <div className="flex flex-wrap gap-6 font-label-bold font-medium text-xs uppercase tracking-widest">
          <a className="text-zinc-400 hover:text-[#FFDE00] transition-colors duration-200 active:opacity-80" href="#">GITHUB</a>
          <a className="text-[#FFDE00] underline decoration-4 underline-offset-8 active:opacity-80" href="#">LINKEDIN</a>
          <a className="text-zinc-400 hover:text-[#FFDE00] transition-colors duration-200 active:opacity-80" href="#">DRIBBBLE</a>
          <a className="text-zinc-400 hover:text-[#FFDE00] transition-colors duration-200 active:opacity-80" href="#">EMAIL</a>
        </div>
        <div className="font-label-bold font-medium text-xs uppercase tracking-widest text-zinc-400">
          © 2024 HERO CREATIVE. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
