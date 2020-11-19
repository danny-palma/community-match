/**
 * @author Danny Palma
 * @important router prefix (/users/)
 * @fileoverview Router for /users
 */

import { Router } from "express";
import { login, register } from "./users.controller";

const router = Router();

router.route('/login')
    .get((_req, res) => {
        res.json({ error: "method not allowed" })
    })
    .post(login);

router.route('/register')
    .get((_req, res) => {
        res.json({ error: "method not allowed" })
    })
    .post(register);

export default router;
