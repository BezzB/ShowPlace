import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthProvider';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import PricingPlans from './components/subscription/PricingPlans';
import LandingPage from './pages/LandingPage';
import Homecard from './components/pages/Home/Homecard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Homecard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pricing" element={<PricingPlans />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 