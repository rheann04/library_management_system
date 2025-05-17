"use client";

export default function AdminDashboard() {
  // Sample statistics data
  const stats = {
    totalBooks: 2190,
    totalStudents: 450,
    overdue: 23,
    availableBooks: 1850
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Books Card */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Books</p>
              <h3 className="text-2xl font-bold">{stats.totalBooks}</h3>
            </div>
            <div className="bg-purple-400 rounded-full p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Students Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Students</p>
              <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
            </div>
            <div className="bg-green-400 rounded-full p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Available Books Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Available Books</p>
              <h3 className="text-2xl font-bold">{stats.availableBooks}</h3>
            </div>
            <div className="bg-blue-400 rounded-full p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Overdue Books Card */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Overdue Books</p>
              <h3 className="text-2xl font-bold">{stats.overdue}</h3>
            </div>
            <div className="bg-red-400 rounded-full p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 text-black">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Student</th>
                <th className="text-left py-3 px-4 font-semibold">Book</th>
                <th className="text-left py-3 px-4 font-semibold">Action</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">John Doe</td>
                <td className="py-3 px-4">The Great Gatsby</td>
                <td className="py-3 px-4">Borrowed</td>
                <td className="py-3 px-4">2024-05-15</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">Jane Smith</td>
                <td className="py-3 px-4">To Kill a Mockingbird</td>
                <td className="py-3 px-4">Returned</td>
                <td className="py-3 px-4">2024-05-14</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4">Mike Johnson</td>
                <td className="py-3 px-4">1984</td>
                <td className="py-3 px-4">Borrowed</td>
                <td className="py-3 px-4">2024-05-14</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
} 