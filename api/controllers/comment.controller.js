import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";


export const createComment = async (req, res, next) => {
    if (!req.body.comment) {
        return next(errorHandler(400, "Comment field cannot be left blank"))
    }
    try {
        const { postId, comment } = req.body;

        const trimComment = comment.trim();

        const newComment = new Comment({
            comment: trimComment,
            postId,
        });
        await newComment.save();

        res.status(200).json(newComment);
    } catch (error) {
        next(error)
    }
}

export const getApprovalComment = async(req,res,next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;

        const approvalComment = await Comment.find({ approval: true })
            .skip(startIndex)
            .limit(limit);
        res.status(200).json(approvalComment)
    } catch (error) {
        next(error);
    }
}

export const getUnApprovalComment = async(req,res,next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;

        const unapprovalComment = await Comment.find({ approval: false })
            .skip(startIndex)
            .limit(limit)
        res.status(200).json(unapprovalComment)
    } catch (error) {
        next(error);
    }
}

export const getCountComments = async (req, res, next) => {
    try {
        const countApprovalComment = await Comment.find({ approval: true }).countDocuments();

        const countUnapprovalComment = await Comment.find({ approval: false }).countDocuments();
        
        res.status(200).json({
            countApprovalComment,
            countUnapprovalComment,
        })

    } catch (error) {
        next(error);
    }
}

export const getPostComments = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;

        const postComment = await Comment.find({ approval: true, postId: req.params.postId })
            .skip(startIndex)
            .limit(limit);

        const totalPostComment = await Comment.find({ approval: true, postId: req.params.postId })
            .countDocuments();

        res.status(200).json({
            postComment,
            totalPostComment
        })
    } catch (error) {
        next(error);
    }
}

export const adminApproval = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed"))
    }

    try {
        const approvalComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                $set: {
                    approval: req.body.approval
                },
            }, { new: true }
        );
        res.status(200).json(approvalComment);
    } catch (error) {
        next(error);
    }

}

export const adminComment = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed"))
    }
    try {
        const adminComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                $set: {
                    approval: true,
                    adminComment: req.body.adminComment,
                }
            }, { new: true }
        );
        res.status(200).json(adminComment);
    } catch (error) {
        next(error);
    }
}

export const deleteComment = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to delete comment"))
    }
    try {
        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json("comment has been delete")
    } catch (error) {
        next(error);
    }
}
