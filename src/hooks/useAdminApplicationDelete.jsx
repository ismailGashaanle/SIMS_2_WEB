import axios from 'axios'
import React from 'react'
import { BASE_URL_API } from '../utils/constant'

const useAdminApplicationDelete = () => {
   
    const deletedApplication=async(id)=>{

        try{

            const res = await axios.delete(BASE_URL_API + "/admin/application/id/" +id,{withCredentials:true});
            console.log(res.data.data)

        }catch(err){
            console.log(err)
        }
    }

    return deletedApplication
}

export default useAdminApplicationDelete
