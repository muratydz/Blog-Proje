import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    unapprovalComment: [],
    approvalComment: [],
    countComment: [],
    status: "idle",
    error: null,
}

export const getCountComments = createAsyncThunk("getCountComments", async () => {
    try {
        const res = await fetch("/api/comment/getCountComments");
        const data = await res.json();

        if (!res.ok) {
            return data.message || "Failed to fetch comment";
        }

        return data;
    } catch (error) {
        return error.message || "Someting went Wrong -getAllComment"
    }
})

export const adminApproval = createAsyncThunk("adminApproval", async ({ commentId, approval }) => {
    try {
        const res = await fetch(`/api/comment/adminApproval/${commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ approval })
        })
        const data = res.json();
        if (!res.ok) {
            return data.message || "Someting went wrong";
        }
        return data;

    } catch (error) {
        return error.message || "Failed to admin approval";
    }
})

export const getApprovalComment = createAsyncThunk("getApprovalComment", async () => {
    try {
        const res = await fetch("/api/comment/getApprovalComment")
        const data = await res.json();

        if (!res.ok) {
            return data.message || "Someting went wrong";
        }

        return data;
    } catch (error) {
        return error.message || "Failed to get approval comment"
    }
})

export const getUnapprovalComment = createAsyncThunk("getUnapprovalComment", async () => {
    try {
        const res = await fetch("/api/comment/getUnApprovalComment")
        const data = await res.json();

        if (!res.ok) {
            return data.message || "Someting went wrong";
        }

        return data;
    } catch (error) {
        return error.message || "Failed to get approval comment"
    }
})

export const adminComment = createAsyncThunk("adminComment", async ({ commetId, text }) => {
    try {
        const res = await fetch(`/api/commet/adminComment/${commetId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });
        const data = res.json();

        if (!res.ok) {
            return data.message || "Someting went Wrong";
        }
        return data;

    } catch (error) {
        return error.message || "Failed to add admin commet";
    }
})

export const deleteComment = createAsyncThunk("deleteComment", async (commentId) => {
    try {
        const res = await fetch(`/api/comment/delete/${commentId}`, {
            method: "DELETE"
        })
        const data = await res.json();

        if (!res.ok) {
            return data.message || "Someting went wrong delete comment";
        }
        return commentId;
    } catch (error) {
        return error.message || "Failed to delete commet"
    }
})


const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCountComments.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCountComments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getCountComments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                state.countComment = action.payload;
            })
            .addCase(adminApproval.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(adminApproval.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(adminApproval.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                const updatedComment = action.payload;

                if (updatedComment.approval) {
                    state.approvalComment = [...state.approvalComment, updatedComment];
                } else {
                    state.unapprovalComment = [...state.unapprovalComment, updatedComment];
                }

                state.unapprovalComment = state.unapprovalComment.filter(
                    (comment) => comment._id !== updatedComment._id
                );
                state.approvalComment = state.approvalComment.filter(
                    (comment) => comment._id !== updatedComment._id
                );
            })
            .addCase(getApprovalComment.pending, (state) => {
                state.status = "loading";
                state.error = null
            })
            .addCase(getApprovalComment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getApprovalComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.approvalComment = action.payload;
            })
            .addCase(getUnapprovalComment.pending, (state) => {
                state.status = "loading";
                state.error = null
            })
            .addCase(getUnapprovalComment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getUnapprovalComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.unapprovalComment = action.payload;
            })
            .addCase(adminComment.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(adminComment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(adminComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                const adminComment = action.payload;
                if (adminComment.approval) {
                    state.approvalComment = [...state.approvalComment, adminComment];
                } else {
                    state.unapprovalComment = [...state.unapprovalComment, adminComment];
                }

                state.unapprovalComment = state.unapprovalComment.filter(
                    (comment) => comment._id !== adminComment._id
                );
                state.approvalComment = state.approvalComment.filter(
                    (comment) => comment._id !== adminComment._id
                );
            })
            .addCase(deleteComment.pending, (state) => {
                state.status = "loading";
                state.error = null
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                state.unapprovalComment = state.unapprovalComment.filter(
                    (comment) => comment._id !== action.payload
                );
                state.approvalComment = state.approvalComment.filter(
                    (comment) => comment._id !== action.payload
                );
            });
    }
}
)

export default commentSlice.reducer;