export default function StampCircle({ filled, index, justAdded }) {
  return (
    <div
      className={`
        relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full
        transition-all duration-300
        ${filled
          ? 'bg-olive text-cream shadow-md'
          : 'border-2 border-olive/30 bg-cream/50'
        }
        ${justAdded ? 'stamp-animate' : ''}
      `}
    >
      {filled ? (
        <span className="text-xl sm:text-2xl">🌿</span>
      ) : (
        <span className="text-espresso/15 text-base font-serif">{index + 1}</span>
      )}
    </div>
  );
}
