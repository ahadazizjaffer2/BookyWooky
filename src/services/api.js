// import axios from 'axios';

// const API_URL = 'https://librarymanagementbe.azurewebsites.net/api'; // Replace with your actual API URL

// const api = axios.create({
//   baseURL: API_URL,
// });

// export const authService = {
//   login: async (credentials) => {
//     // This is a mock implementation. Replace with actual API call
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         // Simulating the response structure
//         const response = {
//           token: 'mock-jwt-token',  // Mock token
//           userId: 5,               // Example user ID
//           role: 'Customer',        // Role is directly received in response
//         };

//         resolve(response);  // Resolving the mock response
//       }, 1000);  // Simulate 1 second delay for the mock request
//     });
//   },

//   signup: async (credentials) => {
//     // This is a mock implementation. Replace with actual API call
//     return new Promise((resolve) => {
//       setTimeout(resolve, 1000);
//     });
//   },
// };


import axios from 'axios';
import { useAuthStore } from '../store/authStore'; // Import the Zustand store

const API_URL = 'https://127.0.0.1:7098/api/auth'; // API URL for login and signup

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*',
  },
});

export const authService = {
  // Login function
  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      const { token, userId, role } = response.data;

      useAuthStore.getState().setAuth({ user: { id: userId }, token, role });

      return response.data;  // Return the response data directly (contains token, userId, role)
    } catch (error) {
      throw new Error('Invalid credentials');  // Handle error if the login fails
    }
  },

  // Signup function
  signup: async (credentials) => {
    try {
      const response = await api.post('/signup', credentials);
      return response.data;  // Return the success message for signup
    } catch (error) {
      throw new Error('Error during signup');  // Handle error if signup fails
    }
  },
};
