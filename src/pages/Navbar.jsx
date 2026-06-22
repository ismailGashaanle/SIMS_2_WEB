import React, { useEffect, useState } from 'react'
import ImageLogo from '../utils/constant'
import { NavLink } from 'react-router-dom'
import { IoHomeSharp } from 'react-icons/io5'
import { MdMenu } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
const Navbar = () => {
    const [isOpenMobile,setisOpenMobile]=useState(false)

    // setTimeout(() => {
    //     if(isOpenMobile===true){
    //       setisOpenMobile(false)
    //     }
        
    // }, 3000);

    useEffect(() => {
  if (isOpenMobile) {
    const timer = setTimeout(() => {
      setisOpenMobile(false)
    }, 3000)

    return () => clearTimeout(timer)
  }
}, [isOpenMobile])

  return (
    <div className='bg-[var(--color-background)] sticky sm:shadow-2xl top-0 z-50 p-2 shadow-lg ring-1 ring-gray-50'>

       <div className='flex gap-2 items-center justify-between px-4'>
         <div>
            <img src={ImageLogo} className='w-28 md:w-50' alt="imagelogo" />
        </div>

        <div className='text-black hidden  md:flex space-x-6 items-center '>
        <NavLink  to="/" className="flex hover:text-[var(--secondary-Color)] hover:font-bold transition duration-300 capitalize ease-in-out items-center space-x-3"><IoHomeSharp className='text-lg -py-2' />Home</NavLink>  
        <NavLink className="hover:text-[var(--secondary-Color)] hover:font-bold transition duration-300 capitalize ease-in-out" to="/services">services</NavLink>
        <NavLink className="hover:text-[var(--secondary-Color)] hover:font-bold transition duration-300 capitalize ease-in-out" to="/about">about</NavLink> 
               <NavLink className="hover:text-[var(--secondary-Color)] hover:font-bold transition duration-300 capitalize ease-in-out " to="/work"> work</NavLink>
        <NavLink className="hover:text-[var(--secondary-Color)] hover:font-bold transition duration-300 capitalize ease-in-out" to="/contact">contact</NavLink>

       
        
        </div>
      
      <div className='hidden md:flex items-center space-x-2'>

       <button className='bg-[var(--secondary-Color))] text-white py-2 px-6 hover:bg-[var(--secondary-Color)]/80 hover:ring-1 hover:ring-gray-400 hover:text-black rounded-lg'> <NavLink to="/login">login</NavLink></button>
   <button className='bg-[var(--secondary-Color))] text-white py-2 px-6 hover:bg-[var(--secondary-Color/)]/80 hover:ring-1 hover:ring-gray-400 hover:text-black rounded-lg'><NavLink to="/signup">signup</NavLink></button>

      </div>
      { !isOpenMobile && <MdMenu  onClick={()=>setisOpenMobile(!isOpenMobile)} className="md:hidden cursor-pointer  text-black font-bold block text-2xl" />}
        
     {  isOpenMobile && <IoMdClose onClick={()=>setisOpenMobile(false)}  className="md:hidden cursor-pointer  text-black font-bold block text-2xl" />}
       </div>

{ isOpenMobile &&
        <div className='text-black bg-[var(--secondary-Color)]/2 animate-fade-in flex flex-col  md:hidden space-y-4  pt-12 px-2 py-2  '>
        <NavLink  to="/" className="flex hover:text-[var(--secondary-Color)] hover:font-bold transition duration-300 capitalize ease-in-out items-center space-x-3"><IoHomeSharp className='text-lg -py-2' />Home</NavLink>  
        <NavLink className="hover:text-[var(--secondary-Color)] hover:font-bold transition duration-300 capitalize ease-in-out" to="/services">services</NavLink>
        <NavLink className="hover:text-[var(--secondary-Color)] hover:font-bold transition duration-300 capitalize ease-in-out" to="/about">about</NavLink> 
               <NavLink className="hover:text-[var(--secondary-Color)] hover:font-bold transition duration-300 capitalize ease-in-out " to="/work"> work</NavLink>
        <NavLink className="hover:text-[var(--secondary-Color)] hover:font-bold transition duration-300 capitalize ease-in-out" to="/contact">contact</NavLink>

    <div className='w-[50%] flex space-x-2'>
           <button className='bg-[var(--secondary-Color))] text-white py-2 px-6 hover:bg-[var(--secondary-Color)]/80 hover:ring-1 hover:ring-gray-400 hover:text-black rounded-lg'> <NavLink to="/login">login</NavLink></button>
   <button className='bg-[var(--secondary-Color))] text-white py-2 px-6 hover:bg-[var(--secondary-Color/)]/80 hover:ring-1 hover:ring-gray-400 hover:text-black rounded-lg'><NavLink to="/signup">signup</NavLink></button>

    </div>
        
        </div>}


    </div>
  )
}

export default Navbar
