import mariadb from 'mariadb'

const pool = mariadb.createPool({
    host: 'localhost',
    port: '3399',
    user: 'root',
    password: 'Mncdm2024.',
    database: 'ecommerce'
})

export class Prices {
    static async getPrices() {
        const rows = await pool.query('SELECT ID, precio FROM cartas')
        console.log(rows)
        return rows
    }
}
