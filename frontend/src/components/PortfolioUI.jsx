"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isMessageSent, setIsMessageSent] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [actionWords, setActionWords] = useState([]);

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
    Promise.all([
      fetch('http://localhost:5001/api/projects').then(res => res.json()).catch(() => []),
      fetch('http://localhost:5001/api/experiences').then(res => res.json()).catch(() => [])
    ]).then(([projData, expData]) => {
      setProjects(Array.isArray(projData) ? projData : []);
      setExperiences(Array.isArray(expData) ? expData : []);
      setLoading(false);
      setMounted(true);
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
      className={`min-h-screen transition-colors duration-500 bg-background text-foreground`}
      onClick={(e) => triggerActionWord(e.clientX, e.clientY)}
    >
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

      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-10 relative pt-16">
        
        {/* Multiverse Toggle */}
        <div className="absolute top-6 right-8 z-40 flex items-center gap-4">
          <span className={`font-bangers tracking-tight transition-opacity ${darkMode ? 'opacity-100 text-comicBlue' : 'opacity-40'}`}>NOIR</span>
          <button 
            onClick={(e) => { e.stopPropagation(); setTheme(darkMode ? 'light' : 'dark'); }}
            className={`w-20 h-10 rounded-full border-4 border-comicBlack dark:border-border p-1 transition-all duration-300 relative ${darkMode ? 'bg-secondary' : 'bg-accent'}`}
          >
            <motion.div 
              className="w-6 h-6 bg-white border-2 border-comicBlack rounded-full shadow-[2px_2px_0px_rgba(0,0,0,0.2)]"
              animate={{ x: darkMode ? 40 : 0 }}
            />
          </button>
          <span className={`font-bangers tracking-tight transition-opacity ${!darkMode ? 'opacity-100 text-accent' : 'opacity-40'}`}>GOLDEN</span>
        </div>

      {/* Main Grid Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Left Hero Panel */}
        <motion.div 
          className="lg:col-span-3 bg-card border-8 border-comicBlack dark:border-border shadow-[12px_12px_0_var(--border)] p-8 md:p-16 relative flex flex-col items-center justify-center text-center gap-6 group overflow-hidden min-h-[450px]"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          {/* Halftone background pattern */}
          <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center w-full">
             {/* 1st: Badge - delay 0.3 */}
             <motion.div 
               className="bg-primary text-primary-foreground font-bangers tracking-widest text-2xl md:text-3xl px-8 py-3 border-4 border-comicBlack transform rotate-[-4deg] mb-6 shadow-[6px_6px_0px_var(--border)]"
               {...springPop(0.3)}
             >
                CODE-SQUASHING AVENGER!
             </motion.div>
             
             {/* 2nd: First name - delay 0.5 */}
             <h2 className="font-bangers text-[5.5rem] md:text-[8rem] lg:text-[9.5rem] leading-[0.8] tracking-widest uppercase relative flex flex-col items-center">
               <motion.span 
                 className="text-primary transform -rotate-2 block" 
                 style={{ WebkitTextStroke: '3px var(--border)', textShadow: '8px 8px 0px var(--border)' }}
                 {...springPop(0.5)}
               >
                 RAGHAV
               </motion.span>
               {/* 3rd: Last name - delay 0.7 */}
               <motion.span 
                 className="text-secondary transform rotate-1 mt-2 block" 
                 style={{ WebkitTextStroke: '3px var(--border)', textShadow: '8px 8px 0px var(--border)' }}
                 {...springPop(0.7)}
               >
                 GANGWAR
               </motion.span>
             </h2>

             {/* 4th: Tagline - delay 0.9 */}
             <motion.p 
               className="font-comic font-bold text-xl md:text-2xl text-accent-foreground max-w-2xl mt-12 leading-relaxed bg-accent px-8 py-5 border-4 border-comicBlack dark:border-border shadow-[6px_6px_0px_var(--border)] transform rotate-2"
               {...springPop(0.9)}
             >
               Fighting technical debt and squashing bugs across the digital multiverse. Welcome to the hero&apos;s gallery of high-octane engineering!
             </motion.p>
          </div>
        </motion.div>

        {/* Right Sidebar Panel */}
        <motion.div 
          className="lg:col-span-1 flex flex-col gap-6"
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Profile Badge w/ Avatar — name removed, photo enlarged */}
          <div className="flex flex-col items-center p-6 border-b-[3px] border-comicBlack border-dashed">
            <div className="w-48 h-48 bg-comicBlack border-[6px] border-comicBlack rounded-full shadow-[6px_6px_0px_#161616] flex items-center justify-center overflow-hidden mb-4 relative hover:scale-105 transition-transform duration-300">
               <img 
                 src="/profile.jpg" 
                 alt="Raghav Profile Avatar" 
                 className="w-full h-full object-cover scale-[1.3] origin-top -translate-y-4" 
               />
               <div className="absolute inset-0 shadow-[inset_0px_0px_15px_rgba(0,0,0,0.5)] pointer-events-none rounded-full"></div>
            </div>
            <p className="font-comic font-bold text-xs text-white bg-primary border-2 border-comicBlack shadow-[2px_2px_0_var(--border)] transform rotate-[-2deg] uppercase tracking-widest text-center mt-2 px-3 py-1">CODE-SQUASHING AVENGER</p>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsSecretIdentityOpen(true); }}
              className="w-full bg-accent text-accent-foreground border-4 border-comicBlack dark:border-border py-3 font-bangers text-xl tracking-widest shadow-[4px_4px_0px_var(--border)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3"
            >
              <span className="text-xl">⚙</span> SECRET IDENTITY
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsPowersOpen(true); }}
              className="w-full bg-background border-4 border-comicBlack dark:border-border py-3 font-bangers text-xl tracking-widest shadow-[4px_4px_0px_var(--border)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3"
            >
              <span className="text-xl">⚡</span> POWERS &amp; ABILITIES
            </button>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="w-full bg-secondary text-secondary-foreground border-4 border-comicBlack dark:border-border py-4 font-bangers tracking-widest text-2xl shadow-[4px_4px_0px_var(--border)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all mt-2"
            >
              CONNECT!
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Global Button */}
      <div className="absolute right-[-4%] md:right-[-2%] top-[55%] z-30 hidden lg:block">
       <button 
         onClick={() => setIsContactOpen(true)}
         className="bg-comicYellow border-[4px] border-comicBlack font-bangers tracking-widest text-3xl px-8 py-5 shadow-[8px_8px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#161616] transition-all flex items-center gap-3 rotate-2"
       >
         LET&apos;S CONNECT 🚀
       </button>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* MANGA-STYLE PROJECT PANELS                         */}
      {/* ═══════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Section header */}
        <motion.div 
          className="flex items-center gap-4 mb-8"
          {...springPop(0.1)}
        >
          <div className="bg-comicBlack text-white font-bangers text-3xl md:text-4xl tracking-widest px-6 py-3 border-4 border-comicBlack shadow-[4px_4px_0px_#FFC82C] transform -rotate-1">
            📖 PROJECT ARCHIVES
          </div>
          <div className="flex-1 h-[4px] bg-comicBlack"></div>
        </motion.div>

        {/* Manga Panel Grid — 2-column layout: 1 tall left + 2 stacked right */}
        <div 
          className="grid gap-[6px] bg-comicBlack p-[6px] border-8 border-comicBlack shadow-comic"
          style={{
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 260px)',
          }}
        >
          {mangaPanels.map((panel, idx) => {
            // Check if there's a matching project from the API
            const project = projects[idx] || null;

            return (
              <motion.div
                key={panel.id}
                className="bg-card relative overflow-hidden cursor-pointer group"
                style={{ gridArea: panel.gridArea }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.4, delay: 0.1 + idx * 0.08 }}
                whileHover={{ scale: 0.97 }}
                onClick={() => project && setSelectedProject(project)}
              >
                {/* If a project exists, show its thumbnail */}
                {project ? (
                  <>
                    {project.imageUrl && (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="bg-comicBlack text-white font-bangers text-xs px-2 py-0.5 inline-block mb-1 tracking-widest">
                        {panel.label}
                      </div>
                      <h3 className="font-bangers text-white text-2xl tracking-wide leading-tight drop-shadow-lg">
                        {project.title}
                      </h3>
                    </div>
                  </>
                ) : (
                  /* Empty manga panel placeholder */
                  <>
                    {/* Diagonal line hatching to feel like an empty comic panel */}
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, #161616 0, #161616 1px, transparent 0, transparent 50%)',
                      backgroundSize: '12px 12px',
                    }}></div>

                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                      <div className="w-16 h-16 border-[3px] border-dashed border-comicBlack rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-comicBlack" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <span className="font-bangers text-sm tracking-widest text-comicBlack">{panel.label}</span>
                    </div>

                    {/* Corner decorations like manga panels */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-comicBlack/20"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-comicBlack/20"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-comicBlack/20"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-comicBlack/20"></div>
                  </>
                )}

                {/* Speed line hover effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
                  }}
                ></div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

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
          <div className="bg-comicBlack dark:bg-card text-white font-bangers text-3xl md:text-4xl tracking-widest px-6 py-3 border-4 border-comicBlack dark:border-border shadow-[4px_4px_0px_var(--primary)] transform rotate-1">
            ⚡ BATTLE LOG
          </div>
          <div className="flex-1 h-[4px] bg-comicBlack dark:bg-border"></div>
        </div>

        {/* Experience Cards */}
        <div className="flex flex-col gap-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp._id}
              className={`bg-card border-[6px] border-comicBlack dark:border-border shadow-[6px_6px_0px_var(--border)] flex flex-col md:flex-row overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.35, delay: idx * 0.15 }}
            >
              {/* Specialized 'No Image' Icon Section for Internships */}
              <div className={`${exp.colorTheme === 'yellow' ? 'bg-accent' : 'bg-secondary'} border-r-[6px] border-comicBlack dark:border-border flex-shrink-0 w-full md:w-56 h-48 md:h-auto relative flex flex-col items-center justify-center gap-3 p-6`}>
                <div className="absolute inset-0 opacity-[0.2]" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, var(--border) 0, var(--border) 1px, transparent 0, transparent 50%)',
                  backgroundSize: '10px 10px',
                }}></div>
                {/* Comic-style Badge instead of Logo */}
                <div className="relative z-10 w-24 h-24 border-[6px] border-comicBlack dark:border-border rounded-xl flex items-center justify-center bg-card rotate-3 shadow-[4px_4px_0_var(--border)]">
                  <span className="font-bangers text-5xl text-foreground">
                    {exp.title.includes('SOFTWARE') ? '👾' : '🧠'}
                  </span>
                </div>
                <div className="relative z-10 bg-comicBlack dark:bg-border text-white px-3 py-1 font-bangers text-xs tracking-widest transform -rotate-2">
                  LEVEL {idx + 1}
                </div>
              </div>

              {/* Text content area */}
              <div className="flex-1 p-8 flex flex-col gap-4 justify-center">
                <div>
                  <h3 className="font-bangers text-3xl tracking-wide text-primary mb-1">{exp.title}</h3>
                  <p className={`font-comic font-bold text-sm text-foreground/50 uppercase tracking-tight`}>Active Mission Profile</p>
                </div>
                
                <p className={`font-comic font-bold text-lg leading-tight text-foreground/90`}>
                  {exp.description}
                </p>

                {/* Projects done during internship */}
                {exp.projects && exp.projects.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="font-bangers text-sm tracking-widest text-secondary">MISSION ACCOMPLISHED:</span>
                    <div className="flex flex-wrap gap-2">
                      {exp.projects.map(p => (
                        <span key={p} className="bg-transparent border-var border-dashed border-comicBlack/30 dark:border-border/30 px-3 py-1 font-comic font-bold text-xs">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Certificate Link */}
                {exp.certificateUrl && (
                  <a href={exp.certificateUrl} target="_blank" rel="noopener noreferrer" 
                     className="self-start mt-2 bg-comicBlack text-white px-4 py-2 font-bangers tracking-widest text-sm hover:bg-comicRed transition-colors">
                    📜 VIEW CERTIFICATE
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

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
              className="relative bg-card border-8 border-comicBlack dark:border-border shadow-[12px_12px_0px_var(--border)] max-w-2xl w-full max-h-[85vh] overflow-y-auto z-10"
              initial={{ scale: 0, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 5 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              {/* Header */}
              <div className="bg-primary p-6 border-b-6 border-comicBlack relative">
                <button 
                  className="absolute top-4 right-4 bg-comicBlack text-white font-bangers text-xl w-10 h-10 flex items-center justify-center border-2 border-white hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
                <h2 className="font-bangers text-4xl md:text-5xl text-primary-foreground tracking-widest pr-12" style={{ textShadow: '3px 3px 0px var(--border)' }}>
                  {selectedProject.title}
                </h2>
              </div>

              {/* Image */}
              {(selectedProject.detailImageUrl || selectedProject.imageUrl) && (
                <div className="h-64 bg-comicBlack border-b-4 border-comicBlack overflow-hidden flex items-center justify-center">
                  <img src={selectedProject.detailImageUrl || selectedProject.imageUrl} alt={selectedProject.title} className={`${selectedProject.detailImageUrl ? 'h-full w-auto object-contain p-4' : 'w-full h-full object-cover'}`} />
                </div>
              )}

              {/* Body */}
              <div className="p-8 flex flex-col gap-6">
                <p className="font-comic font-bold text-lg leading-relaxed text-foreground/90">
                  {selectedProject.description}
                </p>

                {/* Tech Stack */}
                {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="font-bangers text-sm tracking-widest text-primary">TECH ARSENAL:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map(tech => (
                        <span key={tech} className="bg-accent text-accent-foreground px-3 py-1 border-2 border-comicBlack dark:border-border font-comic font-bold text-xs uppercase shadow-[2px_2px_0px_var(--border)]">
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
                      <span key={tag} className="bg-[#6dbbfc] px-4 py-1 border-[3px] border-comicBlack rounded-full font-bangers tracking-wider text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-4 mt-2">
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="bg-accent text-accent-foreground border-4 border-comicBlack dark:border-border px-6 py-3 font-bangers text-xl tracking-widest shadow-[4px_4px_0px_var(--border)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                      🚀 LIVE DEMO
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="bg-comicBlack text-white border-4 border-comicBlack dark:border-border px-6 py-3 font-bangers text-xl tracking-widest shadow-[4px_4px_0px_var(--accent)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                      💻 SOURCE CODE
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
              className="relative bg-card border-8 border-comicBlack dark:border-border shadow-[15px_15px_0px_var(--border)] max-w-xl w-full z-10 overflow-hidden"
              initial={{ y: 100, rotate: 2 }} animate={{ y: 0, rotate: 0 }} exit={{ y: 100, rotate: -2 }}
            >
              {/* Header */}
              <div className="bg-secondary p-6 border-b-6 border-comicBlack flex justify-between items-center text-secondary-foreground">
                <h2 className="font-bangers text-4xl text-white tracking-widest" style={{ textShadow: '3px 3px 0px var(--border)' }}>
                  SEND A SOS!
                </h2>
                <button onClick={() => setIsContactOpen(false)} className="bg-comicBlack text-white font-bangers text-xl w-10 h-10 border-2 border-white hover:bg-primary transition-colors">✕</button>
              </div>

              {/* Form Body */}
              <div className="p-8">
                {isMessageSent ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center py-12 gap-6 text-center"
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                  >
                    <div className="bg-accent text-accent-foreground font-bangers text-6xl px-12 py-6 border-8 border-comicBlack shadow-[10px_10px_0px_var(--border)] transform rotate-[-3deg]">
                      KAPOW!
                    </div>
                    <p className="font-comic font-bold text-2xl text-foreground tracking-tight mt-4 uppercase">
                      Transmission Successful, Hero! <br /> I'll get back to you across the multiverse.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-bangers text-xl tracking-widest text-foreground">NAME / IDENTITY:</label>
                      <input 
                        type="text" required value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-background border-4 border-comicBlack p-4 font-comic font-bold text-lg focus:bg-card outline-none transition-colors"
                        placeholder="E.G. PETER PARKER"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-bangers text-xl tracking-widest text-foreground">COMM CHANNEL (EMAIL):</label>
                      <input 
                        type="email" required value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-background border-4 border-comicBlack p-4 font-comic font-bold text-lg focus:bg-card outline-none transition-colors"
                        placeholder="AVENGER@HQ.COM"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-bangers text-xl tracking-widest text-foreground">TRANSMISSION (MESSAGE):</label>
                      <textarea 
                        rows="4" required value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-background border-4 border-comicBlack p-4 font-comic font-bold text-lg focus:bg-card outline-none transition-colors resize-none"
                        placeholder="WHAT'S THE MISSION, BOSS?"
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      className="mt-4 bg-primary text-primary-foreground border-4 border-comicBlack py-5 font-bangers text-3xl tracking-widest shadow-[6px_6px_0px_var(--border)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase"
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
              className={`relative bg-card text-foreground border-8 border-comicBlack dark:border-border shadow-[15px_15px_0px_var(--accent)] max-w-2xl w-full z-10 overflow-hidden`}
              initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }}
            >
              <div className="bg-accent text-accent-foreground p-6 border-b-6 border-comicBlack flex justify-between items-center">
                <h2 className="font-bangers text-4xl text-inherit tracking-widest">AGENT DOSSIER: RAGHAV</h2>
                <button onClick={() => setIsSecretIdentityOpen(false)} className="bg-comicBlack text-white font-bangers text-xl w-10 h-10 border-2 border-white">✕</button>
              </div>
              <div className="p-8 flex flex-col gap-6">
                <div className="flex gap-6 items-start">
                  <div className="w-32 h-32 border-4 border-comicBlack bg-background flex-shrink-0 rotate-2 overflow-hidden shadow-[4px_4px_0_var(--border)]">
                    <img src="/profile.jpg" alt="Agent Profile" className="w-full h-full object-cover scale-110" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bangers text-2xl text-secondary mb-2 uppercase italic tracking-tighter">"The Code-Squashing Avenger"</p>
                    <p className="font-comic font-bold text-lg leading-snug">
                      A high-octane Fullstack Developer with a passion for building cinematic, interactive web experiences. 
                      Focused on merging the art of storytelling with the precision of engineering.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="border-4 border-dashed border-comicBlack/20 dark:border-border/30 p-4">
                    <span className="font-bangers text-xs tracking-widest text-primary block mb-1">CURRENT STATUS</span>
                    <p className="font-comic font-bold text-sm">Building the future at the intersection of AI & UI.</p>
                  </div>
                  <div className="border-4 border-dashed border-comicBlack/20 dark:border-border/30 p-4">
                    <span className="font-bangers text-xs tracking-widest text-primary block mb-1">MISSION LOG</span>
                    <p className="font-comic font-bold text-sm">150+ Technical Challenges Crushed. Multiple Successful Deployments.</p>
                  </div>
                </div>
                <div className="bg-background/50 p-4 border-4 border-comicBlack border-double">
                  <p className="font-comic font-bold text-base leading-relaxed italic text-center text-foreground/80">
                    "I don't just write code; I craft digital narratives that resonate. Every bug squashed is a step toward a more seamless multiverse."
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
              className={`relative bg-card text-foreground border-8 border-comicBlack dark:border-border shadow-[15px_15px_0px_var(--primary)] max-w-2xl w-full z-10 overflow-hidden`}
              initial={{ scale: 0.8, rotate: 2 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.8, rotate: -2 }}
            >
              <div className="bg-primary text-primary-foreground p-6 border-b-6 border-comicBlack flex justify-between items-center">
                <h2 className="font-bangers text-4xl text-white tracking-widest" style={{ textShadow: '3px 3px 0px var(--border)' }}>POWERS & ABILITIES</h2>
                <button onClick={() => setIsPowersOpen(false)} className="bg-comicBlack text-white font-bangers text-xl w-10 h-10 border-2 border-white">✕</button>
              </div>
              <div className="p-8 flex flex-col gap-8">
                {/* DSA Power Card */}
                <div className="bg-accent text-accent-foreground border-4 border-comicBlack dark:border-border p-6 shadow-[6px_6px_0px_var(--border)] transform rotate-[-1deg]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bangers text-2xl text-inherit">ALGORITHMIC MASTERY</span>
                    <span className="bg-comicBlack text-white px-3 py-1 font-bangers text-xl">150+</span>
                  </div>
                  <div className="w-full bg-background h-6 border-4 border-comicBlack relative overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 bottom-0 bg-secondary" 
                      initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1.5, delay: 0.2 }}
                    />
                  </div>
                  <p className="font-comic font-bold text-xs mt-3 opacity-70 uppercase tracking-widest">LeetCode Challenges Crushed in the Digital Arena</p>
                </div>

                {/* AI & Tech Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-4">
                    <span className="font-bangers text-xl text-primary">AI AUGMENTATION</span>
                    <div className="flex flex-wrap gap-2">
                      {['LLMs', 'TensorFlow', 'Neural Nets', 'LangChain'].map(tech => (
                        <span key={tech} className={`px-3 py-1 border-2 border-comicBlack dark:border-border font-comic font-bold text-xs uppercase bg-background/50`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="font-comic font-bold text-sm italic text-foreground/70">Practicing advanced AI integration for intelligent mission automation.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="font-bangers text-xl text-secondary">TECH ARSENAL</span>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'Node.js', 'Python', 'Tailwind', 'MongoDB'].map(tech => (
                        <span key={tech} className={`px-3 py-1 border-2 border-comicBlack dark:border-border font-comic font-bold text-xs uppercase bg-background/50`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Training Stats */}
                <div className="bg-secondary/10 p-4 border-4 border-dotted border-secondary flex items-center justify-around">
                  <div className="text-center">
                    <span className="font-bangers text-3xl block text-secondary">100%</span>
                    <span className="font-bangers text-xs tracking-widest text-secondary opacity-60">DETERMINATION</span>
                  </div>
                  <div className="text-center">
                    <span className="font-bangers text-3xl block text-primary">∞</span>
                    <span className="font-bangers text-xs tracking-widest text-primary opacity-60">IMAGINATION</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  </div>
);
}
