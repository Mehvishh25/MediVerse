// client/src/pages/ContactPage.jsx

import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">Contact Owners</h1>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* Mehvish Contact Block */}
          <div className="border-b pb-4">
            <h2 className="text-2xl font-semibold text-green-600">Mehvish Waheed</h2>
            <p className="mt-2 text-gray-700 text-md">
              Email: <a href="mailto:mehvish.waheed.25@gmail.com" className="text-green-700 underline">mehvish.waheed.25@gmail.com</a>
            </p>
          </div>

          {/* Rabia Contact Block */}
          <div>
            <h2 className="text-2xl font-semibold text-green-600">Rabia Mansoor</h2>
            <p className="mt-2 text-gray-700 text-md">
              Email: <a href="mailto:rmansoor4002@gmail.com" className="text-green-700 underline">rmansoor4002@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
