import React, { useEffect } from 'react';
import { BASE_URL_API } from '../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AddApplications } from '../utils/ApplicationSlice';
import { FaEye, FaRegTrashAlt } from 'react-icons/fa';
import useGetApplicationEmail from './../hooks/useGetApplicationEmail';
import useAdminApplicationDelete from './../hooks/useAdminApplicationDelete';

const AllApplicationAdmin = () => {
  const dispatch = useDispatch();
  const adminApplication = useSelector((store) => store?.adminApplication?.applicationData);
  const deletedApplication = useAdminApplicationDelete();
  const getEmail = useGetApplicationEmail();

  const applications = async () => {
    try {
      const res = await axios.get(
        BASE_URL_API + "/All/Application/?page=1&limit=50",
        { withCredentials: true }
      );
      dispatch(AddApplications(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    applications();
    
    // ✅ Refresh every 10 seconds
    const interval = setInterval(applications, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      verified: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
      cancel: "bg-gray-100 text-gray-800"
    };
    
    const icons = {
      verified: "✅",
      pending: "⏳",
      rejected: "❌",
      cancel: "🚫"
    };

    const displayStatus = status || "pending";
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[displayStatus] || styles.pending}`}>
        {icons[displayStatus] || "📋"} {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-[var(--secondary-Color)] text-white">
          <h2 className="text-xl font-semibold">📋 Application Management</h2>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            {adminApplication?.length || 0} Applications
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Full Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(adminApplication) && adminApplication.map((app) => (
                <tr
                  key={app._id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4 text-sm text-gray-500">
                    {app._id.slice(0, 6)}
                  </td>
                  <td className="p-4 font-medium">{app.fullName}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      {app.ApplicationType}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{app.email}</td>
                  <td className="p-4 text-gray-600">{app.phone}</td>
                  <td className="p-4">
                    {getStatusBadge(app.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      <FaEye
                        className="text-xl text-gray-500 cursor-pointer hover:text-green-600 hover:scale-110 transition duration-200"
                        onClick={() => getEmail(app.email)}
                      />
                      <FaRegTrashAlt
                        className="text-xl text-gray-500 cursor-pointer hover:text-red-600 hover:scale-110 transition duration-200"
                        onClick={async () => {
                          await deletedApplication(app._id);
                          applications();
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!adminApplication?.length && (
            <div className="text-center py-10 text-gray-500">
              No applications found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllApplicationAdmin;