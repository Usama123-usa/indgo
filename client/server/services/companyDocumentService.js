import fs from 'node:fs/promises';
import path from 'node:path';
import mammoth from 'mammoth';

const PROJECT_ROOTS = [
  process.cwd(),
  path.resolve(process.cwd(), '..'),
  path.resolve(process.cwd(), 'client'),
];
const DOCUMENT_NAMES = [
  'company information.docx',
  'company information.DOX',
  'company information.doc',
];

let cachedDocumentText = null;

async function findCompanyDocument() {
  for (const projectRoot of PROJECT_ROOTS) {
    for (const name of DOCUMENT_NAMES) {
      const filePath = path.join(projectRoot, name);
      try {
        await fs.access(filePath);
        return filePath;
      } catch {
        // Try the next supported location.
      }
    }
  }

  return null;
}

export async function getCompanyDocumentText() {
  if (cachedDocumentText) {
    return cachedDocumentText;
  }

  const documentPath = await findCompanyDocument();
  if (!documentPath) {
    const error = new Error('Company information document was not found.');
    error.code = 'DOCUMENT_MISSING';
    throw error;
  }

  const ext = path.extname(documentPath).toLowerCase();

  if (ext === '.docx' || ext === '.dox') {
    const result = await mammoth.extractRawText({ path: documentPath });
    cachedDocumentText = result.value.replace(/\s+\n/g, '\n').trim();
  } else {
    cachedDocumentText = (await fs.readFile(documentPath, 'utf8')).trim();
  }

  if (!cachedDocumentText) {
    const error = new Error('Company information document is empty.');
    error.code = 'DOCUMENT_EMPTY';
    throw error;
  }

  return cachedDocumentText;
}
