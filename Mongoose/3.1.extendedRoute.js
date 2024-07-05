import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    res.send("Welcome to the extended route page");
});

export default router;