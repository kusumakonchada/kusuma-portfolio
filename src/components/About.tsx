import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, GraduationCap, Copy, Check, Sparkles, Building } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function About() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const quickInfoItems = [
    {
      id: 'location',
      label: 'Location',
      value: PERSONAL_INFO.fullLocation,
      shortValue: PERSONAL_INFO.location,
      icon: MapPin,
      copyable: false,
    },
    {
      id: 'email',
      label: 'Email Address',
      value: PERSONAL_INFO.email,
      icon: Mail,
      copyable: true,
      href: `mailto:${PERSONAL_INFO.email}`,
    },
    {
      id: 'phone',
      label: 'Phone Number',
      value: PERSONAL_INFO.phone,
      icon: Phone,
      copyable: true,
      href: `tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`,
    },
    {
      id: 'degree',
      label: 'Degree & Year',
      value: PERSONAL_INFO.degree,
      subValue: PERSONAL_INFO.institution,
      icon: GraduationCap,
      copyable: false,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm font-semibold text-sky-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{PERSONAL_INFO.shortName}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading mb-3">
            Who I Am
          </h2>
          <p className="text-lg text-sky-400/90 font-medium">About Me</p>
        </div>

        {/* Main Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[26px] bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Subtle glowing corner accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Narrative Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-left mb-12">
            <div className="space-y-5 text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              <p className="border-l-2 border-sky-400 pl-4 py-1 bg-white/[0.02] rounded-r-xl">
                {PERSONAL_INFO.aboutText}
              </p>
            </div>
          </div>

          {/* Quick Info Card: Two-column layout with small glowing glass boxes */}
          <div className="relative z-10 border-t border-white/[0.08] pt-10">
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6 text-center sm:text-left">
              Key Details & Credentials
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {quickInfoItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="group relative p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-sky-400/50 backdrop-blur-xl transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600/30 to-sky-500/20 border border-sky-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-sky-400 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                        <IconComponent className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1">
                          {item.label}
                        </span>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm sm:text-base font-semibold text-white group-hover:text-sky-300 transition-colors break-words hover:underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-sm sm:text-base font-semibold text-white break-words">
                            {item.value}
                          </span>
                        )}
                        {item.subValue && (
                          <span className="block text-xs text-sky-400/80 mt-1 flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {item.subValue}
                          </span>
                        )}
                      </div>
                    </div>

                    {item.copyable && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(item.value, item.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 transition-colors shrink-0"
                        title={`Copy ${item.label}`}
                        aria-label={`Copy ${item.label}`}
                      >
                        {copiedItem === item.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
