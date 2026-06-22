import axios from 'axios'
import React from 'react'
import { BASE_URL_API } from '../utils/constant'
 

const AdminDeleteUser = () => {
     

    const FindUserDelete = async(id)=>{

        try{

            const res = await axios.delete(BASE_URL_API + "/Admin/user/delete/id/" + id ,{withCredentials:true} );
            console.log(res.data)
          

        }catch(err){
            console.log(err)
        }
    }

   

    return FindUserDelete
  
}

export default AdminDeleteUser
