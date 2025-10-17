
import React from 'react';
import { mockStreamingContent } from '../constants';
import PlayCircleIcon from './icons/PlayCircleIcon';
import type { StreamingContent } from '../types';

interface NowStreamingProps {
    onWatchMovie: (movie: StreamingContent) => void;
}

const NowStreaming: React.FC<NowStreamingProps> = ({ onWatchMovie }) => {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
        Now Streaming
      </h2>
      <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {mockStreamingContent.map(item => (
          <div key={item.id} className="group relative flex-shrink-0 w-48 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
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
        ))}
      </div>
    </section>
  );
};

export default NowStreaming;
