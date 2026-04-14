import { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { addStamp } from '../storage';

export default function StampPage({ user }) {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing');
  const [stampResult, setStampResult] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token !== 'OLIVETTA') {
      setStatus('invalid');
      return;
    }

    // Add stamp
    const result = addStamp(user.email);
    setStampResult(result);

    // Determine reward
    let reward = null;
    if (result.tier === 'tier1') {
      reward = 'tier1';
    } else if (result.tier === 'tier2') {
      reward = 'tier2';
    }

    // Redirect to card page with reward info
    const params = new URLSearchParams({ stampCount: String(result.newCount) });
    if (reward) {
      params.set('reward', reward);
    }
    setTimeout(() => {
      window.location.href = '/card?' + params.toString();
    }, 1200);
    setStatus('success');
  }, [searchParams, user.email]);

  if (status === 'invalid') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="text-4xl mb-4">❌</div>
        <h2
          className="font-serif text-2xl text-espresso mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Invalid Stamp Link
        </h2>
        <p className="text-espresso/50">Please scan the QR code at Olivetta Nail Studio.</p>
        <a href="/card" className="mt-4 text-olive underline underline-offset-2">
          Go to your card
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="animate-bounce text-5xl mb-4">🌿</div>
      <h2
        className="font-serif text-3xl text-espresso mb-2"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        Stamp Collected!
      </h2>
      <p className="text-espresso/50">Redirecting to your card...</p>
    </div>
  );
}
