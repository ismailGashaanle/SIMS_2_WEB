import { createSlice } from "@reduxjs/toolkit";



const NavbarSlice=createSlice({

    name:"navbar",
    initialState:{
        nav:false
    },

    reducers:{
        addnav:(state)=>{
            state.nav=false
        }
    }

})


export default NavbarSlice.reducer;
export const {addnav}=NavbarSlice.actions