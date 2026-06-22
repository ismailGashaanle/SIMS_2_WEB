import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header';
import Profile from './Profile';
import NewApplication from './user/NewApplication';
import UserSidebar from './UserSidebar';
 

const UserDash = () => {


  const user = useSelector((store)=>store.user?.data);

  const navigate=useNavigate();

  if(!user){
         navigate("/")
         return
    }

    
  console.log(user)
 useEffect(()=>{
if(user===null){
  navigate("/")
  return
}
 
if(user.role !=="user"){
  navigate("/")

  return "you can't access "
}
 },[user])

 
  if(user.status === "block") return <h1 className='text-2xl text-red-500 font-popins font-bold'>please contact Admin the system blocked you can't access system </h1>

  return (
    <div className=''>
      <Header/>
     {/* <Profile/> */}
     {/* <NewApplication/> */}
   
   <div className='flex gap-2'>
      <div className='w-[20%]'>
       <UserSidebar  />
     </div>
   <div className='w-[70%]'>
  
      <Outlet/>
    
   </div>
   </div>
     
    </div>
  )
}

export default UserDash
