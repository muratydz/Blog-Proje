import express from "express";
import { adminApproval, adminComment, createComment, deleteComment, getAllComments, getPostComments } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", createComment);
router.get("/getAllComments", getAllComments);
router.get("/getPostComments/:postId", getPostComments);
router.put("/adminApproval/:commentId", verifyToken, adminApproval);
router.put("/adminComment/:commentId", verifyToken, adminComment);
router.delete("/delete/:commentId", verifyToken, deleteComment)

export default router;