import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

const words = [
  "Frontend Developer",
  "UI/UX Designer",
  "Problem Solver",
  "Tech Enthusiast",
  "Lifelong Learner",
];

const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1200);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : 100, parseInt(Math.random() * 50)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    const timeout2 = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(timeout2);
  }, []);

  return (
    <span className="font-mono text-indigo-600 dark:text-cyan-400">
      {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </span>
  );
};

const RippleButton = ({ children, className, href, primary }) => {
  const [ripples, setRipples] = useState([]);

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, key: Date.now() };

    setRipples((prev) => [...prev, newRipple]);
  };

  const Component = href ? motion.a : motion.button;
  const baseClass = "relative overflow-hidden font-bold rounded-2xl px-8 py-4 flex items-center justify-center transition-all outline-none focus:ring-2 focus:ring-cyan-500/50 group";
  
  return (
    <Component
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener' : undefined}
      className={`${baseClass} ${
        primary 
          ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-purple-500 dark:to-cyan-400 text-white shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 bg-[length:200%_auto] hover:bg-right' 
          : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 shadow-sm hover:shadow-md'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={addRipple}
    >
      <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 inline-block">{children}</span>
      {ripples.map((rip) => (
        <span
          key={rip.key}
          className="absolute bg-black/10 dark:bg-white/30 rounded-full pointer-events-none"
          style={{
            top: rip.y,
            left: rip.x,
            width: rip.size,
            height: rip.size,
            animation: 'ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onAnimationEnd={() => setRipples((prev) => prev.filter(r => r.key !== rip.key))}
        />
      ))}
    </Component>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  
  const yBg1 = useTransform(scrollY, [0, 1000], [0, 250]);
  const yBg2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const yContent = useTransform(scrollY, [0, 800], [0, -120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30, filter: 'blur(15px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };

  const cardRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const rotateX = useSpring(0, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 20 });

  function handleMouseMove(e) {
    if (!cardRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    
    const rx = (y / rect.height - 0.5) * -12;
    const ry = (x / rect.width - 0.5) * 12;
    rotateX.set(rx);
    rotateY.set(ry);
  }
  
  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  const radialGradient = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.15), transparent 80%)`;

  return (
    <section id="home" className="relative pt-[160px] pb-24 min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ y: yBg1 }} className="absolute inset-0 pointer-events-none -z-20 flex items-center justify-center hidden dark:flex">
        <div className="absolute top-[5%] left-[10%] w-[60vw] max-w-[700px] h-[60vw] max-h-[700px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[8s]" />
      </motion.div>
      <motion.div style={{ y: yBg2 }} className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center hidden dark:flex">
        <div className="absolute bottom-[10%] right-[10%] w-[50vw] max-w-[600px] h-[50vw] max-h-[600px] bg-cyan-400/10 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-[6s] delay-1000" />
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center w-full max-w-7xl mx-auto px-6 md:px-12"
        style={{ y: yContent, opacity, scale }}
      >
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col z-10 w-full">
          <motion.p variants={itemVariant} className="font-mono text-cyan-600 dark:text-cyan-400 font-bold mb-6 tracking-wider uppercase text-sm drop-shadow-sm">
            Welcome to my portfolio
          </motion.p>
          
          <motion.h1 
            variants={itemVariant}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight origin-left cursor-default inline-block"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-300 bg-clip-text text-transparent animate-gradient inline-block hover:drop-shadow-lg transition-all duration-300">
              Hi, I'm Pratham Agrawal
            </span>
          </motion.h1>

          <motion.h2 
            variants={itemVariant} 
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 min-h-[48px] text-slate-800 dark:text-white transition-all w-[fit-content]"
          >
            <Typewriter />
          </motion.h2>
          
          <motion.p variants={itemVariant} className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            I create fast, animated and aesthetic web applications.
          </motion.p>
          
          <motion.div variants={itemVariant} className="flex flex-wrap items-center gap-5">
            <RippleButton href="https://drive.google.com/uc?export=download&id=1jKoc9WOW1jkRTXBdI6yDDBj2BONFn5qK" primary>
              Download CV
            </RippleButton>
            <RippleButton href="#projects">
              View Projects
            </RippleButton>
          </motion.div>
        </motion.div>

        {/* Profile Card */}
        <motion.aside 
          className="relative group perspective w-full mx-auto max-w-[400px] lg:max-w-none"
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <div className="absolute top-8 left-8 w-32 h-32 bg-indigo-500/20 dark:bg-purple-500/40 rounded-full blur-[40px] animate-pulse duration-[4s]" />
          
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.03 }}
              style={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl p-10 rounded-3xl relative z-10 overflow-hidden shadow-xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:shadow-2xl dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 group-hover:border-indigo-500/30 dark:group-hover:border-purple-500/40 transition-all duration-500 transform-style-3d"
            >
              <motion.div 
                className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden dark:block"
                style={{ background: radialGradient }} 
              />
              
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
              
              <div className="relative w-28 h-28 mb-8">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 dark:from-purple-500 dark:to-cyan-400 animate-pulse blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 dark:from-purple-600 dark:to-cyan-400 flex items-center justify-center text-4xl font-black text-white shadow-xl z-10 border border-white/20">
                  PA
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="font-extrabold text-2xl mb-2 text-slate-900 dark:text-white transition-colors">
                  Pratham Agrawal
                </div>
                <div className="text-indigo-600 dark:text-cyan-400 font-mono text-sm mb-5 tracking-wide uppercase font-bold">
                  Software Developer
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  Frontend engineer focusing on UI, UX, animation & performance.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.aside>
      </motion.div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .perspective {
          perspective: 1200px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}} />
    </section>
  );
};

export default Hero;
