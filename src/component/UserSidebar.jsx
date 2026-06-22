import React from 'react'
import Profile from './Profile'
import MyApplications from './user/MyApplications'
import NewApplication from './user/NewApplication'
import UploadDocument from './UploadDocument';
import MyDocuments from './user/MyDocuments';
import TrackStatus from './user/TrackStatus';
import Support from './user/Support';
import { NavLink, Outlet } from 'react-router';

const UserSidebar = () => {
  return (
    <div className='flex flex-col gap-2 fixed  w-[15%] '>
     {/* <Profile/> */}

    
     <div className='flex flex-col gap-4 py-4 rounded-md h-screen  bg-white shadow-2xl ring-1 ring-gray-200 '>


<NavLink  className={({isActive})=>`shadow-sm p-4 rounded-lg  hover:bg-gray-300/80 
         hover:text-black ring-[var(--secondary-Color)]/40  transition-all duration-300 
         ease-in-out transform hover:scale-[1.03] hover:translate-x-1 w-[96%] ${
            isActive ? "bg-[var(--secondary-Color)] glow text-white" 
            :"bg-[var(--color-background)] shadow-2xl text-black"
        }`}  to="">Dashbaord</NavLink>



      <NavLink  className={({isActive})=>`shadow-sm p-4 rounded-lg  hover:bg-gray-300/80 
         hover:text-black ring-[var(--secondary-Color)]/40  transition-all duration-300 
         ease-in-out transform hover:scale-[1.03] hover:translate-x-1 w-[96%] ${
            isActive ? "bg-[var(--secondary-Color)] glow text-white" 
            :"bg-[var(--color-background)] shadow-2xl text-black"
        }`} to="profile">profile</NavLink>
      <NavLink  className={({isActive})=>`shadow-sm p-4 rounded-lg  hover:bg-gray-300/80 
         hover:text-black ring-[var(--secondary-Color)]/40  transition-all duration-300 
         ease-in-out transform hover:scale-[1.03] hover:translate-x-1 w-[96%] ${
            isActive ? "bg-[var(--secondary-Color)] glow text-white" 
            :"bg-[var(--color-background)] shadow-2xl text-black"
        }`} to="newApplication">NewApplication</NavLink>
        <NavLink  className={({isActive})=>`shadow-sm p-4 rounded-lg  hover:bg-gray-300/80 
         hover:text-black ring-[var(--secondary-Color)]/40  transition-all duration-300 
         ease-in-out transform hover:scale-[1.03] hover:translate-x-1 w-[96%] ${
            isActive ? "bg-[var(--secondary-Color)] glow text-white" 
            :"bg-[var(--color-background)] shadow-2xl text-black"
        }`}  to="UploadDocument">UploadDocument</NavLink>

      <NavLink   className={({isActive})=>`shadow-sm p-4 rounded-lg  hover:bg-gray-300/80 
         hover:text-black ring-[var(--secondary-Color)]/40  transition-all duration-300 
         ease-in-out transform hover:scale-[1.03] hover:translate-x-1 w-[96%] ${
            isActive ? "bg-[var(--secondary-Color)] glow text-white" 
            :"bg-[var(--color-background)] shadow-2xl text-black"
        }`} to="MyApplications">MyApplications</NavLink>


          
          
      <NavLink   className={({isActive})=>`shadow-sm p-4 rounded-lg  hover:bg-gray-300/80 
         hover:text-black ring-[var(--secondary-Color)]/40  transition-all duration-300 
         ease-in-out transform hover:scale-[1.03] hover:translate-x-1 w-[96%] ${
            isActive ? "bg-[var(--secondary-Color)] glow text-white" 
            :"bg-[var(--color-background)] shadow-2xl text-black"
        }`} to="approval-letter">approval letter</NavLink>




      
      <NavLink  className={({isActive})=>`shadow-sm p-4 rounded-lg  hover:bg-gray-300/80 
         hover:text-black ring-[var(--secondary-Color)]/40  transition-all duration-300 
         ease-in-out transform hover:scale-[1.03] hover:translate-x-1 w-[96%] ${
            isActive ? "bg-[var(--secondary-Color)] glow text-white" 
            :"bg-[var(--color-background)] shadow-2xl text-black"
        }`}  to="TrackStatus">TrackStatus</NavLink>
      <NavLink  className={({isActive})=>`shadow-sm p-4 rounded-lg  hover:bg-gray-300/80 
         hover:text-black ring-[var(--secondary-Color)]/40  transition-all duration-300 
         ease-in-out transform hover:scale-[1.03] hover:translate-x-1 w-[96%] ${
            isActive ? "bg-[var(--secondary-Color)] glow text-white" 
            :"bg-[var(--color-background)] shadow-2xl text-black"
        }`}  to="Support">Support</NavLink>


       
     </div>

    
    </div>
  )
}

export default UserSidebar
