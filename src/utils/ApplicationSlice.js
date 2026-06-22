import { createSlice } from "@reduxjs/toolkit";


const AdminApplicationSlice = createSlice({
    
    name:"adminApplication",

    initialState:{
        applicationData:null
    },

    reducers:{
        
        AddApplications:(state,action)=>{
            state.applicationData = action.payload
        }

    }
})



export default AdminApplicationSlice.reducer;

export const {AddApplications}= AdminApplicationSlice.actions