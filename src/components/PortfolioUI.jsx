"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PortfolioUI() {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

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
          {/* Halftone background pattern just for the hero text box */}
          <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center w-full">
             <motion.div 
               className="bg-comicRed text-white font-bangers tracking-widest text-2xl md:text-3xl px-8 py-3 border-4 border-comicBlack transform rotate-[-4deg] mb-6 shadow-[6px_6px_0px_#161616]"
               initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.6, delay: 0.3 }}
             >
                CODE-SQUASHING AVENGER!
             </motion.div>
             
             <h2 className="font-bangers text-[5.5rem] md:text-[8rem] lg:text-[9.5rem] leading-[0.8] tracking-widest uppercase relative flex flex-col items-center">
               <span className="text-comicRed transform -rotate-2" style={{ WebkitTextStroke: '3px #161616', textShadow: '8px 8px 0px #161616' }}>RAGHAV</span>
               <span className="text-comicBlue transform rotate-1 mt-2" style={{ WebkitTextStroke: '3px #161616', textShadow: '8px 8px 0px #161616' }}>GANGWAR</span>
             </h2>

             <p className="font-comic font-bold text-xl md:text-2xl text-comicBlack max-w-2xl mt-12 leading-relaxed bg-comicYellow px-8 py-5 border-4 border-comicBlack shadow-[6px_6px_0px_#161616] transform rotate-2">
               Fighting technical debt and squashing bugs across the digital multiverse. Welcome to the hero's gallery of high-octane engineering!
             </p>
          </div>
        </motion.div>

        {/* Right Sidebar Panel */}
        <motion.div 
          className="lg:col-span-1 flex flex-col gap-6"
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Profile Badge w/ Avatar */}
          <div className="flex flex-col items-center p-6 border-b-[3px] border-comicBlack border-dashed">
            <div className="w-36 h-36 bg-comicBlack border-[6px] border-comicBlack rounded-full shadow-[6px_6px_0px_#161616] flex items-center justify-center overflow-hidden mb-6 relative hover:scale-105 transition-transform duration-300">
               <img 
                 src="/profile.jpg" 
                 alt="Raghav Profile Avatar" 
                 className="w-full h-full object-cover scale-[1.3] origin-top -translate-y-4" 
               />
               <div className="absolute inset-0 shadow-[inset_0px_0px_15px_rgba(0,0,0,0.5)] pointer-events-none rounded-full"></div>
            </div>
            <h3 className="font-bangers text-4xl tracking-widest text-center">RAGHAV GANGWAR</h3>
            <p className="font-comic font-bold text-xs text-white bg-comicRed border-2 border-comicBlack shadow-[2px_2px_0_#161616] transform rotate-[-2deg] uppercase tracking-widest text-center mt-4 px-3 py-1">CODE-SQUASHING AVENGER</p>
          </div>

          <div className="flex flex-col gap-4">
            <button className="w-full bg-comicYellow border-4 border-comicBlack py-3 font-bangers text-xl tracking-widest shadow-[4px_4px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3">
              <span className="text-xl">⚙</span> SECRET IDENTITY
            </button>
            <button className="w-full bg-[#E5E5E5] border-4 border-comicBlack py-3 font-bangers text-xl tracking-widest shadow-[4px_4px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3">
              <span className="text-xl">⚡</span> POWERS & ABILITIES
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
           LET'S CONNECT 🚀
         </button>
      </div>

      {loading ? (
        <div className="font-bangers text-4xl text-center py-20 animate-pulse text-comicRed">INITIALIZING HERO PROTOCOLS...</div>
      ) : (
        <>
          {/* Projects Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 relative z-10">
            {projects.length > 0 ? projects.map((proj, idx) => (
              <motion.div 
                key={proj._id || idx} 
                className="bg-white border-[6px] border-comicBlack shadow-[6px_6px_0px_#161616] flex flex-col group overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, type: "spring" }}
              >
                 <div className="h-56 bg-[#1a1a1a] border-b-[6px] border-comicBlack relative overflow-hidden flex flex-col items-center justify-center p-4">
                    {/* Placeholder image representation matching dark aesthetic of panels */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://placehold.co/600x400/1a1a1a/ffffff?text=CODE&font=bangers')] bg-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute top-4 left-4 bg-comicBlack text-white font-bangers px-3 py-1 text-sm border-2 border-white transform -rotate-1 tracking-widest">{proj.chapterNumber || "CHAPTER"}</div>
                    {/* Fake UI Elements for graphic */}
                    <div className="w-[80%] h-32 border-2 border-slate-700 bg-slate-900 rounded opacity-60 flex gap-2 p-2 mt-4">
                      <div className="w-1/3 h-full bg-slate-800 rounded-sm"></div>
                      <div className="flex-1 h-full flex flex-col gap-2">
                        <div className="w-full h-4 bg-slate-800 rounded-sm"></div>
                        <div className="w-1/2 h-4 bg-slate-800 rounded-sm"></div>
                      </div>
                    </div>
                 </div>
                 <div className="p-6 flex-1 flex flex-col gap-4">
                    <h3 className="font-bangers text-3xl italic tracking-wide">{proj.title}</h3>
                    <p className="font-comic font-bold text-sm leading-relaxed text-gray-800 flex-1">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(proj.tags || []).map(tag => (
                        <span key={tag} className="bg-[#6dbbfc] px-4 py-1 border-[3px] border-comicBlack rounded-full font-bangers tracking-wider text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                 </div>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center font-bangers text-3xl text-comicRed p-10 bg-white border-4 border-comicBlack">No Projects Found! Is MongoDB running locally for the API?</div>
            )}
          </div>

          {/* Experiences Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
             {experiences.length > 0 ? experiences.map((exp, idx) => {
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
             }) : null}
          </div>
        </>
      )}

    </div>
  );
}
