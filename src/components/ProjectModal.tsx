import { motion } from 'motion/react';
import { X, Sparkles, ExternalLink, Github, Radar, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] z-10"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3 mb-3 pr-10">
          <div className="p-2.5 rounded-xl bg-blue-500/20 border border-sky-400/40 text-sky-400 shrink-0">
            {project.isAiFeatured ? (
              <Radar className="w-5 h-5 animate-pulse text-sky-400" />
            ) : (
              <Sparkles className="w-5 h-5 text-sky-400" />
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs uppercase font-semibold tracking-wider text-sky-400">
                {project.tagline || 'Featured Project'}
              </span>
              {project.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-sky-400/40 text-sky-300 text-[10px] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  {project.badge}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              {project.title}
            </h3>
            {project.headline && (
              <p className="text-xs sm:text-sm font-semibold text-sky-300/95 mt-0.5">
                {project.headline}
              </p>
            )}
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Project Preview Image & Overview */}
        <div className="my-6 rounded-2xl bg-[#0B1120]/80 border border-white/10 p-4 sm:p-5">
          <div className="aspect-video w-full rounded-xl overflow-hidden mb-3 border border-white/10 shadow-inner">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            {project.headline || project.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Key Features & Capabilities
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-200">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                <span className="leading-snug">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-sky-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-slate-300" />
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 shadow-[0_0_15px_rgba(37,99,235,0.4)] text-white text-xs font-semibold cursor-pointer transition-all"
            >
              Close
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
