import { Schema, model } from "mongoose";
import IUser from "../interfaces/user";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    isPremiun: {
        type: Boolean,
        default: false
    },
    joined_at: {
        type: Date,
        default: new Date()
    }
});

export default model<IUser>("users", UserSchema);