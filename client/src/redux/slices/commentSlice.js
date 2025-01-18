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

export const getApprovalComment = createAsyncThunk("getApprovalComment", async() => {
    try {
        const res = await fetch("/api/comment/getApprovalComment")
        const data = await res.json();

        if(!res.ok) {
            return data.message || "Someting went wrong";
        }

        return data;
    } catch (error) {
        return error.message || "Failed to get approval comment"
    }
})

export const getUnapprovalComment = createAsyncThunk("getUnapprovalComment", async() => {
    try {
        const res = await fetch("/api/comment/getUnApprovalComment")
        const data = await res.json();

        if(!res.ok) {
            return data.message || "Someting went wrong";
        }

        return data;
    } catch (error) {
        return error.message || "Failed to get approval comment"
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
            .addCase(adminApproval.fulfilled, (state) => {
                state.status = "succeeded";
                state.error = null;
                const updatedComment = action.payload;

                if (updatedComment.approval) {
                    state.ApprovalComment = [...state.ApprovalComment, updatedComment];
                } else {
                    state.UnapprovalComment = [...state.UnapprovalComment, updatedComment];
                }

                state.UnapprovalComment = state.UnapprovalComment.filter(
                    (comment) => comment._id !== updatedComment._id
                );
                state.ApprovalComment = state.ApprovalComment.filter(
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
    }
})

export default commentSlice.reducer;