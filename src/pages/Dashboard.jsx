import React from 'react';
import { useAuthStore } from '../store/authStore';
import { DashboardLayout } from '../components/DashboardLayout';
import { AdminDashboard } from '../components/dashboards/AdminDashboard';
import { LibrarianDashboard } from '../components/dashboards/LibrarianDashboard';
import { CustomerDashboard } from '../components/dashboards/CustomerDashboard';

export const Dashboard= () => {
  const { user } = useAuthStore();

  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'Admin':
        return <AdminDashboard />;
      case 'Librarian':
        return <LibrarianDashboard />;
      case 'Customer':
        return <CustomerDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return <DashboardLayout>{getDashboardComponent()}</DashboardLayout>;
};