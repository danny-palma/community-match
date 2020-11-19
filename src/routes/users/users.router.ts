/**
 * @author Danny Palma
 * @important router prefix (/users/)
 * @fileoverview Router for /users
 */

import { Router } from "express";
import { login, register } from "./users.controller";

const router = Router();

router.route('/login')
    .post(login)
    .all((_req, res) => {
        res.json({ error: "method not allowed" })
    });

router.route('/register')
    .post(register)
    .all((_req, res) => {
        res.json({ error: "method not allowed" })
    });

export default router;
