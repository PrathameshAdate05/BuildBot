import { UseFormRegister } from 'react-hook-form';

interface Step4Props {
  register: UseFormRegister<any>;
}

export default function Step4Settings({ register }: Step4Props) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          These settings help you customize the project structure and coding standards.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-onLight dark:text-text-onDark mb-2">
          Folder Structure
        </label>
        <select
          {...register('settings.folderStructure')}
          className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-onLight dark:text-text-onDark focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
        >
          <option value="standard">Standard (Recommended)</option>
          <option value="clean-architecture">Clean Architecture</option>
          <option value="feature-based">Feature-based</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-onLight dark:text-text-onDark mb-2">
          Linting Rules
        </label>
        <select
          {...register('settings.lintRules')}
          className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-onLight dark:text-text-onDark focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
        >
          <option value="standard">Standard</option>
          <option value="airbnb">Airbnb</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-onLight dark:text-text-onDark mb-2">
          Styling Preference
        </label>
        <select
          {...register('settings.styling')}
          className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-onLight dark:text-text-onDark focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
        >
          <option value="tailwind">Tailwind CSS</option>
          <option value="css-modules">CSS Modules</option>
          <option value="styled-components">Styled Components</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-onLight dark:text-text-onDark mb-2">
          File Naming Convention
        </label>
        <select
          {...register('settings.fileNaming')}
          className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-onLight dark:text-text-onDark focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
        >
          <option value="kebab-case">kebab-case (default)</option>
          <option value="camelCase">camelCase</option>
          <option value="PascalCase">PascalCase</option>
        </select>
      </div>
    </div>
  );
}
