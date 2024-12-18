// import { create } from 'zustand';

// // Define the Zustand store for managing authentication state
// export const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   role: null,
//   setAuth: (user, token, role) => set({ user, token, role }),
//   logout: () => set({ user: null, token: null, role: null }),
// }));

import { create } from 'zustand';

// Define the Zustand store for managing authentication state
export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,  // Load from localStorage on startup
  token: localStorage.getItem('token') || null,  // Load token from localStorage
  setAuth: (user, token) => {
    // Save to localStorage when setting authentication details
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },
  logout: () => {
    // Clear from localStorage and reset the store
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
