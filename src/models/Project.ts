/**
 * @author Danny Palma
 * @abstract Creates interface of the proyects
 */

import { Schema, model } from "mongoose";
import IProjects from "../interfaces/projects";

const ProjectsSchema = new Schema({
    projectID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    links: {
        type: Array,
        required: true,
    },
    ownerID: {
        type: String,
        required: true
    },
    requiredSkills: {
        type: Array,
        required: true,
    },
    starts: {
        type: Number,
        default: 0
    },
    roles: {
        type: Array,
        required: true
    }
});

export default model<IProjects>("projects", ProjectsSchema);
