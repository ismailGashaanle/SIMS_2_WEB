import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router'
import ImageLogo, { Logout_Icon } from './../utils/constant';
import useLogout from '../hooks/useLogout';

const Header = () => {
const navigate = useNavigate();
const [isMobile,setisMobile]=useState(false)
    const user = useSelector((store)=>store?.user.data)
    useEffect(()=>{
       if(user===null){
          navigate("/")
          return
      }
          
     },[user])

 const logout = useLogout();
    

  return (
    <div className='sticky w-full top-0 z-50 bg-[var(--color-background)] shadow-lg p-4'>
      <div className='flex w-full justify-end items-center gap-2  px-4 '>

        <div className='w-full'>
            <img src={ImageLogo} className='w-14 md:w-[10%] rounded-full' />
        </div>
        
        <div className='flex   gap-4 w-full items-center justify-end  '>
            <p>{user?.firstName}</p>
           <div className=' items-center gap-2 flex justify-end '>
             <span className='p-2 bg-[var(--secondary-Color)] text-white rounded-lg'>{user?.role}</span>
            <NavLink to="profile">
                <img className='w-12 rounded-full' src={user?.photoImage} />
            </NavLink>
           </div>
           <div>
             <img src={Logout_Icon} className='w-10 rounded-full cursor-pointer '
             
            onClick={logout}

             />
           </div>
        </div>


      </div>


    </div>
  )
}

export default Header
