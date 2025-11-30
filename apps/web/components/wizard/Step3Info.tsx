import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface Step3Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function Step3Info({ register, errors }: Step3Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-onLight dark:text-text-onDark mb-2">
          Project Name
        </label>
        <input
          {...register('projectName')}
          className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-onLight dark:text-text-onDark focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
          placeholder="my-awesome-app"
        />
        {errors.projectName && (
          <p className="text-status-error text-sm mt-1">{errors.projectName.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-onLight dark:text-text-onDark mb-2">
          Description (Optional)
        </label>
        <input
          {...register('description')}
          className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-onLight dark:text-text-onDark focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
          placeholder="A brief description of your project"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-onLight dark:text-text-onDark mb-2">
            License
          </label>
          <select
            {...register('license')}
            className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-onLight dark:text-text-onDark focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
          >
            <option value="MIT">MIT</option>
            <option value="Apache-2.0">Apache 2.0</option>
            <option value="ISC">ISC</option>
            <option value="None">None</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-onLight dark:text-text-onDark mb-2">
            Package Manager
          </label>
          <select
            {...register('packageManager')}
            className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-onLight dark:text-text-onDark focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
          >
            <option value="npm">npm</option>
            <option value="yarn">yarn</option>
            <option value="pnpm">pnpm</option>
            <option value="bun">bun</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
         <input type="checkbox" {...register('gitInit')} id="gitInit" className="w-4 h-4 text-brand-primary rounded focus:ring-brand-primary" />
         <label htmlFor="gitInit" className="text-sm font-medium text-text-onLight dark:text-text-onDark">Initialize Git repository</label>
      </div>
    </div>
  );
}
