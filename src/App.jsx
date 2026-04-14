import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCurrentUser } from './storage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import StampPage from './pages/StampPage';
import AdminPage from './pages/AdminPage';
import RewardModal from './components/RewardModal';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const current = getCurrentUser();
    if (current) setUser(current);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Header user={user} />
      <main className="max-w-md mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/card" replace />
              ) : (
                <LoginPage onLogin={setUser} />
              )
            }
          />
          <Route
            path="/card"
            element={
              user ? (
                <CardPage user={user} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/stamp"
            element={
              user ? (
                <StampPage user={user} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
