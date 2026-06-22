import axios from "axios";
import React, { useState } from "react";
import { BASE_URL_API } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { addDocument } from "../../utils/UploadDocumentSlice";

const UploadDocument = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [DocumentType, setDocumentType] = useState("");
  const [fullName, setFullName] = useState("");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    // Preview for images
    if (selected && selected.type.startsWith("image")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
    
    // Clear previous errors
    setError("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!file || !DocumentType || !fullName) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("DocumentType", DocumentType);
      formData.append("fullName", fullName);

      const res = await axios.post(
        BASE_URL_API + "/uploadDocument",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload Response:", res.data);
      
      // ✅ Update Redux with new document
      dispatch(addDocument(res?.data?.data));
      
      // ✅ Show success message
      setSuccess("Document uploaded successfully!");
      
      // ✅ Reset form
      setFile(null);
      setPreview(null);
      setFullName("");
      setDocumentType("");
      
      // ✅ Reset file input
      const fileInput = document.getElementById("fileInput");
      if (fileInput) fileInput.value = "";

    } catch (err) {
      console.error("Upload Error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Upload failed";
      setError(errorMessage);
      
      // ✅ Show specific error messages
      if (errorMessage.includes("No application")) {
        setError("Please create an application first before uploading documents.");
      } else if (errorMessage.includes("already uploaded")) {
        setError("This document type has already been uploaded.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[var(--secondary-Color)]">
            Upload Document
          </h1>
          <p className="text-gray-500 text-sm">
            Submit your required documents securely
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm">
            ✅ {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
            ❌ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleUpload} className="space-y-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--secondary-Color)] focus:outline-none transition"
              required
            />
          </div>

          {/* Document Type */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Document Type
            </label>
            <select
              value={DocumentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--secondary-Color)] focus:outline-none transition"
              required
            >
              <option value="">Select document type</option>
              <option value="passport">Passport</option>
              <option value="national_id">National ID</option>
              <option value="birth_certificate">Birth Certificate</option>
              <option value="medical_report">Medical Report</option>
              <option value="bank_statement">Bank Statement</option>
              <option value="profile_photo">Profile Photo</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Upload File
            </label>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-[var(--secondary-Color)] transition">
              <span className="text-gray-500 text-sm">
                Click to upload or drag & drop
              </span>
              <span className="text-xs text-gray-400 mt-1">
                PNG, JPG, PDF (max 10MB)
              </span>

              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>
          </div>

          {/* Preview */}
          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>
          )}

          {/* File name */}
          {file && (
            <div className="text-sm text-gray-600 text-center">
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--secondary-Color)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadDocument;