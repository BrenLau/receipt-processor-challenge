const express = require('express');
const router = express.Router();

router.get('/receipts/process', (req, res) => {
    res.send('req')
})


module.exports = router
