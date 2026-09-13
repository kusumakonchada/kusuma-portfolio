import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Copy, 
  Check, 
  MapPin, 
  ArrowUpRight 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setStatus('submitting');
    setErrorMessage('');

    // Retrieve EmailJS configuration from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setErrorMessage(
        'Email service is not yet configured with your EmailJS credentials (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY). Please add them to your environment variables.'
      );
      return;
    }

    try {
      // Template parameters mapped to standard template keys
      const templateParams = {
        name: formData.name,
        from_name: formData.name,
        email: formData.email,
        from_email: formData.email,
        reply_to: formData.email,
        message: formData.message,
        to_name: PERSONAL_INFO.name,
        to_email: PERSONAL_INFO.email,
      };

      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      if (result.status === 200 || result.text === 'OK') {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.text || 'Failed to deliver message via EmailJS');
      }
    } catch (err: unknown) {
      console.error('EmailJS error:', err);
      setStatus('error');
      const errText = err instanceof Error ? err.message : (typeof err === 'object' && err !== null && 'text' in err) ? String((err as { text: unknown }).text) : 'An error occurred while sending your message. Please verify your EmailJS keys or reach out directly.';
      setErrorMessage(errText);
    }
  };

  const contactLinks = [
    {
      id: 'email',
      title: 'Email',
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      icon: Mail,
      isExternal: true,
      copyText: PERSONAL_INFO.email,
    },
    {
      id: 'phone',
      title: 'Phone',
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`,
      icon: Phone,
      isExternal: true,
      copyText: PERSONAL_INFO.phone,
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      value: 'kusumakonchada',
      href: PERSONAL_INFO.linkedin,
      icon: Linkedin,
      isExternal: true,
      copyText: PERSONAL_INFO.linkedin,
    },
    {
      id: 'github',
      title: 'GitHub',
      value: 'kusumakonchada',
      href: PERSONAL_INFO.github,
      icon: Github,
      isExternal: true,
      copyText: PERSONAL_INFO.github,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm font-semibold text-sky-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Channels</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading mb-3">
            Let's Connect
          </h2>
          <p className="text-base sm:text-lg text-slate-300/80 max-w-xl mx-auto">
            Feel free to reach out anytime. Whether you have an internship opportunity, project collaboration, or tech discussion, my inbox is always open.
          </p>
        </div>

        {/* Split Layout: Left Contact Info, Right Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
                Contact Information
              </h3>
              <p className="text-sm text-slate-300">
                You can reach me directly via email, phone, or connect with me on LinkedIn and GitHub.
              </p>
            </div>

            {/* Location Pill Card */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-sky-500/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-medium">Location</span>
                <span className="text-sm font-semibold text-white">{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Individual Contact Links */}
            {contactLinks.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="group relative p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-sky-400/50 backdrop-blur-xl transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] flex items-center justify-between gap-4"
                >
                  <a
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-3.5 flex-1 min-w-0"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600/30 to-sky-500/20 border border-sky-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-sky-400 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                      <IconComponent className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">
                        {item.title}
                      </span>
                      <span className="block text-sm sm:text-base font-semibold text-white group-hover:text-sky-300 transition-colors truncate">
                        {item.value}
                      </span>
                    </div>
                  </a>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.copyText, item.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 transition-colors"
                      title={`Copy ${item.title}`}
                      aria-label={`Copy ${item.title}`}
                    >
                      {copiedKey === item.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-sky-500/20 text-slate-400 hover:text-sky-300 border border-white/5 hover:border-sky-500/30 transition-colors"
                      title="Open link"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Right Column: Glass Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-[28px] bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Subtle top glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
                Send a Message
              </h3>
              <p className="text-sm text-slate-300 mb-8">
                Fill in the form below and I will get back to you promptly.
              </p>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-heading">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-slate-200 max-w-md mx-auto">
                    Thank you for reaching out! Your message was delivered directly to my inbox ({PERSONAL_INFO.email}). I will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Notification Banner */}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-left"
                    >
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-rose-200 leading-relaxed flex-1">
                        <span className="font-semibold text-white block mb-0.5">Failed to deliver message</span>
                        {errorMessage || 'Unable to send email at this time. Please verify your EmailJS keys or reach out directly.'}
                      </div>
                    </motion.div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. John Doe / Recruiter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 backdrop-blur-xl transition-all duration-200"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 backdrop-blur-xl transition-all duration-200"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="Hi Kusuma, I'd like to talk to you about..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 backdrop-blur-xl transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Large glowing Send Message button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 hover:from-blue-500 hover:via-sky-400 hover:to-blue-500 text-white font-bold text-base shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-70 font-heading cursor-pointer"
                    id="contact-submit-button"
                  >
                    {status === 'submitting' ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
