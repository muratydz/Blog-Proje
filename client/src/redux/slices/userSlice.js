import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error: false,
    loading: false,
}

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
    }
})

export const { signInStart, signInFailure, signInSuccess, resetError} = userSlice.actions;

export default userSlice.reducer;