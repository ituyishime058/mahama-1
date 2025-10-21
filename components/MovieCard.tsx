import React, { useState, useRef, MouseEvent } from 'react';
import type { StreamingContent } from '../types';
import PlayCircleIcon from './icons/PlayCircleIcon';

const MovieCard: React.FC<{ item: StreamingContent; onWatchMovie: (movie: StreamingContent) => void; onWatchTrailer: (url: string) => void; }> = ({ item, onWatchMovie, onWatchTrailer }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        const rotateX = y * -15; // Max 15-degree rotation
        const rotateY = x * 15;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
        setIsHovered(false);
    };
    
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <div
            ref={cardRef}
            className="relative flex-shrink-0 w-full aspect-[2/3] transition-transform duration-300 ease-out group"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            {/* Main Poster Image */}
            <img 
                src={item.posterUrl} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                style={{ transform: 'translateZ(0px)' }}
            />
            
            {/* Glare Effect */}
            <div 
              className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden pointer-events-none"
              style={{ transform: 'translateZ(2px)' }}
            >
              <div className={`absolute top-0 left-0 w-1/2 h-full bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-glare-effect`} />
            </div>

            {item.isNew && !isHovered && (
                <div className="absolute top-2 right-2 bg-gold text-white text-xs font-bold px-2 py-1 rounded shadow-md" style={{ transform: 'translateZ(10px)' }}>NEW</div>
            )}
            
            {/* Hover Content */}
            <div 
                className={`absolute inset-0 flex flex-col justify-end p-3 text-white transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{ transform: 'translateZ(40px)' }} // Lift the content forward
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg"></div>
                <div className="relative z-10">
                    <h3 className="font-bold text-md leading-tight drop-shadow-lg">{item.title}</h3>
                    <div className="text-xs text-slate-300 my-1 drop-shadow-md">
                        <span>{item.year}</span> &bull; <span>{item.rating}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button onClick={() => onWatchMovie(item)} className="flex-1 flex items-center justify-center gap-1 bg-deep-red hover:bg-red-700 font-bold py-2 px-2 rounded-md text-xs">
                            <PlayCircleIcon className="w-4 h-4"/> Play
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;