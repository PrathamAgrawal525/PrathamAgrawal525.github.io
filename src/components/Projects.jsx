import React, { useRef } from 'react';
import { motion, useSpring, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "QR Generator",
    description: "QR Studio - Generate high-quality, customizable QR codes with advanced gradient options, real-time preview, and seamless one-click PNG export. Built fully client-side for fast, secure, and private generation.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://qr-generator-universal.vercel.app/",
    image: "/Project1.png"
  }
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    x.set((mx / rect.width - 0.5) * -20);
    y.set((my / rect.height - 0.5) * 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article 
      ref={cardRef}
      initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group perspective mx-auto w-full max-w-4xl"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: y, rotateY: x }}
        whileHover={{ scale: 1.03, y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative transform-style-3d rounded-2xl w-full"
      >
        <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-400 rounded-[22px] opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700 pointer-events-none z-0" />
        
        <div className="relative z-10 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-[0_40px_80px_-20px_rgba(99,102,241,0.3)] dark:group-hover:shadow-[0_40px_80px_-20px_rgba(124,92,255,0.4)] transition-shadow duration-500 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl flex flex-col md:flex-row h-full">
          
          <div className="relative w-full md:w-5/12 aspect-video md:aspect-auto overflow-hidden bg-slate-100 dark:bg-[#0b0f17]/50 shrink-0">
            <motion.img 
              src={project.image} 
              alt={`${project.title} preview`} 
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.9,0.2,1)] group-hover:scale-[1.08]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20 pointer-events-none group-hover:pointer-events-auto">
              <motion.a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-slate-900 font-extrabold rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300"
              >
                View Project <ExternalLink size={18} />
              </motion.a>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-between w-full">
            <div>
              <h4 className="text-3xl font-extrabold mb-4 text-slate-900 dark:text-slate-50 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                {project.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8">
                {project.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-xs text-slate-700 dark:text-slate-300 font-mono font-semibold bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
                    {t}
                  </span>
                ))}
              </div>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/link text-sm font-bold text-indigo-600 dark:text-cyan-400 hover:text-indigo-800 dark:hover:text-cyan-300 transition-colors flex items-center gap-2 shrink-0"
              >
                View Live 
                <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1.5">
                  →
                </span>
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 relative z-10">
      <div className="text-center mb-24">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold inline-block relative"
        >
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-300 bg-clip-text text-transparent animate-gradient">
            Featured Projects
          </span>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        </motion.h3>
      </div>

      <div className="flex flex-col gap-16 px-4 md:px-8 max-w-6xl mx-auto">
        {projects.map((proj, i) => (
          <ProjectCard key={proj.title} project={proj} index={i} />
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .perspective { perspective: 1500px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}} />
    </section>
  );
};

export default Projects;
