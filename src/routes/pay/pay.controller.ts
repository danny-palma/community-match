/**
 * @author Tech-Code
 * @fileoverview controller for pyament gateway
 */

import { Request, Response } from "express";
import config from "../../config";
const stripe = require("stripe")(config.stripe_key);
import { v4 as uuid4 } from 'uuid';

export function payment(req: Request, res: Response) {
    const { product, token } = req.body;
    console.log("Plan Deluxe ", product);
    console.log("Precio ", product.price);
    const idempotencyKey = uuid4();
    try {
        return stripe.customers.create({
            email: token.email,
            source: token.id
        }).then((customer: { id: string; }) => {
            stripe.charges.create(
                {
                    amount: product.price * 100,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: token.email,
                },
                {
                    idempotencyKey
                });
        })
            .then((result: string) => res.status(200).json(result))
            .catch((err: string) => console.log(err));
    } catch (err) {
        res.send(err);
    };
}
