import { useState } from 'react';
import { createCustomer, getCustomer, setCurrentUser } from '../storage';

export default function LoginPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    const existing = getCustomer(email);

    if (!isSignup) {
      // Login mode
      if (!existing) {
        setError('No account found with this email. Please sign up first!');
        return;
      }
      setCurrentUser(email);
      onLogin(existing);
      return;
    }

    // Signup mode
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (existing) {
      setError('An account with this email already exists. Try logging in!');
      return;
    }

    const customer = createCustomer({ email: email.trim(), name: name.trim() });
    if (!customer) {
      setError('Something went wrong. Please try again.');
      return;
    }

    setCurrentUser(email);
    onLogin(customer);
  };

  return (
    <div className="fade-in min-h-[60vh] flex flex-col justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="text-3xl mb-3">🌿</div>
          <h2
            className="font-serif text-3xl text-espresso mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Welcome to Olivetta
          </h2>
          <p className="text-espresso/50 text-sm">
            {isSignup
              ? 'Create your loyalty card to start collecting stamps'
              : 'Enter your email to access your loyalty card'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-espresso/70 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/30
                  text-espresso placeholder-espresso/30
                  focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive/50
                  transition-all"
                placeholder="Polet Pinones"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-espresso/70 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/30
                text-espresso placeholder-espresso/30
                focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive/50
                transition-all"
              placeholder="polet@email.com"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-semibold text-white text-base
              bg-terracotta hover:bg-terracotta-light transition-all
              hover:shadow-lg hover:shadow-terracotta/20
              active:scale-[0.98]"
          >
            {isSignup ? 'Create My Loyalty Card' : 'Access My Card'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
            }}
            className="text-sm text-olive hover:text-olive-dark transition-colors underline underline-offset-2"
          >
            {isSignup ? 'Already have a card? Log in' : "Don't have a card? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
