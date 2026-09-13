import { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO, NAV_LINKS } from '../data/portfolioData';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative z-10 mt-16 border-t border-white/[0.08] bg-[#0B1120]/70 backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left: Brand info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="text-lg font-bold text-white font-heading tracking-tight hover:text-sky-400 transition-colors"
              >
                {PERSONAL_INFO.brandName}
              </a>
              <p className="text-xs text-slate-400 mt-1">
                Aspiring Full Stack Developer • JNTUGV Student
              </p>
            </div>

            {/* Middle: Fast links */}
            <nav className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-sky-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right: Social icons */}
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white transition-colors"
                title="GitHub"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-sky-400 transition-colors"
                title="LinkedIn"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white transition-colors"
                title="Email"
                aria-label="Send email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Copyright Line */}
          <div className="mt-8 pt-6 border-t border-white/[0.05] text-center">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-normal">
              <span>© 2026 Kusuma Konchada. Built with passion.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-slate-900/80 hover:bg-blue-600/90 backdrop-blur-xl border border-sky-400/40 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
          title="Scroll back to top"
          aria-label="Scroll back to top"
          id="back-to-top-button"
        >
          <ArrowUp className="w-5 h-5 text-sky-300" />
        </button>
      )}
    </>
  );
}
