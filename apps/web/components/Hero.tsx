'use client';

import { motion } from 'framer-motion';
import { Terminal, Code2, Zap, Layers } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden pt-12 pb-8 lg:pt-16 lg:pb-12">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mb-6"
          >
            <img 
              src="/logo.png" 
              alt="BuildBot Logo" 
              className="h-32 w-auto sm:h-40 md:h-48"
            />
           
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-text-onLight dark:text-text-onDark sm:text-5xl md:text-6xl"
          >
            Generate a production-ready
            <span className="block text-brand-primary">project in 60 seconds</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-3 max-w-md text-base text-text-gray sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
          >
            Stop wasting time on boilerplate. Select your stack, configure options, and start coding instantly.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8"
          >
            <div className="rounded-md shadow">
              <a
                href="#wizard"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-brand-primary px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all hover:scale-105"
              >
                Start New Project
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex justify-center gap-8 text-text-gray grayscale opacity-70"
          >
             {/* Simple placeholders for tech logos - in real app use SVGs */}
             <div className="flex items-center gap-2"><Code2 className="w-6 h-6" /> <span>React</span></div>
             <div className="flex items-center gap-2"><Terminal className="w-6 h-6" /> <span>Next.js</span></div>
             <div className="flex items-center gap-2"><Zap className="w-6 h-6" /> <span>Vite</span></div>
             <div className="flex items-center gap-2"><Layers className="w-6 h-6" /> <span>Node.js</span></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
