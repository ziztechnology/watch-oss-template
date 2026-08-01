// @ts-check

import { createWriteStream } from 'node:fs';
import { access, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ZipArchive } from 'archiver';

const ARCHIVE_FILE_PREFIX = 'watch-face';

/**
 * Formats a date as a local-time YYYYMMDDHHmm timestamp.
 *
 * @param {Date} date
 */
const formatTimestamp = (date) => {
  const dateParts = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()];

  return dateParts.map((datePart) => String(datePart).padStart(2, '0')).join('');
};

/**
 * Creates a ZIP archive containing the contents of the dist directory.
 *
 * @param {string} sourceDirectoryPath
 * @param {string} archiveFilePath
 */
const createZipArchive = async (sourceDirectoryPath, archiveFilePath) => {
  await access(sourceDirectoryPath);

  const outputStream = createWriteStream(archiveFilePath);
  const archive = new ZipArchive({ zlib: { level: 9 } });

  const archiveCompleted = new Promise((resolve, reject) => {
    outputStream.on('close', resolve);
    outputStream.on('error', reject);
    archive.on('error', reject);
  });

  archive.pipe(outputStream);
  archive.directory(sourceDirectoryPath, false);

  try {
    await Promise.all([archive.finalize(), archiveCompleted]);
  } catch (error) {
    archive.abort();
    outputStream.destroy();

    if (!outputStream.closed) {
      await new Promise((resolve) => outputStream.once('close', resolve));
    }

    await rm(archiveFilePath, { force: true });
    throw error;
  }
};

const packageDistribution = async () => {
  const scriptDirectoryPath = path.dirname(fileURLToPath(import.meta.url));
  const projectRootPath = path.resolve(scriptDirectoryPath, '..');
  const distributionDirectoryPath = path.join(projectRootPath, 'dist');
  const timestamp = formatTimestamp(new Date());
  const archiveFileName = `${ARCHIVE_FILE_PREFIX}-${timestamp}.zip`;
  const archiveFilePath = path.join(projectRootPath, archiveFileName);

  await createZipArchive(distributionDirectoryPath, archiveFilePath);
  console.log(`Created ${archiveFileName}`);
};

packageDistribution().catch((error) => {
  console.error('Failed to package the dist directory.', error);
  process.exitCode = 1;
});
