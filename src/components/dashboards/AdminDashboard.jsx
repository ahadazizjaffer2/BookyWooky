
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('https://librarymanagementbe.azurewebsites.net/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error('API response is not an array', response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://librarymanagementbe.azurewebsites.net/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(user => user.id !== userId)); // Remove user from state
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Navigate to create librarian page
  const handleCreateLibrarian = () => {
    navigate('/admin/create-librarian');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* User Management Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <button
          onClick={handleCreateLibrarian}
          className="mb-4 bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create Librarian
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto ">
            <thead>
              <tr>
                <th className="px-4 py-2">UserName</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                {/* <th className="px-4 py-2">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 text-center">{user.userName}</td>
                  <td className="px-4 py-2 text-center">{user.email}</td>
                  <td className="px-4 py-2 text-center">{user.role}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-600 text-white py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
