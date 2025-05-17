"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStudentClick = () => {
    router.push("/Login/Student_Login");
  };

  const handleAdminClick = () => {
    router.push("/Login/Admin_Login");
  };

  return (
    <main 
      className="min-h-screen w-full flex items-center justify-center relative"
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
      <div className="relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">
          Welcome to Library Management System
        </h1>
        <h2 className="text-xl mb-6 text-center text-black">
          What type of user are you?
        </h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleAdminClick}
            className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 font-semibold text-lg"
          >
            Admin
          </button>
          <button
            onClick={handleStudentClick}
            className="bg-green-600 text-white py-2 px-8 rounded-lg hover:bg-green-700 transition-all hover:scale-105 font-semibold text-lg"
          >
            Student
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-white text-sm">
        © 2025 BSIT 2-4
      </div>
    </main>
  );
}