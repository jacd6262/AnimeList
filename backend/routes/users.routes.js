// routes/users.routes.js
import { Router } from "express";
import { getUsers, createUser, loginUser, addAnimeToFollowUp } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.post("/addAnimeToList", addAnimeToFollowUp);

export default router;