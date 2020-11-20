import { Request, Response } from "express";
import adminUsers from "../../administators/admin-users";

export async function newProject(req: Request, res: Response) {
    if (!req.headers.authorization) return res.status(403).json({ error: 'you don\'t provide authorization code' });
    if (!adminUsers.existKey(req.headers.authorization)) return res.status(403).json({ error: 'the authorization code is invalid' });
    
    res.send({ status: 'ok' });
};
