import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { SomalilandCivilAhourityImage } from '../utils/constant'
import { useSelector } from 'react-redux'
import videoSlice from './../utils/VideoSlice';
const Hero = () => {

const  videoslice = useSelector((store)=>store.videoslice);
      console.log("videoslice",videoslice)

  return (
    <div className='py-8 grid md:grid-cols-2 grid-cols-1 px-4 space-x-2 space-y-3'>
      

      <section className='flex  flex-col space-y-3 px-2 gap-3 '>
        <div className='text-2xl md:text-4xl w-full text-[var(--secondary-Color)]  font-bold'>
SOMALILAND IMMIGRATION MANAGEMENT SYSTEM                    
        </div>
        <div className='md:text-2xl text-sm w-full text-black/60'>
               The official digital platform for visa applications,  <br></br>            
           work permits, and residence permits in Somaliland.<br></br>  
           Fast, secure, and transparent.      
        </div>
        <div>
             <img  src={SomalilandCivilAhourityImage} className='w-full md:w-[50%]' alt="image " />
        </div>
        <div className='flex space-x-2'>
           <button className='bg-[var(--secondary-Color))] text-white py-2 px-6 hover:bg-[var(--secondary-Color)]/80 hover:ring-1 hover:ring-gray-400 hover:text-black rounded-lg'> <NavLink to="/login">login</NavLink></button>
   <button className='bg-[var(--secondary-Color))] text-white py-2 px-6 hover:bg-[var(--secondary-Color/)]/80 hover:ring-1 hover:ring-gray-400 hover:text-black rounded-lg'><NavLink to="/signup">signup</NavLink></button>

    </div>

    
 
      </section>



      <section>
           <iframe  
  className="w-full h-full rounded-lg"
  src={videoslice}
  title="video"
  frameBorder="0"
  allow="autoplay; encrypted-media"
  allowFullScreen
></iframe>
      </section>

    </div>
  )
}

export default Hero
