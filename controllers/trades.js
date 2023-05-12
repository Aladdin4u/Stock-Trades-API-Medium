const db = require("../models/trades.js");
const { Op } = require("sequelize");

module.exports = {
  getTrades: async (req, res, next) => {
    let filter = {};
    let q = req.query;
    try {
      if (q.type || q.user_id) {
        if (q.type && q.user_id) {
          filter = {
            where: {
              [Op.and]: [
                { type: String(q.type) },
                { user_id: Number(q.user_id) },
              ],
            },
          };
          const trades = await db.findAll(filter);
          return res.json(trades);
        } else if (q.type) {
          filter = {
            where: {
              type: String(q.type)
            },
          };
          const trades = await db.findAll(filter);
          return res.json(trades);
        } else if (q.user_id) {
          filter = {
            where: {
              user_id: Number(q.user_id)
            },
          };
          const trades = await db.findAll(filter);
          return res.json(trades);
        }
      }
      const trades = await db.findAll(filter);
      res.json(trades);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  },
  getSingleTrades: async (req, res, next) => {
    const { id } = req.params;
    try {
      const trade = await db.findByPk(id);
      if (trade) {
        res.json(trade);
      } else {
        res.status(404).send("ID not found");
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
      console.log(error);
    }
  },
  createTrade: async (req, res, next) => {
    try {
      const body = {
        type: req.body.type,
        user_id: req.body.user_id,
        symbol: req.body.symbol,
        shares: req.body.shares,
        price: req.body.price,
        timestamp: req.body.timestamp,
      };
      const trade = await db.create(body);
      res.status(201).json(trade);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  },
  updateTrade: async (req, res, next) => {
    return res.status(405).send("not allow modifying trades for any id value");
    const { id } = req.params;
    try {
      const body = {
        type: req.body.type,
        user_id: req.body.user_id,
        symbol: req.body.symbol,
        shares: req.body.shares,
        price: req.body.price,
        timestamp: req.body.timestamp,
      };
      const trade = await db.findByPk(id);
      // const updatedtrade = await trade.update(body);
      res.status(405).json(trade);
      console.log("trades ==>", body);
    } catch (error) {
      res.status(405).json({ error: error.message });
      console.log(error);
    }
  },
  deleteTrade: async (req, res, next) => {
    return res.status(405).send("not allow deleting trades for any id value");
    const { id } = req.params;
    try {
      const trade = await db.findByPk(id);
      const deletedTrade = await trade.destroy();
      res.json({
        message: "success",
        data: deletedTrade,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  },
};
