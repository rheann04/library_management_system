"use client";

import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout';

export default function StudentProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // Sample student data - in a real app, this would come from an API or database
  const [studentData, setStudentData] = useState({
    name: "Student User",
    email: "student@library.com",
    id: "STU001",
    course: "BSIT",
    year: "2nd Year",
    section: "4",
    contactNumber: "+1234567890",
    address: "123 Student Street, Campus Area"
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    course: "",
    year: "",
    section: "",
    contactNumber: "",
    address: ""
  });

  const handleEditClick = () => {
    setEditFormData({
      name: studentData.name,
      email: studentData.email,
      course: studentData.course,
      year: studentData.year,
      section: studentData.section,
      contactNumber: studentData.contactNumber,
      address: studentData.address
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the student data
    setStudentData({
      ...studentData,
      ...editFormData
    });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-black-900 opacity-100">My Profile</h1>
          <p className="text-black-600 opacity-100">View and manage your profile information</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 border-b">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-semibold">
                {studentData.name.charAt(0)}
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-semibold">{studentData.name}</h2>
                <p className="text-gray-600">{studentData.email}</p>
              </div>
            </div>
          </div>

          {/* Information Sections */}
          <div className="grid grid-cols-2 gap-6 p-6">
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

              <div className="mt-6">
                <button 
                  onClick={handleEditClick}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div 
              className="absolute inset-0 bg-gray-900/50"
              onClick={() => setIsEditModalOpen(false)}
            ></div>
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative z-10 mx-4 shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={editFormData.course}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      name="year"
                      value={editFormData.year}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section
                    </label>
                    <input
                      type="text"
                      name="section"
                      value={editFormData.section}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={editFormData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
} 