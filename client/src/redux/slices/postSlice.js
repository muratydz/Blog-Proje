import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";


const initialState = {
    posts: [],
    status: "idle",
    showMore: false,
    error: null
}

export const getPosts = createAsyncThunk("getPosts", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch("/api/post/getposts");
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

export const createPost = createAsyncThunk("createPost", async (postData, { rejectWithValue }) => {
    try {
        const res = await fetch("/api/post/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
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
    }
})

export default postSlice.reducer;