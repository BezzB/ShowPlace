import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../features/auth/AuthProvider';

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute; 