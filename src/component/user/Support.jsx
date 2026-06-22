 
import React from "react";
import {
  FaHeadset,
  FaEnvelope,
  FaPhoneAlt,
  FaQuestionCircle,
  FaTicketAlt,
} from "react-icons/fa";

const Support = () => {
  const faqs = [
    {
      q: "How do I reset my password?",
      a: "Use the Forgot Password option on the login page.",
    },
    {
      q: "Can I update student information?",
      a: "Yes. Navigate to Students → Edit Student.",
    },
    {
      q: "How do I generate reports?",
      a: "Reports are available from the Dashboard section.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 px-6 py-10">

      {/* Hero */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 animate-float glow">
          <FaHeadset
            size={40}
            className="text-[var(--secondary-Color)]"
          />
        </div>

        <h1 className="text-5xl font-bold mt-6">
          Support <span className="highlight">Center</span>
        </h1>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Need help with your Student Information Management System?
          Our support team is available to assist you.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">

        <div className="glass rounded-3xl p-8 hover-scale animate-slide-in">
          <FaEnvelope
            className="text-[var(--secondary-Color)] mb-4"
            size={35}
          />
          <h3 className="font-bold text-xl mb-2">Email Support</h3>
          <p className="text-gray-600">
            support@sims.edu
          </p>
        </div>

        <div className="glass rounded-3xl p-8 hover-scale animate-slide-in delay-100">
          <FaPhoneAlt
            className="text-[var(--secondary-Color)] mb-4"
            size={35}
          />
          <h3 className="font-bold text-xl mb-2">Call Us</h3>
          <p className="text-gray-600">
            +252 63 XXX XXXX
          </p>
        </div>

        <div className="glass rounded-3xl p-8 hover-scale animate-slide-in delay-200">
          <FaTicketAlt
            className="text-[var(--secondary-Color)] mb-4"
            size={35}
          />
          <h3 className="font-bold text-xl mb-2">
            Submit Ticket
          </h3>
          <p className="text-gray-600">
            Open a support request anytime.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="glass rounded-3xl p-8 mb-16 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <FaQuestionCircle
            className="text-[var(--secondary-Color)]"
            size={28}
          />
          <h2 className="text-3xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-xl p-5 shadow-sm"
            >
              <summary className="font-semibold cursor-pointer">
                {faq.q}
              </summary>

              <p className="text-gray-600 mt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="glass rounded-3xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold mb-6">
          Send us a Message
        </h2>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            rows="5"
            placeholder="Describe your issue..."
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="btn-primary hover-scale glow"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;

