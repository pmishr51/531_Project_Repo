const express = require('express');
const { session } = require('../config/db');

const router = express.Router();

router.get('/nodes', async (req, res) => {
  try {
    const result = await session.run('MATCH (n) RETURN n LIMIT 10');
    const nodes = result.records.map((record) => record.get('n'));
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
