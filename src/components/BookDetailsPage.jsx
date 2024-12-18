import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import { BookPlus, Users, ClipboardList, Trash, Edit, Eye } from 'lucide-react';

const BookDetailsPage = () => {
  const { bookId } = useParams();  // Get the bookId from the URL parameters
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { user, token } = useAuthStore();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://librarymanagementbe.azurewebsites.net/api/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleDeleteBook = async () => {
    try {
      await axios.delete(`https://librarymanagementbe.azurewebsites.net/api/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the bearer token in the request header
        },
      });
  
      // Redirect to the dashboard after successful deletion
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEditBook = () => {
    // Navigate to the edit page of the specific book
    navigate(`/books/${bookId}/edit`);
  };

  const handleBorrowBook = async () => {
    if (!user?.id || !token) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const response = await axios.post(
        'https://librarymanagementbe.azurewebsites.net/api/borrowed-books',
        {
          userId: user.id,  // Get userId from the authenticated user
          bookId: book.id,  // Get bookId from the book details
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token for authentication
          },
        }
      );

      if (response.status === 200) {
        console.log('Book borrowed successfully!');
        alert('Book borrowed successfully!');
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };
  
  if (!book) {
    return <DashboardLayout><div>Loading...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Book Details</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">{book.title}</h3>
        <p className="text-gray-600">Author: {book.author}</p>
        <p className="text-gray-600">Genre: {book.genre}</p>
        <p className="text-gray-600">Copies Available: {book.copiesAvailable}</p>
        <p className="text-gray-600">Published on: {new Date(book.yearPublished).toISOString().split('T')[0]}</p>
            
         {/* Show Edit and Delete buttons for Librarians */}
         {user?.role === 'Librarian' && (
        <div className="flex justify-between mt-4">
          <button
            onClick={handleEditBook}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit className="w-5 h-5 inline-block" />Edit
          </button>
          <button
            onClick={handleDeleteBook}
            className="text-red-600 hover:text-red-800"
          ><Trash className="w-5 h-5 inline-block" />
            Delete
          </button>
        </div>
        )}

        {/* Show Borrow button for Customers */}
        {user?.role === 'Customer' && (
            <div className="mt-4">
              <button
                onClick={handleBorrowBook}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                <BookPlus className="w-5 h-5 inline-block" /> Borrow
              </button>
            </div>
          )}
          
      </div>
    </div>
    </DashboardLayout>
  );
};

export default BookDetailsPage;
