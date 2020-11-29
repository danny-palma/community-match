/**
 * @author Tech-Code
 * @fileoverview router for payment gateway
 */

import { Router } from "express";
import { payment } from "./pay.controller";

const router = Router();

router.get('/', payment);

export default router;
