import mariadb from "mariadb";
import { DBDATABASE, DBHOST, DBPASSWORD, DBPORT, DBUSER, PORT, HOST } from "../config.js";

const pool = mariadb.createPool({
  host: DBHOST,
  port: DBPORT,
  user: DBUSER,
  password: DBPASSWORD,
  database: DBDATABASE,
  
});

export class actualizarBD {
  static obtenerNumeroAleatorio() {
    const numeroAleatorio = Math.random();
    const numeroAleatorioEscalado = numeroAleatorio * (2000000 - 20000);
    const numeroFinal = numeroAleatorioEscalado + 20000;
    return Math.floor(numeroFinal);
  }
  
  static async obtenerCartas() {
    const res = await fetch(`${HOST}:${PORT}/inventario/getAllCards`)
    const cartas = res.json()
    return cartas
  }
  
  static async insertCards() {
    const conn = await pool.getConnection();
    console.log(conn)
    const cards = await this.obtenerCartas();
    
    for (const card of cards) {
      const precio = this.obtenerNumeroAleatorio();
      const existingCard = await conn.query("SELECT id FROM cartas WHERE id = ?", [card._id]);
      if (!existingCard.length) {
        const rows = await conn.query(
          "INSERT INTO cartas (id, precio, porcentaje_impuesto, porcentaje_descuento, divisa_nombre) VALUES (?, ?, ?, ?, ?)",
          [card._id, precio, "19", "0", "COP"]
        );
      } else {
        console.log(`Card with ID ${card._id} already exists. Skipping insertion.`);
      }
    }
    conn.release();
  }
}

export class Prices {
  static async getPrices() {
    const rows = await pool.query("SELECT ID, precio FROM cartas");
    const precios = rows.reduce((acc, row) => {
      acc[row.ID] = row.precio;
      return acc;
    }, {});
    return precios;
  }

  static async getPrice(ids) {
    let precios = [];
    for (const cardId of ids) {
      const precio = await pool.query("SELECT precio, divisa_nombre, porcentaje_descuento FROM cartas WHERE ID = ?", [cardId]);
      precios.push({ precio: precio[0].precio, divisa: precio[0].divisa_nombre, descuento: precio[0].porcentaje_descuento, id_carta: cardId});
    }
    return precios;
  }
}

export class Comment {

  static async ADD_COMMENT(idUsuario, idCard, comment ){

  }
}