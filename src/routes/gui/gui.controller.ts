import { Request, Response } from "express";
import { join } from "path";

export async function renderIndex(req: Request, res: Response) {
    res.sendFile(join(__dirname, 'views/index.html'))
}
