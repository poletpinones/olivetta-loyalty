import { useState, useEffect } from 'react';
import { getStamps } from '../storage';
import StampCircle from '../components/StampCircle';
import RewardModal from '../components/RewardModal';
import { useSearchParams } from 'react-router-dom';

const TOTAL_STAMPS = 10;

export default function CardPage({ user }) {
  const [searchParams] = useSearchParams();
  const [stamps, setStamps] = useState(0);
  const [rewardTier, setRewardTier] = useState(null);
  const [justStamp, setJustStamp] = useState(-1);

  useEffect(() => {
    setStamps(getStamps(user.email));
  }, [user.email]);

  // Handle reward redirect from stamp page
  useEffect(() => {
    const reward = searchParams.get('reward');
    const stampCount = searchParams.get('stampCount');
    if (reward && stampCount) {
      setStamps(parseInt(stampCount, 10));
      setRewardTier(reward);
      setJustStamp(parseInt(stampCount, 10) === 0 ? TOTAL_STAMPS - 1 : parseInt(stampCount, 10) - 1);
    }
  }, [searchParams]);

  const progress = (stamps / TOTAL_STAMPS) * 100;
  const nextRewardAt = stamps < 5 ? 5 : stamps < 10 ? 10 : null;
  const nextRewardLabel = stamps < 5 ? '10% off + free massage' : stamps < 10 ? '20% off + free massage' : null;
  const stampUntilNext = nextRewardAt ? nextRewardAt - stamps : 0;

  return (
    <div className="fade-in">
      <RewardModal tier={rewardTier} onDismiss={() => setRewardTier(null)} />

      {/* Greeting */}
      <div className="mb-8 text-center">
        <p className="text-espresso/50 text-sm uppercase tracking-wider mb-1">Loyalty Card</p>
        <h2
          className="font-serif text-3xl text-espresso"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Hi, {user.name.split(' ')[0]} ✨
        </h2>
      </div>

      {/* Stamp Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-espresso/50 uppercase tracking-wider font-medium">
            Your Stamps
          </span>
          <span className="text-sm font-semibold text-terracotta">
            {stamps} / {TOTAL_STAMPS}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-cream-dark rounded-full mb-6 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #8A9A5B, #C2714F)' }}
          />
        </div>

        {/* Stamp grid */}
        <div className="grid grid-cols-5 gap-3 sm:gap-4 justify-items-center mb-6">
          {Array.from({ length: TOTAL_STAMPS }, (_, i) => (
            <StampCircle key={i} index={i} filled={i < stamps} justAdded={i === justStamp} />
          ))}
        </div>

        {/* Next reward hint */}
        {stampUntilNext > 0 && stamps > 0 && (
          <p className="text-center text-sm text-espresso/40">
            {stampUntilNext} more to unlock{' '}
            <span className="text-olive font-medium">{nextRewardLabel}</span>
          </p>
        )}
      </div>

      {/* Reward milestones */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div
          className={`rounded-2xl p-5 text-center transition-all ${
            stamps >= 5
              ? 'bg-olive/10 border border-olive/20 reward-glow'
              : 'bg-white/60 border border-cream-dark'
          }`}
        >
          <div className="text-2xl mb-2">{stamps >= 5 ? '🏆' : '🎁'}</div>
          <p
            className="font-serif text-lg text-espresso font-semibold"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Stamp 5
          </p>
          <p className="text-xs text-espresso/50 mt-1">10% off + free 10 min massage</p>
          {stamps >= 5 && (
            <span className="inline-block mt-2 text-xs text-olive font-semibold">✓ Unlocked</span>
          )}
        </div>
        <div
          className={`rounded-2xl p-5 text-center transition-all ${
            stamps >= 10
              ? 'bg-terracotta/10 border border-terracotta/20 reward-glow'
              : 'bg-white/60 border border-cream-dark'
          }`}
        >
          <div className="text-2xl mb-2">👑</div>
          <p
            className="font-serif text-lg text-espresso font-semibold"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Stamp 10
          </p>
          <p className="text-xs text-espresso/50 mt-1">20% off + free 15 min massage</p>
          {stamps >= 10 && (
            <span className="inline-block mt-2 text-xs text-terracotta font-semibold">✓ Unlocked</span>
          )}
        </div>
      </div>

      {/* Card reset notice */}
      {stamps === 0 && (
        <div className="bg-olive/5 border border-olive/15 rounded-xl p-4 text-center mb-6">
          <p className="text-sm text-olive-dark">
            🌿 <strong>Card complete!</strong> Your rewards are active. New cycle started — start stamping again!
          </p>
        </div>
      )}
    </div>
  );
}
