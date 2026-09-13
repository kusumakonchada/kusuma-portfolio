import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Sparkles, Eye, ArrowUpRight, Radar } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleLiveDemo = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm font-semibold text-sky-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase & Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading mb-3">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
            Practical, responsive applications engineered with modern technologies, AI architectures, and clean systems design.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {PROJECTS.map((project, index) => {
            const isAi = project.isAiFeatured;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`group relative rounded-[28px] bg-slate-900/50 backdrop-blur-2xl p-6 sm:p-7 transition-all duration-500 flex flex-col justify-between overflow-hidden ${
                  isAi
                    ? 'border border-sky-400/40 hover:border-sky-400 shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.35)] hover:-translate-y-2'
                    : 'border border-white/10 hover:border-sky-400/50 shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)] hover:-translate-y-2'
                }`}
              >
                {/* Soft glowing blue accent in background */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/15 group-hover:bg-blue-500/25 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

                {/* AI / Drone-themed icon in top-right corner */}
                {isAi && (
                  <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1120]/80 backdrop-blur-md border border-sky-400/40 text-sky-200 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                    <Radar className="w-3.5 h-3.5 text-sky-400 animate-pulse shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-sky-300">
                      Drone Vision
                    </span>
                  </div>
                )}

                <div>
                  {/* 16:9 Hero Project Thumbnail with rounded corners */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 mb-6 border border-white/10 group-hover:border-sky-400/40 transition-colors shadow-inner">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500" />
                    
                    {/* Blue Glow Rim on top */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-sky-400/15 pointer-events-none" />

                    {/* Badges on top of image */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                      {isAi ? (
                        <>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1120]/85 backdrop-blur-md border border-sky-400/50 text-[11px] font-semibold text-sky-300 shadow-[0_0_14px_rgba(56,189,248,0.3)]">
                            <Sparkles className="w-3 h-3 text-sky-400" />
                            AI Powered
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-[11px] font-semibold text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]">
                            Featured
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="px-3 py-1 rounded-full bg-[#0B1120]/80 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-sky-300">
                            Project #{index + 1}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-[11px] font-semibold text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]">
                            Featured
                          </span>
                        </>
                      )}
                    </div>

                    {/* Interactive Quick Inspect Button overlay on desktop hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        type="button"
                        onClick={() => handleLiveDemo(project)}
                        className="px-5 py-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-sky-400 text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-sky-400" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Project Tag / Category */}
                  {project.tagline && (
                    <div className="mb-2">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sky-300 bg-sky-500/10 px-2.5 py-0.5 rounded-md border border-sky-500/20">
                        {project.tagline}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-heading group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Headline */}
                  {project.headline && (
                    <p className="text-xs sm:text-sm font-medium text-sky-300/90 mb-3">
                      {project.headline}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 group-hover:border-sky-500/30 group-hover:text-sky-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Live Demo & GitHub */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleLiveDemo(project)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-medium text-xs sm:text-sm shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300 active:scale-98 cursor-pointer"
                    id={`project-demo-btn-${project.id}`}
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-sky-400/40 text-slate-200 hover:text-white font-medium text-xs sm:text-sm backdrop-blur-md transition-all duration-300"
                    id={`project-github-btn-${project.id}`}
                  >
                    <Github className="w-4 h-4 text-sky-400" />
                    <span>GitHub</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Modal Dialog for Live Interactive Demo */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
