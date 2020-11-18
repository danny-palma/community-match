import { Router } from "express";
import { renderIndex } from "./gui.controller";

const router = Router();

router.get('/', renderIndex);

export default router;
