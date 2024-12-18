import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { useAuthStore } from '../store/authStore'; // Make sure to import your auth store

const AddBookPage = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    yearPublished: '',
    copiesAvailable: '',
    genre: ''
  });

  // Get token from auth store (replace with actual token store logic)
  const { token } = useAuthStore(); // Assuming your auth store holds the token

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the date to match the DATETIME format expected by the backend
    const formattedYear = new Date(bookData.yearPublished).toISOString();

    try {
      // Send the data to the backend via a POST request with Authorization header
      const response = await axios.post(
        'https://librarymanagementbe.azurewebsites.net/api/books',
        {
          title: bookData.title,
          author: bookData.author,
          yearPublished: formattedYear, // Ensure the date is in the correct format
          copiesAvailable: parseInt(bookData.copiesAvailable),
          genre: bookData.genre
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Add bearer token to the request headers
          }
        }
      );

      if (response.status === 200) {
        // Redirect to dashboard or books list after successful book creation
        navigate('/dashboard'); // Adjust this based on where you want to redirect
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Year Published */}
          <div className="mb-4">
            <label htmlFor="yearPublished" className="block text-sm font-medium text-gray-700">
              Date Published
            </label>
            <input
              type="datetime-local"
              id="yearPublished"
              name="yearPublished"
              value={bookData.yearPublished}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Copies Available */}
          <div className="mb-4">
            <label htmlFor="copiesAvailable" className="block text-sm font-medium text-gray-700">
              Copies Available
            </label>
            <input
              type="number"
              id="copiesAvailable"
              name="copiesAvailable"
              value={bookData.copiesAvailable}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Genre */}
          <div className="mb-4">
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={bookData.genre}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddBookPage;
