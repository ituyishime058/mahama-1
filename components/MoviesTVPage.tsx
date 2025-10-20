import React, { useMemo } from 'react';
import type { StreamingContent } from '../types';
import { mockStreamingContent } from '../constants';
import PlayCircleIcon from './icons/PlayCircleIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface MoviesTVPageProps {
  onWatchMovie: (movie: StreamingContent) => void;
}

const Carousel: React.FC<{ title: string; items: StreamingContent[]; onWatchMovie: (movie: StreamingContent) => void }> = ({ title, items, onWatchMovie }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section>
            <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
                {title}
            </h2>
            <div className="relative">
                <div ref={scrollRef} className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                    {items.map(item => (
                        <div key={item.id} className="flex-shrink-0 w-48 md:w-56" onClick={() => onWatchMovie(item)}>
                            <div className="group relative cursor-pointer aspect-[2/3] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                                <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                                    <PlayCircleIcon className="w-16 h-16 text-white/80" />
                                </div>
                                </div>
                                {item.isNew && (
                                    <div className="absolute top-2 right-2 bg-gold text-white text-xs font-bold px-2 py-1 rounded">NEW</div>
                                )}
                            </div>
                            <h3 className="text-white font-bold text-md leading-tight mt-2 truncate group-hover:text-gold">{item.title}</h3>
                        </div>
                    ))}
                </div>
                <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 z-10 hidden md:block">
                    <ChevronLeftIcon className="w-6 h-6"/>
                </button>
                <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 z-10 hidden md:block">
                    <ChevronRightIcon className="w-6 h-6"/>
                </button>
            </div>
             <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
};


const MoviesTVPage: React.FC<MoviesTVPageProps> = ({ onWatchMovie }) => {

    const newTrailers = useMemo(() => mockStreamingContent.filter(item => item.isNew), []);
    const scifiContent = useMemo(() => mockStreamingContent.filter(item => item.genre === 'Sci-Fi' && !item.isNew), []);
    const actionContent = useMemo(() => mockStreamingContent.filter(item => item.genre === 'Action' && !item.isNew), []);
    const otherContent = useMemo(() => mockStreamingContent.filter(item => item.genre !== 'Sci-Fi' && item.genre !== 'Action' && !item.isNew), []);


  return (
    <div className="space-y-12 animate-fade-in">
      <Carousel title="New & Upcoming Trailers" items={newTrailers} onWatchMovie={onWatchMovie} />
      <Carousel title="Sci-Fi Universe" items={scifiContent} onWatchMovie={onWatchMovie} />
      <Carousel title="Action & Adventure" items={actionContent} onWatchMovie={onWatchMovie} />
      <Carousel title="More to Discover" items={otherContent} onWatchMovie={onWatchMovie} />
    </div>
  );
};

export default MoviesTVPage;
