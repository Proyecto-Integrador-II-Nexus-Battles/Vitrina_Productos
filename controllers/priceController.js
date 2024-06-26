import { Prices, Comment } from '../models/priceModels.js' // -> MARIADB
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
    try{
      const {idUsuario, idCard, comment } = req.body
      const result = await Comment.ADD_COMMENT(idUsuario, idCard, comment)
      res.status(200).json('se agregó correctamente')
    }catch (error){
      console.error('Error al guardar el comentario:', error);
    }
  }

  static async ComentarioPorId(req,res){
    try{
      const { idCard } = req.body
      const comentarios = await Comment.VIEW_COMMENT(idCard)
      res.status(200).json({ comentarios });
    } catch (error) {
      console.error('Error al buscar los comentario:', error);
    }
  }

}