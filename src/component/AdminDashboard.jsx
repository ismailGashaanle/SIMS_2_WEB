import { Outlet, useNavigate } from "react-router";
import AdminSidebar from "./AdminSidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user?.data);
  const loading = useSelector((store) => store.user?.loading);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="w-full flex flex-col">
      <Header className="w-full" />
      <div className="flex w-full">
        <div className="w-[17%]"><AdminSidebar /></div>
        <div className="w-full px-6 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;