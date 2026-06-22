import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_API } from '../utils/constant';
import { RemoveUser } from '../utils/UserSlice';

const useLogout = () => {
    
    const navigate=useNavigate()
    const dispatch=useDispatch();

    const FetchLogout = async()=>{
        try{
            const res = await axios.post(BASE_URL_API + "/logout",{},{withCredentials:true});
     
          dispatch(RemoveUser());
            navigate("/")
            

        }catch(err){
         console.log(err)
        }
    }

    
    return FetchLogout
}

export default useLogout
