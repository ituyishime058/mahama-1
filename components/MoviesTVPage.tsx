import React from 'react';
import type { StreamingContent } from '../types';
import { mockStreamingContent } from '../constants';
import PlayCircleIcon from './icons/PlayCircleIcon';

interface MoviesTVPageProps {
  onWatchMovie: (movie: StreamingContent) => void;
}

const MovieCard: React.FC<{ item: StreamingContent; onWatchMovie: (movie: StreamingContent) => void; }> = ({ item, onWatchMovie }) => (
    <div className="group relative flex-shrink-0 w-full rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
        <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
        <button 
            onClick={() => onWatchMovie(item)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50"
        >
            <PlayCircleIcon className="w-16 h-16 text-white/80" />
        </button>
        </div>
    </div>
);

const MoviesTVPage: React.FC<MoviesTVPageProps> = ({ onWatchMovie }) => {
  const newTrailers = mockStreamingContent.filter(item => item.isNew);
  const otherContent = mockStreamingContent.filter(item => !item.isNew);

  return (
    <div className="space-y-12">
      {/* New Trailers Section */}
      <section>
        <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
          New Trailers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {newTrailers.map(item => (
            <div key={item.id} className="aspect-[2/3]">
                <MovieCard item={item} onWatchMovie={onWatchMovie} />
            </div>
          ))}
        </div>
      </section>
      
      {/* All Content Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-slate-400 pl-4">
          All Movies & TV
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {otherContent.map(item => (
             <div key={item.id} className="aspect-[2/3]">
                <MovieCard item={item} onWatchMovie={onWatchMovie} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MoviesTVPage;