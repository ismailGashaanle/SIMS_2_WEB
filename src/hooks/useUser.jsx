import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL_API } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { AddUsers } from '../utils/ManageUserLice'

const useUser = () => {
 const users= useSelector((store)=>store.users.userData)
    
    

    const dispatch = useDispatch();

    const  fecthUsers=async()=>{
        
    //    if(users) return

        const res = await axios.get(BASE_URL_API + "/Admin/users",{withCredentials:true});
        dispatch(AddUsers(res.data.data))
          

    }
    useEffect(()=>{
           
fecthUsers();
    },[])


return fecthUsers
 
}

export default useUser
