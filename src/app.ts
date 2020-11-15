/**
 * @author Danny Palma
 * @abstract Create an express app
 */

import express, { Application, Request, Response } from "express";
import { Server } from "http";
import routes from "./routes/index";

export default class App {
    public app: Application;
    constructor(private port?: string | number) {
        this.app = express();
        this.config();
        this.midlewares();
        this.routes();
    };
    private config(): void {
        this.app.set('port', process.env.PORT || this.port || 3000);
    };
    private midlewares(): void {

    };
    private routes(): void {
        new routes(this.app);
        this.app.use((req: Request, res: Response) => {
            return res.json({error: 'the page noesn\'t exist'});
        });

    };
    public listen(callback: Function = () => console.log(`Server on port ${this.app.get('port')}`)): Server {
        return this.app.listen(this.app.get('port'), callback());
    };
};
