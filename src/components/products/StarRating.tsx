const StarRating = ({ rating = 0 }: { rating?: number }) => {
  const safeRating = Math.max(0, Math.min(rating, 5));

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = safeRating >= star;

        return (
          <svg key={star} width="18" height="18" viewBox="0 0 24 24">
            <path
              fill={filled ? "#f59e0b" : "#e5e7eb"}
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
