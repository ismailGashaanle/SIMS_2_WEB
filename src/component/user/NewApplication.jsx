import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL_API } from '../../utils/constant'

const NewApplication = () => {
const [ErrorMessage,setErrorMessage]=useState("")

    const [formData,setFormData]=useState({
     fullName:"", 
     ApplicationType:"",
     email:"",
     phone:"",
     dateOfBirth:"",
     nationality:"", 
     passportNumber:"",
     passportDateIssue:"",
     passportExpireDate:"", 
     purposeOfTravel:"",
     intendedDepartureDate:"" ,
     addressInDestination:""
    })


    const applyApplication = async(e)=>{
        e.preventDefault(); 

        try{

            const res =  await axios.post(BASE_URL_API + "/application",
                formData,
            {withCredentials:true})
            console.log(res.data)

            setFormData({
                 fullName:"", 
     ApplicationType:"",
     email:"",
     phone:"",
     dateOfBirth:"",
     nationality:"", 
     passportNumber:"",
     passportDateIssue:"",
     passportExpireDate:"", 
     purposeOfTravel:"",
     intendedDepartureDate:"" ,
     addressInDestination:""
            })
            

        }catch(err){
            console.log(err)
            // setErrorMessage(err.response.data.message)
            // setErrorMessage(err.response?.data || err.message)
            setErrorMessage(err.response?.data?.message || err.message)

        
        }

    }


    console.log(formData)




   const  checkErrv= ()=>{
    if(ErrorMessage){

    }

    setTimeout(() => {
         setErrorMessage("")
    }, 9000);
   }
  
    
        useEffect(()=>{
               checkErrv()
        })
    

  return (

    <div className='flex flex-col gap-2 w-full py-4'>
      <div className='flex gap-2 flex-col'>
          <div className='py-7 relative px-4 text-2xl  bg-[var(--secondary-Color)]/80 text-white rounded-lg w-full'>  New Application  </div>

        {ErrorMessage &&  (<div className='py-7 absolute top-80  left-100 w-[50%] mx-auto  px-4  text-sm  bg-red-500 text-white rounded-lg '>  {ErrorMessage} error</div>)}
      </div>

  <div className='flex w-full py-3 shadow-2xl bg-white  '>
    
    <form onSubmit={applyApplication} className='flex gap-3 px-4 w-full m-0 md:w-10/12 md:justify-center md:mx-auto  flex-col   '>


     <div className='grid grid-col-1 gap-2  md:gap-6 w-full space-x-3 md:grid-cols-2'>
        <div className='flex flex-col gap-1'>
                 <label>fullName</label>
      <input className='p-3  rounded-lg ring-1 ring-gray-400 outline-[var(--secondary-Color)]' value={formData.fullName} onChange={(e)=>setFormData({...formData, fullName:e.target.value})} />

        </div>
       <div className='flex flex-col gap-1'>
          <label>Application Type</label>
         
         <select  className='p-3 rounded-lg ring-1 ring-gray-400 outline-[var(--secondary-Color)]'  onChange={(e)=>setFormData({...formData,ApplicationType:e.target.value})} >
            <option>chosoe Appliaction Type</option>
            <option value="tourist_visa">tourist visa</option>
            <option value="business_visa">business visa</option>
            <option value="student_visa">student visa</option>
            <option value="work_permit">workvpermit</option>
            <option value="residence_permit">residence_permit</option>
            
             
         </select>
       </div>
     </div>


<div className='grid grid-col-1 gap-2  md:gap-6 w-full space-x-3 md:grid-cols-2'>
     <div className='flex flex-col gap-1'>
         <label>Email</label>
         <input  value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} className='p-3 rounded-lg ring-1 ring-gray-400 outline-[var(--secondary-Color)]' />


     </div>

      <div  className='flex flex-col gap-1'>
        <label>Phone</label>
      <input  value={formData.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})}  className='p-3 rounded-lg ring-1 ring-gray-400 outline-[var(--secondary-Color)]' />
      </div>

</div>
       
<div className='grid grid-col-1 gap-2  md:gap-6 w-full space-x-3 md:grid-cols-2'>
    
   <div  className='flex flex-col gap-1'>
      <label> Date of Birth</label>
     <input type='date' value={formData.dateOfBirth} onChange={(e)=>setFormData({...formData,dateOfBirth:e.target.value})}  className='p-3 rounded-lg ring-1 ring-gray-400 outline-[var(--secondary-Color)]' />
  
  
   </div>
<div  className='flex flex-col gap-1'>
    
      <label>nationality</label>
     <input  value={formData.nationality} onChange={(e)=>setFormData({...formData,nationality:e.target.value})}  className='p-3 rounded-lg ring-1 ring-gray-400 outline-[var(--secondary-Color)]' />

</div>


</div>


    <div className='grid grid-col-1 gap-2  md:gap-6 w-full space-x-3 md:grid-cols-2'>
     <div  className='flex flex-col gap-1'>
           <label>Passport ID</label>
    <input  value={formData.passportNumber} onChange={(e)=>setFormData({...formData,passportNumber:e.target.value})} className='p-3 rounded-lg ring-1 ring-gray-400 outline-[var(--secondary-Color)]' />

     </div>

     
  <div  className='flex flex-col gap-1'>
      <label>passport Date issue</label>
    <input  className='p-3 rounded-lg ring-1 ring-gray-400 outline-[var(--secondary-Color)]' type="date" value={formData.passportDateIssue} onChange={(e)=>setFormData({...formData,passportDateIssue:e.target.value})} />

  </div>
    </div>

  <div className='grid grid-col-1 gap-2  md:gap-6 w-full space-x-3 md:grid-cols-2'>
    <div  className='flex flex-col gap-1'>
          <label>passport Expire Date</label>
    <input type="date" value={formData.passportExpireDate} onChange={(e)=>setFormData({...formData,passportExpireDate:e.target.value})}   className='p-3 rounded-lg ring-1 ring-gray-400 outline-[var(--secondary-Color)]' />

    </div>
 <div  className='flex flex-col gap-1'>
      <label>purpose Of Travel</label>

   <textarea  value={formData.purposeOfTravel} onChange={(e)=>setFormData({...formData,purposeOfTravel:e.target.value})}  className='p-3 rounded-lg ring-1 ring-gray-400 outline-[var(--secondary-Color)]'>

   </textarea>

 </div>
  </div>


<div className='grid grid-col-1 gap-2  md:gap-6 w-full space-x-3 md:grid-cols-2'>
<div className='flex flex-col gap-1'>
        <label>intended Departure Date</label>
<input type='date'  className='p-3 rounded-lg ring-1 ring-gray-400 outline-[var(--secondary-Color)]' value={formData.intendedDepartureDate} onChange={(e)=>setFormData({...formData,intendedDepartureDate:e.target.value})} />

</div>


<div className='flex flex-col gap-1'>
    <label>address In Destination</label>
<input   value={formData.addressInDestination} onChange={(e)=>setFormData({...formData,addressInDestination:e.target.value})} className='p-3 rounded-lg ring-1 ring-gray-400 outline-[var(--secondary-Color)]' />

</div>

</div>

      <button className='p-3 rounded-md bg-[var(--secondary-Color)] text-white'
      onClick={applyApplication}
      
      >submit application</button>
    </form>
    </div>
    </div>
  
  )
}

export default NewApplication
