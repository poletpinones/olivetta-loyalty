import { useState, useEffect } from 'react';

const REWARDS = {
  tier1: {
    title: '🌿 You Unlocked a Reward!',
    discount: '10% OFF',
    bonus: 'Free 10-minute massage',
    description: 'Thank you for your loyalty! Show this at checkout.',
    color: 'olive',
  },
  tier2: {
    title: '✨ Amazing! Top Reward Unlocked!',
    discount: '20% OFF',
    bonus: 'Free 15-minute massage',
    description: "You're our VIP! Show this at checkout for your full reward.",
    color: 'terracotta',
  },
};

export default function RewardModal({ tier, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (tier) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [tier]);

  if (!tier || !REWARDS[tier]) return null;

  const reward = REWARDS[tier];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4
        transition-all duration-500
        ${visible ? 'bg-black/40 backdrop-blur-sm' : 'bg-transparent pointer-events-none'}
      `}
      onClick={onDismiss}
    >
      <div
        className={`
          relative w-full max-w-sm rounded-2xl p-8 shadow-2xl
          bg-white text-center reward-glow
          transition-all duration-500
          ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}
        `}
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <div className="text-5xl mb-4">
          {tier === 'tier1' ? '🌿' : '✨'}
        </div>
        <h2
          className="font-serif text-2xl font-semibold text-espresso mb-3"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {reward.title}
        </h2>
        <div
          className={`
            inline-block px-6 py-2 rounded-full text-lg font-semibold mb-4
            ${tier === 'tier1'
              ? 'bg-olive/10 text-olive-dark'
              : 'bg-terracotta/10 text-terracotta'
            }
          `}
        >
          {reward.discount}
        </div>
        <p className="font-semibold text-espresso mb-1">{reward.bonus}</p>
        <p className="text-sm text-espresso/60 mb-6">{reward.description}</p>
        <button
          onClick={onDismiss}
          className={`
            w-full py-3 rounded-xl font-semibold text-white tracking-wide
            transition-transform hover:scale-[1.02] active:scale-[0.98]
            ${tier === 'tier1'
              ? 'bg-olive hover:bg-olive-dark'
              : 'bg-terracotta hover:bg-terracotta-light'
            }
          `}
        >
          Wonderful!
        </button>
      </div>
    </div>
  );
}
