import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthProvider';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navigation from './components/common/Navigation';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import PricingPlans from './components/subscription/PricingPlans';
import LandingPage from './pages/LandingPage';
import Homecard from './components/pages/Home/Homecard';
import MovieDetails from './pages/MovieDetails';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="app">
            <Navigation />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Homecard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/pricing" element={<PricingPlans />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App; 