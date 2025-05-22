"use client";

import { useState, useEffect } from 'react';
import { booksAPI } from '../../services/api';

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteVerification, setDeleteVerification] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    status: 'Available',
    description: '',
    publishedYear: '',
    publisher: '',
    copies: '1'
  });

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await booksAPI.getAll();
      setBooks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  // Sort books
  const sortedBooks = [...books].sort((a, b) => {
    const aValue = a[sortBy].toString().toLowerCase();
    const bValue = b[sortBy].toString().toLowerCase();
    
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  // Pagination calculations
  const totalItems = sortedBooks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBooks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await booksAPI.create(formData);
      await fetchBooks(); // Refresh the books list
      setFormData({
        title: '',
        author: '',
        isbn: '',
        status: 'Available',
        description: '',
        publishedYear: '',
        publisher: '',
        copies: '1'
      });
      setIsModalOpen(false);
      setError(null);

      // Log the action
      console.log('Admin action:', {
        action: 'CREATE_BOOK',
        bookId: response.data._id,
        timestamp: new Date().toISOString(),
        details: formData
      });
    } catch (err) {
      setError('Failed to create book. Please try again.');
      console.error('Error creating book:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      status: book.status,
      description: book.description,
      publishedYear: book.publishedYear,
      publisher: book.publisher,
      copies: book.copies.toString()
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await booksAPI.update(selectedBook._id, formData);
      await fetchBooks(); // Refresh the books list
      setFormData({
        title: '',
        author: '',
        isbn: '',
        status: 'Available',
        description: '',
        publishedYear: '',
        publisher: '',
        copies: '1'
      });
      setIsEditModalOpen(false);
      setSelectedBook(null);
      setError(null);

      // Log the action
      console.log('Admin action:', {
        action: 'UPDATE_BOOK',
        bookId: selectedBook._id,
        timestamp: new Date().toISOString(),
        oldData: selectedBook,
        newData: formData
      });
    } catch (err) {
      setError('Failed to update book. Please try again.');
      console.error('Error updating book:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
    setDeleteVerification('');
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    if (deleteVerification.toLowerCase() === 'delete') {
      try {
        setLoading(true);
        await booksAPI.delete(selectedBook._id);
        await fetchBooks(); // Refresh the books list
        setIsDeleteModalOpen(false);
        setSelectedBook(null);
        setDeleteVerification('');
        setError(null);

        // Log the action
        console.log('Admin action:', {
          action: 'DELETE_BOOK',
          bookId: selectedBook._id,
          timestamp: new Date().toISOString(),
          deletedBook: selectedBook
        });
      } catch (err) {
        setError('Failed to delete book. Please try again.');
        console.error('Error deleting book:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleViewClick = (book) => {
    setSelectedBook(book);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <div className="mb-8 text-black flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Books Management</h1>
        <p className="text-black">Manage your library&apos;s book collection</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 text-black">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
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
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="author-asc">Author (A-Z)</option>
                <option value="author-desc">Author (Z-A)</option>
                <option value="genre-asc">Genre (A-Z)</option>
                <option value="genre-desc">Genre (Z-A)</option>
                <option value="publishedYear-asc">Year (Oldest)</option>
                <option value="publishedYear-desc">Year (Newest)</option>
                <option value="status-asc">Status (Available)</option>
                <option value="status-desc">Status (Borrowed)</option>
                <option value="copies-asc">Copies (Low to High)</option>
                <option value="copies-desc">Copies (High to Low)</option>
              </select>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add New Book
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold">Title</th>
                <th className="text-left py-3 px-4 font-semibold">Author</th>
                <th className="text-left py-3 px-4 font-semibold">ISBN</th>
                <th className="text-left py-3 px-4 font-semibold">Genre</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((book) => (
                <tr key={book.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{book.title}</td>
                  <td className="py-3 px-4">{book.author}</td>
                  <td className="py-3 px-4">{book.isbn}</td>
                  <td className="py-3 px-4">{book.genre}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.status === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEditClick(book)}
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
                        onClick={() => handleViewClick(book)}
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
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteClick(book)}
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

          {/* Pagination Controls */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex items-center">
              <span className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">{indexOfFirstItem + 1}</span>
                {' '}-{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, totalItems)}
                </span>{' '}
                of{' '}
                <span className="font-medium">{totalItems}</span>{' '}
                results
              </span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="ml-4 rounded-md border border-gray-300 py-1 px-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ${
                  currentPage === 1
                    ? 'text-gray-400 ring-gray-300 cursor-not-allowed'
                    : 'text-gray-900 ring-gray-300 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    } rounded-md`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ${
                  currentPage === totalPages
                    ? 'text-gray-400 ring-gray-300 cursor-not-allowed'
                    : 'text-gray-900 ring-gray-300 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-gray-900/50"
          ></div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-4xl w-full relative z-10 mx-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add New Book</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter book title"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Enter author name"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ISBN
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    placeholder="Enter ISBN"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publisher
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    placeholder="Enter publisher"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Published Year
                  </label>
                  <input
                    type="text"
                    name="publishedYear"
                    value={formData.publishedYear}
                    onChange={handleInputChange}
                    placeholder="Enter published year"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Copies
                  </label>
                  <input
                    type="number"
                    name="copies"
                    value={formData.copies}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter book description"
                    rows="2"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  ></textarea>
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
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {isEditModalOpen && selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-gray-900/50"
          ></div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-4xl w-full relative z-10 mx-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Edit Book</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter book title"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Enter author name"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ISBN
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    placeholder="Enter ISBN"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publisher
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    placeholder="Enter publisher"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Published Year
                  </label>
                  <input
                    type="text"
                    name="publishedYear"
                    value={formData.publishedYear}
                    onChange={handleInputChange}
                    placeholder="Enter published year"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Copies
                  </label>
                  <input
                    type="number"
                    name="copies"
                    value={formData.copies}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter book description"
                    rows="2"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedBook(null);
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
      {isDeleteModalOpen && selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-gray-900/50"
            onClick={() => {
              setIsDeleteModalOpen(false);
              setSelectedBook(null);
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Book</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete &quot;{selectedBook.title}&quot;? This action cannot be undone.
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
                    setSelectedBook(null);
                    setDeleteVerification('');
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
                  Delete Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Book Details Modal */}
      {isViewModalOpen && selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-gray-900/50"
            onClick={() => {
              setIsViewModalOpen(false);
              setSelectedBook(null);
            }}
          ></div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 max-w-2xl w-full relative z-10 mx-4">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Book Details</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Basic Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Title:</span>
                      <p className="text-base text-gray-900">{selectedBook.title}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Author:</span>
                      <p className="text-base text-gray-900">{selectedBook.author}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">ISBN:</span>
                      <p className="text-base text-gray-900">{selectedBook.isbn}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Publishing Details</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Publisher:</span>
                      <p className="text-base text-gray-900">{selectedBook.publisher}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Published Year:</span>
                      <p className="text-base text-gray-900">{selectedBook.publishedYear}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Status:</span>
                      <p className="text-base text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedBook.status === 'Available'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedBook.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Number of Copies:</span>
                      <p className="text-base text-gray-900">{selectedBook.copies}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">{selectedBook.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedBook(null);
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