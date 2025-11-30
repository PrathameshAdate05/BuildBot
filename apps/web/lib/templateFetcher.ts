/**
 * CDN-only template fetcher
 * Templates are fetched exclusively from CDN
 */

export interface TemplateFile {
  path: string;
  content: string | Buffer;
  isBinary: boolean;
}

const TEMPLATE_CDN_BASE = process.env.NEXT_PUBLIC_TEMPLATE_CDN || '';

interface TemplateFetchOptions {
  version?: string;
  timeout?: number;
}

/**
 * Fetch template from CDN
 */
export async function fetchTemplate(
  templateName: string,
  options: TemplateFetchOptions = {}
): Promise<TemplateFile[]> {
  const { version = 'latest', timeout = 10000 } = options;

  if (!TEMPLATE_CDN_BASE) {
    throw new Error(
      'NEXT_PUBLIC_TEMPLATE_CDN is not configured. Please set it in your environment variables.'
    );
  }

  const url = `${TEMPLATE_CDN_BASE}/${version}/${templateName}.json`;
  
  console.log(`[TemplateFetcher] Fetching ${templateName} from CDN: ${url}`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
      // Cache for 1 hour in production
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`CDN returned ${response.status} for ${templateName}`);
    }

    const templateData = await response.json();
    
    // Validate the structure
    if (!Array.isArray(templateData)) {
      throw new Error('Invalid template format from CDN');
    }

    console.log(`[TemplateFetcher] Successfully fetched ${templateName} (${templateData.length} files)`);
    
    return templateData as TemplateFile[];
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`CDN fetch timeout for ${templateName} (${timeout}ms)`);
      }
      throw new Error(`Failed to fetch template ${templateName}: ${error.message}`);
    }
    
    throw error;
  }
}

/**
 * Get available template versions from CDN
 */
export async function getTemplateVersions(_templateName: string): Promise<string[]> {
  if (!TEMPLATE_CDN_BASE) {
    return ['latest'];
  }

  try {
    const url = `${TEMPLATE_CDN_BASE}/versions.json`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return ['latest'];
    }

    const data = await response.json();
    return Array.isArray(data.latest) ? data.latest : ['latest'];
  } catch (error) {
    console.warn('Failed to fetch template versions:', error);
    return ['latest'];
  }
}

/**
 * Check if CDN is available
 */
export async function isCDNAvailable(): Promise<boolean> {
  if (!TEMPLATE_CDN_BASE) {
    return false;
  }

  try {
    const response = await fetch(`${TEMPLATE_CDN_BASE}/versions.json`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(2000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * List available templates
 */
export async function listTemplates(): Promise<string[]> {
  if (!TEMPLATE_CDN_BASE) {
    throw new Error('NEXT_PUBLIC_TEMPLATE_CDN is not configured');
  }

  try {
    const url = `${TEMPLATE_CDN_BASE}/versions.json`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch template list');
    }

    const data = await response.json();
    return Array.isArray(data.latest) ? data.latest : [];
  } catch (error) {
    console.error('Failed to list templates:', error);
    return ['nextjs-starter', 'react-spa', 'node-express']; // Fallback
  }
}
