import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PendingICon, RejectedIcon, verifeidIcon } from '../../utils/constant';
import useTrackStatus from '../../hooks/useTrackStatus';
import { useNavigate } from 'react-router-dom';
import { addStatus } from '../../utils/StatusSlice';

const TrackStatus = () => {
  const [statusData, setStatusData] = useState({
    status: "loading",
    message: "Checking your application status...",
    data: null
  });
  
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store?.user?.data);
  const reduxStatus = useSelector((store) => store?.Status?.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MytrackStatus = useTrackStatus();

  // ✅ If no user, redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // ✅ Fetch status on mount and periodically
  useEffect(() => {
    let intervalId;

    const fetchStatus = async () => {
      setLoading(true);
      const result = await MytrackStatus();
      setStatusData(result);
      
      // ✅ Update Redux with status
      if (result.status) {
        dispatch(addStatus(result.status));
      }
      
      setLoading(false);
    };

    fetchStatus();

    // ✅ Refresh status every 10 seconds
    intervalId = setInterval(fetchStatus, 10000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // ✅ Use Redux status if available, otherwise use local status
  const currentStatus = reduxStatus || statusData.status || "loading";

  // ✅ Get appropriate icon based on status
  const getStatusInfo = (status) => {
    if (status === "verified") {
      return {
        icon: verifeidIcon,
        alt: "Verified",
        bgColor: "bg-green-500",
        textColor: "text-green-600",
        title: "✅ Application Verified",
        description: "Your application has been approved! You can now view your approval letter.",
        actionText: "View Approval Letter",
        actionLink: "/userDashboard/approval-letter"
      };
    }
    if (status === "pending") {
      return {
        icon: PendingICon,
        alt: "Pending",
        bgColor: "bg-yellow-500",
        textColor: "text-yellow-600",
        title: "⏳ Application Pending",
        description: "Your application is being reviewed by our team. Please wait.",
        actionText: "Check Later",
        actionLink: null
      };
    }
    if (status === "rejected") {
      return {
        icon: RejectedIcon,
        alt: "Rejected",
        bgColor: "bg-red-500",
        textColor: "text-red-600",
        title: "❌ Application Rejected",
        description: "Your application has been rejected. Please contact support for more information.",
        actionText: "Contact Support",
        actionLink: "/userDashboard/Support"
      };
    }
    if (status === "no_application") {
      return {
        icon: null,
        alt: "No Application",
        bgColor: "bg-gray-400",
        textColor: "text-gray-600",
        title: "📋 No Application Found",
        description: "You haven't submitted any application yet.",
        actionText: "Apply Now",
        actionLink: "/userDashboard/newApplication"
      };
    }
    return {
      icon: null,
      alt: "Unknown",
      bgColor: "bg-gray-400",
      textColor: "text-gray-600",
      title: "Status Unknown",
      description: "Unable to determine application status.",
      actionText: "Go to Dashboard",
      actionLink: "/userDashboard"
    };
  };

  const statusInfo = getStatusInfo(currentStatus);

  // ✅ Loading state
  if (loading && !reduxStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--secondary-Color)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking your application status...</p>
        </div>
      </div>
    );
  }

  // ✅ Status Display
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105">
        <div className="text-center">
          {/* Icon */}
          <div className="mb-6">
            {statusInfo.icon ? (
              <img
                src={statusInfo.icon}
                alt={statusInfo.alt}
                className={`w-40 h-40 mx-auto rounded-full ${
                  currentStatus === "pending" ? "animate-pulse" : ""
                }`}
              />
            ) : (
              <div className="w-40 h-40 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-6xl">
                📄
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div className={`inline-block px-6 py-2 rounded-full ${statusInfo.bgColor} text-white font-semibold mb-4`}>
            {currentStatus === "verified" ? "✅ APPROVED" :
             currentStatus === "pending" ? "⏳ PENDING" :
             currentStatus === "rejected" ? "❌ REJECTED" :
             currentStatus === "no_application" ? "📋 NO APPLICATION" :
             currentStatus?.toUpperCase() || "UNKNOWN"}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {statusInfo.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {statusInfo.description}
          </p>

          {/* Status Details */}
          {statusData.data && currentStatus !== "no_application" && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Application ID:</span>{" "}
                {statusData.data.applicationId?.slice(0, 8) || "N/A"}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Type:</span>{" "}
                {statusData.data.ApplicationType || "N/A"}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Name:</span>{" "}
                {statusData.data.fullName || user?.fullName || "N/A"}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {statusInfo.actionLink && (
              <button
                onClick={() => navigate(statusInfo.actionLink)}
                className="bg-[var(--secondary-Color)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
              >
                {statusInfo.actionText}
              </button>
            )}

            <button
              onClick={() => navigate("/userDashboard")}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Back to Dashboard
            </button>

            <button
              onClick={async () => {
                setLoading(true);
                const result = await MytrackStatus();
                setStatusData(result);
                if (result.status) {
                  dispatch(addStatus(result.status));
                }
                setLoading(false);
              }}
              className="text-[var(--secondary-Color)] hover:underline text-sm"
            >
              🔄 Refresh Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackStatus;