const express = require('express');
const router = express.Router();

const list = { nextId: 1 }

router.post('/receipts/process', (req, res) => {
    const { retailer, purchaseDate, purchaseTime, total, items } = req.body


    let item = {
        id: list.nextId,
        retailer,
        purchaseDate,
        purchaseTime,
        total,
        items
    }


    list[list.nextId] = item
    list.nextId++
    res.json({ id: list.nextId - 1 })
})

router.get('/receipts/:id/points', (req, res) => {
    const { id } = req.params
    const receipt = list[id]
    res.json(receipt)
})


module.exports = router
