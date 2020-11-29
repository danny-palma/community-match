/**
 * @author Danny Palma
 * @fileoverview Create an express app
 */
import express, { Application } from "express";
import { Server } from "http";
import parser from "cookie-parser";
import routes from "./routes/index";
import DBConnect from "./database";
import cors from "cors";

export default class App {

    public app: Application = express();

    constructor(private port?: string | number) {
        this.config();
        this.midlewares();
        this.routes();
    };
    private config(): void {
        this.app.set('port', process.env.PORT || this.port || 3000);
        this.app.disable('x-powered-by');
    };
    private midlewares(): void {
        this.app.use(parser());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors);
        this.app.use(express.json());
    };
    private routes(): void {
        new routes(this.app);
    };
    public async listen(callback: Function = () => console.log(`Server on port ${this.app.get('port')}`)): Promise<Server> {
        await DBConnect();
        return this.app.listen(this.app.get('port'), callback());
    };
};
