import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./component/login";
import Contact from "./pages/contact";
import Services from "./pages/Services";
import About from "./pages/About.jsx";
import { useDispatch } from "react-redux";
import AdminDashboard from "./component/AdminDashboard";
import UserDashboard from "./component/UserDashboard.jsx";
import { Provider, useSelector } from "react-redux";
import AppStore from "./utils/AppStore";
import Body from './pages/Body.jsx';
import PublicRoute from "./component/PublicRoute.jsx";
import { useEffect } from "react";
import { BASE_URL_API } from "./utils/constant.js";
import axios from "axios";
import { addUser } from "./utils/UserSlice.jsx";
import Profile from "./component/Profile.jsx";
import { useLocation } from "react-router-dom";
import ManageUsers from "./component/ManageUsers.jsx";
import AllApplicationAdmin from "./component/AllApplicationAdmin.jsx";
import ViewUser from "./component/ViewUser.jsx";
import NewApplication from "./component/user/NewApplication.jsx";
import MyApplications from "./component/user/MyApplications.jsx";
import TrackStatus from "./component/user/TrackStatus.jsx";
import Support from "./component/user/Support.jsx";
import UploadDocument from "./component/user/UploadDocument.jsx";
import UserDash from "./component/user/UserDash.jsx";
import ApprovalLetter from "./component/ApprovalLetter.jsx";
import SearchApplication from "./component/SearchApplication.jsx";
import AdminReport from './component/AdminReport.jsx';

// function AppWrapper({ children }) {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { data: user, loading } = useSelector((store) => store.user);
//   const navigate = useNavigate();

//   // ✅ Load user from backend with error handling
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(
//           BASE_URL_API + "/profile/view",
//           { withCredentials: true }
//         );
//         if (res.data?.data) {
//           dispatch(addUser(res.data.data));
//         } else {
//           dispatch(addUser(null));
//         }
//       } catch (err) {
//         console.log("Auth check failed:", err.message);
//         dispatch(addUser(null));
//       }
//     };

//     fetchUser();
//   }, [dispatch]);

//   // ✅ Redirect only on home page
//   useEffect(() => {
//     if (!user || loading) return;

//     if (location.pathname === "/") {
//       if (user.role === "admin") {
//         navigate("/adminDashbaord");
//       } else if (user.role === "user") {
//         navigate("/userDashboard");
//       }
//     }
//   }, [user, loading, location.pathname, navigate]);

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="text-2xl">Loading...</div>
//     </div>
//   );

//   return children;
// }
function AppWrapper({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data: user, loading } = useSelector((store) => store.user);
  const navigate = useNavigate();

  // ✅ Load user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          BASE_URL_API + "/profile/view",
          { withCredentials: true }
        );
        if (res.data?.data) {
          dispatch(addUser(res.data.data));
        } else {
          dispatch(addUser(null));
        }
      } catch (err) {
        console.log("Not authenticated");
        dispatch(addUser(null));
      }
    };

    fetchUser();
  }, [dispatch]);

  // ✅ Only redirect on home page, NOT on login/signup
  useEffect(() => {
    if (!user || loading) return;

    // ✅ ONLY redirect from home page, not from login or signup
    if (location.pathname === "/") {
      if (user.role === "admin") {
        navigate("/adminDashbaord");
      } else if (user.role === "user") {
        navigate("/userDashboard");
      }
    }
    // ✅ Allow user to stay on login/signup pages
  }, [user, loading, location.pathname, navigate]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-2xl">Loading...</div>
    </div>
  );

  return children;
}

function App() {
  return (
    <Provider store={AppStore}>
      <BrowserRouter>
        <AppWrapper>
          <div className="bg-[var(--color-background)] min-h-screen">
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />

              {/* Admin Routes */}
              <Route path="/adminDashbaord" element={<AdminDashboard />}>
                <Route path="" element={<AdminReport />} />
                <Route path="profile" element={<Profile />} />
                <Route path="manage/users" element={<ManageUsers />} />
                <Route path="all/application" element={<AllApplicationAdmin />} />
                <Route path="view/user" element={<ViewUser />} />
                <Route path="search/application" element={<SearchApplication />} />
                <Route path="verify/document" element={<div>Verify Document</div>} />
                <Route path="report" element={<AdminReport />} />
              </Route>

              {/* User Routes */}
              <Route path="/UserDashboard" element={<UserDashboard />}>
                <Route path="" element={<UserDash />} />
                <Route path="newApplication" element={<NewApplication />} />
                <Route path="profile" element={<Profile />} />
                <Route path="MyApplications" element={<MyApplications />} />
                <Route path="approval-letter" element={<ApprovalLetter />} />
                <Route path="UploadDocument" element={<UploadDocument />} />
                <Route path="TrackStatus" element={<TrackStatus />} />
                <Route path="Support" element={<Support />} />
              </Route>

              {/* Auth Routes */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
            </Routes>
          </div>
        </AppWrapper>
      </BrowserRouter>
    </Provider>
  );
}

export default App;