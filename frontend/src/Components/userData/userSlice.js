import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getUser = createAsyncThunk('/getUser', async (token) => {
    const response = axios.get('http://localhost:5000/api/users', {
        headers: {
            'x-auth-token': token,
        }
    });
    return response.data;

})
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        token: "",
        userName: "",
        userEmail: "",
    },
    reducers: {

        setUser: (state, { payload }) => {
            state.token = payload.token;
            state.isLoggedIn = true;
            state.userName = payload.name;
            state.userEmail = payload.email;
        },
        removeUser: (state) => {
            state.token = "";
            state.isLoggedIn = false;
            state.userName = "";
            state.userEmail = "";
        }

    },
    extraReducers: {
        [getUser.fulfilled]: (state, { payload }) => {
            // state.token = payload;
            state.isLoggedIn = true;
            state.userName = payload.name;
            state.userEmail = payload.email;

        },
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;