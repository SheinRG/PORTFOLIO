import React from 'react';

export default function ComicFooter() {
  return (
    <footer className="w-full bg-comicRed border-t-8 border-comicBlack flex flex-col items-center justify-center py-10 gap-4 relative z-10">
      <h2 className="font-bangers text-6xl text-white tracking-widest italic" style={{ WebkitTextStroke: '2.5px #161616', textShadow: '4px 4px 0px #161616' }}>
        KAPOW!
      </h2>
      <div className="flex gap-8 font-bangers text-2xl text-white underline decoration-[3px] decoration-comicWhite underline-offset-4 uppercase mt-2">
        <a href="https://github.com" className="hover:text-comicYellow hover:decoration-comicYellow transition-colors" target="_blank" rel="noopener noreferrer">Github</a>
        <a href="https://linkedin.com" className="hover:text-comicYellow hover:decoration-comicYellow transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://twitter.com" className="hover:text-comicYellow hover:decoration-comicYellow transition-colors" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
      <p className="font-bangers text-comicYellow tracking-widest text-xl mt-4 uppercase">
        © 2024 Raghav Gangwar - KAPOW!
      </p>
    </footer>
  );
}
