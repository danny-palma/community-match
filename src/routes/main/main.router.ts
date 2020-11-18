/**
 * @author Danny Palma
 * @fileoverview Response the main route '/'
 */

import { Router } from "express";
import { controllerMain } from "./main.controller";

let router = Router();

router.get('/', controllerMain);

export default router;
