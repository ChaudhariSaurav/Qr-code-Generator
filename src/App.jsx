// src/App.js

import React from "react";
import QrCodeGenerator from "./components/QrCodeGenerator";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">
        QR Code Generator || By Saurav Chaudhary
      </h1>
      <QrCodeGenerator />
    </div>
  );
}

export default App;
