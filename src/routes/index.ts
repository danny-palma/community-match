/**
 * @author Danny Palma
 * @abstract Creates the routes
 * 
 */

import { Application } from "express";
import routerMain from "./main/main.router";

export default class routes {
    constructor(private app: Application) {
        this.app.use(routerMain);
    };
};
