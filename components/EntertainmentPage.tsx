import React from 'react';
import ImageGallery from './ImageGallery';
import KeyStats from './KeyStats';

const EntertainmentPage: React.FC = () => {
  const stats = [
    { label: 'Local Artists', value: '50+' },
    { label: 'Performance Venues', value: '4' },
    { label: 'Annual Festivals', value: '3' },
    { label: 'Film Screenings', value: 'Weekly' },
  ];

  const images = [
    { src: 'https://picsum.photos/seed/ent1/600/400', caption: 'Live music performance at the community center.' },
    { src: 'https://picsum.photos/seed/ent2/600/400', caption: 'Outdoor movie night.' },
  ];
  
  const events = [
      { name: 'Open Mic Night', date: 'Every Friday, 7 PM', location: 'Community Center B' },
      { name: 'Outdoor Film Screening: "The Boy Who Harnessed the Wind"', date: 'Saturday, Oct 28th, 8 PM', location: 'Central Sports Field' },
      { name: 'Annual Arts & Crafts Fair', date: 'November 10th - 12th', location: 'Main Market Square' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Entertainment &amp; Arts</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Fostering creativity and providing recreational opportunities through music, film, theater, and visual arts programs.
      </p>
      
      <KeyStats stats={stats} />

      <h3 className="text-2xl font-bold mt-8 mb-4">Upcoming Events</h3>
      <div className="space-y-4 mb-6">
        {events.map(event => (
            <div key={event.name} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <h4 className="font-bold">{event.name}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{event.date} at {event.location}</p>
            </div>
        ))}
      </div>

      <ImageGallery images={images} />
    </div>
  );
};

export default EntertainmentPage;
