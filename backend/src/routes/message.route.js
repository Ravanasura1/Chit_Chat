import express from "express"
import { protectRoute } from "../middlewares/protectRoute.js";
import { getUsersForSidebar,getMessages,sendMessage } from "../controllers/message.controllers.js";

const router = express.Router();

router.get("/users",protectRoute,getUsersForSidebar);
router.get("/:id", protectRoute, getMessages)
router.post("/send/:id", protectRoute, sendMessage)

export default router