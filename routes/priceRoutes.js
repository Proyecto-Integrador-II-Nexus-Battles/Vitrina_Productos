import { Router } from 'express'
import { PriceController, userInfoController } from '../controllers/priceController.js'

export const priceRouter = Router()

priceRouter.get('/getPrices', PriceController.getPrices) // -> Trae los precios de las cartas
priceRouter.post('/prices', PriceController.getPrice)
priceRouter.post('/userInfo', userInfoController.recibir)