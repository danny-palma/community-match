/**
 * @author Danny Palma
 * @important router prefix (/users/)
 * @fileoverview Router for /users
 */

import { Router } from "express";
import { newProject, deleteProject } from "./projects.controller";

const router = Router();

router.route('/new-project')
    .put(newProject)
    .all((_req, res) => {
        res.json({ error: "method not allowed" })
    });

router.route('/delete-project')
    .delete(deleteProject)
    .all((_req, res) => {
        res.json({ error: "method not allowed" })
    });

export default router;
