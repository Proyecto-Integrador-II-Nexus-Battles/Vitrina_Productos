import { Router } from 'express'
import { PriceController, userInfoController , comentarios } from '../controllers/priceController.js'

export const priceRouter = Router()

priceRouter.get('/getPrices', PriceController.getPrices) // -> Trae los precios de las cartas
priceRouter.post('/prices', PriceController.getPrice)
priceRouter.post('/userInfo', userInfoController.recibir)


priceRouter.post('/add-comment', comentarios.guardarComentarios) // -> Guarda los comentarios
priceRouter.post('/get-comment', comentarios.ComentarioPorId) // -> Busca los comentarios por la carta