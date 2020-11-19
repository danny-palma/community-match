/**
 * @author Danny Palma
 * @fileoverview this is the adminintrator of the users whith code 
 * @example 
 * code = '4n5pxq24kpiob12og9' <-- that is the token to acces at the info user
 * if the code don't exists cannot acces to account
 * the code has eliminated before 1 hour
 * its simple :D
 */

import IUser from "../interfaces/user";
import modelUsers from "../models/user";
import uniqid from "uniqid";


export default new class adminUsers {
    private users: Map<string, IUser> = new Map();

    public async newLogin(email: string, password: string): Promise<string> {
        if (!email) throw new ReferenceError('email is not defined');
        if (!password) throw new ReferenceError('password is not defined');
        let regexpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
        if (!regexpEmail.test(email)) throw 'the email is invalid';
        let user = await modelUsers.findOne({ email: email });
        if (!user) throw 'the email don\'t exist';
        if (user.password != password) throw 'the passwords don\'t match';
        let userID = uniqid();
        this.users.set(userID, user);
        this.setDeleteTimeOut(userID);
        return userID;
    };

    public getUser(key: string): IUser | undefined {
        return this.users.get(key);
    };

    public revoceAccess(key: string): boolean {
        return this.users.delete(key);
    };

    public existKey(key: string): boolean {
        return this.users.has(key);
    };

    public async existEmail(email: string): Promise<boolean> {
        return await modelUsers.exists({ email: email });
    };

    private setDeleteTimeOut(key: string): void {
        setTimeout(() => {
            this.users.delete(key);
        }, 3600000);
    };
};
