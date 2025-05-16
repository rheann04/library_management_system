"use client";

import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <main 
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: 'url("/Library.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Welcome Modal */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          Welcome to Library Management System
        </h1>
        <h2 className="text-xl mb-6 text-center text-white">
          What type of user are you?
        </h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-blue-600 text-white py-4 px-8 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 font-semibold text-lg"
          >
            Admin
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-green-600 text-white py-4 px-8 rounded-lg hover:bg-green-700 transition-all hover:scale-105 font-semibold text-lg"
          >
            Student
          </button>
        </div>
      </div>
    </main>
  );
}