import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_API } from "../utils/constant";
import Stamp from "../assets/stamp.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStatus } from "../utils/StatusSlice";

const ApprovalLetter = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user?.data);

  // ✅ Redirect if no user
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // ✅ Fetch application data
  const fetchApplication = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${BASE_URL_API}/getMyApplication`,
        { withCredentials: true }
      );

      console.log("✅ Application Response:", res.data);

      if (res.data.data && res.data.data.length > 0) {
        const app = res.data.data[0];
        setApplication(app);
        
        // ✅ Update Redux status
        dispatch(addStatus(app.status || "pending"));
      } else {
        setError("No application found. Please create an application first.");
        setApplication(null);
      }
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setError(err.response?.data?.message || "Failed to fetch application data");
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--secondary-Color)] mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading your approval letter...</p>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/userDashboard")}
            className="bg-[var(--secondary-Color)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ✅ No application found
  if (!application) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Application Found</h2>
          <p className="text-gray-600 mb-6">
            You haven't submitted any application yet.
          </p>
          <button
            onClick={() => navigate("/userDashboard/newApplication")}
            className="bg-[var(--secondary-Color)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Create Application
          </button>
        </div>
      </div>
    );
  }

  // ✅ Not approved yet
  if (application.status !== "verified") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-yellow-600 mb-2">Not Approved Yet</h2>
          <p className="text-gray-600 mb-4">
            Your application is currently <strong>{application.status}</strong>. 
            Please wait for admin approval.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Application ID: {application._id?.slice(0, 8) || "N/A"}
          </p>
          <button
            onClick={() => navigate("/userDashboard/TrackStatus")}
            className="bg-[var(--secondary-Color)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Track Status
          </button>
        </div>
      </div>
    );
  }

  // ✅ Show approval letter
  const currentDate = new Date().toLocaleDateString();

  // ✅ Handle Print
  const handlePrint = () => {
    window.print();
  };

  // ✅ Handle Download as PDF
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6 flex flex-col items-center">
      {/* Action Buttons */}
      <div className="w-full max-w-4xl flex justify-between mb-4">
        <button
          onClick={() => navigate("/userDashboard")}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          ← Back to Dashboard
        </button>

        <div className="space-x-2">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            🖨️ Print
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            📥 Download PDF
          </button>
        </div>
      </div>

      {/* LETTER */}
      <div className="bg-white w-full max-w-4xl shadow-2xl p-10 border border-gray-300" id="approval-letter">
        {/* HEADER */}
        <div className="text-center border-b pb-4 mb-6">
          <h1 className="font-bold text-lg">REPUBLIC OF SOMALILAND</h1>
          <h2 className="text-sm">MINISTRY OF FOREIGN AFFAIRS & INTERNATIONAL COOPERATION</h2>
          <h3 className="text-sm font-semibold">DIRECTORATE OF IMMIGRATION & BORDER CONTROL</h3>
        </div>

        {/* TITLE */}
        <h2 className="text-center text-xl font-bold underline mb-6">VISA APPROVAL LETTER</h2>

        {/* CASE NUMBER */}
        <div className="flex justify-between mb-6 text-sm">
          <p>Case No: SL-{application._id?.slice(-6) || "N/A"}</p>
          <p>Date: {currentDate}</p>
        </div>

        {/* APPLICANT DETAILS */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 border-b pb-2">Applicant Details</h3>
          <p><b>Full Name:</b> {application.fullName || "N/A"}</p>
          <p><b>Passport No:</b> {application.passportNumber || "N/A"}</p>
          <p><b>Nationality:</b> {application.nationality || "N/A"}</p>
          <p><b>Date of Birth:</b> {application.dateOfBirth ? new Date(application.dateOfBirth).toLocaleDateString() : "N/A"}</p>
        </div>

        {/* VISA INFORMATION */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 border-b pb-2">Visa Information</h3>
          <p><b>Type of Visa:</b> {application.ApplicationType || "N/A"}</p>
          <p><b>Purpose of Visit:</b> {application.purposeOfTravel || "N/A"}</p>
          <p><b>Entry Type:</b> Single Entry</p>
          <p><b>Duration:</b> 90 Days</p>
        </div>

        {/* APPROVAL NOTE */}
        <div className="mb-6 leading-relaxed">
          <h3 className="font-semibold mb-2 border-b pb-2">Approval Note</h3>
          <p>
            This is to certify that the above-mentioned applicant has been
            <span className="font-bold text-green-600"> APPROVED </span>
            for entry into the Republic of Somaliland.
          </p>
          <p className="mt-2">
            The visa becomes valid from the date of issuance and must be
            presented to immigration authorities upon arrival.
          </p>
        </div>

        {/* IMPORTANT INSTRUCTIONS */}
        <div className="mb-6 text-sm">
          <h3 className="font-semibold mb-2 border-b pb-2">Important Instructions</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>This approval letter must be carried during travel</li>
            <li>Immigration officers may request verification</li>
            <li>Overstay beyond permitted duration is prohibited</li>
          </ul>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-end mt-12">
          <div>
            <p className="font-semibold">Issuing Authority:</p>
            <p>Director of Immigration</p>
            <p>Republic of Somaliland</p>
          </div>

          <div className="text-center">
            <img
              src={Stamp}
              alt="Official Stamp"
              className="w-28 opacity-90"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/100?text=STAMP";
              }}
            />
            <p className="text-xs mt-1">Official Stamp</p>
          </div>
        </div>

        {/* APPROVAL LETTER CONTENT (if stored in DB) */}
        {application.approvalLetter && (
          <div className="mt-8 p-4 bg-gray-50 rounded border border-gray-200">
            <h3 className="font-semibold mb-2">Official Approval Text:</h3>
            <pre className="whitespace-pre-wrap text-sm font-sans">
              {application.approvalLetter}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalLetter;