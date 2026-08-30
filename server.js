import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const distPath = path.join(__dirname, 'dist');

// Serve static assets with intelligent cache headers
app.use(express.static(distPath, {
  etag: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('index.html') || filePath.endsWith('site-content.md') || filePath.endsWith('llms.txt')) {
      // Always revalidate HTML and Markdown docs
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    } else if (filePath.includes('/assets/')) {
      // Hashed assets can be safely cached for 1 year
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      // Images, certs, pdfs
      res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
    }
  }
}));

// SPA Fallback: send index.html with no-cache header
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Production server running on http://0.0.0.0:${PORT}`);
});
