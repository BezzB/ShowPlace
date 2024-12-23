import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../features/auth/AuthProvider';

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="main-nav">
      <div className="nav-left">
        <Link to="/" className="logo">ShowPlace</Link>
        {user && (
          <>
            <Link to="/home">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/tv-shows">TV Shows</Link>
          </>
        )}
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <Link to="/profile" className="profile-link">
              <img src={user.avatar} alt="Profile" className="nav-avatar" />
            </Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navigation; 