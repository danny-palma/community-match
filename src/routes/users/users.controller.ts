/**
 * @author Danny Palma
 * @fileoverview Controller for the route /users/
 */
import { Request, Response } from "express";
import { v4 } from "uuid";
import adminUser from "../../administators/admin-users";
import modelUsers from "../../models/users";

export async function login(req: Request, res: Response) {
    if (!req.body) return res.status(400).json({ error: 'you don\'t provide body params' });
    if (!req.body.email) return res.status(400).json({ error: 'you don\'t provide email' });
    if (!req.body.password) return res.status(400).json({ error: 'you don\'t provide password' });
    try {
        res.send({ code: await adminUser.newLogin(req.body.email, req.body.password) });
    } catch (err) {
        res.status(401).send({ error: err.toString() });
    };
};

export async function register(req: Request, res: Response) {
    if (!req.body) return res.status(400).json({ error: 'you don\'t provide body params' });
    if (!req.body.email) return res.status(400).json({ error: 'you don\'t provide email' });
    if (!req.body.password) return res.status(400).json({ error: 'you don\'t provide password' });
    if (!req.body.name) return res.status(400).json({ error: 'you don\'t provide name' });
    if (!req.body.last_name) return res.status(400).json({ error: 'you don\'t provide last name' });
    console.log(await adminUser.existEmail(req.body.email))
    if ((await adminUser.existEmail(req.body.email))) return res.status(400).json({ error: 'the email already exist' })
    let newUser = new modelUsers({
        userID: v4(),
        full_name: `${req.body.name} ${req.body.last_name}`,
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
    });
    await newUser.save();
    res.json({ status: 'ok' });
};
