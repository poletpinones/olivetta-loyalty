import { useState, useEffect } from 'react';
import { getAllCustomerSnapshots, addStampForCustomer, getCustomers, saveCustomers, getStamps } from '../storage';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (authenticated) {
      loadCustomers();
    }
  }, [authenticated]);

  const loadCustomers = () => {
    const data = getAllCustomerSnapshots();
    // Sort by most recent visit first
    data.sort((a, b) => b.lastVisit - a.lastVisit);
    setCustomers(data);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === 'OLIVETTA2024') {
      setAuthenticated(true);
    } else {
      setPinError('Incorrect PIN');
      setPinInput('');
    }
  };

  const handleAddStamp = (email) => {
    addStampForCustomer(email);
    // Update local state
    setCustomers((prev) =>
      prev.map((c) =>
        c.email === email ? { ...c, stamps: getStamps(email) } : c
      )
    );
  };

  const handleResetCustomer = (email) => {
    localStorage.setItem('olivetta_stamps_' + email, '0');
    localStorage.removeItem('olivetta_reward_showed_' + email + '_tier1');
    localStorage.removeItem('olivetta_reward_showed_' + email + '_tier2');
    loadCustomers();
  };

  const handleDeleteCustomer = (email) => {
    if (!confirm(`Delete ${email}? This cannot be undone.`)) return;
    const customers = getCustomers();
    delete customers[email];
    saveCustomers(customers);
    localStorage.removeItem('olivetta_stamps_' + email);
    localStorage.removeItem('olivetta_reward_showed_' + email + '_tier1');
    localStorage.removeItem('olivetta_reward_showed_' + email + '_tier2');
    loadCustomers();
  };

  if (!authenticated) {
    return (
      <div className="fade-in min-h-[60vh] flex flex-col justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xs mx-auto">
          <div className="text-center mb-6">
            <div className="text-3xl mb-3">🔐</div>
            <h2
              className="font-serif text-2xl text-espresso mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Admin Access
            </h2>
            <p className="text-espresso/50 text-sm">Enter your PIN to continue</p>
          </div>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError('');
              }}
              className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/30
                text-espresso text-center tracking-widest text-lg
                focus:outline-none focus:ring-2 focus:ring-azure/50 focus:border-azure/50
                transition-all"
              placeholder="• • • • • • • • • • • •"
              autoFocus
            />
            {pinError && (
              <p className="text-sm text-red-600 text-center">{pinError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white
                bg-azure hover:bg-azure/90 transition-all active:scale-[0.98]"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="font-serif text-3xl text-espresso"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Admin Panel
          </h2>
          <p className="text-espresso/50 text-sm mt-1">
            {customers.length} customer{customers.length !== 1 ? 's' : ''} registered
          </p>
        </div>
        <button
          onClick={() => setAuthenticated(false)}
          className="text-xs text-olive underline underline-offset-2"
        >
          Lock
        </button>
      </div>

      {customers.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <div className="text-4xl mb-3">🌿</div>
          <p className="text-espresso/50">No customers yet. They'll appear here when they sign up.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {customers.map((customer) => (
            <div
              key={customer.email}
              className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-espresso truncate">{customer.name}</p>
                <p className="text-sm text-espresso/50 truncate">{customer.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${i < customer.stamps ? 'text-olive' : 'text-espresso/10'}`}
                    >
                      🌿
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <span className="text-lg font-bold text-terracotta w-8 text-center">
                  {customer.stamps}
                </span>
                <button
                  onClick={() => handleAddStamp(customer.email)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold
                    bg-olive/10 text-olive-dark hover:bg-olive/20 transition-colors
                    disabled:opacity-50"
                  disabled={customer.stamps >= 10}
                >
                  + Stamp
                </button>
                <button
                  onClick={() => handleResetCustomer(customer.email)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold
                    bg-azure/10 text-azure hover:bg-azure/20 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customer.email)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold
                    bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
