import React, { useEffect, useState } from 'react';
import useAdminApplications from '../hooks/useAdminApplications';
import { FaUsers, FaFileAlt, FaPassport, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

const AdminDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const { getDashboardStats } = useAdminApplications();

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDashboardStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <div className="p-6">Loading stats...</div>;

  const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <StatCard
        icon={<FaUsers className="text-white" />}
        title="Total Users"
        value={stats.totalUsers}
        color="bg-blue-500"
      />
      <StatCard
        icon={<FaPassport className="text-white" />}
        title="Applications"
        value={stats.totalApplications}
        color="bg-green-500"
      />
      <StatCard
        icon={<FaFileAlt className="text-white" />}
        title="Documents"
        value={stats.totalDocuments}
        color="bg-purple-500"
      />
      <StatCard
        icon={<FaCheckCircle className="text-white" />}
        title="Verified Apps"
        value={stats.applications?.verified || 0}
        color="bg-emerald-500"
      />
      <StatCard
        icon={<FaClock className="text-white" />}
        title="Pending Apps"
        value={stats.applications?.pending || 0}
        color="bg-yellow-500"
      />
      <StatCard
        icon={<FaTimesCircle className="text-white" />}
        title="Rejected Apps"
        value={stats.applications?.rejected || 0}
        color="bg-red-500"
      />
    </div>
  );
};

export default AdminDashboardStats;