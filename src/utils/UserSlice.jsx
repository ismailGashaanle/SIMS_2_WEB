import { createSlice } from "@reduxjs/toolkit";

 
// const UserSlice = createSlice({
//   name: "user",
//   initialState: {
//     data: null,
//     loading: true
//   },

//   reducers: {
//     addUser: (state, action) => {
//       state.data = action.payload
//       state.loading = false
//     },


//     RemoveUser:(state)=>{
//         state.data=null
//     }
//   }
// });


// export default UserSlice.reducer;

// export const {addUser,RemoveUser}= UserSlice.actions


 

const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: true
  },
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    RemoveUser: (state) => {
      state.data = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export default UserSlice.reducer;
export const { addUser, RemoveUser, setLoading } = UserSlice.actions;