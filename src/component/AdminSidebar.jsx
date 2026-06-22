import React from 'react';
import { NavLink } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { Logout_Icon } from '../utils/constant';

const AdminSidebar = () => {
  const logout = useLogout();

  const navItems = [
    { path: "", label: "📊 Dashboard" },
    { path: "profile", label: "👤 Admin Profile" },
    { path: "manage/users", label: "👥 Manage Users" },
    { path: "all/application", label: "📋 All Applications" },
    { path: "search/application", label: "🔍 Search" },
    { path: "verify/document", label: "✅ Verify Documents" },
    { path: "report", label: "📈 Reports" },
  ];

  return (
    <div className="bg-[var(--color-background)] w-[17%] fixed h-screen shadow-lg ring-1 ring-gray-300">
      <div className="flex flex-col gap-2 pt-4 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `shadow-sm p-4 rounded-lg hover:bg-gray-300/80 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:translate-x-1 w-[96%] ${
                isActive
                  ? "bg-[var(--secondary-Color)] glow text-white"
                  : "bg-[var(--color-background)] shadow-2xl text-black"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

        <div
          onClick={logout}
          className="hover:bg-red-500/40 py-4 transition-all duration-300 w-[96%] ease-in-out transform hover:scale-[1.03] hover:translate-x-1 rounded-lg hover:text-black cursor-pointer items-center p-2 flex gap-2"
        >
          <img src={Logout_Icon} className="w-[20%] rounded-full" alt="logout" />
          🚪 Logout
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;