import React, { useState, useRef } from 'react';
import type { StreamingContent } from '../types';
import PlayCircleIcon from './icons/PlayCircleIcon';
import InfoIcon from './icons/InfoIcon';

interface MovieCardProps {
    item: StreamingContent;
    onWatchMovie: (movie: StreamingContent) => void;
    onWatchTrailer: (url: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, onWatchMovie, onWatchTrailer }) => {
    const [isHovered, setIsHovered] = useState(false);
    // FIX: Use ReturnType<typeof setTimeout> for browser compatibility instead of NodeJS.Timeout
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        timerRef.current = setTimeout(() => {
            setIsHovered(true);
        }, 500);
    };

    const handleMouseLeave = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setIsHovered(false);
    };

    return (
        <div 
            className="relative flex-shrink-0 w-[40vw] sm:w-48 md:w-56 aspect-[2/3] transition-transform duration-300 z-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1)', zIndex: isHovered ? 10 : 1 }}
        >
            <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover rounded-lg shadow-lg" />
            
            {item.isNew && !isHovered && (
                <div className="absolute top-2 right-2 bg-gold text-white text-xs font-bold px-2 py-1 rounded">NEW</div>
            )}

            {isHovered && (
                <div className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl shadow-navy/50 animate-fade-in">
                    <img src={item.posterUrl} alt="" className="absolute inset-0 w-full h-full object-cover blur-sm scale-110" />
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                    <div className="relative h-full flex flex-col justify-end p-3 text-white">
                        <h3 className="font-bold text-md leading-tight">{item.title}</h3>
                        <div className="text-xs text-slate-300 flex items-center gap-2 my-1">
                            <span>{item.year}</span>
                            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                            <span>{item.rating}</span>
                            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                            <span>{item.duration}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-3 my-2">{item.description}</p>
                        <div className="flex gap-2 mt-2">
                             <button onClick={() => onWatchMovie(item)} className="flex-1 flex items-center justify-center gap-1 bg-deep-red hover:bg-red-700 text-white font-bold py-2 px-2 rounded-md text-xs">
                                <PlayCircleIcon className="w-4 h-4"/> Play
                            </button>
                            <button onClick={() => onWatchTrailer(item.trailerUrl)} className="flex-1 flex items-center justify-center gap-1 bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-2 rounded-md text-xs">
                                <InfoIcon className="w-4 h-4"/> Trailer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieCard;