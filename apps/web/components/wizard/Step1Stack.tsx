import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import clsx from 'clsx';

interface StackOption {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode; // Placeholder for now
  disabled?: boolean;
}

interface Step1Props {
  selected: string;
  onSelect: (id: string) => void;
}

const stacks: StackOption[] = [
  { id: 'nextjs-starter', name: 'Next.js', desc: 'App Router, React, Tailwind', icon: <div className="w-8 h-8 bg-black rounded-full" /> },
  { id: 'react-spa', name: 'React SPA', desc: 'Vite, TypeScript, Fast', icon: <div className="w-8 h-8 bg-blue-500 rounded-full" /> },
  { id: 'node-express', name: 'Node API', desc: 'Express, TypeScript', icon: <div className="w-8 h-8 bg-green-500 rounded-full" /> },
  { id: 'nestjs', name: 'NestJS', desc: 'Coming Soon', icon: <div className="w-8 h-8 bg-red-500 rounded-full" />, disabled: true },
  { id: 'flutter', name: 'Flutter', desc: 'Coming Soon', icon: <div className="w-8 h-8 bg-blue-400 rounded-full" />, disabled: true },
  { id: 'fastapi', name: 'FastAPI', desc: 'Coming Soon', icon: <div className="w-8 h-8 bg-teal-500 rounded-full" />, disabled: true },
];

export default function Step1Stack({ selected, onSelect }: Step1Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stacks.map((stack) => (
        <motion.div
          key={stack.id}
          whileHover={!stack.disabled ? { scale: 1.02 } : {}}
          whileTap={!stack.disabled ? { scale: 0.98 } : {}}
          onClick={() => !stack.disabled && onSelect(stack.id)}
          className={clsx(
            "relative p-6 rounded-xl border-2 cursor-pointer transition-colors flex flex-col gap-3",
            stack.disabled ? "opacity-50 cursor-not-allowed border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-900" : 
            selected === stack.id
              ? "border-brand-primary bg-indigo-50 dark:bg-indigo-900/20"
              : "border-border-light dark:border-border-dark hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-800"
          )}
        >
          <div className="flex justify-between items-start">
            {stack.icon}
            {selected === stack.id && <CheckCircle2 className="w-5 h-5 text-brand-primary" />}
          </div>
          <div>
            <h3 className="font-bold text-text-onLight dark:text-text-onDark">{stack.name}</h3>
            <p className="text-sm text-text-gray">{stack.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
