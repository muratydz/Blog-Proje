import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router(); 

router.post("/signup", verifyToken ,signup);
router.post("/signin", signin);

export default router;