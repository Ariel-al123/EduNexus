// Modifica el archivo ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = sessionStorage.getItem('userRole');

  if (!userRole) {
    return <Navigate to="/Login/login" replace />;
  }

  if (userRole !== allowedRole) {
    return <Navigate to="/Login/login" replace />;
  }

  return children;
};

export default ProtectedRoute;