// import React from 'react'

// const Contact = () => {
//   return (
//     <div>
//       contact
//     </div>
//   )
// }

// export default Contact

import React from "react";
import Navbar from "./Navbar";

const Contact = () => {
  return (
    <div>
      
      <div className="px-6 py-12 bg-[var(--color-background)]">

      {/* HEADER */}
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--secondary-Color)]">
          Contact Us
        </h1>

        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Have questions or need support? Send us a message and our team will respond quickly.
        </p>
      </div>

      {/* CONTACT GRID */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

        {/* FORM */}
        <form className="space-y-4 bg-white p-6 rounded-xl shadow-md">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[var(--secondary-Color)]"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[var(--secondary-Color)]"
          />

          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[var(--secondary-Color)]"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[var(--secondary-Color)]"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[var(--secondary-Color)] text-white py-3 rounded-lg hover:bg-[var(--secondary-Color)]/80 transition"
          >
            Send Message
          </button>

        </form>

        {/* INFO */}
        <div className="space-y-6">

          <div className="p-5 bg-white rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="font-bold text-[var(--secondary-Color)]">Email</h3>
            <p className="text-gray-600">support@sims.so, mohamoudahmedhassan@gmail.com</p>
          </div>

          <div className="p-5 bg-white rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="font-bold text-[var(--secondary-Color)]">Phone</h3>
            <p className="text-gray-600">+252 63 3196279</p>
          </div>

          <div className="p-5 bg-white rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="font-bold text-[var(--secondary-Color)]">Location</h3>
            <p className="text-gray-600">Hargeisa, Somaliland</p>
          </div>

        </div>

      </div>
    </div>
    </div>
  );
};

export default Contact;