import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Check, Copy } from 'lucide-react';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "agrawalpratham525@gmail.com";
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0 1", "0.8 1"]
  });

  const styleBlur = useTransform(scrollYProgress, [0, 1], ["blur(10px)", "blur(0px)"]);
  const styleOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const styleY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-24 relative" ref={sectionRef}>
      <motion.div 
        style={{ opacity: styleOpacity, y: styleY, filter: styleBlur }}
        className="max-w-2xl mx-auto text-center px-4"
      >
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold inline-block relative mb-6">
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-300 bg-clip-text text-transparent animate-gradient">Let's Connect</span>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-lg mx-auto leading-relaxed mt-6">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="flex justify-center w-full">
          <button 
            onClick={handleCopy}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl px-4 py-4 md:px-8 md:py-6 rounded-3xl flex items-center justify-between gap-4 md:gap-6 hover:shadow-2xl hover:border-indigo-500/30 dark:hover:border-cyan-500/30 transition-all duration-300 w-full md:w-auto"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-cyan-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-cyan-500 dark:group-hover:text-slate-900 shadow-sm transition-all duration-300">
              <Mail size={26} strokeWidth={2.5} />
            </div>
            
            <div className="text-left flex-1">
              <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1 md:mb-2 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors duration-300">Email Me At</div>
              <div className="text-slate-900 dark:text-slate-50 font-mono text-[13px] md:text-base font-bold whitespace-nowrap overflow-hidden text-ellipsis">{email}</div>
            </div>

            <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-white/10 border border-slate-100 dark:border-slate-700 transition-colors duration-300">
              {copied ? <Check size={22} className="text-emerald-500" strokeWidth={3} /> : <Copy size={22} className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors duration-300" />}
            </div>
          </button>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl px-6 py-4 rounded-full flex items-center gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 z-50"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Check size={14} className="text-emerald-500" strokeWidth={3} />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white shrink-0">Email copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
