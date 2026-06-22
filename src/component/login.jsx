// import React, { useEffect, useRef, useState } from 'react'
// import { BASE_URL_API, SomalilandCivilAhourityImage } from '../utils/constant'
// import axios from 'axios'
// import {validate,validateLogin} from '../utils/validateChceck'
 
// import { useDispatch, useSelector } from 'react-redux'
// import { addUser } from '../utils/UserSlice'
// import { useNavigate  } from "react-router-dom"
// import Navbar from '../pages/Navbar'
// const Login = () => {
//   const navigate=useNavigate()

//     const user = useSelector((store)=>store.user?.data);
 
// //  if(user){
// //         if(user.role ==="admin"){
// //             navigate("/adminDashbaord")
// //         }
// //         else if(user.role ==="user"){
// //             navigate("/userDashboard")
// //         }
// //         else{
// //             navigate("/")
// //         }
// //     }
  
 
//     const dispatch=useDispatch();
//         const [isSignform,setisSignform]=useState(false)
 
  
//      const [ErrorMessage,setErrorMessage]=useState("")

//     const firstName=useRef(null);
//     const lastName=useRef(null);
//     const password=useRef(null);
//     const email=useRef(null);
//     const role=useRef(null);
//     const confirmpassword=useRef(null);
 
//  useEffect(() => {
//   if (user) {
//     if (user.role === "admin") {
//       navigate("/adminDashbaord");
//     } else if (user.role === "user") {
//       navigate("/userDashboard");
//     } else {
//       navigate("/");
//     }
//   }
// }, [user]);
 
   

//     const addSignUp = async(e)=>{
//       e.preventDefault();
//    const message =   validate(firstName.current.value,lastName.current.value,email.current.value,password.current.value,role.current.value,confirmpassword.current.value)
//    if(message){
//     setErrorMessage(message)
//     return;
   
//    }
//  try{

//     const res = await axios.post(BASE_URL_API + "/signup",
//       {
//        firstName:firstName.current.value,
//        lastName: lastName.current.value,
//         email:email.current.value,
//        role:role.current.value,
//         password:password.current.value
//     },{withCredentials:true})
//     console.log(res.data.message)
//     dispatch(addUser(res?.data?.data))
       

        
 
//  }catch(err){
//    console.log(err.response?.data || err.message)
//    setErrorMessage(
//   err.response?.data?.message || "Something went wrong"
// )

 
//  }

//     }


//     const addLogin = async(e)=>{
//         e.preventDefault();

//         try{
//             const message =validateLogin(email,password);
//             if(message){
//                 setErrorMessage(message)
//                 return;
//             }
//             const res = await axios.post(BASE_URL_API + "/login",{
             
//         email:email.current.value,
//         password:password.current.value
//             },{withCredentials:true});


//       console.log(res?.data.data.role)
//       dispatch(addUser(res?.data?.data))
//       if(res.data.data.role ==="admin"){
//       return    navigate("/adminDashbaord")
//       }
//       if(res.data.data.role === "user"){
//          return navigate("/userDashboard")
//       }


//         }catch(err){
//      console.log(err)
//      setErrorMessage(err.response?.data?.message || "something wrong")
//      setTimeout(() => {
//         setErrorMessage("")
//      }, 3000);
//         }

//     }
  
    


//   return (
//   <div>
    
//       <div>
//       <div className='w-[96%] mx-auto flex justify-center items-center py-6'>
        
//         <form  className='w-full md:w-6/12 bg-[var(--color-background)] px-4 py-2 flex flex-col gap-2  shadow-2xl'>
//             <img src={SomalilandCivilAhourityImage} className='W-20 mx-auto md:w-[40%] my-2 animate-bounce' />
//         {!isSignform && <div className='flex gap-2  w-full items-center '>
//              <span className='flex flex-col gap-2 w-full'> 
//                  <label>FirstName</label>
//            <input  ref={firstName}  className='ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3' placeholder='firstName' type="text"  />
//              </span>
//   <span className='flex flex-col gap-2 w-full'> 
//                  <label>lastName</label>
//            <input  ref={lastName} className='ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3' placeholder='lastName' type="text"  />
//              </span>
//            </div>}

