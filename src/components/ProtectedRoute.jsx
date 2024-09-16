import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { useGlobalContext } from '../hooks/useAuth';
import Footer from './Footer';

const ProtectedRoute = ({ }) => {
    const { user } = useGlobalContext();
    console.log("user=", user);
    if (!user) {
      return <Navigate to="/" replace />;
    }
  
    return (
      <>
        <Outlet />;
        <Footer />
      </>
    ) 
  };

export default ProtectedRoute;
