// import { configureStore } from "@reduxjs/toolkit";
// import UserRecucer from './UserSlice'
// import users from './ManageUserLice'
// import AdminApplicationRecucer from './ApplicationSlice'
// import AdminViewReducer from './AdminViewUserSlice'
// import videoslice from './VideoSlice'
// import navbarReducer from './NavbarSlice'
// import MyApplicationReducer from './MyApplicationSlice'
// import UploadDocReducer from './UploadDocumentSlice'
// import StatusReducer from './StatusSlice'
// import passportNumberSlice from "./passportNumberSlice"
// const AppStore =configureStore({

//     reducer:{
//      user:UserRecucer,
//      users:users,
//      adminApplication:AdminApplicationRecucer,
//      ShowUser:AdminViewReducer,
//      videoslice:videoslice,
//      nav:navbarReducer,
//      myapplication:MyApplicationReducer,
//      uploadDoc:UploadDocReducer,
//      Status:StatusReducer,
//      passportNumber:passportNumberSlice

//     }
// })

// export default AppStore;

import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './UserSlice';
import users from './ManageUserLice';
import AdminApplicationReducer from './ApplicationSlice';
import AdminViewReducer from './AdminViewUserSlice';
import videoslice from './VideoSlice';
import navbarReducer from './NavbarSlice';
import MyApplicationReducer from './MyApplicationSlice';
import UploadDocReducer from './UploadDocumentSlice';
import StatusReducer from './StatusSlice';
import passportNumberSlice from "./passportNumberSlice";

const AppStore = configureStore({
  reducer: {
    user: UserReducer,
    users: users,
    adminApplication: AdminApplicationReducer,
    ShowUser: AdminViewReducer,
    videoslice: videoslice,
    nav: navbarReducer,
    myapplication: MyApplicationReducer,
    uploadDoc: UploadDocReducer,
    Status: StatusReducer,
    passportNumber: passportNumberSlice
  }
});

export default AppStore;