"use client";

import { useState } from 'react';

export default function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteVerification, setDeleteVerification] = useState('');
  const [sortBy, setSortBy] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [students, setStudents] = useState([
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Smith',
      username: 'johnsmith',
      email: 'john.smith@university.edu',
      studentId: 'STU2024001',
      phoneNumber: '555-0101',
      booksBorrowed: 2
    },
    {
      _id: '2',
      firstName: 'Emma',
      lastName: 'Johnson',
      username: 'emmaj',
      email: 'emma.j@university.edu',
      studentId: 'STU2024002',
      phoneNumber: '555-0102',
      booksBorrowed: 0
    },
    {
      _id: '3',
      firstName: 'Michael',
      lastName: 'Brown',
      username: 'mbrown',
      email: 'michael.b@university.edu',
      studentId: 'STU2024003',
      phoneNumber: '555-0103',
      booksBorrowed: 3
    },
    {
      _id: '4',
      firstName: 'Sarah',
      lastName: 'Davis',
      username: 'sarahd',
      email: 'sarah.d@university.edu',
      studentId: 'STU2024004',
      phoneNumber: '555-0104',
      booksBorrowed: 1
    },
    {
      _id: '5',
      firstName: 'James',
      lastName: 'Wilson',
      username: 'jwilson',
      email: 'james.w@university.edu',
      studentId: 'STU2024005',
      phoneNumber: '555-0105',
      booksBorrowed: 0
    },
    {
      _id: '6',
      firstName: 'Lisa',
      lastName: 'Anderson',
      username: 'landerson',
      email: 'lisa.a@university.edu',
      studentId: 'STU2024006',
      phoneNumber: '555-0106',
      booksBorrowed: 2
    },
    {
      _id: '7',
      firstName: 'David',
      lastName: 'Taylor',
      username: 'dtaylor',
      email: 'david.t@university.edu',
      studentId: 'STU2024007',
      phoneNumber: '555-0107',
      booksBorrowed: 1
    },
    {
      _id: '8',
      firstName: 'Jennifer',
      lastName: 'Thomas',
      username: 'jthomas',
      email: 'jennifer.t@university.edu',
      studentId: 'STU2024008',
      phoneNumber: '555-0108',
      booksBorrowed: 0
    },
    {
      _id: '9',
      firstName: 'Robert',
      lastName: 'Jackson',
      username: 'rjackson',
      email: 'robert.j@university.edu',
      studentId: 'STU2024009',
      phoneNumber: '555-0109',
      booksBorrowed: 3
    },
    {
      _id: '10',
      firstName: 'Patricia',
      lastName: 'White',
      username: 'pwhite',
      email: 'patricia.w@university.edu',
      studentId: 'STU2024010',
      phoneNumber: '555-0110',
      booksBorrowed: 1
    },
    {
      _id: '11',
      firstName: 'William',
      lastName: 'Harris',
      username: 'wharris',
      email: 'william.h@university.edu',
      studentId: 'STU2024011',
      phoneNumber: '555-0111',
      booksBorrowed: 2
    },
    {
      _id: '12',
      firstName: 'Elizabeth',
      lastName: 'Martin',
      username: 'emartin',
      email: 'elizabeth.m@university.edu',
      studentId: 'STU2024012',
      phoneNumber: '555-0112',
      booksBorrowed: 0
    },
    {
      _id: '13',
      firstName: 'Richard',
      lastName: 'Thompson',
      username: 'rthompson',
      email: 'richard.t@university.edu',
      studentId: 'STU2024013',
      phoneNumber: '555-0113',
      booksBorrowed: 1
    },
    {
      _id: '14',
      firstName: 'Susan',
      lastName: 'Garcia',
      username: 'sgarcia',
      email: 'susan.g@university.edu',
      studentId: 'STU2024014',
      phoneNumber: '555-0114',
      booksBorrowed: 3
    },
    {
      _id: '15',
      firstName: 'Joseph',
      lastName: 'Martinez',
      username: 'jmartinez',
      email: 'joseph.m@university.edu',
      studentId: 'STU2024015',
      phoneNumber: '555-0115',
      booksBorrowed: 0
    },
    {
      _id: '16',
      firstName: 'Margaret',
      lastName: 'Robinson',
      username: 'mrobinson',
      email: 'margaret.r@university.edu',
      studentId: 'STU2024016',
      phoneNumber: '555-0116',
      booksBorrowed: 2
    },
    {
      _id: '17',
      firstName: 'Charles',
      lastName: 'Clark',
      username: 'cclark',
      email: 'charles.c@university.edu',
      studentId: 'STU2024017',
      phoneNumber: '555-0117',
      booksBorrowed: 1
    },
    {
      _id: '18',
      firstName: 'Jessica',
      lastName: 'Rodriguez',
      username: 'jrodriguez',
      email: 'jessica.r@university.edu',
      studentId: 'STU2024018',
      phoneNumber: '555-0118',
      booksBorrowed: 0
    },
    {
      _id: '19',
      firstName: 'Thomas',
      lastName: 'Lewis',
      username: 'tlewis',
      email: 'thomas.l@university.edu',
      studentId: 'STU2024019',
      phoneNumber: '555-0119',
      booksBorrowed: 3
    },
    {
      _id: '20',
      firstName: 'Sarah',
      lastName: 'Lee',
      username: 'slee',
      email: 'sarah.l@university.edu',
      studentId: 'STU2024020',
      phoneNumber: '555-0120',
      booksBorrowed: 1
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sort students
  const sortedStudents = [...students].sort((a, b) => {
    let aValue, bValue;
    
    if (sortBy === 'name') {
      aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
      bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
    } else {
      aValue = a[sortBy].toString().toLowerCase();
      bValue = b[sortBy].toString().toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  // Pagination calculations
  const totalItems = sortedStudents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedStudents.slice(indexOfFirstItem, indexOfLastItem);

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
    // Add new student to the list
    const newStudent = {
      _id: String(students.length + 1),
      ...formData,
      booksBorrowed: 0
    };
    setStudents(prev => [...prev, newStudent]);
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
    // Update student in the list
    setStudents(prev => prev.map(student => 
      student._id === selectedStudent._id 
        ? { ...student, ...editFormData }
        : student
    ));
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

  const handleDeleteSubmit = async () => {
    if (deleteVerification.toLowerCase() !== 'delete') return;
    
    // Remove student from the list
    setStudents(prev => prev.filter(student => student._id !== selectedStudent._id));
    setIsDeleteModalOpen(false);
    setSelectedStudent(null);
    setDeleteVerification('');
  };

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Here you would typically handle the search functionality
    console.log('Searching for:', searchQuery);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <>
      <div className="mb-8 text-black flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Students Management</h1>
        <p className="text-black">Manage student accounts and borrowing records</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 text-black">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-l-lg focus:outline-none focus:border-blue-500 text-black w-64"
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
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
              >
                Search
              </button>
            </form>

            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                id="sort"
                value={`${sortBy}-${sortOrder}`}
                onChange={handleSortChange}
                className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="studentId-asc">Student ID (A-Z)</option>
                <option value="studentId-desc">Student ID (Z-A)</option>
                <option value="booksLoaned-asc">Books Borrowed (Low to High)</option>
                <option value="booksLoaned-desc">Books Borrowed (High to Low)</option>
                <option value="email-asc">Email (A-Z)</option>
                <option value="email-desc">Email (Z-A)</option>
              </select>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add New Student
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Books Borrowed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((student) => (
                <tr key={student._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {student.firstName} {student.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.studentId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.booksBorrowed || 0}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewClick(student)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditClick(student)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(student)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-gray-900/50"
          ></div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-4xl w-full relative z-10 mx-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add Student</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
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

                <div className="col-span-2">
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
              </div>

              <div className="flex justify-end space-x-3 mt-4">
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
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-4xl w-full relative z-10 mx-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Edit Student</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
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
              </div>

              <div className="flex justify-end space-x-3 mt-4">
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
                Are you sure you want to delete {selectedStudent.firstName} {selectedStudent.lastName}&apos;s account? This action cannot be undone.
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
                          selectedStudent.booksBorrowed === 0
                            ? 'bg-gray-100 text-gray-800'
                            : selectedStudent.booksBorrowed < 3
                            ? 'bg-gray-200 text-gray-800'
                            : 'bg-gray-300 text-gray-800'
                        }`}>
                          {selectedStudent.booksBorrowed} books
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