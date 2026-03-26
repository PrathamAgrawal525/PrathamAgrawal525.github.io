import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import MagneticCursor from './components/MagneticCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Technologies from './components/Technologies';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Simulate loading internal assets to show a premium minimalist loader
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative w-full h-full text-slate-900 dark:text-slate-50 selection:bg-indigo-500/30">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-400 origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Background Particles or Glow can go here */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden dark:block">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <Navbar />

      <main className="container mx-auto px-6 relative z-10 max-w-container">
        <Hero />
        <Projects />
        <Technologies />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
