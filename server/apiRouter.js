const express = require('express');

const router = express.Router();

const db = require('../db/index');

// for testing purposes
const response = { success: 'Heres your response' };
router.use('/test', (req, res) => {
  res.json(response);
});

module.exports = router;
