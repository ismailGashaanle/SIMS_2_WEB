// import React from 'react'

// const About = () => {
//   return (
//     <div>
//       About
//     </div>
//   )
// }

// export default About


import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
   <div>
     
    <div className="px-6 py-12 bg-[var(--color-background)]">

      {/* TITLE */}
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--secondary-Color)]">
          About Us
        </h1>

        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          We are building a modern digital immigration system to simplify visa,
          work permit, and residence services in Somaliland.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT TEXT */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Smart, Secure & Transparent System
          </h2>

          <p className="text-gray-600">
            Our platform is designed to eliminate long queues, paperwork, and delays.
            Everything is handled online with real-time tracking and secure document processing.
          </p>

          <p className="text-gray-600">
            We aim to connect citizens, employers, and government institutions through
            a reliable and efficient digital system.
          </p>

          <button className="mt-4 bg-[var(--secondary-Color)] text-white px-6 py-2 rounded-lg hover:bg-[var(--secondary-Color)]/80 transition">
            Learn More
          </button>
        </div>

        {/* RIGHT STATS BOX */}
        <div className="grid grid-cols-2 gap-4">

          <div className="p-6 rounded-xl bg-white shadow-md text-center hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-[var(--secondary-Color)]">10K+</h3>
            <p className="text-gray-600 text-sm">Applications Processed</p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-md text-center hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-[var(--secondary-Color)]">5K+</h3>
            <p className="text-gray-600 text-sm">Happy Users</p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-md text-center hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-[var(--secondary-Color)]">24/7</h3>
            <p className="text-gray-600 text-sm">System Availability</p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-md text-center hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-[var(--secondary-Color)]">99%</h3>
            <p className="text-gray-600 text-sm">Success Rate</p>
          </div>

        </div>

      </div>
    </div>
   </div>
  );
};

export default About;