import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Palette, 
  FileCode2, 
  Smartphone, 
  Terminal, 
  Database, 
  Sparkles, 
  Cpu, 
  GitBranch, 
  Boxes,
  Layers,
  LucideIcon
} from 'lucide-react';
import { SKILLS } from '../data/portfolioData';
import { SkillItem } from '../types';

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Palette,
  FileCode2,
  Smartphone,
  Terminal,
  Database,
  Sparkles,
  Cpu,
  GitBranch,
  Boxes,
};

interface SkillCardProps {
  key?: string;
  skill: SkillItem;
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const Icon = iconMap[skill.iconName] || Code2;
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Mild tilt
    setRotate({ x: -y * 0.08, y: x * 0.08 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-sky-400/50 backdrop-blur-xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.25)] flex flex-col justify-between"
    >
      {/* Glow highlight on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/10 via-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          {/* Icon with bounce on hover */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/25 to-sky-500/20 border border-sky-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.2)] group-hover:scale-110 group-hover:border-sky-400 transition-all duration-300">
            <motion.div
              animate={isHovered ? { y: [-3, 3, -3] } : { y: 0 }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            >
              <Icon className="w-6 h-6 text-sky-400 group-hover:text-cyan-300 transition-colors" />
            </motion.div>
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-400 group-hover:text-sky-300 group-hover:border-sky-400/30 transition-colors">
            {skill.tag}
          </span>
        </div>

        <h4 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-sky-300 transition-colors">
          {skill.name}
        </h4>
        <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
          {skill.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
        <span className="text-xs text-slate-400">Category</span>
        <span className="text-xs font-medium text-sky-400">{skill.category}</span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend'>('all');

  const categories = [
    { id: 'all', label: 'All Skills', count: SKILLS.frontend.length + SKILLS.backend.length },
    { id: 'frontend', label: 'Frontend', count: SKILLS.frontend.length },
    { id: 'backend', label: 'Backend', count: SKILLS.backend.length },
  ];

  const getFilteredSkills = () => {
    if (activeTab === 'frontend') return SKILLS.frontend;
    if (activeTab === 'backend') return SKILLS.backend;
    return [...SKILLS.frontend, ...SKILLS.backend];
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm font-semibold text-sky-400 uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Tech Stack & Proficiencies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading mb-3">
            What I Work With
          </h2>
          <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
            Practical knowledge across modern Frontend development, solid Backend fundamentals, AI Prompt Engineering, and Data Structures & Algorithms.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id as any)}
                className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-blue-600 to-sky-500 shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                    : 'text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {getFilteredSkills().map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
