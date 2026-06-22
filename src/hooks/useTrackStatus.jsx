import axios from 'axios';
import { BASE_URL_API } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addStatus } from '../utils/StatusSlice';

const useTrackStatus = () => {
  const dispatch = useDispatch();

  const MytrackStatus = async () => {
    try {
      const res = await axios.get(BASE_URL_API + "/track/status", {
        withCredentials: true,
      });

      console.log("Track Status Response:", res.data);

      // ✅ Update Redux store with status
      if (res.data.status) {
        dispatch(addStatus(res.data.status));
      }

      // Return the status data
      return {
        status: res.data.status || "no_application",
        message: res.data.message || "No status available",
        data: res.data.data || null
      };
    } catch (err) {
      console.log("Track Status Error:", err);
      dispatch(addStatus("error"));
      
      return {
        status: "error",
        message: err.response?.data?.message || err.message || "Failed to fetch status",
        data: null
      };
    }
  };

  return MytrackStatus;
};

export default useTrackStatus;