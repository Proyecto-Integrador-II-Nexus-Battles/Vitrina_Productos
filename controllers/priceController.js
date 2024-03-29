import { Prices } from '../models/priceModels.js' // -> MARIADB

export class PriceController {
  static async getPrices (req, res) {
    const prices = await Prices.getPrices()
    res.json(prices)
  }

  static async getPrice (req, res) {
    const cards = req.body
    if (!Symbol.iterator in Object(cards)) {
      cards = [cards];
    }
    const price = await Prices.getPrice(cards)
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