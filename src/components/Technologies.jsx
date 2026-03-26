import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const techIcons = [
  { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'C', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/960px-C_Programming_Language.svg.png?20201031132917' },
  { name: 'C++', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
];

const Technologies = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0 1", "0.8 1"]
  });

  const styleBlur = useTransform(scrollYProgress, [0, 1], ["blur(10px)", "blur(0px)"]);
  const styleOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const styleY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  };

  return (
    <section id="tech" className="py-24 relative" ref={sectionRef}>
      <motion.div 
        style={{ opacity: styleOpacity, y: styleY, filter: styleBlur }}
        className="max-w-4xl mx-auto px-4"
      >
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold inline-block relative">
            <span className="text-gradient">Technologies</span>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
          </h3>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-10 md:p-14 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex flex-wrap justify-center gap-10 md:gap-14 relative z-10">
            {techIcons.map((tech) => (
              <motion.div 
                key={tech.name}
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  scale: 1.15,
                  transition: { type: 'spring', stiffness: 400, damping: 10 }
                }}
                className="relative group flex flex-col items-center justify-center p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors gap-3"
              >
                <div className="absolute inset-0 bg-indigo-500/10 dark:bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <img 
                  src={tech.src} 
                  alt={tech.name} 
                  className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md group-hover:drop-shadow-xl z-10 transition-all duration-300" 
                  loading="lazy"
                />
                
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-slate-800 dark:border-white/10 shadow-lg whitespace-nowrap z-20">
                  {tech.name}
                  {/* Arrow */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45 border-l border-t border-slate-800 dark:border-white/10" />
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Technologies;
