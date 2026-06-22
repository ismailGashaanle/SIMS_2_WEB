import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL_API } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import EditProfile from './EditProfile';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user?.data);
  const dispatch = useDispatch();
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showEror, setShowError] = useState(false);

  if (!user) {
    navigate("/");
    return null;
  }

  const fetchProfileUser = async () => {
    try {
      const res = await axios.get(BASE_URL_API + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(res.data?.data));
      setErrorMessage("");
      setShowError(false);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message);
      setShowError(true);
    }
  };

  useEffect(() => {
    fetchProfileUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {showEror && ErrorMessage && (
          <div className="bg-red-500 text-white p-4 rounded-lg shadow">
            {ErrorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT: Profile Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <img
              src={user.photoImage}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-[var(--secondary-Color)] mb-4"
              onError={(e) => {
                e.target.src = "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";
              }}
            />
            <h2 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500 capitalize">{user.role}</p>

            <div className="mt-6 w-full space-y-3 text-left">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium">{user.phone || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Gender</span>
                <span className="capitalize">{user.gender || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Birth</span>
                <span>
                  {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Edit Form */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Edit Profile
            </h3>
            <EditProfile user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;