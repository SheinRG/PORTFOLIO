"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ComicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Shrink header on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Portfolio' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`w-full bg-comicWhite border-b-8 border-comicBlack flex items-center justify-between sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 px-6' : 'py-4 px-6 md:px-10'}`}>
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <h1 
            className={`font-bangers tracking-widest text-comicRed uppercase transition-all duration-300 ${scrolled ? 'text-3xl lg:text-4xl' : 'text-4xl lg:text-5xl'}`} 
            style={{ WebkitTextStroke: '1px #161616', textShadow: '3px 3px 0px #161616' }}
          >
            RG
          </h1>
        </a>
        
        {/* Desktop Nav — hidden below md */}
        <nav className="hidden md:flex font-bangers text-xl lg:text-2xl gap-6 lg:gap-8 uppercase items-center">
          {navLinks.map(link => (
            <a 
              key={link.href}
              href={link.href} 
              className={`pb-1 transition-colors duration-200 ${
                isActive(link.href) 
                  ? 'border-b-4 border-comicRed text-comicBlack' 
                  : 'text-comicBlack/70 hover:text-comicRed'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side — CTA Buttons + Hamburger */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* CTA buttons — hidden on very small screens */}
          <div className="hidden sm:flex gap-3 lg:gap-4 font-comic font-black italic uppercase text-xs lg:text-sm">
            <a href="/about" className="bg-comicBlue text-comicBlack border-[3px] border-comicBlack px-3 lg:px-4 py-2 transform skew-x-[15deg] shadow-[4px_4px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <div className="transform skew-x-[-15deg]">Perfect Intern</div>
            </a>
            <a href="/#contact" className="bg-comicYellow text-comicBlack border-[3px] border-comicBlack px-3 lg:px-4 py-2 shadow-[4px_4px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              Hire Me!
            </a>
          </div>

          {/* Hamburger — visible below md */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-12 h-12 border-[3px] border-comicBlack bg-comicYellow shadow-[3px_3px_0px_#161616] flex flex-col items-center justify-center gap-[5px] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex-shrink-0"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[3px] bg-comicBlack transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
            <span className={`block w-6 h-[3px] bg-comicBlack transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-[3px] bg-comicBlack transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-40 bg-comicWhite border-b-8 border-comicBlack shadow-[0_12px_0_#161616] transition-all duration-400 overflow-hidden ${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 border-b-0'}`}
        style={{ top: scrolled ? '52px' : '68px' }}
      >
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map(link => (
            <a 
              key={link.href}
              href={link.href}
              className={`font-bangers text-3xl tracking-widest uppercase py-3 px-4 border-4 border-comicBlack transition-all ${
                isActive(link.href)
                  ? 'bg-comicRed text-white shadow-[4px_4px_0_#161616]'
                  : 'bg-white text-comicBlack hover:bg-comicYellow shadow-[4px_4px_0_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
              }`}
            >
              {link.label}
            </a>
          ))}
          
          {/* Mobile CTA buttons */}
          <div className="flex gap-3 mt-2 sm:hidden">
            <a href="/about" className="flex-1 text-center bg-comicBlue text-comicBlack border-[3px] border-comicBlack px-4 py-3 font-bangers text-xl tracking-widest shadow-[4px_4px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              Perfect Intern
            </a>
            <a href="/#contact" className="flex-1 text-center bg-comicYellow text-comicBlack border-[3px] border-comicBlack px-4 py-3 font-bangers text-xl tracking-widest shadow-[4px_4px_0px_#161616] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              Hire Me!
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
