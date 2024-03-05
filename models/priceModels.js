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
        const rows = await pool.query('SELECT ID, precio FROM cartas');
        const precios = rows.reduce((acc, row) => {
            acc[row.ID] = row.precio;
            return acc;
        }, {});
        console.log(precios);
        return precios;
    }
}