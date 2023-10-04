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
    console.log(receipt)

    if (!receipt) {
        res.send('Receipt does not exist')
    }

    const check = {
        a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1, i: 1, h: 1,
        j: 1, k: 1, l: 1, m: 1, n: 1, o: 1, p: 1, q: 1, r: 1,
        s: 1, t: 1, u: 1, v: 1, w: 1, x: 1, y: 1, z: 1, A: 1,
        B: 1, C: 1, D: 1, E: 1, F: 1, G: 1, H: 1, I: 1, J: 1, K: 1,
        L: 1, M: 1, N: 1, O: 1, P: 1, Q: 1, R: 1, S: 1, T: 1, U: 1,
        V: 1, W: 1, X: 1, Y: 1, Z: 1, '1': 1, '2': 1,
        '3': 1, '4': 1, '5': 1, '6': 1, '7': 1, '8': 1, '9': 1
    }

    let points = 0

    for (let i = 0; i < receipt.retailer.length; i++) {
        if (check[receipt.retailer[i]]) {
            points++
        }
    }

    if (receipt.total[receipt.total.length - 2] === '0' && receipt.total[receipt.total.length - 1] === '0') {
        points += 50
    }
    console.log(points, 'total round')
    if (Number(receipt.total) % 0.25 === 0) {
        points += 25
    }
    console.log(points, 'mult of .25')

    let items = receipt.items.length % 2 ? receipt.items.length - 1 : receipt.items.length
    points += ((items / 2) * 5)
    console.log(points, 'items')

    for (let item of receipt.items) {
        let len = item.shortDescription.length % 3
        if (len === 0) {
            points += Math.ceil(.2 * Number(item.price))
        }
    }
    console.log(points, 'length')

    let day = receipt.purchaseDate.slice(receipt.purchaseDate.length - 2)
    if (Number(day) % 2 === 1) {
        points += 6
    }
    console.log(points, 'date')

    if (receipt.purchaseTime > '14:00' && receipt.purchaseTime < '16:00') {
        points += 10
    }
    console.log(points, 'times')


    res.json({ points })
})


module.exports = router
