import React, { useMemo } from 'react';
import type { StreamingContent } from '../types';
import { mockStreamingContent } from '../constants';
import PlayCircleIcon from './icons/PlayCircleIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import InfoIcon from './icons/InfoIcon';

interface MoviesTVPageProps {
  onWatchMovie: (movie: StreamingContent) => void;
  onWatchTrailer: (url: string) => void;
}

const Carousel: React.FC<{ title: string; items: StreamingContent[]; onWatchMovie: (movie: StreamingContent) => void; onWatchTrailer: (url: string) => void; }> = ({ title, items, onWatchMovie, onWatchTrailer }) => {
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
            <h2 className="text-3xl font-extrabold mb-6">
                {title}
            </h2>
            <div className="relative group/carousel">
                <div ref={scrollRef} className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                    {items.map(item => (
                        <div key={item.id} className="group/card flex-shrink-0 w-40 sm:w-48 md:w-56" >
                            <div className="relative cursor-pointer aspect-[2/3] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-gold/20" onClick={() => onWatchMovie(item)}>
                                <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-black/60">
                                    <PlayCircleIcon className="w-16 h-16 text-white/80" />
                                </div>
                                </div>
                                {item.isNew && (
                                    <div className="absolute top-2 right-2 bg-gold text-white text-xs font-bold px-2 py-1 rounded">NEW</div>
                                )}
                            </div>
                            <h3 className="text-white font-bold text-md leading-tight mt-2 truncate group-hover/card:text-gold">{item.title}</h3>
                             <button onClick={(e) => { e.stopPropagation(); onWatchTrailer(item.trailerUrl); }} className="text-sm text-slate-400 hover:text-white transition-colors">Watch Trailer</button>
                        </div>
                    ))}
                </div>
                <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 z-10 hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                    <ChevronLeftIcon className="w-6 h-6"/>
                </button>
                <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 z-10 hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity">
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


const MoviesTVPage: React.FC<MoviesTVPageProps> = ({ onWatchMovie, onWatchTrailer }) => {

    const newTrailers = useMemo(() => mockStreamingContent.filter(item => item.isNew).sort((a,b) => b.id - a.id), []);
    const scifiContent = useMemo(() => mockStreamingContent.filter(item => item.genre === 'Sci-Fi' && !item.isNew), []);
    const actionContent = useMemo(() => mockStreamingContent.filter(item => item.genre === 'Action' && !item.isNew), []);
    const dramaContent = useMemo(() => mockStreamingContent.filter(item => item.genre === 'Drama' && !item.isNew), []);
    const historyContent = useMemo(() => mockStreamingContent.filter(item => item.genre === 'History' && !item.isNew), []);
    
    const featuredMovie = mockStreamingContent.find(m => m.id === 1) || mockStreamingContent[0]; // Feature Dune 2

  return (
    <div className="space-y-12 animate-fade-in text-white">
        <div className="relative rounded-lg overflow-hidden aspect-video group -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 mb-8" >
            <img src="https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg" alt={featuredMovie.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                <h1 className="text-4xl md:text-6xl font-extrabold max-w-2xl">{featuredMovie.title}</h1>
                <p className="max-w-xl mt-4 text-slate-300 hidden md:block">{featuredMovie.description}</p>
                <div className="mt-6 flex gap-4">
                     <button onClick={() => onWatchMovie(featuredMovie)} className="flex items-center gap-2 bg-deep-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105 duration-300">
                        <PlayCircleIcon className="w-6 h-6"/> Play
                    </button>
                    <button onClick={() => onWatchTrailer(featuredMovie.trailerUrl)} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105 duration-300">
                        <InfoIcon className="w-6 h-6"/> Watch Trailer
                    </button>
                </div>
            </div>
        </div>
      <Carousel title="New & Upcoming" items={newTrailers} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
      <Carousel title="Sci-Fi Universe" items={scifiContent} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
      <Carousel title="Action & Adventure" items={actionContent} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
      <Carousel title="Critically Acclaimed Dramas" items={dramaContent} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
      <Carousel title="Historical Epics" items={historyContent} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
    </div>
  );
};

export default MoviesTVPage;
