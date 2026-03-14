// routes/animes.routes.js
import { Router } from "express";
import { getAnimes, getAnimeById, createAnime } from "../controllers/animes.controller.js";

const router = Router();

router.get("/", getAnimes);
router.get("/:id", getAnimeById);
router.post("/", createAnime);

export default router;