//            <label>email</label>
//            <input ref={email} className='ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3' placeholder='email' type="email"  />

// {!isSignform && <span className='flex flex-col gap-2 w-full'> 
//                  <label>role</label>
//                  <select   ref={role} className='ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)]'>
//                     <option value="">choose role</option>
//                     <option value="admin">admin</option>
//                     <option value="user">user</option>

//                  </select>

            
//              </span>}
//            <label>password</label>
//            <input   ref={password} className='ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3' placeholder='*******' type="password"  />
           
//            {!isSignform &&
//            <span className='flex flex-col gap-2'>
//             <label>confirm password</label>
//            <input   ref={confirmpassword} className='ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3' placeholder="*******" type="password"  />
//            </span>
// }

// {!isSignform && <button onClick={addSignUp} className='px-4 py-3 rounded-md bg-[var(--secondary-Color)]/90 text-md text-white'>submit</button>}
// {isSignform && <button onClick={addLogin} className='px-4 py-3 rounded-md bg-[var(--secondary-Color)]/90 text-md text-white'>submit</button>}
// {!isSignform && <p>
//      al ready exit user 
//     <span onClick={()=>setisSignform(!isSignform)} className='capitalize text-[var(--secondary-Color)]/100 font-bold cursor-pointer px-2 text-2xl '>sing in</span>
// </p>}
// {isSignform && <p>
//      register new user 
//     <span onClick={()=>setisSignform(!isSignform)} className='capitalize text-[var(--secondary-Color)]/100 font-bold cursor-pointer px-2 text-2xl '>sing Up</span>
// </p>}
//   <p className='text-red-500 font-bold text-2xl'>{ErrorMessage}</p>
//         </form>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default Login



