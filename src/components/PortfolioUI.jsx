"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Spring animation config reused across hero elements
const springPop = (delay) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: 'spring', bounce: 0.55, duration: 0.8, delay },
});

// Manga panel placeholder data (empty slots for future project thumbnails)
const mangaPanels = [
  { id: 1, gridArea: '1 / 1 / 3 / 2', label: 'CHAPTER 01' },
  { id: 2, gridArea: '1 / 2 / 2 / 3', label: 'CHAPTER 02' },
  { id: 3, gridArea: '2 / 2 / 3 / 3', label: 'CHAPTER 03' },
  { id: 4, gridArea: '1 / 3 / 2 / 4', label: 'CHAPTER 04' },
  { id: 5, gridArea: '2 / 3 / 3 / 4', label: 'CHAPTER 05' },
  { id: 6, gridArea: '3 / 1 / 4 / 2', label: 'CHAPTER 06' },
  { id: 7, gridArea: '3 / 2 / 4 / 4', label: 'CHAPTER 07' },
];

export default function PortfolioUI() {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/projects').then(res => res.json()).catch(() => []),
      fetch('http://localhost:5000/api/experiences').then(res => res.json()).catch(() => [])
    ]).then(([projData, expData]) => {
      setProjects(Array.isArray(projData) ? projData : []);
      setExperiences(Array.isArray(expData) ? expData : []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-10 relative mt-8">

      {/* Main Grid Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Left Hero Panel */}
        <motion.div 
          className="lg:col-span-3 bg-white border-8 border-comicBlack shadow-comic p-8 md:p-16 relative flex flex-col items-center justify-center text-center gap-6 group overflow-hidden min-h-[450px]"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          {/* Halftone background pattern */}
          <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center w-full">
             {/* 1st: Badge - delay 0.3 */}
             <motion.div 
               className="bg-comicRed text-white font-bangers tracking-widest text-2xl md:text-3xl px-8 py-3 border-4 border-comicBlack transform rotate-[-4deg] mb-6 shadow-[6px_6px_0px_#161616]"
               {...springPop(0.3)}
             >
                CODE-SQUASHING AVENGER!
             </motion.div>
             
             {/* 2nd: First name - delay 0.5 */}
             <h2 className="font-bangers text-[5.5rem] md:text-[8rem] lg:text-[9.5rem] leading-[0.8] tracking-widest uppercase relative flex flex-col items-center">
               <motion.span 
                 className="text-comicRed transform -rotate-2 block" 
                 style={{ WebkitTextStroke: '3px #161616', textShadow: '8px 8px 0px #161616' }}
                 {...springPop(0.5)}
               >
                 RAGHAV
               </motion.span>
               {/* 3rd: Last name - delay 0.7 */}
               <motion.span 
                 className="text-comicBlue transform rotate-1 mt-2 block" 
                 style={{ WebkitTextStroke: '3px #161616', textShadow: '8px 8px 0px #161616' }}
                 {...springPop(0.7)}
               >
                 GANGWAR
               </motion.span>
             </h2>

             {/* 4th: Tagline - delay 0.9 */}
             <motion.p 
               className="font-comic font-bold text-xl md:text-2xl text-comicBlack max-w-2xl mt-12 leading-relaxed bg-comicYellow px-8 py-5 border-4 border-comicBlack shadow-[6px_6px_0px_#161616] transform rotate-2"
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
            <p className="font-comic font-bold text-xs text-white bg-comicRed border-2 border-comicBlack shadow-[2px_2px_0_#161616] transform rotate-[-2deg] uppercase tracking-widest text-center mt-2 px-3 py-1">CODE-SQUASHING AVENGER</p>
          </div>

          <div className="flex flex-col gap-4">
            <button className="w-full bg-comicYellow border-4 border-comicBlack py-3 font-bangers text-xl tracking-widest shadow-[4px_4px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3">
              <span className="text-xl">⚙</span> SECRET IDENTITY
            </button>
            <button className="w-full bg-[#E5E5E5] border-4 border-comicBlack py-3 font-bangers text-xl tracking-widest shadow-[4px_4px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3">
              <span className="text-xl">⚡</span> POWERS &amp; ABILITIES
            </button>
            <button className="w-full bg-[#0070bc] text-white border-4 border-comicBlack py-4 font-bangers tracking-widest text-2xl shadow-[4px_4px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all mt-2">
              CONNECT!
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Global Button */}
      <div className="absolute right-[-4%] md:right-[-2%] top-[55%] z-30 hidden lg:block">
         <button className="bg-comicYellow border-[4px] border-comicBlack font-bangers tracking-widest text-3xl px-8 py-5 shadow-[8px_8px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#161616] transition-all flex items-center gap-3 rotate-2">
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

        {/* Manga Panel Grid */}
        <div 
          className="grid gap-[6px] bg-comicBlack p-[6px] border-8 border-comicBlack shadow-comic"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 220px)',
          }}
        >
          {mangaPanels.map((panel, idx) => {
            // Check if there's a matching project from the API
            const project = projects[idx] || null;

            return (
              <motion.div
                key={panel.id}
                className="bg-white relative overflow-hidden cursor-pointer group"
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
      {/* EXPERIENCES SECTION                                 */}
      {/* ═══════════════════════════════════════════════════ */}
      {!loading && experiences.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
           {experiences.map((exp, idx) => {
             const bgColor = exp.colorTheme === 'yellow' ? 'bg-comicYellow' : 'bg-[#6dbbfc]';
             return (
                <motion.div 
                  key={exp._id || idx} 
                  className={`${bgColor} border-[6px] border-comicBlack shadow-[6px_6px_0px_#161616] p-8 flex flex-col xl:flex-row gap-6 items-center hover:-translate-y-2 transition-transform duration-300`}
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  <div className="w-40 h-40 bg-[#161616] border-[6px] border-white flex-shrink-0 flex items-center justify-center p-4 transform rotate-[-4deg] shadow-lg group-hover:rotate-0 transition-transform relative overflow-hidden">
                     <div className={`font-bangers text-5xl ${exp.colorTheme === 'yellow' ? 'text-comicYellow' : 'text-[#6dbbfc]'} opacity-80 z-10`}>O</div>
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]"></div>
                  </div>
                  <div className="flex flex-col gap-3 text-comicBlack">
                     <h3 className="font-bangers text-4xl tracking-widest leading-none">{exp.title}</h3>
                     <p className="font-comic font-bold text-base leading-snug">{exp.description}</p>
                  </div>
                </motion.div>
             );
           })}
        </div>
      )}

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
              className="relative bg-white border-8 border-comicBlack shadow-[12px_12px_0px_#161616] max-w-2xl w-full max-h-[85vh] overflow-y-auto z-10"
              initial={{ scale: 0, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 5 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              {/* Header */}
              <div className="bg-comicRed p-6 border-b-6 border-comicBlack relative">
                <button 
                  className="absolute top-4 right-4 bg-comicBlack text-white font-bangers text-xl w-10 h-10 flex items-center justify-center border-2 border-white hover:bg-comicYellow hover:text-comicBlack transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
                <h2 className="font-bangers text-4xl md:text-5xl text-white tracking-widest pr-12" style={{ textShadow: '3px 3px 0px #161616' }}>
                  {selectedProject.title}
                </h2>
              </div>

              {/* Image */}
              {selectedProject.imageUrl && (
                <div className="h-64 bg-comicBlack border-b-4 border-comicBlack overflow-hidden">
                  <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Body */}
              <div className="p-8 flex flex-col gap-6">
                <p className="font-comic font-bold text-lg leading-relaxed text-gray-800">
                  {selectedProject.description}
                </p>

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
                      className="bg-comicYellow border-4 border-comicBlack px-6 py-3 font-bangers text-xl tracking-widest shadow-[4px_4px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                      🚀 LIVE DEMO
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="bg-comicBlack text-white border-4 border-comicBlack px-6 py-3 font-bangers text-xl tracking-widest shadow-[4px_4px_0px_#FFC82C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                      💻 SOURCE CODE
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
