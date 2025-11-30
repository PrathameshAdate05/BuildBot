import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fetchTemplate } from '@/lib/templateFetcher';
import { renderTemplate } from '@/lib/templateRenderer';
import { createZip } from '@/lib/zipCreator';

const generateSchema = z.object({
  template: z.enum(['nextjs-starter', 'react-spa', 'node-express']),
  projectName: z.string().min(1).max(50).regex(/^[a-zA-Z0-9-]+$/, 'Only alphanumeric characters and hyphens are allowed'),
  description: z.string().optional(),
  license: z.string().optional(),
  packageManager: z.string().optional(),
  gitInit: z.boolean().optional(),
  options: z.record(z.string(), z.boolean()).optional(),
  settings: z.object({
    folderStructure: z.string().optional(),
    lintRules: z.string().optional(),
    styling: z.string().optional(),
    fileNaming: z.string().optional(),
  }).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = generateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const { template, projectName, options } = result.data;

    // Fetch template (tries CDN first, falls back to local)
    const templateFiles = await fetchTemplate(template);

    // Render template (replace placeholders)
    const renderedFiles = renderTemplate(templateFiles, {
      projectName,
      options: (options as Record<string, boolean>) || {},
    });

    // Generate ZIP
    const zipBuffer = await createZip(renderedFiles);

    // Return ZIP
    return new NextResponse(zipBuffer as any, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=${projectName}.zip`,
      },
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
