// import axios from 'axios'
// import React from 'react'
// import { BASE_URL_API } from '../utils/constant'
// import { useDispatch } from 'react-redux'
// import { addpassportNumber } from '../utils/passportNumberSlice'

// const useSearchpassportSearch = () => {

//     const dispatch =useDispatch();
//     /// http://localhost:7000/search/application/passportNumber/PPO938933



//      const getpassportSearch=async(passportNumber)=>{


//         try{

            
//             const res= await axios.get(BASE_URL_API  + "/search/application/passportNumber/"+ passportNumber ,{withCredentials:true});

//             console.log(res.data.data)
            
//     if(!passportNumber || passportNumber.trim() === "") return;

            
//              dispatch(addpassportNumber(res?.data?.data))


//         }catch(err){
//             console.log(err)
//         }



//      }



//      return getpassportSearch

 
// }

// export default useSearchpassportSearch



import axios from 'axios'
import { BASE_URL_API } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addpassportNumber } from '../utils/passportNumberSlice'

const useSearchpassportSearch = () => {

  const dispatch = useDispatch();

  const getpassportSearch = async (passportNumber) => {

  if (!passportNumber || passportNumber.trim() === "") return;

  try {
    const res = await axios.get(
      BASE_URL_API + "/search/application/passportNumber/" + passportNumber,
      { withCredentials: true }
    );

    console.log(res.data.data);

    // ✅ FIX: always send ARRAY to Redux
    if (!res.data.data) {
      dispatch(addpassportNumber([]));
      return;
    }

    // 🔥 IMPORTANT FIX HERE
    const data = Array.isArray(res.data.data)
      ? res.data.data
      : [res.data.data];

    dispatch(addpassportNumber(data));

  } catch (err) {
    console.log(err);
    dispatch(addpassportNumber([]));
  }
};
 
return getpassportSearch
};

export default useSearchpassportSearch;