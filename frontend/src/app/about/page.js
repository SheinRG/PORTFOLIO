"use client";
import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, className = "" }) => (
  <div className={`mb-12 relative ${className}`}>
    <motion.h2 
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="font-bangers text-5xl md:text-7xl text-primary tracking-widest comic-shadow-black uppercase italic"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="inline-block bg-accent text-accent-foreground px-4 py-1 font-comic font-black uppercase text-sm mt-2 transform -rotate-1 border-2 border-border shadow-[4px_4px_0_var(--border)]"
      >
        {subtitle}
      </motion.div>
    )}
  </div>
);

const MangaPanel = ({ image, title, sub, delay = 0, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`group relative border-8 border-border bg-card overflow-hidden shadow-[12px_12px_0_var(--border)] aspect-[4/5] md:aspect-auto ${className}`}
  >
    <img 
      src={image} 
      alt={title} 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute bottom-0 p-6 text-white">
        <h4 className="font-bangers text-2xl text-accent tracking-wider mb-2">{title}</h4>
        <p className="font-comic font-bold text-sm leading-tight italic">{sub}</p>
      </div>
    </div>
    {/* Manga Border Detail */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-border rotate-45 translate-x-8 -translate-y-8 z-10" />
  </motion.div>
);

const PowerStat = ({ name, value, colorClass = "bg-secondary" }) => (
  <div className="mb-6">
    <div className="flex justify-between items-end mb-2">
      <span className="font-bangers text-xl tracking-widest">{name}</span>
      <span className="font-comic font-black italic">{value}%</span>
    </div>
    <div className="h-6 bg-background border-4 border-border relative overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, type: "spring" }}
        className={`h-full ${colorClass}`}
      />
      {/* Halftone texture over the bar */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-repeat" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
    </div>
  </div>
);

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Hero Dossier Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Dossier Card */}
          <motion.div 
            initial={{ rotate: -5, x: -30, opacity: 0 }}
            animate={{ rotate: -1, x: 0, opacity: 1 }}
            className="lg:col-span-4 bg-card border-8 border-border p-8 shadow-[16px_16px_0_var(--border)] relative"
          >
            {/* Top Secret Stamp */}
            <div className="absolute top-4 -right-4 bg-primary text-white font-bangers text-3xl px-6 py-2 border-4 border-border -rotate-12 shadow-lg z-10">
              TOP SECRET
            </div>
            
            <div className="aspect-square bg-border mb-8 overflow-hidden relative border-4 border-border">
              <img 
                src="/profile.jpg" 
                alt="Raghav Gangwar" 
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="font-bangers text-sm text-primary tracking-widest block mb-1">CODENAME</label>
                <div className="font-comic font-black text-2xl uppercase border-b-4 border-border pb-1">Code-Squasher</div>
              </div>
              <div>
                <label className="font-bangers text-sm text-primary tracking-widest block mb-1">SPECIALTY</label>
                <div className="font-comic font-black text-2xl uppercase border-b-4 border-border pb-1">Fullstack Hero</div>
              </div>
              <div>
                <label className="font-bangers text-sm text-primary tracking-widest block mb-1">AFFILIATION</label>
                <div className="font-comic font-black text-2xl uppercase border-b-4 border-border pb-1">The Web Multiverse</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Story */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <SectionHeader title="RESTRICTED DATA" subtitle="The origin of the legend" />
              <div className="bg-card border-8 border-border p-8 shadow-[12px_12px_0_var(--border)] transform rotate-1">
                <p className="font-comic text-xl font-bold leading-relaxed mb-6 italic">
                  "I don't just write code; I craft digital narratives that resonate. Every bug squashed is a step toward a more seamless multiverse."
                </p>
                <p className="font-comic font-bold text-lg text-foreground/80 leading-relaxed">
                  Focused on merging the art of storytelling with the precision of engineering. 
                  Building the future at the intersection of AI & UI. 
                  With over 150 technical challenges crushed and multiple high-octane 
                  deployments secured, Raghav Gangwar is the hero the digital world deserves.
                </p>
              </div>
            </div>

            {/* Powers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pr-4">
              <div className="bg-card border-8 border-border p-6 shadow-[8px_8px_0_var(--border)]">
                <h3 className="font-bangers text-3xl mb-6 text-primary underline decoration-border decoration-wavy underline-offset-8">COMBAT ABILITIES</h3>
                <PowerStat name="ALGORITHMIC MASTERY" value={85} colorClass="bg-secondary" />
                <PowerStat name="NEURAL INTERFACING" value={92} colorClass="bg-accent" />
                <PowerStat name="SYSTEM ARCHITECTURE" value={78} colorClass="bg-primary" />
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="bg-accent text-accent-foreground border-8 border-border p-6 shadow-[8px_8px_0_var(--border)] transform -rotate-1">
                  <h3 className="font-bangers text-2xl mb-4">EQUIPPED ARSENAL</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Node.js', 'Python', 'Tailwind', 'MongoDB', 'TensorFlow', 'LLMs'].map((tech) => (
                      <span key={tech} className="bg-white/20 border-2 border-border px-3 py-1 font-comic font-black text-xs uppercase tracking-tighter">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-secondary text-secondary-foreground border-8 border-border p-6 shadow-[8px_8px_0_var(--border)] transform rotate-1 flex-1">
                  <h3 className="font-bangers text-2xl mb-2">MISSION RECORD</h3>
                  <p className="font-comic font-black italic">150+ DEPLOYMENTS COMPLETED. 0 FATAL BUGS REMAINING.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manga Chronology Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24 md:mt-40">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="font-bangers text-6xl md:text-9xl text-foreground comic-shadow-blue inline-block uppercase italic"
          >
            BEYOND THE CODE
          </motion.h2>
          <div className="flex justify-center mt-4">
            <div className="w-24 h-2 bg-primary mt-2" />
            <div className="w-48 h-2 bg-secondary mt-2 mx-2" />
            <div className="w-24 h-2 bg-accent mt-2" />
          </div>
        </div>

        {/* Manga Page Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-card border-[12px] border-border p-6 md:p-12 shadow-[24px_24px_0_var(--border)] relative overflow-hidden">
          {/* Halftone grid background texture */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '12px 12px' }} />
          
          {/* Panel 1 & 2 Row */}
          <div className="md:col-span-7">
            <MangaPanel 
              image="/images/manga/manga_b_n_w_1_crisis_1775254877564.png"
              title="THE SYSTEM FAIURE"
              sub="The deployment hung in the balance. All hope seemed lost..."
              className="h-[400px]"
            />
          </div>
          <div className="md:col-span-5">
            <MangaPanel 
              image="/images/manga/manga_b_n_w_2_deadline_1775254890677.png"
              title="RACE AGAINST TIME"
              sub="Seconds remaining on the clock. Engineering panic set in."
              delay={0.1}
              className="h-[400px]"
            />
          </div>

          {/* Large Center Panel */}
          <div className="md:col-span-12">
            <MangaPanel 
              image="/images/manga/manga_b_n_w_4_hero_landing_1775254921046.png"
              title="A HERO ARRIVES"
              sub="The Code-Squasher enters the mainframe. The tide turns instantly!"
              delay={0.2}
              className="h-[500px]"
            />
          </div>

          {/* Panel 4 & 5 Row */}
          <div className="md:col-span-12 lg:col-span-6">
            <MangaPanel 
              image="/images/manga/manga_b_n_w_3_sos_signal_1775254906459.png"
              title="THE SIGNAL SECURED"
              sub="Communications restored. The bug has been identified."
              delay={0.3}
              className="h-[350px]"
            />
          </div>
          <div className="md:col-span-12 lg:col-span-6">
            <MangaPanel 
              image="/images/manga/manga_b_n_w_5_victory_cheer_1775254937909.png"
              title="MISSION ACCOMPLISHED"
              sub="The deployment is green. A new legend is born in the code."
              delay={0.4}
              className="h-[350px]"
            />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-accent border-8 border-border p-12 shadow-[16px_16px_0_var(--border)] relative cursor-pointer"
        >
          <h2 className="font-bangers text-5xl md:text-7xl mb-8 comic-shadow-black">WANT TO RECRUIT THIS HERO?</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="/#contact" className="bg-primary text-white font-bangers text-2xl px-10 py-4 border-4 border-border shadow-[4px_4px_0_var(--border)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              INITIALIZE COMM-LINK
            </a>
            <a href="/" className="bg-secondary text-white font-bangers text-2xl px-10 py-4 border-4 border-border shadow-[4px_4px_0_var(--border)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              VIEW ARSENAL
            </a>
          </div>
          {/* Sound Effect floating */}
          <div className="absolute -top-12 -left-8 font-bangers text-6xl text-primary -rotate-12 italic opacity-40">BOOM!</div>
          <div className="absolute -bottom-8 -right-8 font-bangers text-6xl text-secondary rotate-12 italic opacity-40">WHAM!</div>
        </motion.div>
      </section>
    </main>
  );
}
