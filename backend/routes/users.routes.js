// routes/users.routes.js
import { Router } from "express";
import { getUsers, createUser, loginUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", loginUser);


export default router;