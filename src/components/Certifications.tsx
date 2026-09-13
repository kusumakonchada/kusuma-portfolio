import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, ShieldCheck, X, ZoomIn, Calendar, Building2, Hash, ArrowUpRight } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { CertificateItem } from '../types';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  return (
    <section id="certifications" className="py-20 md:py-28 relative z-10 scroll-mt-20">
      <div id="certificates" className="-top-24 relative" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm font-semibold text-sky-400 uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading mb-3">
            Certificates
          </h2>
          <p className="text-base sm:text-lg text-slate-300/80 max-w-3xl mx-auto leading-relaxed">
            Professional certifications that demonstrate my continuous learning in AI, Full Stack Development, Programming, and emerging technologies.
          </p>
        </div>

        {/* Responsive Grid: Desktop: 2x2 | Tablet: 2 columns | Mobile: 1 column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              onClick={() => setSelectedCert(cert)}
              id={`cert-card-${cert.id}`}
              className="group relative rounded-[16px] bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-sky-400/60 p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Soft ambient glow on hover */}
              <div className="absolute -top-24 -right-24 w-56 h-56 bg-gradient-to-br from-blue-600/15 to-sky-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Certificate Image - Full uncropped certificate display */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 group-hover:border-sky-400/40 transition-colors shadow-inner flex items-center justify-center p-2 mb-5">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded-lg"
                  />

                  {/* Click to Enlarge Hover Indicator */}
                  <div className="absolute inset-0 bg-[#0B1120]/50 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center">
                    <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-sky-400/60 text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                      <ZoomIn className="w-4 h-4 text-sky-400" />
                      <span>Click to Enlarge</span>
                    </div>
                  </div>
                </div>

                {/* Card Information Below Image */}
                <div className="space-y-3">
                  
                  {/* Row with Verified Badge & Completion Year */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    {/* "Verified Certificate" badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Verified Certificate</span>
                    </div>

                    {/* Completion Year */}
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/10 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      <span>{cert.issueDate}</span>
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-sky-300 transition-colors pt-1">
                    {cert.title}
                  </h3>

                  {/* Issuing Organization */}
                  <div className="flex items-center gap-2 text-sm text-sky-400/95 font-medium">
                    <Building2 className="w-4 h-4 shrink-0 text-sky-400" />
                    <span>{cert.issuer}</span>
                    {cert.hours && (
                      <span className="ml-auto text-xs px-2.5 py-0.5 rounded-full bg-blue-600/30 text-sky-300 border border-blue-500/30">
                        {cert.hours}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skillsCovered.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300 group-hover:border-sky-500/30 group-hover:text-sky-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Hash className="w-3 h-3 text-slate-500" />
                  <span className="text-[11px] font-mono text-slate-300">{cert.credentialId}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert(cert);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-sky-300 hover:text-sky-200 border border-blue-500/30 transition-colors text-xs font-medium cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>View Original</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Click-to-Enlarge Lightbox / Modal for Original Uploaded Image */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-sky-400/40 p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 flex flex-col justify-between"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer z-20"
                aria-label="Close certificate lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-3 mb-4 pr-12">
                <div className="p-2.5 rounded-xl bg-blue-500/20 border border-sky-400/40 text-sky-400 shrink-0">
                  <Award className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Certificate
                    </span>
                    <span className="text-xs text-slate-400">• Completed in {selectedCert.issueDate}</span>
                    {selectedCert.hours && (
                      <span className="text-xs text-sky-400">• {selectedCert.hours}</span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-400/90 mt-0.5">
                    Issued by {selectedCert.issuer}
                  </p>
                </div>
              </div>

              {/* Original Uploaded Image Display - Uncropped with Full Integrity */}
              <div className="my-3 rounded-xl bg-slate-950 border border-white/10 p-2 sm:p-4 flex items-center justify-center shadow-inner overflow-hidden">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full max-h-[62vh] object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Footer Information & Actions */}
              <div className="mt-3">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {selectedCert.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedCert.skillsCovered.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-sky-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono">
                      ID: {selectedCert.credentialId}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedCert(null)}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
