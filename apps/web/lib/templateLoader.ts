import fs from 'fs/promises';
import path from 'path';

export interface TemplateFile {
  path: string;
  content: string | Buffer;
  isBinary: boolean;
}

export async function loadTemplate(templateName: string): Promise<TemplateFile[]> {
  const templateDir = path.join(process.cwd(), 'templates', templateName);
  const files: TemplateFile[] = [];

  async function readDir(dir: string, baseDir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);

      if (entry.isDirectory()) {
        await readDir(fullPath, baseDir);
      } else {
        const content = await fs.readFile(fullPath);
        // Simple binary check (can be improved)
        const isBinary = isBinaryFile(entry.name);
        files.push({
          path: relativePath,
          content: isBinary ? content : content.toString('utf-8'),
          isBinary,
        });
      }
    }
  }

  await readDir(templateDir, templateDir);
  return files;
}

function isBinaryFile(filename: string): boolean {
  const binaryExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.zip'];
  return binaryExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}
