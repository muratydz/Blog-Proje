import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    users: [],
    currentUser: null,
    error: null,
    loading: false,
    status: "idle",
}

export const getUsers = createAsyncThunk("getUsers", async () =>{
    try {
        const res = await fetch("/api/user/getusers");
        const data = await res.json();
        if(res.ok){
            return data.users;
        }

    } catch (error) {
        console.log(error)
    }
}) 


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        signInFailure: (state, actions) => {
            state.error = actions.payload;
            state.loading = false;
        },
        signInSuccess: (state, actions) => {
            state.currentUser = actions.payload;
            state.error = false;
            state.loading = false;
        },
        resetError: (state) => {
            state.error = false;
            state.loading = false;
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state) => {
            state.status = "loading";
            state.error = false;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.status = "succceeded";
            state.users = action.payload;
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})

export const { signInStart, signInFailure, signInSuccess, resetError} = userSlice.actions;

export default userSlice.reducer;