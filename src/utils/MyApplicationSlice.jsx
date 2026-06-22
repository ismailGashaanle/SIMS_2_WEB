
import { createSlice } from '@reduxjs/toolkit'
 

const MyApplicationSlice =  createSlice({

    name:"myapplication",
    initialState:{
        myapplication:[]
    },

    reducers:{
        addMyApplication:(state,action)=>{
            state.myapplication= action.payload
        }
    }


})


export default MyApplicationSlice.reducer
export const {addMyApplication}=MyApplicationSlice.actions
   
 