import axios from 'axios';
import React, { useRef, useState } from 'react';
import { BASE_URL_API } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/UserSlice';

const EditProfile = () => {
  const user = useSelector((store) => store?.user?.data);
  const dispatch = useDispatch();
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateTrue, setUpdateTrue] = useState(false);

  const firstName = useRef(null);
  const lastName = useRef(null);
  const phone = useRef(null);
  const gender = useRef(null);
  const dateOfBirth = useRef(null);
  const photoImage = useRef(null);

  const UpdateProfile = async () => {
    try {
      const payload = {
        firstName: firstName?.current?.value || undefined,
        lastName: lastName?.current?.value || undefined,
        phone: phone?.current?.value || undefined,
        gender: gender?.current?.value || undefined,
        dateOfBirth: dateOfBirth?.current?.value || undefined,
      };

      const res = await axios.patch(
        BASE_URL_API + "/profile/edit",
        payload,
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setUpdateTrue(true);
      setUpdateMessage("Profile updated successfully!");

      setTimeout(() => {
        setUpdateTrue(false);
        setUpdateMessage("");
      }, 3000);
    } catch (err) {
      console.log(err.response?.data || err.message);
      setUpdateMessage("Update failed: " + (err.response?.data?.message || err.message));
      setUpdateTrue(true);
      setTimeout(() => {
        setUpdateTrue(false);
        setUpdateMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 gap-4">
        {updateTrue && (
          <div className={`p-4 rounded-lg text-white ${
            updateMessage.includes("failed") ? "bg-red-500" : "bg-[var(--secondary-Color)]"
          }`}>
            {updateMessage}
          </div>
        )}

        <div className="flex gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              className="ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3 w-full"
              ref={firstName}
              placeholder={user?.firstName || "First Name"}
              defaultValue={user?.firstName || ""}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              className="ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3 w-full"
              ref={lastName}
              placeholder={user?.lastName || "Last Name"}
              defaultValue={user?.lastName || ""}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            className="ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3 w-full"
            ref={gender}
            defaultValue={user?.gender || ""}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            className="ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3 w-full"
            ref={dateOfBirth}
            defaultValue={user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ""}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            className="ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3 w-full"
            ref={phone}
            placeholder={user?.phone || "Phone"}
            defaultValue={user?.phone || ""}
          />
        </div>

        <button
          className="bg-[var(--secondary-Color)] text-white p-4 rounded-lg hover:opacity-90 transition"
          type="button"
          onClick={UpdateProfile}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;