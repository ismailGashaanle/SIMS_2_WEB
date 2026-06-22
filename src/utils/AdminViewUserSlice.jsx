import { createSlice } from "@reduxjs/toolkit";



const AdminViewUserSlice =createSlice({

    name:"viewUser",
    initialState:null,

    reducers:{

        ShowUser:(state,action)=>{
            return action.payload
        }
    }


})


export default AdminViewUserSlice.reducer;
export const {ShowUser}=AdminViewUserSlice.actions