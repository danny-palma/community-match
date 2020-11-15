/** 
 * @author Danny Palma
 * @abstract Exports the interface user for the database
 */

import { Document } from "mongoose";

export default interface User extends Document {
    name: string;
    userID: string;
    email: string;
    password: string;
    isPremiun: true | false;
    joined_at: Date;
};
