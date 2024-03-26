import { Prices } from '../models/priceModels.js' // -> MARIADB

export class PriceController {
  static async getPrices (req, res) {
    const prices = await Prices.getPrices()
    res.json(prices)
  }

  static async getPrice (req, res) {
    const price = await Prices.getPrice(req.body)
    res.json(price)
  }
}