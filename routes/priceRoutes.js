import { Router } from 'express'
import { PriceController, filterController } from '../controllers/priceController.js'

export const priceRouter = Router()

priceRouter.get('/getPrices', PriceController.getPrices) // -> Trae los precios de las cartas
priceRouter.post('/prices', PriceController.getPrice) 