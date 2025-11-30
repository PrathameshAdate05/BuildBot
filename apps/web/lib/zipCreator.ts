import JSZip from 'jszip';
import { TemplateFile } from './templateFetcher';

export async function createZip(files: TemplateFile[]): Promise<Buffer> {
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.path, file.content as any);
  }

  return await zip.generateAsync({ type: 'nodebuffer' });
}
