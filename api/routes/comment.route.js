import express from "express";
import { adminApproval, adminComment, createComment, deleteComment, getAllComment, getPostComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", createComment);
router.get("/getAllComment", getAllComment);
router.get("/getPostComment/:postId", getPostComment);
router.put("/adminApproval/:commentId", verifyToken, adminApproval);
router.put("/adminComment/:commentId", verifyToken, adminComment);
router.delete("/delete/:commentId", verifyToken, deleteComment)

export default router;