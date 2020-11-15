import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({ error: "method not allowed" })
});

export default router;
