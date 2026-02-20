import React from 'react';

const SkeletonCard = () => (
    <div className="movie-card-custom skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
    </div>
);

const Skeleton = () => {
    return (
        <div className="movies">
            {[...Array(8)].map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
};

export { Skeleton };