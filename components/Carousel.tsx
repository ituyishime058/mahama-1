import React from 'react';
import type { StreamingContent } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import MovieCard from './MovieCard';

interface CarouselProps {
    title: string;
    items: StreamingContent[];
    onWatchMovie: (movie: StreamingContent) => void;
    onWatchTrailer: (url: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({ title, items, onWatchMovie, onWatchTrailer }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (items.length === 0) return null;

    return (
        <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-white">
                {title}
            </h2>
            <div className="relative group/carousel">
                <div ref={scrollRef} className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                    {items.map(item => (
                        <div key={item.id} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 flex-shrink-0">
                            <MovieCard 
                                item={item}
                                onWatchMovie={onWatchMovie}
                                onWatchTrailer={onWatchTrailer}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={() => scroll('left')} aria-label="Scroll left" className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 z-10 hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                    <ChevronLeftIcon className="w-6 h-6 text-white"/>
                </button>
                <button onClick={() => scroll('right')} aria-label="Scroll right" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 z-10 hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                    <ChevronRightIcon className="w-6 h-6 text-white"/>
                </button>
            </div>
             <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
};

export default Carousel;