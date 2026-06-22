import { createSlice } from "@reduxjs/toolkit";



const ManageUsers= createSlice({

    name:"users",
    initialState:{
        userData:null
    },
    reducers:{

        AddUsers:(state,action)=>{

             state.userData= action.payload

        },

    }

    
})


export default ManageUsers.reducer;

export const {AddUsers}= ManageUsers.actions