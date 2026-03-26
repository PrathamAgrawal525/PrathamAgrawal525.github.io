import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-glass/10 mt-20 relative z-10 w-full font-sans">
      <div className="container mx-auto px-6 max-w-container flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
          © {year} <span className="text-slate-900 dark:text-slate-50">Pratham Agrawal</span>. All rights reserved.
        </p>
        
        <div className="flex gap-6">
          <motion.a 
            href="https://github.com/PrathamAgrawal525" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
            whileHover={{ y: -4, rotate: 5 }}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2"
          >
            <i className="fab fa-github text-xl hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all"></i>
          </motion.a>
          
          <motion.a 
            href="https://www.linkedin.com/in/pratham-agrawal-9aaa10358/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            whileHover={{ y: -4, rotate: -5 }}
            className="text-muted hover:text-[#0a66c2] transition-colors p-2"
          >
            <i className="fab fa-linkedin text-xl hover:drop-shadow-[0_0_12px_rgba(10,102,194,0.8)] transition-all"></i>
          </motion.a>
          
          <motion.a 
            href="https://x.com/PrathamA75447" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Twitter X"
            whileHover={{ y: -4, rotate: 5 }}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2"
          >
            <i className="fab fa-x-twitter text-xl hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all"></i>
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
