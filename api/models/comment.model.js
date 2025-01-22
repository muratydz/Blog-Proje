import mongoose from "mongoose";


const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            require: true,
        },
        adminComment: {
            type: String,
        },
        approval: {
            type: Boolean,
            default: false,
        },

    },{timestamps: true}
)

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;