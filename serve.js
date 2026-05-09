import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5200;

app.use(express.static(join(__dirname, 'dist')));

// SPA fallback — Express 5 uses /{*path} syntax
app.get('/{*path}', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Flint and Stone running at http://localhost:${PORT}`);
});
