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

/**
 * @author Tech-Code
 * @fileoverview payment gateway configuration
 */

import cors from "cors";
import { Request, Response } from "express";
import express from "express";
const stripe = require("stripe")("pk_test_51HrGYuJYLSe9I9Ja5FmPqHsQGjAnskGouoVXQEWPlwo8HWHu8ecx0BQHSk7lUzxefWIcqtpolUPCZvvBPW2fBdop00nyd4otiG");
import { v4 } from "uuid";

// Initializations
const app = express();

//Middleware
app.use(express.json());
app.use(cors())


//Routes
app.get("/", (req: Request, res: Response) => {
    res.send("It works at learncodeonline")
})

app.post("/pago", (req: Request, res: Response) => {
    const { product, token } = req.body;
    console.log("Plan Deluxe ", product);
    console.log("Precio ", product.price);
    const idempontencykey = v4();

    return stripe.customers.create({
        email: token.email,
        source: token.id,
    }).then((customer: { id: any; }) => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `comprar ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempontencykey });
    })
        .then((result: any) => res.status(200).json(result))
        .catch((err: any) => console.log(err));
})

// listen
app.listen(5000, () => {
    console.log('Server on port', 5000)
})

