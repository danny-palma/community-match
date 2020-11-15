/**
 * @author Danny Palma
 * @abstract Creates the routes
 * 
 */

import { Application, Request, Response, ErrorRequestHandler, NextFunction } from "express";
import routerMain from "./main/main.router";

export default class routes {
    constructor(private app: Application) {
        this.app.use(routerMain);
        this.errors();
    };
    private errors() {
        // Error 404
        this.app.use((req: Request, res: Response) => {
            return res.status(404).json({ error: 'the page noesn\'t exist' });
        });
        // Error 500
        this.app.use((error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
            return res.status(500).json({ error: 'something wrong :(' });
        });
    };
};
