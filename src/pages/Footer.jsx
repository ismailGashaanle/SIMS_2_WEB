// import React from 'react'

// const Footer = () => {
//   return (
//     <div>
//       Footer
//     </div>
//   )
// }

// export default Footer


import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const Footer = () => {
  return (
  <div>
    
      <footer className="bg-[var(--color-background)] border-t border-[var(--color-border)] mt-10">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LOGO + DESCRIPTION */}
        <div>
          <h2 className="text-xl font-bold text-[var(--secondary-Color)]">
            SIMS
          </h2>

          <p className="text-gray-600 mt-3 text-sm">
            Somaliland Immigration Management System — Fast, secure, and
            transparent digital immigration services.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>

          <ul className="space-y-2 text-gray-600">
            <li>
              <NavLink to="/" className="hover:text-[var(--secondary-Color)]">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/services" className="hover:text-[var(--secondary-Color)]">
                Services
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className="hover:text-[var(--secondary-Color)]">
                About
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className="hover:text-[var(--secondary-Color)]">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>

          <p className="text-gray-600 text-sm">
            Email: support@sims.so, mohamoudahmedhassan@gmail.com
          </p>

          <p className="text-gray-600 text-sm mt-1">
            Phone: +252 63 4214518
          </p>

          <p className="text-gray-600 text-sm mt-1">
            Hargeisa, Somaliland
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-gray-500 text-sm py-4 border-t border-[var(--color-border)]">
        © {new Date().getFullYear()} SIMS. All rights reserved.
      </div>

    </footer>
  </div>
  );
};

export default Footer;