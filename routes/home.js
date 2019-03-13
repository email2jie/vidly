const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("A whole new world");
});

module.exports = router;
