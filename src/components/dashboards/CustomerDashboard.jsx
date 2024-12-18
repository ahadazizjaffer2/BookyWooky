// // import React from 'react';
// // import { Book, Clock, Heart } from 'lucide-react';

// // export const CustomerDashboard= () => {
// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <div className="bg-white p-6 rounded-lg shadow-md">
// //           <div className="flex items-center mb-4">
// //             <Book className="w-6 h-6 text-blue-600 mr-2" />
// //             <h2 className="text-xl font-semibold">My Books</h2>
// //           </div>
// //           <p className="text-gray-600">View your borrowed books</p>
// //         </div>
// //         <div className="bg-white p-6 rounded-lg shadow-md">
// //           <div className="flex items-center mb-4">
// //             <Clock className="w-6 h-6 text-green-600 mr-2" />
// //             <h2 className="text-xl font-semibold">Due Dates</h2>
// //           </div>
// //           <p className="text-gray-600">Track return deadlines</p>
// //         </div>
// //         <div className="bg-white p-6 rounded-lg shadow-md">
// //           <div className="flex items-center mb-4">
// //             <Heart className="w-6 h-6 text-purple-600 mr-2" />
// //             <h2 className="text-xl font-semibold">Wishlist</h2>
// //           </div>
// //           <p className="text-gray-600">Save books for later</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { BookPlus, Users, ClipboardList, Trash, Edit, Eye } from 'lucide-react';
// import axios from 'axios';
// import { useAuthStore } from '../../store/authStore';
// import { data } from 'autoprefixer';

// export const CustomerDashboard = () => {
//   const navigate = useNavigate();
//   const { user, token } = useAuthStore();
//   const [books, setBooks] = useState([]);
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const userId = user.id;

//   useEffect(() => {
//     fetchAllBooks();
//     fetchAllBorrowedBooks();
//   }, []);

//   // Fetch all books (public endpoint)
//   const fetchAllBooks = async () => {
//     try {
//       const response = await axios.get('https://librarymanagementbe.azurewebsites.net/api/books');
//       if (Array.isArray(response.data)) {
//         setBooks(response.data);
//       } else {
//         console.error('API response is not an array', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     }
//   };

//   // Fetch all borrowed books (token required)
//   const fetchAllBorrowedBooks = async () => {
//     if (!token) return; // No need to fetch if no token
//     try {
//       console.log(userId);
//       const response = await axios.get(`https://librarymanagementbe.azurewebsites.net/api/borrowed-books/user/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });    
//       if (Array.isArray(response.data)) {
//         setBorrowedBooks(response.data);  // Set books if the response is an array
//         console.log(response.data);
//       } else {
//         console.error('API response is not an array', response.data);
//       }
//       // setBorrowedBooks(response.data);
//     } catch (error) {
//       console.error('Error fetching borrowed books:', error);
//     }
//   };

//   const handleViewClick = (bookId) => {
//     navigate(`/books/${bookId}`);  // Navigate to the book details page
//   };

//   // Handle returning the borrowed book
//   const handleReturnBook = async (bookId) => {
//     if (!token) return; // Ensure there is a valid token
//     try {
//       const response = await axios.put(
//         'https://librarymanagementbe.azurewebsites.net/api/borrowed-books',
//         { userId, bookId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.status === 200) {
//         // Successfully returned the book, update the UI
//         setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
//         alert('Book returned successfully!');
//         navigate("/dashboard");
//       } else {
//         console.error('Error returning book:', response.data);
//       }
//     } catch (error) {
//       console.error('Error returning book:', error);
//     }
//   };


//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>

//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h1 className="text-2xl font-semibold mb-4">Welcome </h1>

