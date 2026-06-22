import axios from 'axios';
import { BASE_URL_API } from '../utils/constant';
import { useState, useEffect } from 'react';

const useAdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplications = async (page = 1, limit = 20) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL_API}/All/Application?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      setApplications(res.data.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const searchByPhone = async (phone) => {
    try {
      const res = await axios.get(
        `${BASE_URL_API}/search/application/phone/${phone}`,
        { withCredentials: true }
      );
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    }
  };

  const searchByEmail = async (email) => {
    try {
      const res = await axios.get(
        `${BASE_URL_API}/search/application/email/${email}`,
        { withCredentials: true }
      );
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    }
  };

  const searchByPassport = async (passportNumber) => {
    try {
      const res = await axios.get(
        `${BASE_URL_API}/search/application/passportNumber/${passportNumber}`,
        { withCredentials: true }
      );
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    }
  };

  const verifyDocument = async (documentId) => {
    try {
      const res = await axios.patch(
        `${BASE_URL_API}/Admin/verified/Document/id/${documentId}`,
        {},
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    }
  };

  const rejectDocument = async (documentId, reason) => {
    try {
      const res = await axios.patch(
        `${BASE_URL_API}/Admin/rejected/Document/id/${documentId}`,
        { rejectionReason: reason },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    }
  };

  const blockUser = async (email) => {
    try {
      const res = await axios.post(
        `${BASE_URL_API}/user/block/email/${email}`,
        {},
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    }
  };

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL_API}/admin/application/id/${id}`,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    }
  };

  const getDashboardStats = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL_API}/admin/report/dashboard`,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    }
  };

  const getFullReport = async (type = 'summary') => {
    try {
      const res = await axios.get(
        `${BASE_URL_API}/admin/report/full?type=${type}`,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return {
    applications,
    loading,
    error,
    fetchApplications,
    searchByPhone,
    searchByEmail,
    searchByPassport,
    verifyDocument,
    rejectDocument,
    blockUser,
    deleteApplication,
    getDashboardStats,
    getFullReport
  };
};

export default useAdminApplications;