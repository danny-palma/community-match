/** 
 * @author Danny Palma
 * @fileoverview Exports the interface user for the database
 */

import { Document } from "mongoose";
import skills from "./skills";

interface notifications {
    title: string;
    timeStamp: Date;
    body: string;
    type: 'danger' | 'warning' | 'alert' | 'social' | 'projects' | 'news';
};

interface previewProject {
    name: string;
    description: string;
    projectID: string;
};

export default interface User extends Document {
    full_name: string;
    name: string;
    last_name: string;
    userID: string;
    email: string;
    password: string;
    isPremiun: true | false;
    joined_at: Date;
    skills: skills[];
    notifications: notifications[];
    projects: previewProject[];
};
