import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <motion.div 
        className="relative w-16 h-16 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 rounded-full border-t-2 border-accent animate-spin" style={{ animationDuration: '1s' }} />
        <div className="absolute inset-2 rounded-full border-r-2 border-accent2 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent2 uppercase tracking-widest font-mono">
          PA
        </span>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
