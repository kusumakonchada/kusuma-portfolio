import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  Download, 
  ExternalLink, 
  Upload
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [avatarSrc, setAvatarSrc] = useState<string>(() => {
    return localStorage.getItem('kusuma_custom_avatar') || PERSONAL_INFO.avatar;
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setAvatarSrc(result);
        localStorage.setItem('kusuma_custom_avatar', result);
        localStorage.setItem('kusuma_custom_avatar_name', file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const fullText = PERSONAL_INFO.role; // "Aspiring Full Stack Developer"
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(110);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleTyping = () => {
      if (!isDeleting) {
        setTypedText(fullText.substring(0, typedText.length + 1));
        if (typedText.length + 1 === fullText.length) {
          // Pause at end
          timer = setTimeout(() => {
            setIsDeleting(true);
            setTypingSpeed(60);
          }, 2400);
          return;
        }
      } else {
        setTypedText(fullText.substring(0, typedText.length - 1));
        if (typedText.length === 0) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(110);
        }
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed, fullText]);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-32 pb-20 md:pt-40 md:pb-28 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Small Headline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-sky-300 font-heading">
                {PERSONAL_INFO.badge}
              </span>
            </div>

            {/* Main Heading with Animated Gradient Text */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-4 font-heading leading-tight">
              Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                  {PERSONAL_INFO.shortName}
                </span>
                <Sparkles className="hidden sm:inline-block w-6 h-6 text-sky-400 absolute -top-3 -right-6 animate-pulse" />
              </span>
            </h1>

            {/* Typing Animation for "Aspiring Full Stack Developer" */}
            <div className="h-10 sm:h-12 flex items-center mb-6">
              <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-200 font-heading">
                {typedText}
                <span className="inline-block w-0.5 h-6 sm:h-7 ml-1 bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
              </span>
            </div>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mb-8 font-normal">
              {PERSONAL_INFO.heroIntro}
            </p>

            {/* Buttons: GitHub & LinkedIn (Glass buttons, blue glow, lift on hover) */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {/* GitHub Button */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-sky-400/50 backdrop-blur-xl text-white font-medium text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:-translate-y-1 active:translate-y-0"
                id="hero-github-button"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Github className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />
                </div>
                <span>GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-300 transition-colors" />
              </a>

              {/* LinkedIn Button */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600/30 to-sky-500/20 hover:from-blue-600/40 hover:to-sky-500/30 border border-sky-500/40 hover:border-sky-400 backdrop-blur-xl text-white font-medium text-sm transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] hover:-translate-y-1 active:translate-y-0"
                id="hero-linkedin-button"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Linkedin className="w-5 h-5 text-sky-300 group-hover:text-white transition-colors" />
                </div>
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-sky-300 group-hover:text-white transition-colors" />
              </a>

              {/* Quick Contact shortcut */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                id="hero-contact-button"
              >
                <span>Let's Talk</span>
              </a>
            </div>

            {/* Below buttons: Location with icon */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/60 border border-white/[0.06] backdrop-blur-md text-slate-300 text-sm">
              <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <span className="font-medium text-slate-200">
                {PERSONAL_INFO.location}
              </span>
            </div>
          </motion.div>

          {/* Right Side: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Background Decorative Animated Rings */}
            <div className="absolute w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] rounded-full border border-sky-500/20 animate-[spin_35s_linear_infinite] pointer-events-none" />
            <div className="absolute w-[340px] h-[340px] sm:w-[410px] sm:h-[410px] rounded-full border border-blue-500/15 animate-[spin_25s_linear_infinite_reverse] pointer-events-none" />
            
            {/* Floating Container */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative group p-2 sm:p-4"
            >
              {/* Blue glowing ring backdrop with pulsating cyan aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/45 via-sky-400/35 to-cyan-300/45 blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Large Glass circular frame with drag-and-drop detection */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] rounded-full p-3 sm:p-3.5 bg-slate-900/60 backdrop-blur-2xl border transition-all duration-500 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.25)] ${
                  isDragging 
                    ? 'border-sky-300 ring-4 ring-sky-400 shadow-[0_0_60px_rgba(56,189,248,0.8)] scale-105' 
                    : 'border-white/20 ring-2 ring-sky-400/35 group-hover:ring-sky-400/70 group-hover:shadow-[0_0_50px_rgba(56,189,248,0.45)]'
                }`}
              >
                
                {/* Inner Glowing Accent Ring */}
                <div className="w-full h-full rounded-full p-1.5 bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-500 shadow-[inset_0_0_20px_rgba(56,189,248,0.45)]">
                  
                  {/* Actual Round Profile Image */}
                  <div 
                    className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative shadow-2xl group/avatar"
                  >
                    <img
                      src={avatarSrc}
                      alt={PERSONAL_INFO.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-[50%_20%] transform group-hover/avatar:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Subtle glass reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/20 via-transparent to-white/10 pointer-events-none" />

                    {/* Drag-over active indicator */}
                    {isDragging && (
                      <div className="absolute inset-0 bg-sky-950/85 backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-sky-200 z-30">
                        <Upload className="w-8 h-8 animate-bounce text-sky-300" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-center px-4">
                          Drop photo here
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hidden File Input for Custom Upload */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="hidden"
                  aria-label="Upload profile photo"
                />

                {/* Floating Status Pill */}
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-3 sm:bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/95 backdrop-blur-xl border border-sky-400/40 text-xs font-semibold text-sky-300 shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center gap-2 whitespace-nowrap z-20"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span>Open to Internships & Roles</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
