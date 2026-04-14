import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../storage';

export default function Header({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full bg-cream border-b border-cream-dark/60">
      <div className="max-w-md mx-auto px-4 py-5 flex items-center justify-between">
        <Link to={user ? '/card' : '/'} className="no-underline">
          <h1
            className="font-serif text-4xl font-semibold text-terracotta tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.02em' }}
          >
            Olivetta
          </h1>
          <p className="text-xs text-olive mt-0.5 tracking-widest uppercase">Nail Studio</p>
        </Link>
        {user && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-espresso/50 hidden sm:inline">
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-terracotta hover:text-terracotta-light transition-colors px-2 py-1"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
