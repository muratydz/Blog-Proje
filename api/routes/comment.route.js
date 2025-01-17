import express from "express";
import { adminApproval, adminComment, createComment, deleteComment, getApprovalComment, getCountComments, getPostComments, getUnApprovalComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", createComment);
router.get("/getCountComments", getCountComments);
router.get("/getApprovalComment", getApprovalComment);
router.get("/getunApprovalComment", getUnApprovalComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/adminApproval/:commentId", verifyToken, adminApproval);
router.put("/adminComment/:commentId", verifyToken, adminComment);
router.delete("/delete/:commentId", verifyToken, deleteComment)

export default router;