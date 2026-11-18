// REST API backed by MongoDB.
// Each JSON file from static/ is stored as one document in the "datasets" collection,
// keyed by its relative path without extension (e.g. "doctor/doctor").
// The frontend keeps requesting /static/<name>.json, so no component changes are needed.
const fs = require('fs');
const path = require('path');
const express = require('express');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'his';
const SEED_DIR = process.env.SEED_DIR || path.join(__dirname, 'seed');

// Recursively list every .json file under dir, returning paths relative to it
function listJson (dir, base = '') {
  return fs.readdirSync(path.join(dir, base), { withFileTypes: true }).flatMap((entry) => {
    const rel = path.posix.join(base, entry.name);
    if (entry.isDirectory()) return listJson(dir, rel);
    return entry.name.endsWith('.json') ? [rel] : [];
  });
}

// Insert the seed files only when the collection is empty, so data edited through the API survives restarts
async function seed (datasets) {
  if (await datasets.estimatedDocumentCount() > 0) return;
  const files = listJson(SEED_DIR);
  const docs = files.map((file) => ({
    _id: file.replace(/\.json$/, ''),
    data: JSON.parse(fs.readFileSync(path.join(SEED_DIR, file), 'utf8'))
  }));
  if (docs.length) await datasets.insertMany(docs);
  console.log(`Seeded ${docs.length} datasets from ${SEED_DIR}`);
}

async function main () {
  const client = await MongoClient.connect(MONGO_URL);
  const datasets = client.db(MONGO_DB).collection('datasets');
  await seed(datasets);

  const app = express();
  app.use(express.json({ limit: '5mb' }));

  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  // List the available dataset names
  app.get('/api/datasets', async (req, res) => {
    const docs = await datasets.find({}, { projection: { _id: 1 } }).toArray();
    res.json(docs.map((d) => d._id));
  });

  // Read one dataset; the name can contain slashes (e.g. doctor/doctor)
  app.get(/^\/api\/datasets\/(.+)$/, async (req, res) => {
    const doc = await datasets.findOne({ _id: req.params[0] });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc.data);
  });

  // Replace one dataset with the request body
  app.put(/^\/api\/datasets\/(.+)$/, async (req, res) => {
    await datasets.replaceOne({ _id: req.params[0] }, { _id: req.params[0], data: req.body }, { upsert: true });
    res.json(req.body);
  });

  // Legacy paths used by the frontend: /static/<name>.json
  app.get(/^\/static\/(.+)\.json$/, async (req, res) => {
    const doc = await datasets.findOne({ _id: req.params[0] });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc.data);
  });

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
