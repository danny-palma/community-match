/**
 * @author Danny Palma
 * @fileoverview exports the user model
 */

import { Schema, model } from "mongoose";
import IUser from "../interfaces/user";
import { v4 } from "uuid";

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        unique: true,
        default: v4()
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isPremiun: {
        type: Boolean,
        default: false
    },
    joined_at: {
        type: Date,
        default: new Date()
    },
    notifications: {
        type: Array,
        default: []
    },
    projects:{
        type: Array,
        default: []
    }
});

export default model<IUser>("users", UserSchema);
