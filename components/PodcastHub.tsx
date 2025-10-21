import React from 'react';
import type { Podcast } from '../types';
import PlayIcon from './icons/PlayIcon';
import { useTranslation } from '../hooks/useTranslation';

interface PodcastHubProps {
  podcasts: Podcast[];
}

const PodcastCard: React.FC<{ podcast: Podcast, onPlay: () => void }> = ({ podcast, onPlay }) => (
  <div className={`group bg-slate-200/50 dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row items-center gap-5 p-5 relative`}>
    <img src={podcast.imageUrl} alt={podcast.title} className="w-full md:w-32 h-32 object-cover rounded-md" />
    <div className="flex-1">
      <p className="text-xs font-semibold uppercase text-gold">{`Ep. ${podcast.episode} | ${podcast.duration}`}</p>
      <h3 className="text-lg font-bold my-1 leading-tight group-hover:text-deep-red dark:group-hover:text-gold transition-colors duration-200">
        <a href="#">{podcast.title}</a>
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
        {podcast.excerpt}
      </p>
    </div>
    <button onClick={onPlay} className="bg-deep-red text-white p-4 rounded-full transition-transform transform group-hover:scale-110 z-10 w-16 h-16 flex items-center justify-center">
      <PlayIcon className="w-6 h-6" />
    </button>
  </div>
)

const PodcastHub: React.FC<PodcastHubProps> = ({ podcasts }) => {
  const { t } = useTranslation();
  return (
    <section className="my-16">
      <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
        {t('podcastHub')}
      </h2>
      <div className="grid grid-cols-1 gap-8">
        {podcasts.map(podcast => (
          <PodcastCard 
            key={podcast.id} 
            podcast={podcast}
            onPlay={() => { /* Logic to be handled by parent */ }}
          />
        ))}
      </div>
    </section>
  );
};

export default PodcastHub;