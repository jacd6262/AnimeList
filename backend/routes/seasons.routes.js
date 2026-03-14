// routes/seasons.routes.js
import { Router } from "express";
import { getSeasons } from "../controllers/seasons.controller.js";

const router = Router();

router.get("/", getSeasons);

export default router;