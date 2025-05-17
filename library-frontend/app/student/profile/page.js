"use client";

import StudentLayout from '../../components/StudentLayout';

export default function StudentProfile() {
  // Sample student data - in a real app, this would come from an API or database
  const studentData = {
    name: "Student User",
    email: "student@library.com",
    id: "STU001",
    course: "BSIT",
    year: "2nd Year",
    section: "4",
    contactNumber: "+1234567890",
    address: "123 Student Street, Campus Area"
  };

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-black-900 opacity-100">My Profile</h1>
          <p className="text-black-600 opacity-100">View and manage your profile information</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-semibold">
              {studentData.name.charAt(0)}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold">{studentData.name}</h2>
              <p className="text-gray-600">{studentData.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Student ID:</span>
                    <span className="font-medium">{studentData.id}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-medium">{studentData.course}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Year:</span>
                    <span className="font-medium">{studentData.year}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Section:</span>
                    <span className="font-medium">{studentData.section}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Contact Number:</span>
                    <span className="font-medium">{studentData.contactNumber}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium">{studentData.address}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
} 