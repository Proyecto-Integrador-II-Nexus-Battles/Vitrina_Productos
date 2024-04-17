import { Prices } from '../models/priceModels.js' // -> MARIADB
import jwt from 'jsonwebtoken';

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

export class userInfoController {
  static async recibir(req, res) {
    //recibe  el header de autenticacion
    const Authorization = req.headers['authorization'].toString();
    console.log('Authorization', Authorization);
    const decodedToken = jwt.decode(Authorization, { complete: true });
    const payload = decodedToken.payload;
    console.log('Payload:', payload);
    res.json(payload)
  }
}

export class comentarios{

  static async guardarComentarios(req,res){
    const {idUsuario, idCard, comment } = req.body
    const result = await Comment.ADD_COMMENT(idUsuario, idCard, comment)
    res.Json('se agregó correctamente')
  }

  //hacer la funcion de regreso de comentario por id

}