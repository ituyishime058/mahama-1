
import React from 'react';
import type { StreamingContent } from '../types';
import { mockStreamingContent } from '../constants';
import SparklesIcon from './icons/SparklesIcon';

interface MoviePlayerPageProps {
  movie: StreamingContent;
  onClose: () => void;
  onWatchMovie: (movie: StreamingContent) => void;
  onDeepDive: (movie: StreamingContent) => void;
}

const MoviePlayerPage: React.FC<MoviePlayerPageProps> = ({ movie, onClose, onWatchMovie, onDeepDive }) => {
  const relatedMovies = mockStreamingContent.filter(m => m.id !== movie.id).slice(0, 4);

  return (
    <div>
      <button onClick={onClose} className="mb-4 text-sm font-semibold text-deep-red dark:text-gold hover:underline">
        &larr; Back to Home
      </button>

      <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-xl overflow-hidden">
        <div className="aspect-video bg-navy">
          <iframe
            src={movie.trailerUrl}
            title={movie.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="p-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{movie.title}</h1>
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 mb-4">
            <span>{movie.year}</span>
            <span>{movie.rating}</span>
            <span>{movie.duration}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {movie.description}
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => onDeepDive(movie)} className="flex items-center gap-2 bg-gold/20 hover:bg-gold/30 text-gold font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105 duration-300">
              <SparklesIcon className="w-6 h-6" /> AI Deep Dive
            </button>
          </div>
        </div>
      </div>
      
      {/* Related Movies Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-extrabold mb-4 border-l-4 border-gold pl-3">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedMovies.map(related => (
            <div key={related.id} className="group relative cursor-pointer" onClick={() => onWatchMovie(related)}>
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                <img 
                  src={related.posterUrl} 
                  alt={related.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-semibold mt-2 group-hover:underline">{related.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePlayerPage;
