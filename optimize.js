import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

// Optional: set FFmpeg path if not in system PATH
// ffmpeg.setFfmpegPath('C:/ffmpeg/bin/ffmpeg.exe'); // <-- adjust your path here

// Source and target folders
const srcDir = path.join(process.cwd(), 'src/assets');
const destDir = path.join(process.cwd(), 'src/assets2');

// Supported raster image formats
const rasterFormats = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
// Vector image formats
const vectorFormats = ['.svg'];
// Supported video formats
const supportedVideos = ['.mp4'];

// Ensure destination folder exists
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

// Optimize videos using ffmpeg
async function optimizeVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      ffmpeg(inputPath)
        .outputOptions([
          '-c:v libx264',
          '-preset slow',
          '-crf 28',
          '-c:a aac',
          '-b:a 128k'
        ])
        .on('end', () => resolve())
        .on('error', err => reject(err))
        .save(outputPath);
    } catch (err) {
      reject(err);
    }
  });
}

// Recursively process folder
async function optimizeFolder(folder, relativePath = '') {
  const items = fs.readdirSync(folder);

  for (const item of items) {
    const itemPath = path.join(folder, item);
    const stats = fs.lstatSync(itemPath);
    const destSubfolder = path.join(destDir, relativePath);

    if (stats.isDirectory()) {
      if (!fs.existsSync(path.join(destSubfolder, item))) {
        fs.mkdirSync(path.join(destSubfolder, item), { recursive: true });
      }
      await optimizeFolder(itemPath, path.join(relativePath, item));
    } else if (stats.isFile()) {
      const ext = path.extname(item).toLowerCase();
      let outputFilePath = path.join(destSubfolder, item);

      try {
        const inputSizeKB = (stats.size / 1024).toFixed(2);

        // Raster images
        if (rasterFormats.includes(ext)) {
          let pipeline = sharp(itemPath).resize({ width: 1920, withoutEnlargement: true });

          if (ext === '.jpg' || ext === '.jpeg')
            pipeline = pipeline.jpeg({ quality: 60, progressive: true, mozjpeg: true });
          else if (ext === '.png')
            pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true, palette: true });
          else if (ext === '.webp') pipeline = pipeline.webp({ quality: 60, effort: 6 });
          else if (ext === '.avif') pipeline = pipeline.avif({ quality: 50 });

          await pipeline.toFile(outputFilePath);

          const outputStats = fs.statSync(outputFilePath);
          const outputSizeKB = (outputStats.size / 1024).toFixed(2);
          console.log(`Optimized raster image: ${itemPath} -> ${outputFilePath} | ${inputSizeKB} KB -> ${outputSizeKB} KB`);

        // Vector images
        } else if (vectorFormats.includes(ext)) {
          fs.copyFileSync(itemPath, outputFilePath);
          console.log(`Copied vector image: ${itemPath} -> ${outputFilePath} | ${inputSizeKB} KB`);

        // Videos
        } else if (supportedVideos.includes(ext)) {
          outputFilePath = outputFilePath.replace(ext, '.mp4');
          try {
            await optimizeVideo(itemPath, outputFilePath);
            const outputStats = fs.statSync(outputFilePath);
            const outputSizeKB = (outputStats.size / 1024).toFixed(2);
            console.log(`Optimized video: ${itemPath} -> ${outputFilePath} | ${inputSizeKB} KB -> ${outputSizeKB} KB`);
          } catch (err) {
            console.warn(`⚠ Skipping video (FFmpeg missing or error): ${itemPath}`);
          }

        // Unsupported files
        } else {
          console.log(`Skipping unsupported file: ${itemPath}`);
        }

      } catch (err) {
        console.error(`Failed to process ${itemPath}:`, err);
      }
    }
  }
}

// Start optimization
optimizeFolder(srcDir)
  .then(() => console.log('✅ All images and videos processed and saved to assets2!'))
  .catch(err => console.error(err));
