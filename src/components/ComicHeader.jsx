"use client";
import React from 'react';

export default function ComicHeader() {
  return (
    <header className="w-full bg-comicWhite border-b-8 border-comicBlack flex py-4 px-10 items-center justify-between sticky top-0 z-50">
      <h1 className="font-bangers tracking-widest text-4xl lg:text-5xl text-comicRed uppercase" style={{ WebkitTextStroke: '1px #161616', textShadow: '3px 3px 0px #161616' }}>
        RG
      </h1>
      
      <nav className="hidden md:flex font-bangers text-2xl gap-8 uppercase">
        <a href="#" className="border-b-4 border-comicRed text-comicBlack pb-1">Portfolio</a>
        <a href="#" className="text-comicBlack hover:text-comicRed transition-colors pb-1">About</a>
        <a href="#" className="text-comicBlack hover:text-comicRed transition-colors pb-1">Contact</a>
      </nav>

      <div className="flex gap-4 font-comic font-black italic uppercase text-sm lg:text-base">
        <button className="bg-comicBlue text-comicBlack border-[3px] border-comicBlack px-4 py-2 transform skew-x-[15deg] shadow-[4px_4px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          <div className="transform skew-x-[-15deg]">Perfect Intern</div>
        </button>
        <button className="bg-comicYellow text-comicBlack border-[3px] border-comicBlack px-4 py-2 shadow-[4px_4px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          Hire Me!
        </button>
      </div>
    </header>
  );
}
