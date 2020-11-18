/**
 * @author Danny Palma
 * @fileoverview controller of the main route '/'
 */

import { Request, Response } from "express";

export function controllerMain(req: Request, res: Response) {
    return res.json({ status: 'all systems operational' });
};
