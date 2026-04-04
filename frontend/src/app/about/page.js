"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MangaPanel = ({ image, title, sub, className, side = 'left', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -100 : 100, rotate: side === 'left' ? -5 : 5 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: 'spring', bounce: 0.4, duration: 1, delay }}
      className={`relative border-[8px] border-comicBlack dark:border-border bg-card shadow-[12px_12px_0_var(--border)] overflow-hidden group cursor-crosshair ${className}`}
    >
      <div className="absolute inset-0 z-0 bg-background/5 group-hover:bg-transparent transition-colors duration-500"></div>
      {image && <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />}
      
      <div className="absolute inset-0 z-10 pointer-events-none p-4 flex flex-col justify-end bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h4 className="font-bangers text-2xl text-accent tracking-widest leading-none drop-shadow-[2px_2px_0_var(--border)]">{title}</h4>
        <p className="font-comic font-bold text-xs text-foreground uppercase mt-1 tracking-tighter italic">{sub}</p>
      </div>

      {/* Comic Border Accents */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-comicBlack dark:bg-border rotate-45 translate-x-6 -translate-y-6 text-white text-center"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-comicBlack dark:bg-border rotate-45 -translate-x-6 translate-y-6"></div>
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
    <div className={`absolute bottom-[-16px] ${side === 'left' ? 'left-4' : 'right-4'} w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-comicBlack dark:border-t-border`}></div>
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
    className={`absolute z-30 font-bangers text-4xl md:text-6xl tracking-widest italic drop-shadow-[4px_4px_0_var(--border)] pointer-events-none text-foreground ${className}`}
  >
    {children}
  </motion.div>
);

