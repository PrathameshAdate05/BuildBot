import Handlebars from 'handlebars';
import { TemplateFile } from './templateFetcher';

export interface TemplateData {
  projectName: string;
  options: Record<string, boolean>;
}

export function renderTemplate(files: TemplateFile[], data: TemplateData): TemplateFile[] {
  return files.map(file => {
    if (file.isBinary) {
      return file;
    }

    let content = file.content as string;
    let filePath = file.path;

    // Handle .hbs files
    if (filePath.endsWith('.hbs')) {
      const template = Handlebars.compile(content);
      content = template(data);
      filePath = filePath.replace('.hbs', '');
    }

    return {
      ...file,
      path: filePath,
      content,
    };
  });
}
