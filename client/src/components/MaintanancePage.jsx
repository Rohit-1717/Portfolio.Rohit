// src/components/MaintenancePage.js
import React from "react";

const MaintenancePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-9xl font-bold text-red-500">503</h1>
      <h2 className="text-4xl font-semibold mt-4 text-center">
        Sorry, we're down for maintenance.
      </h2>
      <p className="text-lg mt-2 mb-6 text-center">
        Our website is currently undergoing scheduled maintenance. We should be
        back shortly. Thank you for your patience.
      </p>
    </div>
  );
};

export default MaintenancePage;
