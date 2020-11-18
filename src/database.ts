/**
 * @author Danny Palma
 * @fileoverview Create a database connection
 */

import { connect } from "mongoose";
import config from "./config";

let uri = process.env.NODE_ENV == 'production' ? config.DBURI : config.devDBURI;

export default async () => {
    return await connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err) => {
        if (err) throw err;
        console.log(`database is connected to ${uri}`);
    });
};