import React, { useEffect, useRef, useState } from 'react';
import { BASE_URL_API, SomalilandCivilAhourityImage } from '../utils/constant';
import axios from 'axios';
import { validate, validateLogin } from '../utils/validateChceck';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user?.data);
  const dispatch = useDispatch();
  const [isSignform, setIsSignform] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const firstName = useRef(null);
  const lastName = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  const role = useRef(null);
  const confirmpassword = useRef(null);

  // ✅ Only redirect if user already exists (auto-login from cookie)
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/adminDashbaord");
      } else if (user.role === "user") {
        navigate("/userDashboard");
      }
    }
  }, [user, navigate]);

  // ✅ SIGNUP - Redirect to login, NOT dashboard
  const addSignUp = async (e) => {
    e.preventDefault();
    
    const message = validate(
      firstName.current.value,
      lastName.current.value,
      email.current.value,
      password.current.value,
      role.current.value,
      confirmpassword.current.value
    );
    
    if (message) {
      setErrorMessage(message);
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL_API + "/signup",
        {
          firstName: firstName.current.value,
          lastName: lastName.current.value,
          email: email.current.value,
          role: role.current.value,
          password: password.current.value
        },
        { withCredentials: true }
      );

      console.log("✅ Signup Response:", res.data);
      
      // ✅ Show success message
      setSuccessMessage("✅ Account created successfully! Please login.");
      setErrorMessage("");
      
      // ✅ Clear form fields
      if (firstName.current) firstName.current.value = "";
      if (lastName.current) lastName.current.value = "";
      if (email.current) email.current.value = "";
      if (password.current) password.current.value = "";
      if (confirmpassword.current) confirmpassword.current.value = "";
      if (role.current) role.current.value = "";

      // ✅ Switch to login form
      setIsSignform(true);
      
      // ✅ DO NOT dispatch addUser - DON'T auto-login
      // ✅ DO NOT navigate to dashboard

    } catch (err) {
      console.error("❌ Signup Error:", err);
      setErrorMessage(err.response?.data?.message || "Something went wrong");
      setSuccessMessage("");
    }
  };

  // ✅ LOGIN - Redirect to dashboard
  const addLogin = async (e) => {
    e.preventDefault();

    try {
      const message = validateLogin(email, password);
      if (message) {
        setErrorMessage(message);
        return;
      }

      const res = await axios.post(
        BASE_URL_API + "/login",
        {
          email: email.current.value,
          password: password.current.value
        },
        { withCredentials: true }
      );

      console.log("✅ Login Response:", res.data);
      
      // ✅ Save user to Redux
      dispatch(addUser(res?.data?.data));

      // ✅ Redirect based on role
      if (res.data.data.role === "admin") {
        navigate("/adminDashbaord");
      } else if (res.data.data.role === "user") {
        navigate("/userDashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("❌ Login Error:", err);
      setErrorMessage(err.response?.data?.message || "Invalid credentials");
      setSuccessMessage("");
    }
  };

  // ✅ Clear messages after 5 seconds
  useEffect(() => {
    if (ErrorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [ErrorMessage, successMessage]);

  return (
    <div>
      <div className='w-[96%] mx-auto flex justify-center items-center py-6'>
        <form className='w-full md:w-6/12 bg-[var(--color-background)] px-4 py-2 flex flex-col gap-2 shadow-2xl'>
          <img src={SomalilandCivilAhourityImage} className='w-20 mx-auto md:w-[40%] my-2 animate-bounce' alt="logo" />

          {/* Success Message */}
          {successMessage && (
            <div className='bg-green-500 text-white p-3 rounded-lg text-center'>
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {ErrorMessage && (
            <div className='bg-red-500 text-white p-3 rounded-lg text-center'>
              {ErrorMessage}
            </div>
          )}

          {/* Name Fields (Signup only) */}
          {!isSignform && (
            <div className='flex gap-2 w-full items-center'>
              <span className='flex flex-col gap-2 w-full'>
                <label>First Name</label>
                <input
                  ref={firstName}
                  className='ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3'
                  placeholder='First Name'
                  type="text"
                />
              </span>
              <span className='flex flex-col gap-2 w-full'>
                <label>Last Name</label>
                <input
                  ref={lastName}
                  className='ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3'
                  placeholder='Last Name'
                  type="text"
                />
              </span>
            </div>
          )}

          {/* Email */}
          <label>Email</label>
          <input
            ref={email}
            className='ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3'
            placeholder='email@example.com'
            type="email"
          />

          {/* Role (Signup only) */}
          {!isSignform && (
            <span className='flex flex-col gap-2 w-full'>
              <label>Role</label>
              <select ref={role} className='ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3'>
                <option value="">Choose role</option>
                <option value="user">User</option>
              </select>
            </span>
          )}

          {/* Password */}
          <label>Password</label>
          <input
            ref={password}
            className='ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3'
            placeholder='********'
            type="password"
          />

          {/* Confirm Password (Signup only) */}
          {!isSignform && (
            <span className='flex flex-col gap-2'>
              <label>Confirm Password</label>
              <input
                ref={confirmpassword}
                className='ring-1 ring-gray-300 py-3 rounded-md outline-[var(--secondary-Color)] transition px-3'
                placeholder="********"
                type="password"
              />
            </span>
          )}

          {/* Submit Button */}
          {!isSignform && (
            <button
              onClick={addSignUp}
              className='px-4 py-3 rounded-md bg-[var(--secondary-Color)]/90 text-md text-white hover:opacity-90 transition'
            >
              Sign Up
            </button>
          )}
          
          {isSignform && (
            <button
              onClick={addLogin}
              className='px-4 py-3 rounded-md bg-[var(--secondary-Color)]/90 text-md text-white hover:opacity-90 transition'
            >
              Sign In
            </button>
          )}

          {/* Toggle between Login and Signup */}
          {!isSignform && (
            <p className='text-center'>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setIsSignform(true);
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className='capitalize text-[var(--secondary-Color)] font-bold cursor-pointer px-2 text-lg'
              >
                Sign In
              </span>
            </p>
          )}
          
          {isSignform && (
            <p className='text-center'>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setIsSignform(false);
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className='capitalize text-[var(--secondary-Color)] font-bold cursor-pointer px-2 text-lg'
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;