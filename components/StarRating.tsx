import React from 'react';

interface StarRatingProps {
    rating: number; // Rating should be a value between 0 and 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    // Ensure the rating is between 0 and 5
    const validatedRating = Math.max(0, Math.min(5, rating));

    const stars = Array.from({ length: 5 }, (_, index) => (
        <span key={index} style={{ color: index < validatedRating ? '#FFD700' : '#ccc', fontSize: '20px' }}>
            ★
        </span>
    ));

    return <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>{stars}</div>;
};

export default StarRating;
