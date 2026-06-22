import axios from 'axios';
import { BASE_URL_API } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addStatus } from '../utils/StatusSlice';

const useVerifyDocumentUser = () => {
  const dispatch = useDispatch();

  const verifyUser = async (id) => {
    try {
      console.log("🔍 Verifying document ID:", id);
      
      // ✅ FIX: Use CORRECT spelling "verified" (not "verifeied")
      const res = await axios.patch(
        `${BASE_URL_API}/Admin/verified/Document/id/${id}`,
        {},
        { withCredentials: true }
      );

      console.log("✅ Verify Response:", res.data);
      
      // ✅ Update Redux status
      dispatch(addStatus("verified"));
      
      return res.data;
    } catch (err) {
      console.error("❌ Verify Error:", err);
      dispatch(addStatus("error"));
      throw err;
    }
  };

  return verifyUser;
};

export default useVerifyDocumentUser;