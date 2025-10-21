import React, { useMemo, useState } from 'react';
import type { StreamingContent } from '../types';
import { mockStreamingContent } from '../constants';
import PlayCircleIcon from './icons/PlayCircleIcon';
import InfoIcon from './icons/InfoIcon';
import Carousel from './Carousel';
import AdjustmentsHorizontalIcon from './icons/AdjustmentsHorizontalIcon';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import ArrowDownUpIcon from './icons/ArrowDownUpIcon';


interface MoviesTVPageProps {
  onWatchMovie: (movie: StreamingContent) => void;
  onWatchTrailer: (url: string) => void;
}

const FilterControls: React.FC<{
    genres: string[];
    filters: { genre: string; year: string; sortBy: string; };
    onFilterChange: (filters: { genre?: string; year?: string; sortBy?: string; }) => void;
    onClear: () => void;
}> = ({ genres, filters, onFilterChange, onClear }) => {
    
    const Dropdown: React.FC<{ icon: React.ReactNode; value: string; options: string[]; onChange: (value: string) => void }> = ({ icon, value, options, onChange }) => {
        return (
            <div className="relative">
                <select 
                    value={value} 
                    onChange={e => onChange(e.target.value)}
                    className="appearance-none w-full sm:w-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:bg-slate-700/70 text-white font-semibold py-2 pl-10 pr-4 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
                >
                    {options.map(opt => <option key={opt} value={opt} className="bg-navy text-white font-semibold">{opt}</option>)}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    {icon}
                </div>
            </div>
        );
    };

    const yearOptions = ['All Years', 'Latest Releases', '2020s', '2010s', '2000s', 'Older'];
    const sortOptions = ['Popularity', 'Newest First', 'A-Z'];

    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center mb-8">
            <Dropdown icon={<AdjustmentsHorizontalIcon className="w-5 h-5"/>} value={filters.genre} options={['All Genres', ...genres]} onChange={val => onFilterChange({ genre: val })} />
            <Dropdown icon={<CalendarDaysIcon className="w-5 h-5"/>} value={filters.year} options={yearOptions} onChange={val => onFilterChange({ year: val })} />
            <Dropdown icon={<ArrowDownUpIcon className="w-5 h-5"/>} value={filters.sortBy} options={sortOptions} onChange={val => onFilterChange({ sortBy: val })} />
            <button onClick={onClear} className="text-sm font-semibold hover:underline text-slate-400">Clear</button>
        </div>
    );
};


const MoviesTVPage: React.FC<MoviesTVPageProps> = ({ onWatchMovie, onWatchTrailer }) => {
    const [filters, setFilters] = useState({ genre: 'All Genres', year: 'All Years', sortBy: 'Popularity' });

    const genres = useMemo(() => [...Array.from(new Set(mockStreamingContent.map(item => item.genre)))], []);

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({...prev, ...newFilters}));
    };
    
    const clearFilters = () => setFilters({ genre: 'All Genres', year: 'All Years', sortBy: 'Popularity' });

    const filteredContent = useMemo(() => {
        return mockStreamingContent
            .filter(item => {
                return filters.genre === 'All Genres' || item.genre === filters.genre;
            })
            .filter(item => {
                if (filters.year === 'All Years' || filters.year === 'Latest Releases') return true;
                if (filters.year === '2020s') return item.year >= 2020;
                if (filters.year === '2010s') return item.year >= 2010 && item.year < 2020;
                if (filters.year === '2000s') return item.year >= 2000 && item.year < 2010;
                if (filters.year === 'Older') return item.year < 2000;
                return true;
            })
            .sort((a, b) => {
                if (filters.sortBy === 'Newest First') return b.year - a.year;
                if (filters.sortBy === 'A-Z') return a.title.localeCompare(b.title);
                // Default is 'Popularity', which we'll base on the 'isTrending' flag and original order
                if (a.isTrending && !b.isTrending) return -1;
                if (!a.isTrending && b.isTrending) return 1;
                return a.id - b.id;
            });
    }, [filters]);
    
    const trending = useMemo(() => filteredContent.filter(item => item.isTrending).sort((a,b) => b.id - a.id), [filteredContent]);
    const newReleases = useMemo(() => filteredContent.filter(item => item.isNew || (filters.year === 'Latest Releases' && item.year >= 2023)).sort((a,b) => b.year - a.year || b.id - a.id), [filteredContent, filters.year]);
    const awardWinners = useMemo(() => filteredContent.filter(item => item.isAwardWinner).sort((a,b) => b.id - a.id), [filteredContent]);
    
    const featuredMovie = mockStreamingContent.find(m => m.id === 1) || mockStreamingContent[0];

    return (
        <div className="animate-fade-in text-white -mx-4 sm:-mx-6 lg:-mx-8 bg-gradient-to-b from-navy via-slate-900 to-black">
            <div className="relative rounded-lg overflow-hidden aspect-video group mb-8" >
                <div 
                    className="absolute inset-0 bg-cover animate-hero-bg-parallax" 
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg)`}}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/50 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-center sm:justify-end p-4 sm:p-8 md:p-12">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold max-w-2xl drop-shadow-lg">{featuredMovie.title}</h1>
                    <p className="max-w-xl mt-4 text-slate-300 hidden md:block text-lg drop-shadow-md">{featuredMovie.description}</p>
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

            <div className="px-4 sm:px-6 lg:px-8 space-y-12">
                <FilterControls genres={genres} filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} />

                {filteredContent.length > 0 ? (
                    <>
                        <Carousel title="Trending Now" items={trending} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
                        <Carousel title="New Releases" items={newReleases} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
                        <Carousel title="Award Winners" items={awardWinners} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
                        <Carousel title="Browse All" items={filteredContent} onWatchMovie={onWatchMovie} onWatchTrailer={onWatchTrailer} />
                    </>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-bold">No Results Found</h3>
                        <p className="text-slate-400 mt-2">Try adjusting your filters or clearing them to see more content.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoviesTVPage;
