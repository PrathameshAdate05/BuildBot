import { HelpCircle } from 'lucide-react';
import clsx from 'clsx';

interface Step2Props {
  options: Record<string, boolean>;
  onChange: (_key: string, _value: boolean) => void;
}

const features = [
  { id: 'typescript', label: 'TypeScript', desc: 'Strongly typed JavaScript' },
  { id: 'eslint', label: 'ESLint', desc: 'Find and fix problems in your code' },
  { id: 'prettier', label: 'Prettier', desc: 'Code formatter' },
  { id: 'tailwind', label: 'Tailwind CSS', desc: 'Utility-first CSS framework' },
  { id: 'jest', label: 'Jest', desc: 'Testing framework' },
  { id: 'docker', label: 'Docker', desc: 'Containerization support' },
  { id: 'github-actions', label: 'GitHub Actions', desc: 'CI/CD pipelines' },
  { id: 'husky', label: 'Husky', desc: 'Git hooks made easy' },
];

export default function Step2Features({ options, onChange }: Step2Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="flex items-center justify-between p-4 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800"
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-medium text-text-onLight dark:text-text-onDark flex items-center gap-2">
                {feature.label}
                <div className="group relative">
                  <HelpCircle className="w-4 h-4 text-text-gray cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {feature.desc}
                  </div>
                </div>
              </span>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => onChange(feature.id, !options[feature.id])}
            className={clsx(
              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
              options[feature.id] ? "bg-brand-primary" : "bg-gray-200 dark:bg-gray-700"
            )}
          >
            <span
              className={clsx(
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                options[feature.id] ? "translate-x-5" : "translate-x-0"
              )}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
