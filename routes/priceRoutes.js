import { Router } from 'express'
import { PriceController } from '../controllers/priceController.js'

export const priceRouter = Router()

priceRouter.get('/getPrices', PriceController.getPrices) // -> Trae los precios de las cartas