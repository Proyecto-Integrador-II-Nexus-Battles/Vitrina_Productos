import express, { json } from 'express'
import { priceRouter } from './routes/priceRoutes.js' //--> !!!IMPORTANT!!! Siempre que importen un archivo extensión .js .Loquesea, siempre ponerlo en el path, ej -> './routes/template.js' --> el .js es la extensión 
import cors from 'cors'
import { actualizarBD } from './models/priceModels.js'
import fs from "fs";
import http from "http";
import https from "https";
import { APP_PORT } from './config.js';

const options = {
  key: fs.readFileSync("certs/privkey.pem"),
  cert: fs.readFileSync("certs/cert.pem"),
};

const app = express() // --> Iniciamos express
app.use(json()) 
app.disable('x-powered-by') // --> Deshabilitar el header x-powered-by

app.use(cors())
app.use('/vitrina', priceRouter)


http.createServer(app).listen(80);
https.createServer(options, app).listen(APP_PORT);
console.log(`Server is runing on ${APP_PORT}`);

const updateInterval = process.env.MINS_INTERVAL * 60 * 1000;
setInterval(async () => {
  try {
    await actualizarBD.insertCards();
    console.log('Cards updated successfully');
  } catch (err) {
    console.error('Error updating cards:', err);
  }
}, updateInterval);


