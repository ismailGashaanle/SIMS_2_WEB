import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import About from './About';
import Contact from './contact';
import Footer from './Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL_API } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import { addVideo } from '../utils/VideoSlice';

const Body = () => {
  const user = useSelector((store) => store?.user?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoslice = useSelector((store) => store.videoslice);

  // ✅ Video setup (only once)
  useEffect(() => {
    const storedVideo = localStorage.getItem("video");
    if (storedVideo) {
      dispatch(addVideo(storedVideo));
    } else {
      const url = "https://www.youtube.com/embed/OJyFrU526Zo?autoplay=1&mute=1&loop=1&playlist=OJyFrU526Zo";
      dispatch(addVideo(url));
      localStorage.setItem("video", url);
    }
  }, [dispatch]);

  // ✅ Redirect if user is logged in
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/adminDashbaord");
    } else if (user?.role === "user") {
      navigate("/userDashboard");
    }
  }, [user, navigate]);

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) return;
      try {
        const res = await axios.get(BASE_URL_API + "/profile/view", {
          withCredentials: true
        });
        if (res.data?.data) {
          dispatch(addUser(res.data.data));
        }
      } catch (err) {
        // User not logged in - ignore
        console.log("Not authenticated");
      }
    };
    fetchUserProfile();
  }, [user, dispatch]);

  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;