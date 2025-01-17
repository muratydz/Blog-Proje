import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data, Link } from "react-router-dom";


const initialState = {
    posts: [],
    status: "idle",
    showMore: false,
    error: null
}

export const getPosts = createAsyncThunk("getPosts", async (limit, { rejectWithValue }) => {
    
    try {
        const res = await fetch(`/api/post/getposts?limit=${limit}`);
        const data = await res.json();
        if (!res.ok) {
            return rejectWithValue(data.message || "Failed to fetch posts");
        }

        return data.posts;
    } catch (error) {
        return rejectWithValue(error.message || "An error occurred while fetching posts");
    }

})

export const loadMorePosts = createAsyncThunk("loadMorePosts", async (startIndex, { rejectWithValue }) => {
    try {
        const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
        const data = await res.json();
        if (!res.ok) {
            return rejectWithValue(data.message || "Failed to load more posts");
        }

        return data.posts;

    } catch (error) {
        return rejectWithValue(error.message || "Someting went wrong -showMore")
    }

})

export const createPost = createAsyncThunk("createPost", async (formData, { rejectWithValue }) => {
    try {
        const res = await fetch("/api/post/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (!res.ok) {
            return rejectWithValue(data.message || "Failed to creating post");
        }
        return data;

    } catch (error) {
        return rejectWithValue(error.message || "Someting went wrong -createPost")
    }
})

export const deletePost = createAsyncThunk("deletePost", async (postId) => {
    try {
        const res = await fetch(`/api/post/deletepost/${postId}`, {
            method: "DELETE"
        })
        if (res.ok) {
            return postId;
        }
    } catch (error) {
        return error.message || "Someting went wrong -deletePost"
    }
})

export const updetePost = createAsyncThunk("updatePost", async ({ postId, formData }) => {
    try {
        const res = await fetch(`/api/post/updatepost/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();
        if (!res.ok) {
            return data.message || "Failed to update post";
        }
        return data;
    } catch (error) {
        return error.message || "Someting went wrong -updatePost"
    }
})
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                state.posts = action.payload;
                state.showMore = action.payload.length >= 9;
            })
            .addCase(loadMorePosts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loadMorePosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(loadMorePosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
                state.showMore = action.payload.length >= 9;
            })
            .addCase(createPost.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                state.posts = [...state.posts, action.payload];
            })
            .addCase(deletePost.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = state.posts.filter((post) => post._id !== action.payload)
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updetePost.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updetePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updetePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                state.posts = state.posts.map((post) => 
                    post._id === action.payload._id ? action.payload : post
                )
            })
    }
})

export default postSlice.reducer;