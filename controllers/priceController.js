import { Prices } from '../models/priceModels.js' // -> MARIADB

export class PriceController {
  static async getPrices (req, res) {
    const prices = await Prices.getPrices()
    res.json(prices)
  }
}