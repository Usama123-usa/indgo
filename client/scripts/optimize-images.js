import path from 'node:path';
import { findImageFiles, optimizeImageFile } from '../server/services/imageOptimizationService.js';

function getArgValue(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

const imageDir = path.resolve(process.cwd(), getArgValue('--dir', 'public/images'));
const write = process.argv.includes('--write');
const force = process.argv.includes('--force');
const maxWidth = Number(getArgValue('--max-width', 1920));
const maxHeight = Number(getArgValue('--max-height', 1920));
const quality = Number(getArgValue('--quality', 78));
const backupRoot = path.join(imageDir, '.originals');

const files = await findImageFiles(imageDir);
const summary = {
  optimized: 0,
  ready: 0,
  skipped: 0,
  failed: 0,
  originalBytes: 0,
  optimizedBytes: 0,
};

for (const filePath of files) {
  try {
    const result = await optimizeImageFile(filePath, {
      backupRoot,
      write,
      force,
      maxWidth,
      maxHeight,
      quality,
    });

    summary[result.status] += 1;
    if (result.originalBytes && result.optimizedBytes) {
      summary.originalBytes += result.originalBytes;
      summary.optimizedBytes += result.optimizedBytes;
    }

    const relativePath = path.relative(process.cwd(), filePath);
    if (result.status === 'optimized' || result.status === 'ready') {
      console.log(`${result.status}: ${relativePath} ${result.originalBytes} -> ${result.optimizedBytes}`);
    } else {
      console.log(`skipped: ${relativePath} (${result.reason})`);
    }
  } catch (error) {
    summary.failed += 1;
    console.error(`failed: ${path.relative(process.cwd(), filePath)} (${error.message})`);
  }
}

const savedBytes = summary.originalBytes - summary.optimizedBytes;
console.log(
  `done: ${summary.optimized} optimized, ${summary.ready} ready, ${summary.skipped} skipped, ${summary.failed} failed, ${savedBytes} bytes reducible/saved`,
);

if (!write) {
  console.log('dry run only. Re-run with --write to update files and create backups.');
}
