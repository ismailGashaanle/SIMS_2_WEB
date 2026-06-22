import { createSlice } from "@reduxjs/toolkit";



const UploadDocumentSlice =createSlice({

    name:"uploadDoc",

     initialState: [], 
    reducers:{
        addDocument:(state,action)=>{
             return action.payload
        }
    }

})


export default UploadDocumentSlice.reducer;
export const {addDocument}=UploadDocumentSlice.actions