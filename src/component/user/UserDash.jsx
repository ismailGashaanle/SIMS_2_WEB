import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL_API } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addStatus } from "../../utils/StatusSlice";

const UserDash = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user?.data);
  const reduxStatus = useSelector((store) => store?.Status?.status);

  if (!user) {
    navigate("/");
    return null;
  }

  const getMyApplication = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        BASE_URL_API + "/getMyApplication",
        { withCredentials: true }
      );
      
      if (res.data.data && res.data.data.length > 0) {
        const app = res.data.data[0];
        setApplication(app);
        dispatch(addStatus(app.status || "pending"));
      } else {
        setApplication(null);
        dispatch(addStatus("no_application"));
      }
    } catch (err) {
      console.log(err);
      dispatch(addStatus("error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyApplication();
    
    // ✅ Refresh every 15 seconds
    const interval = setInterval(getMyApplication, 15000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    const status = reduxStatus || "no_application";
    if (status === "verified") return "bg-green-500";
    if (status === "pending") return "bg-yellow-500";
    if (status === "rejected") return "bg-red-500";
    if (status === "no_application") return "bg-gray-400";
    return "bg-gray-400";
  };

  const getStatusText = () => {
    const status = reduxStatus || "no_application";
    if (status === "verified") return "✅ Approved";
    if (status === "pending") return "⏳ Pending";
    if (status === "rejected") return "❌ Rejected";
    if (status === "no_application") return "📋 No Application";
    return "Unknown";
  };

  const hasApplication = application !== null;

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      {/* Welcome */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome 👋 {user?.firstName}
        </h1>
        <p className="text-gray-500">Manage your visa application easily</p>
      </div>

      {/* Status Card */}
      <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
        <div>
          <h2 className="text-gray-600">Application Status</h2>
          <p className="text-lg font-semibold">
            {application?.ApplicationType || "No Application"}
          </p>
        </div>
        <span className={`px-4 py-2 text-white rounded-full ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      {/* Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {!hasApplication ? (
          <button
            onClick={() => navigate("/userDashboard/newApplication")}
            className="bg-blue-500 text-white p-6 rounded-2xl shadow hover:bg-blue-600 transition md:col-span-3"
          >
            🚀 Create Your First Application
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/userDashboard/newApplication")}
              className="bg-blue-500 text-white p-6 rounded-2xl shadow hover:bg-blue-600 transition"
            >
              📝 Apply Now
            </button>

            <button
              onClick={() => navigate("/userDashboard/UploadDocument")}
              className="bg-purple-500 text-white p-6 rounded-2xl shadow hover:bg-purple-600 transition"
            >
              📤 Upload Documents
            </button>

            <button
              onClick={() => navigate("/userDashboard/TrackStatus")}
              className="bg-green-500 text-white p-6 rounded-2xl shadow hover:bg-green-600 transition"
            >
              📊 Track Status
            </button>

            {reduxStatus === "verified" && (
              <button
                onClick={() => navigate("/userDashboard/approval-letter")}
                className="bg-indigo-600 text-white p-6 rounded-2xl shadow hover:bg-indigo-700 transition"
              >
                📄 View Approval Letter
              </button>
            )}
          </>
        )}
      </div>

      {/* Application Details */}
      {application && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Application Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-600">
            <p><b>Full Name:</b> {application.fullName}</p>
            <p><b>Email:</b> {application.email}</p>
            <p><b>Phone:</b> {application.phone}</p>
            <p><b>Nationality:</b> {application.nationality}</p>
            <p><b>Purpose:</b> {application.purposeOfTravel}</p>
            <p>
              <b>Status:</b>{" "}
              <span className={`px-2 py-1 rounded text-white ${getStatusColor()}`}>
                {application.status || "pending"}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* No Application Message */}
      {!hasApplication && !loading && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-2xl">💡</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You haven't submitted any application yet. Click "Create Your First Application" 
                to get started with the visa application process.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDash;