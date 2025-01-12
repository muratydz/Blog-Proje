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
        return rejectWithValue(data.message || "Someting went wrong -showMore")
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
    }
})

export default postSlice.reducer;