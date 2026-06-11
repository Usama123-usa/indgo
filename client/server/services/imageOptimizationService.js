import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
sharp.cache(false);

export async function optimizeImageFile(filePath, options = {}) {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 78,
    backupRoot = path.join(path.dirname(filePath), '.originals'),
    write = false,
    force = false,
  } = options;

  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.has(ext)) {
    return { status: 'skipped', filePath, reason: 'Unsupported file type' };
  }

  const stats = await fs.stat(filePath);
  const backupPath = path.join(backupRoot, path.basename(filePath));
  const tempPath = `${filePath}.optimized.tmp`;

  if (!force) {
    try {
      await fs.access(backupPath);
      return { status: 'skipped', filePath, reason: 'Backup already exists; use --force to recompress' };
    } catch {
      // No backup means the image has not been processed by this service yet.
    }
  }

  const metadata = await sharp(filePath, { failOn: 'none' }).metadata();
  const hasAlpha = Boolean(metadata.hasAlpha);
  const resized = sharp(filePath, { failOn: 'none' }).rotate().resize({
    width: maxWidth,
    height: maxHeight,
    fit: 'inside',
    withoutEnlargement: true,
  });

  try {
    if (ext === '.png') {
      await resized
        .png({
          compressionLevel: 9,
          palette: !hasAlpha,
          quality,
        })
        .toFile(tempPath);
    } else if (ext === '.webp') {
      await resized.webp({ quality }).toFile(tempPath);
    } else {
      await resized.jpeg({ quality, mozjpeg: true }).toFile(tempPath);
    }
  } catch (error) {
    await fs.rm(tempPath, { force: true });
    throw error;
  }

  const optimizedStats = await fs.stat(tempPath);

  if (optimizedStats.size >= stats.size) {
    await fs.rm(tempPath, { force: true });
    return {
      status: 'skipped',
      filePath,
      reason: force ? 'Forced output was not smaller' : 'Optimized output was not smaller',
      originalBytes: stats.size,
      optimizedBytes: optimizedStats.size,
    };
  }

  if (write) {
    await fs.mkdir(backupRoot, { recursive: true });

    try {
      await fs.access(backupPath);
    } catch {
      await fs.copyFile(filePath, backupPath);
    }

    await new Promise((resolve) => setTimeout(resolve, 50));
    const optimizedData = await fs.readFile(tempPath);
    await fs.writeFile(filePath, optimizedData);
  }

  await fs.rm(tempPath, { force: true });

  return {
    status: write ? 'optimized' : 'ready',
    filePath,
    originalBytes: stats.size,
    optimizedBytes: optimizedStats.size,
    width: metadata.width,
    height: metadata.height,
  };
}

export async function findImageFiles(rootDir) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === '.originals') {
        continue;
      }
      files.push(...(await findImageFiles(fullPath)));
      continue;
    }

    if (SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}
