import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";


const initialState = {
    users: [],
    currentUser: null,
    error: null,
    loading: false,
    status: "idle",
}

export const getUsers = createAsyncThunk("getUsers", async () => {
    try {
        const res = await fetch("/api/user/getusers");
        const data = await res.json();
        if (res.ok) {
            return data.users;
        }

    } catch (error) {
        console.log(error);
    }
})

export const updateUser = createAsyncThunk("updateUser", async ({ userId, formData }) => {
    try {
        const res = await fetch(`/api/user/update/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            throw new Error(data.message || "Failed to update user");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
});


export const deleteUser = createAsyncThunk("deleteUser", async (userId) => {
    try {
        const res = await fetch(`/api/user/delete/${userId}`, {
            method: "DELETE",
        })
        if (res.ok) {
            return userId;
        }
    } catch (error) {
        console.log(error);
    }
})

export const addUser = createAsyncThunk("addUser", async (formData, { rejectWithValue }) => {
    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            return data;
        } else {
            return rejectWithValue(data.message || "Failed to add user")
        }
    } catch (error) {
        return rejectWithValue(error.message || "Someting went wrong")
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
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = false;
            state.loading = false;
        },
        resetError: (state) => {
            state.error = false;
            state.loading = false;
        },
        signoutSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
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
            .addCase(updateUser.pending, (state) => {
                state.status = "loading";
                state.error = false;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = state.users.map(user =>
                    user._id === action.payload._id ? action.payload : user
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.status = "loading";
                state.error = false;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = state.users.filter((user) => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addUser.pending, (state) => {
                state.status = "loading";
                state.error = false;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = [...state.users, action.payload];
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
    }
})

export const { signInStart, signInFailure, signInSuccess, resetError, signoutSuccess } = userSlice.actions;

export default userSlice.reducer;