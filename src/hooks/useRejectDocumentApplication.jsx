import axios from 'axios';
import { BASE_URL_API } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addStatus } from '../utils/StatusSlice';

const useRejectDocumentApplication = () => {
  const dispatch = useDispatch();

  const RejectedUserDoc = async (id) => {
    try {
      console.log("🔍 Rejecting document ID:", id);
      
      const res = await axios.patch(
        `${BASE_URL_API}/Admin/rejected/Document/id/${id}`,
        {},
        { withCredentials: true }
      );

      console.log("✅ Reject Response:", res.data);
      dispatch(addStatus("rejected"));
      
      return res.data;
    } catch (err) {
      console.error("❌ Reject Error:", err);
      dispatch(addStatus("error"));
      throw err;
    }
  };

  return RejectedUserDoc;
};

export default useRejectDocumentApplication;