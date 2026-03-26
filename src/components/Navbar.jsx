import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Technologies', href: '#tech' },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('site-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
      setIsLight(true);
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsLight((prev) => {
      const isNowLight = !prev;
      document.documentElement.classList.toggle('dark', !isNowLight);
      localStorage.setItem('site-theme', isNowLight ? 'light' : 'dark');
      return isNowLight;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 flex justify-center transition-all duration-500 ${
        isScrolled ? 'pt-3' : 'pt-6'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`flex items-center justify-between rounded-full border transition-all duration-500 ${
          isScrolled
            ? 'w-[92%] max-w-3xl py-3 px-6 bg-white/90 dark:bg-[#0f1720]/80 backdrop-blur-2xl border-slate-200 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
            : 'w-[95%] max-w-4xl py-4 px-8 bg-white/50 dark:bg-[#0f1720]/40 backdrop-blur-lg border-slate-200/50 dark:border-white/5 shadow-2xl'
        }`}
      >

        {/* LOGO */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-purple-400 dark:to-cyan-300 bg-clip-text text-transparent"
        >
          Pratham
        </motion.a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);

            return (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className="relative text-sm font-semibold transition-colors text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {link.name}

                {/* animated underline */}
                <motion.span
                  className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-purple-400 dark:to-cyan-300 rounded-full origin-left"
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />

              </motion.a>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">

          {/* THEME BUTTON */}
          <motion.button
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition text-slate-700 dark:text-slate-300"
          >
            {isLight ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>

        </div>
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 top-[80px] bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className={`text-2xl font-bold ${
                  activeSection === link.href.substring(1)
                    ? 'text-indigo-600 dark:text-cyan-400'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;