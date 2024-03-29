import express, { json } from 'express'
import { priceRouter } from './routes/priceRoutes.js' //--> !!!IMPORTANT!!! Siempre que importen un archivo extensión .js .Loquesea, siempre ponerlo en el path, ej -> './routes/template.js' --> el .js es la extensión 
import cors from 'cors'
import { actualizarBD } from './models/priceModels.js'

const app = express() // --> Iniciamos express
app.use(json()) 
app.disable('x-powered-by') // --> Deshabilitar el header x-powered-by

app.use(cors())
app.use('/vitrina', priceRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server listen on port http://${process.env.HOST}:${process.env.PORT}`)
})

const updateInterval = process.env.MINS_INTERVAL * 60 * 1000;
setInterval(async () => {
  try {
    await actualizarBD.insertCards();
    console.log('Cards updated successfully');
  } catch (err) {
    console.error('Error updating cards:', err);
  }
}, updateInterval);