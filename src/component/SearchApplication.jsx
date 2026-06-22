import React, { useEffect, useState } from 'react'
import useSearchpassportSearch from '../hooks/useSearchpassportSearch'
import { useDispatch, useSelector } from 'react-redux';
import { ClearStatusPassportNumber } from '../utils/passportNumberSlice';

const SearchApplication = () => {

    const [passporNum,setPassportNum]=useState("")

const passportNumber =useSelector((store)=>store?.passportNumber?.passportNumber)
console.log("data", passportNumber)
    const getpassportSearch =useSearchpassportSearch();
    const dispatch=useDispatch();

    // useEffect(()=>{
    //   getpassportSearch(passporNum)
    // },[passporNum])


    const Clear=()=>{
    dispatch(ClearStatusPassportNumber())
    }
   

//     useEffect(() => {
//   if (passporNum.trim() !== "") {
//     getpassportSearch(passporNum);
  
//   }

   
// }, [passporNum]);



  return (
    <div className='p-3 w-[80%] mx-auto'>

      <div className='flex gap-2 items-center w-full justify-between '>
        <div className='flex flex-col gap-2 w-full'>
              <label>search passport Number Application</label>
        <input  value={passporNum} onChange={(e)=>setPassportNum(e.target.value)}  placeholder='passport ID or passport Number' className='ring-1 hover:outline-[var(--secondary-Color)] p-4 w-full rounded-lg' />
      </div>

      <div className='p-3 gap-3 flex items-center pt-8'>

      
        <button className="px-4 py-3 bg-[var(--secondary-Color)] text-white rounded-lg"
        

        onClick={()=> getpassportSearch(passporNum)}


        >search</button>



        {passportNumber && <button className="px-4 py-3 bg-red-500 text-white rounded-lg"
        

        onClick={()=> getpassportSearch(setPassportNum(""),Clear())}


        >clear</button>}
      </div>
        </div>
      

      
        <div className='mt-6'>

 {Array.isArray(passportNumber) && passportNumber.length > 0 ? (
          passportNumber.map((item) => (


             <div key={item.passportNumber} className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border">

      {/* HEADER */}
      <div className="bg-[var(--secondary-Color)] text-white p-6">
        <h2 className="text-xl font-bold">Application Details</h2>
        <p className="text-sm opacity-80">
          Passport Search Result
        </p>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-4">

        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Full Name</span>
          <span className="font-semibold">{item.fullName}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Passport Number</span>
          <span className="font-semibold">{item.passportNumber}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Nationality</span>
          <span className="font-semibold">{item.nationality}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Visa Type</span>
          <span className="font-semibold">{item.ApplicationType}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Purpose</span>
          <span className="font-semibold">{item.purposeOfTravel}</span>
        </div>

        {/* STATUS BADGE */}
        <div className="flex justify-between items-center pt-3">
          <span className="text-gray-500">Status</span>

        <span
  className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${
    passportNumber?.status === "verified"
      ? "bg-green-600"
      : passportNumber?.status === "pending"
      ? "bg-yellow-500"
      : passportNumber?.status === "rejected"
      ? "bg-red-500"
      : "bg-gray-500"
  }`}
>
  {item?.status
    ? item.status === "verified"
      ? "APPROVED"
      : passportNumber.status
    : "UNKNOWN"}
</span>
        </div>

      </div>

    </div>
            
          ))
        ) : passporNum && (
          <p className='text-gray-500 mt-4'>No result found</p>
        )}
           

        </div>
      
    
      
    </div>
  )
}

export default SearchApplication
