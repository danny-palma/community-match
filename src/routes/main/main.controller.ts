/**
 * @author Danny Palma
 * @fileoverview controller of the main route '/'
 */

import { Request, Response } from "express";
import userModel from "../../models/users";
let lastPing = 0;
export async function controllerMain(req: Request, res: Response) {
    let initDB = Date.now();
    await userModel.findOne({ email: 's' });
    let endDB = Date.now();
    req.on('end', () => {
        lastPing = Date.now() - initDB;
    })
    return res.json({ status: 'all systems operational', ping: lastPing, pingDB: endDB - initDB });
};
