/**
 * @author Danny Palma
 * @fileoverview exports interface projects
 */

import { Document } from "mongoose";
import IRoles from "./roles";
import Skills from "./skills";

interface ProjectLinks{
    type: string;
    link: string;
};

export default interface Projects extends Document {
    projectID: string
    name: string;
    description: string;
    links: ProjectLinks[];
    ownerID: string;
    requiredSkills: Skills[];
    starts: 1 | 2 | 3 | 4 | 5;
    roles: IRoles[];
};
