import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/LoginPage" replace />;
}

export default ProtectedRoute;