import fs from 'node:fs/promises';
import path from 'node:path';
import { WEBSITE_KNOWLEDGE } from './websiteKnowledge.js';

const CLIENT_ROOTS = [
  process.cwd(),
  path.join(process.cwd(), 'client'),
];

const WEBSITE_FILES = [
  'src/pages/Home.jsx',
  'src/pages/Contact.jsx',
  'src/pages/FindStation.jsx',
  'src/pages/Services.jsx',
  'src/pages/Products.jsx',
  'src/pages/Projects.jsx',
  'src/pages/Privacy.jsx',
  'src/pages/Terms.jsx',
  'src/components/Features.jsx',
  'src/components/Footer.jsx',
  'src/components/Hero.jsx',
  'src/components/Vision.jsx',
];

let cachedWebsiteText = null;

function cleanSourceText(source) {
  return source
    .replace(/import[\s\S]*?;\s*/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/style=\{\{[\s\S]*?\}\}/g, ' ')
    .replace(/className="[^"]*"/g, ' ')
    .replace(/[{}()[\]<>`"'=,:;]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function readWebsiteFile(relativePath) {
  for (const clientRoot of CLIENT_ROOTS) {
    try {
      const filePath = path.join(clientRoot, relativePath);
      const source = await fs.readFile(filePath, 'utf8');
      return `Website page: ${relativePath}\n${cleanSourceText(source)}`;
    } catch {
      // Try the next possible project root.
    }
  }

  return '';
}

export async function getWebsiteContentText() {
  if (cachedWebsiteText) {
    return cachedWebsiteText;
  }

  const fileTexts = await Promise.all(WEBSITE_FILES.map(readWebsiteFile));

  cachedWebsiteText = `${WEBSITE_KNOWLEDGE}\n\n${fileTexts.filter(Boolean).join('\n\n')}`.trim();

  if (!cachedWebsiteText) {
    const error = new Error('Website content could not be loaded.');
    error.code = 'WEBSITE_CONTENT_MISSING';
    throw error;
  }

  return cachedWebsiteText;
}
