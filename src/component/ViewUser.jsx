import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useVerifyDocumentUser from "../hooks/useVerifyDocumentUser";
import useRejectDocumentApplication from "../hooks/useRejectDocumentApplication";
import { IMAGE_URL } from "../utils/constant";
import axios from "axios";
import { BASE_URL_API } from "../utils/constant";
import { ShowUser as setShowUser } from "../utils/AdminViewUserSlice";
import { addStatus } from "../utils/StatusSlice";

const ViewUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const verifyUser = useVerifyDocumentUser();
  const RejectedUserDoc = useRejectDocumentApplication();
  const ShowUser = useSelector((store) => store.ShowUser);

  const reloadUser = async () => {
    if (!ShowUser?.email) return;
    try {
      const res = await axios.get(
        BASE_URL_API + "/search/application/email/" + ShowUser.email,
        { withCredentials: true }
      );
      dispatch(setShowUser(res.data.data));
      
      // ✅ Update status in Redux
      if (res.data.data?.status) {
        dispatch(addStatus(res.data.data.status));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!ShowUser) {
      navigate("/adminDashbaord/all/application");
    }
  }, [ShowUser, navigate]);

  if (!ShowUser) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[var(--secondary-Color)] text-white p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Application Details</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            Back
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="space-y-3">
            <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
              Personal Info
            </h2>
            <p><span className="font-semibold">Full Name:</span> {ShowUser.fullName}</p>
            <p><span className="font-semibold">Email:</span> {ShowUser.email}</p>
            <p><span className="font-semibold">Phone:</span> {ShowUser.phone}</p>
            <p><span className="font-semibold">Nationality:</span> {ShowUser.nationality}</p>
            <p><span className="font-semibold">DOB:</span> {new Date(ShowUser.dateOfBirth).toLocaleDateString()}</p>
          </div>

          {/* Application Info */}
          <div className="space-y-3">
            <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
              Application Info
            </h2>
            <p>
              <span className="font-semibold">Type:</span>
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                {ShowUser.ApplicationType}
              </span>
            </p>
            <p><span className="font-semibold">Purpose:</span> {ShowUser.purposeOfTravel}</p>
            <p><span className="font-semibold">Departure:</span> {new Date(ShowUser.intendedDepartureDate).toLocaleDateString()}</p>
            <p><span className="font-semibold">Destination:</span> {ShowUser.addressInDestination}</p>
          </div>

          {/* Passport Info */}
          <div className="space-y-3 md:col-span-2">
            <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
              Passport Info
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <p><span className="font-semibold">Number:</span> {ShowUser.passportNumber}</p>
              <p><span className="font-semibold">Issued:</span> {new Date(ShowUser.passportDateIssue).toLocaleDateString()}</p>
              <p><span className="font-semibold">Expiry:</span> {new Date(ShowUser.passportExpireDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Documents */}
          <div className="md:col-span-2">
            <h2 className="font-semibold text-lg text-gray-700 border-b pb-2 mb-3">
              Documents
            </h2>
            <div className="space-y-3">
              {ShowUser.documents?.map((doc) => (
                <div
                  key={doc._id}
                  className="flex flex-wrap justify-between items-center p-3 border rounded-lg hover:shadow-md transition"
                >
                  <div>
                    <p className="font-medium">{doc.DocumentType}</p>
                    <p className="text-sm text-gray-500">{doc.orginalName}</p>
                  </div>

                  <img
                    src={IMAGE_URL + doc.filePath?.split('/').pop() || doc.filePath}
                    alt={doc.DocumentType}
                    className="w-24 h-24 object-cover rounded border"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100?text=No+Image";
                    }}
                  />

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      doc.status === "verified"
                        ? "bg-green-100 text-green-600"
                        : doc.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {doc.status || "pending"}
                  </span>

                  <div className="flex gap-2">
                    {doc.status !== "verified" && (
                      <button
                        className="py-2 px-4 rounded-md bg-[var(--secondary-Color)] text-white hover:opacity-80 transition"
                        onClick={async () => {
                          await verifyUser(doc._id);
                          await reloadUser();
                          // ✅ Status is updated via addStatus in the hook
                        }}
                      >
                        Approve
                      </button>
                    )}
                    {doc.status !== "rejected" && (
                      <button
                        className="py-2 px-4 rounded-md bg-red-500 text-white hover:opacity-80 transition"
                        onClick={async () => {
                          await RejectedUserDoc(doc._id);
                          await reloadUser();
                          // ✅ Status is updated via addStatus in the hook
                        }}
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;