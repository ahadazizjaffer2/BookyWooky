// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { LoginForm } from './components/LoginForm';
// import { SignupForm } from './components/SignupForm';
// import { Dashboard } from './pages/Dashboard';
// import { AuthLayout } from './components/AuthLayout';
// import BookDetailsPage from './components/BookDetailsPage';
// import EditBookPage from './components/EditBookPage';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/signup" element={<SignupForm />} />
//         <Route
//           path="/dashboard"
//           element={
//             <AuthLayout>
//               <Dashboard />
//             </AuthLayout>
//           }
//         />
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/books/:bookId" element={<BookDetailsPage />} />
//         <Route path="/books/:bookId/edit" element={<EditBookPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { Dashboard } from './pages/Dashboard';
import { AuthLayout } from './components/AuthLayout';
import BookDetailsPage from './components/BookDetailsPage';
import EditBookPage from './components/EditBookPage';
import AddBookPage from './components/AddBookPage';
import { CreateLibrarian } from './components/CreateLibrarian';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/dashboard"
          element={
            <AuthLayout>
              <Dashboard />
            </AuthLayout>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/books/:bookId" element={<BookDetailsPage />} />
        <Route path="/books/:bookId/edit" element={<EditBookPage />} />
        <Route path="/books/add" element={<AddBookPage />} />
        <Route path="/admin/create-librarian" element={<CreateLibrarian />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;