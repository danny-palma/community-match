/* process.on('unhandledRejection', (_reason, promise) => {
    console.log('ocurrio una exepcion inesperada en: ', promise);
});
process.on('uncaughtException', (error) => {
    console.log('ocurrio una exepcion inesperada: ', error);
    process.exit();
});

import App from './app';

let app = new App();

app.listen(); */

import cors from "cors";
import express from 'express';
/* TODO: add a stripe key */
import stripe from "stripe";
import uuid from "uuid"

// Initializations
const app = express();

//Middleware
app.use(express.json());
app.use(cors())


//Routes
app.get("/", (req, res) => {
    res.send("It works at learncodeonline")
})

// listen
app.listen(5000, () => {
    console.log('Server on port', 5000)
})

