import { createSlice } from "@reduxjs/toolkit";


const passportNumberSlice= createSlice({

    name:"passportNumber",

    initialState:{
        passportNumber:[],
    },

    reducers:{
        addpassportNumber:(state,action)=>{
              state.passportNumber= action.payload
        },
        ClearStatusPassportNumber:(state,action)=>{
            state.passportNumber=null
        }
    }
})


export default passportNumberSlice.reducer;

export const {addpassportNumber,ClearStatusPassportNumber}= passportNumberSlice.actions