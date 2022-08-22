import { createSlice } from "@reduxjs/toolkit";

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

    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;