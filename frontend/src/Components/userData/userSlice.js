import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:'user',
    initialState:{
        isLoggedIn:false,
        token:"",
    },
    reducers:{
        setToken:(state,{payload})=>{
            state.token=payload;
            state.isLoggedIn=true;
        },
        removeToken:(state)=>{
            state.token="";
            state.isLoggedIn=false;
        }

    }
})

export const {setToken,removeToke}=userSlice.actions;
export default userSlice.reducer;