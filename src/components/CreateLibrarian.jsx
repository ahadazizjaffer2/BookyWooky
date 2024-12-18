import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { DashboardLayout } from './DashboardLayout';

export const CreateLibrarian = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://librarymanagementbe.azurewebsites.net/api/users/create-librarian',
        { userName, email, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Librarian created successfully');
      navigate('/dashboard'); // Navigate back to the admin dashboard
    } catch (err) {
      console.error('Error creating librarian:', err);
      setError('Failed to create librarian. Please try again.');
    }
  };

  return (
    <DashboardLayout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Librarian</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {error && <p className="text-red-600">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">UserName</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Create Librarian
        </button>
      </form>
    </div>
    </DashboardLayout>
  );
};
