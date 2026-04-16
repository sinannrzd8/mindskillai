import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
}

export default function RatingStars({ rating, size = 16, className = '' }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={`full-${index}`} className="text-yellow-500" width={size} height={size} />
      ))}
      {hasHalfStar ? <StarHalf className="text-yellow-500" width={size} height={size} /> : null}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} className="text-muted-foreground" width={size} height={size} />
      ))}
    </div>
  );
}
