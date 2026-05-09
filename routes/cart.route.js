const express = require('express')
const { add, get, remove } = require('../controllers/cart.controller')

const router = express.Router()

router.post("/:userId",add)
router.get("/:userId", get)
router.delete("/:userId/:productId",remove)

module.exports = router