import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL_API } from "../utils/constant";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler, // ✅ IMPORT Filler plugin
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";

import {
  FaUsers,
  FaFileAlt,
  FaPassport,
  FaChartLine,
} from "react-icons/fa";

// ✅ REGISTER Filler plugin
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler // ✅ ADD THIS
);

// ================= CLEAN MODERN PALETTE =================
const COLORS = [
  "#4f46e5",
  "#0ea5e9",
  "#f97316",
  "#ef4444",
  "#8b5cf6",
  "#64748b",
];

const safe = (obj) => obj || {};

const normalizeStatus = (name) => {
  if (!name) return "unknown";
  if (name === "verified") return "verified";
  return name;
};

const getStatusColor = (label) => {
  switch ((label || "").toLowerCase()) {
    case "approved":
    case "verified":
      return "#22c55e";
    case "pending":
      return "#f59e0b";
    case "rejected":
      return "#ef4444";
    default:
      return "#4f46e5";
  }
};

const AdminReport = () => {
  const [data, setData] = useState(null);
  const [reportType, setReportType] = useState("summary");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const printRef = useRef();

  // ================= FETCH =================
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const url =
          reportType === "summary"
            ? `${BASE_URL_API}/admin/report/full`
            : `${BASE_URL_API}/admin/report/full?type=${reportType}`;

        const res = await axios.get(url, { withCredentials: true });
        const response = res.data || {};

        if (reportType !== "summary") {
          setTableData(response.data || []);
          setData(null);
        } else {
          setData(response);
          setTableData([]);
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportType]);

  const charts = safe(data?.charts);
  const summary = safe(data?.summary);

  const toArray = (obj) =>
    Object.entries(obj || {}).map(([name, value]) => ({ name, value }));

  const status = toArray(charts.applicationStatus);
  const visa = toArray(charts.visaType);
  const country = toArray(charts.countryStats);
  const docStatus = toArray(charts.documentStatus);
  const monthly = charts.monthlyTrend || [];

  // ================= CHARTS =================
  const pieStatus = {
    labels: status.map((i) => normalizeStatus(i.name)),
    datasets: [
      {
        data: status.map((i) => i.value),
        backgroundColor: status.map((i) => getStatusColor(i.name)),
        borderWidth: 0,
      },
    ],
  };

  const visaData = {
    labels: visa.map((i) => i.name),
    datasets: [
      {
        label: "Visa",
        data: visa.map((i) => i.value),
        backgroundColor: visa.map((_, i) => COLORS[i % COLORS.length]),
        borderRadius: 8,
      },
    ],
  };

  const countryData = {
    labels: country.map((i) => i.name),
    datasets: [
      {
        label: "Country",
        data: country.map((i) => i.value),
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const docStatusData = {
    labels: docStatus.map((i) => i.name),
    datasets: [
      {
        label: "Docs",
        data: docStatus.map((i) => i.value),
        backgroundColor: docStatus.map((i) => getStatusColor(i.name)),
        borderRadius: 8,
      },
    ],
  };

  const monthlyData = {
    labels: monthly.map((i) => i.label),
    datasets: [
      {
        label: "Monthly",
        data: monthly.map((i) => i.count),
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  if (loading) {
    return (
      <div className="p-10 text-center animate-fade-in text-gray-500">
        Loading Analytics Dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl shadow border animate-fade-in">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <FaChartLine /> Admin Dashboard
        </h1>
      </div>

      {/* SELECT */}
      <div className="flex gap-3">
        <select
          className="p-2 border rounded-lg bg-white shadow-sm"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="summary">Dashboard</option>
          <option value="users">Users</option>
          <option value="applications">Applications</option>
          <option value="documents">Documents</option>
        </select>
      </div>

      {/* ================= DASHBOARD ================= */}
      {reportType === "summary" && (
        <div className="space-y-6">
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg overflow-hidden">
              <div className="absolute top-0 right-0 opacity-20 text-7xl">
                <FaUsers />
              </div>
              <p className="text-sm opacity-80">Total Users</p>
              <h2 className="text-3xl font-bold mt-2">
                {summary.totalUsers || 0}
              </h2>
              <p className="text-xs mt-2 opacity-70">Active system users</p>
            </div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg overflow-hidden">
              <div className="absolute top-0 right-0 opacity-20 text-7xl">
                <FaPassport />
              </div>
              <p className="text-sm opacity-80">Applications</p>
              <h2 className="text-3xl font-bold mt-2">
                {summary.totalApplications || 0}
              </h2>
              <p className="text-xs mt-2 opacity-70">Total submissions</p>
            </div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg overflow-hidden">
              <div className="absolute top-0 right-0 opacity-20 text-7xl">
                <FaFileAlt />
              </div>
              <p className="text-sm opacity-80">Documents</p>
              <h2 className="text-3xl font-bold mt-2">
                {summary.totalDocuments || 0}
              </h2>
              <p className="text-xs mt-2 opacity-70">Uploaded files</p>
            </div>
          </div>

          {/* ANALYTICS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
              <h3 className="text-sm font-semibold text-slate-600 mb-4">
                Application Status Distribution
              </h3>
              <div className="h-[250px]">
                <Pie data={pieStatus} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
              <h3 className="text-sm font-semibold text-slate-600 mb-4">
                Visa Type Analysis
              </h3>
              <div className="h-[250px]">
                <Bar data={visaData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border md:col-span-2 hover:shadow-lg transition">
              <h3 className="text-sm font-semibold text-slate-600 mb-4">
                Country Trends
              </h3>
              <div className="h-[300px]">
                <Line data={countryData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
              <h3 className="text-sm font-semibold text-slate-600 mb-4">
                Document Status
              </h3>
              <div className="h-[250px]">
                <Bar data={docStatusData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
              <h3 className="text-sm font-semibold text-slate-600 mb-4">
                Monthly Activity
              </h3>
              <div className="h-[250px]">
                <Line data={monthlyData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TABLE VIEW ================= */}
      {reportType !== "summary" && (
        <div
          ref={printRef}
          className="bg-white rounded-2xl shadow-md border overflow-hidden animate-fade-in"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-4 w-16">#</th>

                  {reportType === "users" && (
                    <>
                      <th className="p-4 text-left">User</th>
                      <th className="p-4 text-left">Email</th>
                      <th className="p-4 text-left">Role</th>
                      <th className="p-4 text-left">Status</th>
                    </>
                  )}

                  {reportType === "applications" && (
                    <>
                      <th className="p-4 text-left">User</th>
                      <th className="p-4 text-left">Type</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Passport</th>
                    </>
                  )}

                  {reportType === "documents" && (
                    <>
                      <th className="p-4 text-left">Document</th>
                      <th className="p-4 text-left">Reason</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Uploaded</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {tableData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-all duration-200">
                    <td className="p-4 font-semibold text-slate-400 text-center">
                      {idx + 1}
                    </td>

                    {/* USERS */}
                    {reportType === "users" && (
                      <>
                        <td className="p-4 font-medium text-slate-800">
                          {item.firstName} {item.lastName}
                        </td>
                        <td className="p-4 text-slate-500">{item.email}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
                            {item.role || "user"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 text-xs rounded-full font-medium ${
                              item.status === "active"
                                ? "bg-green-50 text-green-600"
                                : item.status === "block"
                                ? "bg-red-50 text-red-600"
                                : "bg-gray-50 text-gray-600"
                            }`}
                          >
                            {item.status || "active"}
                          </span>
                        </td>
                      </>
                    )}

                    {/* APPLICATIONS */}
                    {reportType === "applications" && (
                      <>
                        <td className="p-4 font-medium text-slate-800">
                          {item.userId?.firstName || "N/A"} {item.userId?.lastName || ""}
                        </td>
                        <td className="p-4 text-slate-500">{item.ApplicationType}</td>
                        <td className="p-4">
                          <span
                            className="px-3 py-1 text-xs rounded-full text-white font-medium shadow-sm"
                            style={{ background: getStatusColor(item.status) }}
                          >
                            {item.status || "pending"}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">{item.passportNumber || "N/A"}</td>
                      </>
                    )}

                    {/* DOCUMENTS */}
                    {reportType === "documents" && (
                      <>
                        <td className="p-4 font-medium text-slate-800">
                          {item.DocumentType}
                        </td>
                        <td className="p-4 text-slate-500">
                          {item.rejectionReason || "—"}
                        </td>
                        <td className="p-4">
                          <span
                            className="px-3 py-1 text-xs rounded-full text-white font-medium"
                            style={{ background: getStatusColor(item.status) }}
                          >
                            {item.status || "pending"}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {tableData.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No {reportType} found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReport;