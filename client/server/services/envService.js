import fs from 'node:fs';
import path from 'node:path';

const ENV_PATHS = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '..', '.env'),
];

export function loadServerEnv() {
  for (const envPath of ENV_PATHS) {
    if (!fs.existsSync(envPath)) {
      continue;
    }

    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);

    for (const line of lines) {
      const cleanLine = line.trim();
      if (!cleanLine || cleanLine.startsWith('#') || !cleanLine.includes('=')) {
        continue;
      }

      const separatorIndex = cleanLine.indexOf('=');
      const key = cleanLine.slice(0, separatorIndex).trim();
      const value = cleanLine.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, '');

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}
