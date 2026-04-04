import React from 'react';

export default function ComicFooter() {
  return (
    <footer className="w-full bg-primary border-t-8 border-comicBlack dark:border-border flex flex-col items-center justify-center py-10 gap-4 relative z-10">
      <h2 className="font-bangers text-6xl text-white tracking-widest italic comic-text-stroke comic-shadow-black">
        KAPOW!
      </h2>
      <div className="flex gap-8 font-bangers text-2xl text-white underline decoration-[3px] decoration-white underline-offset-4 uppercase mt-2">
        <a href="https://github.com" className="hover:text-accent hover:decoration-accent transition-colors" target="_blank" rel="noopener noreferrer">Github</a>
        <a href="https://linkedin.com" className="hover:text-accent hover:decoration-accent transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://twitter.com" className="hover:text-accent hover:decoration-accent transition-colors" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
      <p className="font-bangers text-accent tracking-widest text-xl mt-4 uppercase">
        © 2024 Raghav Gangwar - KAPOW!
      </p>
    </footer>
  );
}
