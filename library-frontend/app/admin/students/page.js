"use client";

import { useState } from 'react';

export default function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteVerification, setDeleteVerification] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    studentId: '',
    phoneNumber: '',
    password: ''
  });
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    studentId: '',
    phoneNumber: ''
  });

  // Sample students data
  const students = [
    { id: 1, firstName: 'John', lastName: 'Doe', username: 'johndoe', studentId: 'STU001', email: 'john.doe@example.com', booksLoaned: 2, phoneNumber: '1234567890' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', username: 'janesmith', studentId: 'STU002', email: 'jane.smith@example.com', booksLoaned: 1, phoneNumber: '0987654321' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', username: 'mikejohn', studentId: 'STU003', email: 'mike.johnson@example.com', booksLoaned: 0, phoneNumber: '5555555555' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
    // Reset form and close modal
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      studentId: '',
      phoneNumber: '',
      password: ''
    });
    setIsModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the edit form submission
    console.log('Edit form submitted:', editFormData);
    // Reset form and close modal
    setEditFormData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      studentId: '',
      phoneNumber: ''
    });
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setEditFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      username: student.username,
      email: student.email,
      studentId: student.studentId,
      phoneNumber: student.phoneNumber
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
    setDeleteVerification('');
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the actual deletion
    if (deleteVerification.toLowerCase() === 'delete') {
      console.log('Deleting student:', selectedStudent);
      // Reset state and close modal
      setIsDeleteModalOpen(false);
      setSelectedStudent(null);
      setDeleteVerification('');
    }
  };

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <div className="mb-8 text-black">
        <h1 className="text-3xl font-semibold">Students Management</h1>
        <p className="text-black/70">Manage student accounts and borrowing records</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 text-black">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add New Student
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Student ID</th>
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-left py-3 px-4 font-semibold">Books Borrowed</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{student.firstName} {student.lastName}</td>
                  <td className="py-3 px-4">{student.studentId}</td>
                  <td className="py-3 px-4">{student.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        student.booksLoaned === 0
                          ? 'bg-gray-100 text-gray-800'
                          : student.booksLoaned < 3
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {student.booksLoaned} books
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEditClick(student)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-800"
                        onClick={() => handleViewClick(student)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteClick(student)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-gray-900/50"
          ></div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 max-w-md w-full relative z-10 mx-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Student</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
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
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="Enter your student ID"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {isEditModalOpen && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-gray-900/50"
          ></div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 max-w-md w-full relative z-10 mx-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Student</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditInputChange}
                    placeholder="Enter first name"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditInputChange}
                    placeholder="Enter last name"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={editFormData.username}
                  onChange={handleEditInputChange}
                  placeholder="Enter username"
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
                  onChange={handleEditInputChange}
                  placeholder="Enter email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={editFormData.studentId}
                  onChange={handleEditInputChange}
                  placeholder="Enter student ID"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={editFormData.phoneNumber}
                  onChange={handleEditInputChange}
                  placeholder="Enter phone number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedStudent(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-gray-900/50"
            onClick={() => {
              setIsDeleteModalOpen(false);
              setSelectedStudent(null);
              setDeleteVerification('');
            }}
          ></div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 max-w-md w-full relative z-10 mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Student Account</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete {selectedStudent.firstName} {selectedStudent.lastName}'s account? This action cannot be undone.
              </p>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Type <span className="font-semibold">delete</span> to confirm:
                </p>
                <input
                  type="text"
                  value={deleteVerification}
                  onChange={(e) => setDeleteVerification(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-red-500 text-center"
                  placeholder="Type 'delete' to confirm"
                />
              </div>
              <div className="flex justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedStudent(null);
                    setDeleteVerification('');
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteSubmit}
                  disabled={deleteVerification.toLowerCase() !== 'delete'}
                  className={`px-4 py-2 rounded-lg text-white ${
                    deleteVerification.toLowerCase() === 'delete'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-red-300 cursor-not-allowed'
                  }`}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Student Details Modal */}
      {isViewModalOpen && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-gray-900/50"
            onClick={() => {
              setIsViewModalOpen(false);
              setSelectedStudent(null);
            }}
          ></div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 max-w-2xl w-full relative z-10 mx-4">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Student Details</h2>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedStudent(null);
                }}
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

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Personal Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Full Name:</span>
                      <p className="text-base text-gray-900">{selectedStudent.firstName} {selectedStudent.lastName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Username:</span>
                      <p className="text-base text-gray-900">{selectedStudent.username}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Student ID:</span>
                      <p className="text-base text-gray-900">{selectedStudent.studentId}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Email:</span>
                      <p className="text-base text-gray-900">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Phone Number:</span>
                      <p className="text-base text-gray-900">{selectedStudent.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Library Activity</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Books Currently Borrowed:</span>
                      <p className="text-base text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedStudent.booksLoaned === 0
                            ? 'bg-gray-100 text-gray-800'
                            : selectedStudent.booksLoaned < 3
                            ? 'bg-gray-200 text-gray-800'
                            : 'bg-gray-300 text-gray-800'
                        }`}>
                          {selectedStudent.booksLoaned} books
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Account Status:</span>
                      <p className="text-base text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                          Active
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Recent Activity</h3>
                  <div className="mt-2 space-y-2">
                    <div className="border rounded-lg p-3 bg-gray-50">
                      <p className="text-sm text-gray-600">Last Login:</p>
                      <p className="text-sm font-medium text-gray-900">Today at 10:30 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedStudent(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 