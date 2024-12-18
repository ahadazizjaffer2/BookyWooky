import axios from 'axios';
import { useAuthStore } from '../store/authStore'; // Import the Zustand store

const API_URL = 'https://librarymanagementbe.azurewebsites.net/api/auth'; // API URL for login and signup

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
