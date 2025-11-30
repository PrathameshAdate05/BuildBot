'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle, Download, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Step1Stack from './wizard/Step1Stack';
import Step2Features from './wizard/Step2Features';
import Step3Info from './wizard/Step3Info';
import Step4Settings from './wizard/Step4Settings';

const formSchema = z.object({
  template: z.enum(['nextjs-starter', 'react-spa', 'node-express']),
  projectName: z.string().min(1, 'Project name is required').max(50).regex(/^[a-zA-Z0-9-]+$/, 'Only alphanumeric characters and hyphens are allowed'),
  description: z.string().optional(),
  license: z.string().optional(),
  packageManager: z.string().optional(),
  gitInit: z.boolean().optional(),
  options: z.object({
    typescript: z.boolean().optional(),
    tailwind: z.boolean().optional(),
    eslint: z.boolean().optional(),
    prettier: z.boolean().optional(),
    jest: z.boolean().optional(),
    docker: z.boolean().optional(),
    'github-actions': z.boolean().optional(),
    husky: z.boolean().optional(),
  }),
  settings: z.object({
    folderStructure: z.string().optional(),
    lintRules: z.string().optional(),
    styling: z.string().optional(),
    fileNaming: z.string().optional(),
  }).optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: 'Choose Stack' },
  { id: 2, title: 'Select Features' },
  { id: 3, title: 'Project Info' },
  { id: 4, title: 'Custom Settings' },
];

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      template: 'nextjs-starter',
      projectName: 'my-app',
      packageManager: 'npm',
      license: 'MIT',
      gitInit: true,
      options: {
        typescript: true,
        tailwind: true,
        eslint: true,
        prettier: true,
      },
      settings: {
          folderStructure: 'standard',
          lintRules: 'standard',
          styling: 'tailwind',
          fileNaming: 'kebab-case'
      }
    },
  });

  const formData = watch();

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate project');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.projectName}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-border-light dark:border-border-dark max-w-md w-full mx-auto animate-in fade-in zoom-in duration-300">
        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
          <CheckCircle className="w-12 h-12 text-status-success" />
        </div>
        <h2 className="text-2xl font-bold text-text-onLight dark:text-text-onDark">Project Generated!</h2>
        <p className="text-text-gray text-center">
          Your project has been downloaded. Unzip it and run:
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg w-full font-mono text-sm">
          <p>cd {formData.projectName}</p>
          <p>npm install</p>
          <p>npm run dev</p>
        </div>
        <button
          onClick={() => {
              setIsSuccess(false);
              setCurrentStep(1);
          }}
          className="w-full py-2 px-4 bg-brand-primary hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
        >
          Generate Another
        </button>
      </div>
    );
  }

  return (
    <div id="wizard" className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-border-light dark:border-border-dark overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar / Progress */}
      <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-900/50 p-6 border-b md:border-b-0 md:border-r border-border-light dark:border-border-dark">
        <div className="space-y-6">
            {steps.map((step) => (
                <div key={step.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        currentStep === step.id ? 'bg-brand-primary text-white' : 
                        currentStep > step.id ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}>
                        {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                    </div>
                    <span className={`text-sm font-medium ${currentStep === step.id ? 'text-brand-primary' : 'text-text-gray'}`}>
                        {step.title}
                    </span>
                </div>
            ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 flex flex-col">
        <div className="flex-1">
            <h2 className="text-2xl font-bold text-text-onLight dark:text-text-onDark mb-6">{steps[currentStep - 1].title}</h2>
            
            {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-status-error rounded-lg text-sm">
                {error}
            </div>
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {currentStep === 1 && (
                        <Step1Stack selected={formData.template} onSelect={(val) => setValue('template', val as any)} />
                    )}
                    {currentStep === 2 && (
                        <Step2Features 
                            options={formData.options} 
                            onChange={(key, val) => setValue(`options.${key}` as any, val)} 
                        />
                    )}
                    {currentStep === 3 && (
                        <Step3Info register={register} errors={errors} />
                    )}
                    {currentStep === 4 && (
                        <Step4Settings register={register} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between pt-6 border-t border-border-light dark:border-border-dark">
            <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 rounded-lg text-text-gray hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
                <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
                onClick={nextStep}
                disabled={isGenerating}
                className="px-6 py-2 bg-brand-primary hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-70"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                    </>
                ) : currentStep === steps.length ? (
                    <>
                        Generate Project <Download className="w-4 h-4" />
                    </>
                ) : (
                    <>
                        Next Step <ChevronRight className="w-4 h-4" />
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
}
