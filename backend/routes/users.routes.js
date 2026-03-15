// routes/users.routes.js
import { Router } from "express";
import {
    getUsers,
    createUser,
    loginUser,
    addAnimeToFollowUp,
    getUserAnimeList,
    toggleFavorite,
    getUserFollowUpList
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.post("/addAnimeToList", addAnimeToFollowUp);
router.get("/user_anime_list/:id_user", getUserAnimeList);
router.patch("/user_anime_list/:id_user/:id_anime", toggleFavorite);
router.get("/user_follow_up_list/:id_user", getUserFollowUpList);


export default router;