import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    comments :[],
    status: "idle",
    error: null,  
}

export const getAllComment = createAsyncThunk("getAllComment", async(startIndex) => {
    try {
        const res = await fetch("/api/comment/getAllComments");
        const data = await res.json();

        if(!res.ok){
            return data.message || "Failed to fetch comment";
        }
        
        return data;
    } catch (error) {
        return error.message || "Someting went Wrong -getAllComment" 
    }
})


const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllComment.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(getAllComment.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(getAllComment.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.error = null;
            state.comments = action.payload;
        })
    }
})

export default commentSlice.reducer;