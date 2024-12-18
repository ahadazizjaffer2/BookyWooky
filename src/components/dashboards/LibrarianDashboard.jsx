import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookPlus, Users, ClipboardList, Trash, Edit, Eye } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { data } from 'autoprefixer';

export const LibrarianDashboard = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllBooks();
    fetchAllBorrowedBooks();
  }, []);

  // Fetch all books (public endpoint)
  const fetchAllBooks = async () => {
    try {
      const response = await axios.get('https://librarymanagementbe.azurewebsites.net/api/books');
      if (Array.isArray(response.data)) {
        setBooks(response.data);
        console.log(response.data);
      } else {
        console.error('API response is not an array', response.data);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Fetch all borrowed books (token required)
  const fetchAllBorrowedBooks = async () => {
    if (!token) return; // No need to fetch if no token
    try {
      const response = await axios.get('https://librarymanagementbe.azurewebsites.net/api/borrowed-books', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setBorrowedBooks(response.data);  // Set books if the response is an array
        console.log(response.data);
        console.log(typeof response.data)
      } else {
        console.error('API response is not an array', response.data);
      }
      // setBorrowedBooks(response.data);
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
    }
  };

  const handleViewClick = (bookId) => {
    navigate(`/books/${bookId}`);  // Navigate to the book details page
  };

  const handleAddBookClick = () => {
    navigate('/books/add');  // Redirect to the add book page
  };

  // Filter books based on the search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Librarian Dashboard</h1>

      {/* Add Book Button */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Manage Books</h2>
        <button
          onClick={handleAddBookClick}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          <BookPlus className="w-5 h-5 inline-block" /> Add New Book
        </button>
      
        <h2 className="text-xl font-semibold mb-4 mt-5">Books List</h2>
      {/* Search Bar for Books */}
      <div className="mb-4">
          <input
            type="text"
            placeholder="Search books by title, author, or genre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Display All Books */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-gray-600">Genre: {book.genre}</p>
                <p className="text-gray-600">Copies Available: {book.copiesAvailable}</p>
                <p className="text-gray-600">Published on: {new Date(book.yearPublished).toISOString().split('T')[0]}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleViewClick(book.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-5 h-5 inline-block" /> View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No books available matching the search criteria.</p>
          )}
        </div>

      {/* Display All Borrowed Books */}
      <h2 className="text-xl font-semibold mb-4">Borrowed Books List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {Array.isArray(borrowedBooks) && borrowedBooks.length > 0 ? (
          borrowedBooks.map((borrowedbook) => (
            <div key={borrowedbook.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{borrowedbook.bookname}</h3>
              <p className="text-gray-600">Borrowed Date: {new Date(borrowedbook.borrowedDate).toISOString().split('T')[0]}</p>
              <p className="text-gray-600">Return Date: {new Date(borrowedbook.returnDate).toISOString().split('T')[0]}</p>
              <p className="text-gray-600">Returned: {borrowedbook.isReturned ? 'Yes' : 'No'}</p>
            </div>
          ))
        ) : (
          <p>No borrowed books available.</p>
        )}
      </div>


</div>

      
    </div>
  );
};
