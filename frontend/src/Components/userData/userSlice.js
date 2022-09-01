import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import swal from "sweetalert";

export const getUser = createAsyncThunk('/getUser', async (token) => {

    try {
        const response =await axios.get('http://localhost:3001/api/users', {
            headers: {
                'x-auth-token': token,
            }
        });
        return response.data;
        
    } catch (error) {
        swal("server Error",'getUser api failed','error');
        
    }

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

        // setUser: (state, { payload }) => {
        //     state.token = payload.token;
        //     state.isLoggedIn = true;
        //     state.userName = payload.name;
        //     state.userEmail = payload.email;
        // },
        // removeUser: (state) => {
        //     state.token = "";
        //     state.isLoggedIn = false;
        //     state.userName = "";
        //     state.userEmail = "";
        // }

    },
    extraReducers: {
        [getUser.pending]:(state,{payload})=>{
        },
        [getUser.fulfilled]: (state, { payload }) => {
            state.isLoggedIn = true;
            state.userName = payload.name;
            state.userEmail = payload.email;

        },
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;