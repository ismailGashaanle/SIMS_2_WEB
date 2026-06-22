import axios from 'axios'
import React from 'react'
import { BASE_URL_API } from '../utils/constant'

const useBlock = () => {
   
    const blockUser=async(email)=>{
 
        try{

            const res = await axios.post(BASE_URL_API + "/user/block/email/" + email ,{},{withCredentials:true});

            console.log(res.data)

        }catch(err){
            console.log(err)
        }


    }

    return blockUser

}

export default useBlock
