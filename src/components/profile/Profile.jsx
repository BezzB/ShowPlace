import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../features/auth/AuthProvider';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar} alt="Profile" className="profile-avatar" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <span className={`subscription-badge ${user.premium ? 'premium' : 'basic'}`}>
            {user.premium ? 'Premium Member' : 'Basic Member'}
          </span>
        </div>
      </div>

      <div className="profile-content">
        <div className="section">
          <h3>Watch History</h3>
          <div className="watchlist">
            {user.watchlist.map(item => (
              <div key={item.id} className="watchlist-item">
                <span className="movie-title">{item.title}</span>
                <span className="watch-date">Last watched: {item.lastWatched}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Account Settings</h3>
          <div className="settings-options">
            <button className="settings-button">Edit Profile</button>
            <button className="settings-button">Change Password</button>
            <button className="settings-button premium-button">
              {user.premium ? 'Manage Subscription' : 'Upgrade to Premium'}
            </button>
            <button className="settings-button logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 