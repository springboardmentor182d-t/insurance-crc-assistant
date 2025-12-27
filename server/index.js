// server/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simple in‑memory policy data
const policies = [
  {
    id: 1,
    name: 'Health Shield Pro',
    provider: 'SecureLife Insurance',
    premium: 15000,
    coverage: 500000,
    type: 'health',
    claimSettlement: 95,
    cashlessHospitals: 5000
  },
  {
    id: 2,
    name: 'Life Protect Plus',
    provider: 'Guardian Insurance',
    premium: 25000,
    coverage: 2000000,
    type: 'life',
    claimSettlement: 90,
    cashlessHospitals: 3000
  },
  {
    id: 3,
    name: 'Auto Guard Complete',
    provider: 'DriveSecure Insurance',
    premium: 12000,
    coverage: 300000,
    type: 'auto',
    claimSettlement: 92,
    cashlessHospitals: 1500
  }
];

// GET /api/policies?type=health&maxPremium=20000
app.get('/api/policies', (req, res) => {
  const { type, maxPremium } = req.query;
  let result = [...policies];

  if (type && type !== 'all') {
    result = result.filter((p) => p.type === type);
  }
  if (maxPremium) {
    const cap = Number(maxPremium);
    result = result.filter((p) => p.premium <= cap);
  }

  res.json(result);
});

// GET /api/policies/:id
app.get('/api/policies/:id', (req, res) => {
  const id = Number(req.params.id);
  const policy = policies.find((p) => p.id === id);
  if (!policy) return res.status(404).json({ message: 'Policy not found' });
  res.json(policy);
});

// POST /api/compare  { "ids": [1,2] }
app.post('/api/compare', (req, res) => {
  const ids = req.body.ids || [];
  const selected = policies.filter((p) => ids.includes(p.id));
  res.json(selected);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`InsureHub API running on http://localhost:${PORT}`);
});
