import { Prices, Filter } from '../models/priceModels.js' // -> MARIADB

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

export class filterController {
  static async filterCards (req, res) {
    const { TypeCard, minPrice, maxPrice, sale, sortOrder } = req.query
    const filter = await Filter.filterPrice(TypeCard, minPrice, maxPrice, sale, sortOrder)
    res.json(filter)
  }
}