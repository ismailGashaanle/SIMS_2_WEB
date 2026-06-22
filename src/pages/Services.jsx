import React from 'react'
import {ServicesList} from './ServicesList'
import Navbar from './Navbar'
const Services = () => {
  return (
  <div>
    
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2 items-center px-4'>

        {
            ServicesList.map((item)=>{
               return <div key={item.id} className='h-full bg-[var(--secondary-Color)]/90 text-white font-bold flex flex-col  gap-2 shadow-2xl p-3 rounded-md ring-1 ring-black/1'>
                    
                    <img src={item.icon} className='w-[17%] rounded-md' />
                    <h2 className=' uppercase font-bold'>{item.title}</h2>
                    <span className='text-sm  bg-green-500/10 ring-1 px-2 rounded-md text-white'>{item.description}</span>
                    <span className='text-black/80'>{item.features}</span>

                </div>

            })
        }
      
    </div>
  </div>
  )
}

export default Services
