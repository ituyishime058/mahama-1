import React, { useMemo, useState } from 'react';
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

const GenreFilter: React.FC<{ genres: string[]; selectedGenre: string; onSelectGenre: (genre: string) => void; }> = ({ genres, selectedGenre, onSelectGenre }) => {
    return (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 pb-4">
            {genres.map(genre => (
                <button
                    key={genre}
                    onClick={() => onSelectGenre(genre)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                        selectedGenre === genre
                            ? 'bg-deep-red text-white'
                            : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                    }`}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
};

const Carousel: React.FC<{ title: string; items: StreamingContent[]; onWatchMovie: (movie: StreamingContent) => void; onWatchTrailer: (url: string) => void; }> = ({ title, items, onWatchMovie, onWatchTrailer }) => {
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
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6">
                {title}
            </h2>
            <div className="relative group/carousel">
                <div ref={scrollRef} className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    {items.map(item => (
                        <div key={item.id} className="group/card flex-shrink-0 w-[40vw] sm:w-48 md:w-56" >
                            <div className="relative cursor-pointer aspect-[2/3] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-gold/20" onClick={() => onWatchMovie(item)}>
                                <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                    <h3 className="text-white font-bold text-md leading-tight">{item.title}</h3>
                                    <div className="text-xs text-slate-300 flex items-center gap-2">
                                        <span>{item.year}</span>
                                        <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                                        <span>{item.rating}</span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-black/60">
                                    <PlayCircleIcon className="w-16 h-16 text-white/80" />
                                </div>
                                {item.isNew && (
                                    <div className="absolute top-2 right-2 bg-gold text-white text-xs font-bold px-2 py-1 rounded">NEW</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => scroll('left')} aria-label="Scroll left" className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 z-10 hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                    <ChevronLeftIcon className="w-6 h-6"/>
                </button>
                <button onClick={() => scroll('right')} aria-label="Scroll right" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 z-10 hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity">
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
    const [selectedGenre, setSelectedGenre] = useState('All');

    const genres = useMemo(() => ['All', ...Array.from(new Set(mockStreamingContent.map(item => item.genre)))], []);

    const filteredContent = useMemo(() => {
        if (selectedGenre === 'All') return mockStreamingContent;
        return mockStreamingContent.filter(item => item.genre === selectedGenre);
    }, [selectedGenre]);

    const trending = useMemo(() => filteredContent.filter(item => item.isTrending).sort((a,b) => b.id - a.id), [filteredContent]);
    const newReleases = useMemo(() => filteredContent.filter(item => item.isNew).sort((a,b) => b.id - a.id), [filteredContent]);
    const awardWinners = useMemo(() => filteredContent.filter(item => item.isAwardWinner).sort((a,b) => b.id - a.id), [filteredContent]);
    const scifi = useMemo(() => filteredContent.filter(item => item.genre === 'Sci-Fi'), [filteredContent]);
    const action = useMemo(() => filteredContent.filter(item => item.genre === 'Action'), [filteredContent]);
    const drama = useMemo(() => filteredContent.filter(item => item.genre === 'Drama'), [filteredContent]);
    
    const featuredMovie = mockStreamingContent.find(m => m.id === 1) || mockStreamingContent[0]; // Feature Dune 2

    return (
        <div className="space-y-12 animate-fade-in text-white">
            <div className="relative rounded-lg overflow-hidden aspect-video group -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 mb-8" >
                <img src="https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg" alt={featuredMovie.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/50 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-center sm:justify-end p-4 sm:p-8 md:p-12">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold max-w-2xl">{featuredMovie.title}</h1>
                    <p className="max-w-xl mt-4 text-slate-300 hidden md:block text-lg">{featuredMovie.description}</p>
                    <div className="mt-6 flex gap-4">
                        <button onClick={() => onWatchMovie(featuredMovie)} className="flex items-center gap-2 bg-deep-red hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition-transform transform hover:scale-105 duration-300">
                            <PlayCircleIcon className="w-6 h-6"/> <span className="text-sm sm:text-base">Play</span>
                        </button>
                        <button onClick={() => onWatchTrailer(featuredMovie.trailerUrl)} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition-transform transform hover:scale-105 duration-300">
                            <InfoIcon className="w-6 h-6"/> <span className="text-sm sm:text-base">More Info</span>
                        </button>
                    </div>
                </div>
            </div>

            <GenreFilter genres={genres} selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} />

            <Carousel title="Trending Now" items={trending} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
            <Carousel title="New Releases" items={newReleases} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
            <Carousel title="Award Winners" items={awardWinners} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
            
            {selectedGenre === 'All' && (
                <>
                    <Carousel title="Sci-Fi Universe" items={scifi} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
                    <Carousel title="Action & Adventure" items={action} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
                    <Carousel title="Critically Acclaimed Dramas" items={drama} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
                </>
            )}
        </div>
    );
};

export default MoviesTVPage;