import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const EditBookPage = () => {
  const { bookId } = useParams();  // Get the bookId from the URL
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({
    id: bookId,
    title: '',
    author: '',
    genre: '',
    yearPublished: '',
    availableCopies: '',
  });
  const [loading, setLoading] = useState(true);

  // Fetch book details by bookId
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://librarymanagementbe.azurewebsites.net/api/books/${bookId}`);
        setBookDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission (save edited book details)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      await axios.put(
        `https://librarymanagementbe.azurewebsites.net/api/books`,
        bookDetails,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Redirect back to the dashboard after successful update
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookDetails.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="author">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookDetails.author}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="genre">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={bookDetails.genre}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="year">
            Date Published
          </label>
          <input
            type="datetime-local"
            id="year"
            name="year"
            value={bookDetails.yearPublished}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
            <label htmlFor="copiesAvailable" className="block text-sm font-medium text-gray-700">
              Copies Available
            </label>
            <input
              type="number"
              id="copiesAvailable"
              name="copiesAvailable"
              value={bookDetails.availableCopies}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
            </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
    </DashboardLayout>
  );
};

export default EditBookPage;
