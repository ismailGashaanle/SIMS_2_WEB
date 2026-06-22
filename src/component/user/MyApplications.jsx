import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL_API, IMAGE_URL } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addMyApplication } from '../../utils/MyApplicationSlice';
import { useNavigate } from 'react-router-dom';
import { addDocument } from '../../utils/UploadDocumentSlice';

const MyApplications = () => {
  const application = useSelector((store) => store?.myapplication?.myapplication)?.[0];
  const myDocument = useSelector((store) => store?.uploadDoc);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getMyApplication = async () => {
    try {
      const res = await axios.get(BASE_URL_API + "/getMyApplication", {
        withCredentials: true
      });
      dispatch(addMyApplication(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const GetMYDocuMents = async () => {
    try {
      const res = await axios.get(BASE_URL_API + "/view/Document", {
        withCredentials: true
      });
      dispatch(addDocument(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyApplication();
    GetMYDocuMents();
  }, []);

  return (
    <div>
      {!application && (
        <div className="flex justify-center items-center w-full p-4 text-gray-400 text-2xl py-5 my-5">
          Not found your Application please Apply
        </div>
      )}

      {application && (
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
                <p><span className="font-semibold">Full Name:</span> {application?.fullName}</p>
                <p><span className="font-semibold">Email:</span> {application?.email}</p>
                <p><span className="font-semibold">Phone:</span> {application?.phone}</p>
                <p><span className="font-semibold">Nationality:</span> {application?.nationality}</p>
                <p><span className="font-semibold">DOB:</span> {new Date(application?.dateOfBirth).toLocaleDateString()}</p>
              </div>

              {/* Application Info */}
              <div className="space-y-3">
                <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
                  Application Info
                </h2>
                <p>
                  <span className="font-semibold">Type:</span>
                  <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                    {application?.ApplicationType}
                  </span>
                </p>
                <p><span className="font-semibold">Purpose:</span> {application?.purposeOfTravel}</p>
                <p><span className="font-semibold">Departure:</span> {new Date(application?.intendedDepartureDate).toLocaleDateString()}</p>
                <p><span className="font-semibold">Destination:</span> {application?.addressInDestination}</p>
              </div>

              {/* Passport Info */}
              <div className="space-y-3 md:col-span-2">
                <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
                  Passport Info
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <p><span className="font-semibold">Number:</span> {application?.passportNumber}</p>
                  <p><span className="font-semibold">Issued:</span> {new Date(application?.passportDateIssue).toLocaleDateString()}</p>
                  <p><span className="font-semibold">Expiry:</span> {new Date(application?.passportExpireDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Documents */}
              <div className="md:col-span-2">
                <h2 className="font-semibold text-lg text-gray-700 border-b pb-2 mb-3">
                  Documents
                </h2>
                <div className="space-y-3">
                  {myDocument?.map((doc) => (
                    <div
                      key={doc._id}
                      className="flex flex-wrap justify-between items-center p-3 border rounded-lg hover:shadow-md transition"
                    >
                      <div>
                        <p className="font-medium">{doc.DocumentType}</p>
                        <p className="text-sm text-gray-500">{doc.orginalName}</p>
                      </div>

                      {/* ✅ FIX: Correct image URL */}
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
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;