import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'
import { MdAutoDelete, MdBlock } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import AdminDeleteUser from '../hooks/AdminDeleteUser'
import useBlock from './../hooks/useBlock';

const ManageUsers = () => {
 const fetchUser = useUser();


    const user = useSelector((store)=>store?.user?.data)
    const users= useSelector((store)=>store.users.userData)

    const FindUserDelete = AdminDeleteUser();
    const  blockUser= useBlock();
     
    
    
   
    console.log(users)
    const navigate=useNavigate();
    if(user.role !=="admin"){
       navigate("/")
    
    }

//   return (

//     <div>
     
       
//             <div   className='w-full text-center bg-white shadow-2xl p-2 h-screen'>
 
//                 <table className='w-[96%] mx-auto flex flex-col justify-center    '>

//                  <thead className='w-full bg-[var(--secondary-Color)] font-bold py-4 px-2 text-white font-popins capitalize  '>
//                        <tr className='w-full flex justify-between items-center '>
//                         <th>ID</th>
//                         <th>name</th>
//                         <th>email</th>
//                         <th>role</th>
//                         <th>status</th>
//                         <th>image</th>
//                         <th>action</th>
                     
//                     </tr>
//                  </thead>

// <tbody className='w-full border-1 border-gray-100/1 '>
// { Array.isArray(users)&&users.map((item)=>(
  
//     <tr className='w-full ring-1 ring-gray-50 ring-[var(--secondary-Color)]/1 my-1  shadow-sm py-2 flex justify-between text-center text-sm  items-center ' key={item._id}>
//                         <td>{item._id.slice(1,9)}</td>
//                         <td>{item.firstName} {item.lastName}</td>
//                         <td>{item.email}</td>
//                         <td>{item.role}</td>
//                         <td>{item.status}</td>
//                        <td> <img src={item?.photoImage} className='w-10' /></td>
//                         <td className='flex gap-2 items-center'>
                          
//                         <FaRegEdit className='text-2xl hover:text-3xl cursor-pointer glow  transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:translate-x-1 hover:text-green-600 ' />
//                         <MdAutoDelete className='text-2xl hover:text-3xl cursor-pointer glow  transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:translate-x-1 text-red-400 hover:text-red-600 ' />

              
//                         </td>
                        
                       
                     
//                     </tr>
//                     ))}
// </tbody>

                      


//                 </table>
               
//             </div>
      
//     </div>
//   )
return (
  <div className="p-6 bg-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">

      {/* Header */}
      <div className="bg-[var(--secondary-Color)] flex justify-between gap-2 w-full text-white px-6 py-4 text-xl font-semibold">
        <div>Manage Users</div>
        <div></div>
        <div className='flex gap-2 items-center'><span>total users</span><span className='rounded-full bg-[var(--secondary-Color)]/80 ring-2 px-2 ring-white'>{users?.length}</span></div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">

          {/* Head */}
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Image</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {Array.isArray(users) && users.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="p-4 text-sm text-gray-500">
                  {item._id.slice(0, 8)}
                </td>

                <td className="p-4 font-medium">
                  {item.firstName} {item.lastName}
                </td>

                <td className="p-4 text-gray-600">{item.email}</td>

                <td className="p-4 capitalize">{item.role}</td>

                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs  ${item.status ==="block" ? "bg-red-300 text-white" :"bg-green-100 text-green-700"} `}>
                    {item.status || "active"}
                  </span>
                </td>

                <td className="p-4">
                  <img
                    src={item.photoImage}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--secondary-Color)]"
                  />
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex justify-center gap-4">

                    {/* <FaRegEdit
                      className="text-xl text-gray-500 cursor-pointer 
                      hover:text-green-600 hover:scale-110 transition duration-200"
                    /> */}
                    <MdBlock
                    className="text-xl text-red-400 cursor-pointer 
                      hover:text-red-600 hover:scale-110  hover:text-2xl transition duration-200"

                      onClick={async()=>{ await blockUser(item.email); fetchUser()}}
                     />

                    <MdAutoDelete
                      className="text-xl text-gray-500 cursor-pointer 
                      hover:text-red-600 hover:scale-110 transition duration-200"

                    //   onClick={async  ()=>{ await FindUserDelete(item._id); useUser();}}
                    onClick={async () => {
                        await FindUserDelete(item._id);
                        fetchUser(); // 🔥 refresh data without page reload
                        }}
                      

                    />

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        {
             !users  || users.length === 0 &&(
                <div className='py-4 text-center text-xl text-shadow-gray-600 text-black/40 capitalize'> not found users</div>
            )
            
        }
      </div>
    </div>
  </div>
)
}

export default ManageUsers