//         {/* Display All Borrowed Books */}
//       <h2 className="text-xl font-semibold mb-4">Books you have borrowed:</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         {Array.isArray(borrowedBooks) && borrowedBooks.length > 0 ? (
//           borrowedBooks.map((borrowedbook) => (
//             <div key={borrowedbook.id} className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold">{borrowedbook.bookname}</h3>
//               <p className="text-gray-600">Borrowed Date: {new Date(borrowedbook.borrowedDate).toISOString().split('T')[0]}</p>
//               <p className="text-gray-600">Return Date: {new Date(borrowedbook.returnDate).toISOString().split('T')[0]}</p>
//               <p className="text-gray-600">Returned: {borrowedbook.isReturned ? 'Yes' : 'No'}</p>

//               {/* Return Button */}
//               {!borrowedbook.isReturned && (
//                   <button
//                     onClick={() => handleReturnBook(borrowedbook.bookId)}
//                     className="mt-4 border-2 p-2 rounded border-red-500 text-red-600 hover:text-red-800 "
//                   >
//                     Return Book
//                   </button>
//                 )}
//             </div>
//           ))
//         ) : (
//           <p>No borrowed books available.</p>
//         )}
//       </div>

//       {/* Display All Books */}
//       <h2 className="text-xl font-semibold mb-4 mt-5">Books List</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         {Array.isArray(books) && books.length > 0 ? (
//           books.map((book) => (
//           <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold">{book.title}</h3>
//             <p className="text-gray-600">{book.author}</p>
//             <p className="text-gray-600">Genre: {book.genre}</p>
//             <p className="text-gray-600">Copies Available: {book.copiesAvailable}</p>
//             <p className="text-gray-600">Published on: {new Date(book.yearPublished).toISOString().split('T')[0]}</p>
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => handleViewClick(book.id)}
//                 className="text-blue-600 hover:text-blue-800"
//               >
//                 <Eye className="w-5 h-5 inline-block" /> View
//               </button>
              
//             </div>
//           </div>
//         ))):(<p>No books available.</p>)
//       }
//       </div>

// </div>

      
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookPlus, Users, ClipboardList, Trash, Edit, Eye } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

export const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const userId = user.id;

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
      const response = await axios.get(`https://librarymanagementbe.azurewebsites.net/api/borrowed-books/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setBorrowedBooks(response.data);
      } else {
        console.error('API response is not an array', response.data);
      }
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
    }
  };

  const handleViewClick = (bookId) => {
    navigate(`/books/${bookId}`);  // Navigate to the book details page
  };

  // Handle returning the borrowed book
  const handleReturnBook = async (bookId) => {
    if (!token) return; // Ensure there is a valid token
    try {
      const response = await axios.put(
        'https://librarymanagementbe.azurewebsites.net/api/borrowed-books',
        { userId, bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
        alert('Book returned successfully!');
        navigate("/dashboard");
      } else {
        console.error('Error returning book:', response.data);
      }
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  // Filter books based on the search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-semibold mb-4">Welcome </h1>

        {/* Display All Borrowed Books */}
        <h2 className="text-xl font-semibold mb-4">Books you have borrowed:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {Array.isArray(borrowedBooks) && borrowedBooks.length > 0 ? (
            borrowedBooks.map((borrowedbook) => (
              <div key={borrowedbook.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{borrowedbook.bookname}</h3>
                <p className="text-gray-600">Borrowed Date: {new Date(borrowedbook.borrowedDate).toISOString().split('T')[0]}</p>
                <p className="text-gray-600">Return Date: {new Date(borrowedbook.returnDate).toISOString().split('T')[0]}</p>
                <p className="text-gray-600">Returned: {borrowedbook.isReturned ? 'Yes' : 'No'}</p>

                {/* Return Button */}
                {!borrowedbook.isReturned && (
                  <button
                    onClick={() => handleReturnBook(borrowedbook.bookId)}
                    className="mt-4 border-2 p-2 rounded border-red-500 text-red-600 hover:text-red-800 "
                  >
                    Return Book
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No borrowed books available.</p>
          )}
        </div>

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
        <h2 className="text-xl font-semibold mb-4 mt-5">Books List</h2>
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
      </div>
    </div>
  );
};
