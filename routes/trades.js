const express = require('express');
const router = express.Router();
const tradeControllers = require('../controllers/trades')

router.get('/', tradeControllers.getTrades);
router.get('/:id', tradeControllers.getSingleTrades);

router.post('/', tradeControllers.createTrade);
router.put('/:id', tradeControllers.updateTrade);
router.patch('/:id', tradeControllers.updateTrade);
router.delete('/:id', tradeControllers.deleteTrade);
module.exports = router;