// Spring animation config
const springPop = (delay) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: 'spring', bounce: 0.55, duration: 0.8, delay },
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-16 pt-12">
        
        {/* ═══════════════════════════════════════════════════ */}
        {/* AGENT DOSSIER — ABOUT ME                           */}
        {/* ═══════════════════════════════════════════════════ */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          {/* Profile Card */}
          <div className="md:col-span-1 bg-accent border-8 border-comicBlack dark:border-border shadow-[12px_12px_0_var(--border)] p-8 flex flex-col items-center gap-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, var(--border) 0, var(--border) 1px, transparent 0, transparent 50%)',
              backgroundSize: '10px 10px',
            }}></div>
            <div className="w-40 h-40 bg-comicBlack border-[6px] border-comicBlack dark:border-border rounded-full shadow-[6px_6px_0px_var(--border)] overflow-hidden relative">
              <img src="/profile.jpg" alt="Raghav Gangwar" className="w-full h-full object-cover scale-[1.3] origin-top -translate-y-4" />
              <div className="absolute inset-0 shadow-[inset_0px_0px_15px_rgba(0,0,0,0.5)] pointer-events-none rounded-full"></div>
            </div>
            <div className="bg-comicBlack dark:bg-card text-white px-4 py-2 font-bangers text-xl tracking-widest transform -rotate-2 shadow-[4px_4px_0_var(--primary)] text-primary-foreground">
              AGENT DOSSIER
            </div>
            <p className="font-comic font-bold text-sm text-center leading-snug text-accent-foreground relative z-10">
              A high-octane Fullstack Developer with a passion for building cinematic, interactive web experiences.
            </p>
          </div>

          {/* Info Grid */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-card border-8 border-comicBlack dark:border-border shadow-[8px_8px_0_var(--border)] p-8">
              <h2 className="font-bangers text-4xl text-primary tracking-widest mb-4 comic-shadow-black">
                SECRET IDENTITY
              </h2>
              <p className="font-bangers text-2xl text-secondary mb-3 uppercase italic tracking-tighter">&quot;The Code-Squashing Avenger&quot;</p>
              <p className="font-comic font-bold text-lg leading-relaxed text-foreground/90">
                Focused on merging the art of storytelling with the precision of engineering. Building the future at the intersection of AI &amp; UI. 150+ Technical Challenges Crushed. Multiple Successful Deployments.
              </p>
            </div>
            
            {/* Powers Section */}
            <div className="bg-card border-8 border-comicBlack dark:border-border shadow-[8px_8px_0_var(--border)] p-8">
              <h3 className="font-bangers text-3xl text-primary tracking-widest mb-6">POWERS &amp; ABILITIES</h3>
              
              {/* DSA Power Bar */}
              <div className="bg-accent text-accent-foreground border-4 border-comicBlack dark:border-border p-5 shadow-[4px_4px_0px_var(--border)] transform rotate-[-1deg] mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bangers text-xl text-inherit">ALGORITHMIC MASTERY</span>
                  <span className="bg-comicBlack text-white px-3 py-1 font-bangers text-lg">150+</span>
                </div>
                <div className="w-full bg-background h-5 border-4 border-comicBlack relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 bottom-0 bg-secondary" 
                    initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.2 }}
                  />
                </div>
                <p className="font-comic font-bold text-xs mt-2 opacity-70 uppercase tracking-widest">LeetCode Challenges Crushed</p>
              </div>

              {/* Tech Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <span className="font-bangers text-xl text-primary">AI AUGMENTATION</span>
                  <div className="flex flex-wrap gap-2">
                    {['LLMs', 'TensorFlow', 'Neural Nets', 'LangChain'].map(tech => (
                      <span key={tech} className="px-3 py-1 border-2 border-comicBlack dark:border-border font-comic font-bold text-xs uppercase bg-background/50">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-bangers text-xl text-secondary">TECH ARSENAL</span>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Node.js', 'Python', 'Tailwind', 'MongoDB'].map(tech => (
                      <span key={tech} className="px-3 py-1 border-2 border-comicBlack dark:border-border font-comic font-bold text-xs uppercase bg-background/50">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* THE MANGA CHRONICLES                               */}
        {/* ═══════════════════════════════════════════════════ */}
        <div className="relative">
          <div className="text-center mb-16 px-4">
            <motion.h2 
              className="font-bangers text-5xl md:text-8xl tracking-widest inline-block relative rotate-[-1deg] text-foreground" 
              style={{ textShadow: '6px 6px 0 var(--secondary)' }}
              {...springPop(0.2)}
            >
              BEYOND THE CODE
            </motion.h2>
            <div className="mt-4 flex flex-col items-center">
              <motion.span 
                className="bg-accent text-accent-foreground font-bangers px-6 py-2 text-xl md:text-3xl tracking-widest transform rotate-1 shadow-[4px_4px_0_var(--border)]"
                {...springPop(0.4)}
              >
                THE LEGEND BEGINS!
              </motion.span>
              <p className="font-comic font-bold text-sm md:text-lg mt-6 text-secondary uppercase tracking-widest max-w-2xl">
                One system failure. One final hour. One hero to squash the bugs across the digital multiverse.
              </p>
            </div>
          </div>

          {/* Full Manga Page Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 max-w-5xl mx-auto p-4 md:p-12 bg-card border-[12px] border-comicBlack dark:border-border shadow-[20px_20px_0_var(--border)] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{
              backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
              backgroundSize: '8px 8px'
            }}></div>

            {/* PANEL 1: THE CRISIS */}
            <div className="md:col-span-7 h-[400px] relative">
              <MangaPanel 
                image="/images/manga/manga_b_n_w_1_crisis_1775254877564.png" 
                title="SITUATION CRITICAL" 
                sub="The deployment has failed! System overload imminent!"
                className="h-full"
                side="left"
              />
              <SpeechBubble className="top-4 right-4" side="right">
                &quot;Wait... the system is crashing?! We&apos;re losing all data!&quot;
              </SpeechBubble>
              <SoundEffect className="top-1/4 left-1/4" delay={0.2}>BZZZT!!</SoundEffect>
            </div>

            {/* PANEL 2: THE DEADLINE */}
            <div className="md:col-span-5 h-[400px] relative">
              <MangaPanel 
                image="/images/manga/manga_b_n_w_2_deadline_1775254890677.png" 
                title="THE FINAL TICK" 
                sub="Seconds remaining on the launch clock."
                className="h-full"
                side="right"
                delay={0.2}
              />
              <SpeechBubble className="bottom-8 left-4" side="left">
                &quot;Just 2 minutes left... it&apos;s all over for us!&quot;
              </SpeechBubble>
              <SoundEffect className="top-8 right-8 text-foreground opacity-40 text-2xl" delay={0.4}>TIC... TOC...</SoundEffect>
            </div>

            {/* PANEL 3: THE SOS */}
            <div className="md:col-span-4 h-[350px] relative">
              <MangaPanel 
                image="/images/manga/manga_b_n_w_3_sos_signal_1775254906459.png" 
                title="THE SIGNAL" 
                sub="A beacon of hope appears in the darkness."
                className="h-full"
                side="left"
                delay={0.4}
              />
              <SpeechBubble className="top-4 right-4" side="right" delay={0.2}>
                &quot;LOOK! Someone is responding to our SOS signal!!&quot;
              </SpeechBubble>
              <SoundEffect className="bottom-12 right-4 text-primary text-5xl" delay={0.6}>BEEP-BEEP!</SoundEffect>
            </div>

            {/* PANEL 4: THE HERO ARRIVAL */}
            <div className="md:col-span-8 h-[350px] relative">
              <MangaPanel 
                image="/images/manga/manga_b_n_w_4_hero_landing_1775254921046.png" 
                title="HE HAS ARRIVED!" 
                sub="Raghav: The Code-Squashing Avenger."
                className="h-full"
                side="right"
                delay={0.6}
              />
              <SpeechBubble className="top-8 left-8" side="left" delay={0.4}>
                &quot;Not on my watch. Stand back... I&apos;ve got the fix!&quot;
              </SpeechBubble>
              <SoundEffect className="bottom-4 right-12 text-secondary text-7xl" delay={0.8}>KAPOW!!</SoundEffect>
            </div>

            {/* PANEL 5: THE VICTORY (Full Width) */}
            <div className="md:col-span-12 h-[300px] relative">
              <MangaPanel 
                image="/images/manga/manga_b_n_w_5_victory_cheer_1775254937909.png" 
                title="MISSION ACCOMPLISHED" 
                sub="The deployment is saved! Success!"
                className="h-full"
                side="bottom"
                delay={0.8}
              />
              <SpeechBubble className="top-4 right-[10%]" side="right" delay={0.6}>
                &quot;YES!! HE DID IT! A Masterpiece of Engineering!&quot;
              </SpeechBubble>
              <SoundEffect className="bottom-8 left-8 text-primary" delay={1.0}>YATTA!!</SoundEffect>
            </div>
          </div>

          {/* Quote Banner */}
          <div className="mt-16 flex justify-center">
            <motion.div
              className="bg-card text-foreground font-comic font-bold text-base md:text-xl px-10 py-6 border-8 border-accent shadow-[8px_8px_0_var(--accent)] max-w-3xl text-center leading-relaxed italic transform rotate-[-1deg]"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              &quot;I don&apos;t just write code; I craft digital narratives that resonate. Every bug squashed is a step toward a more seamless multiverse.&quot;
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
