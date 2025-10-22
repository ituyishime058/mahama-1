import React from 'react';
import ImageGallery from './ImageGallery';
import KeyStats from './KeyStats';

const SportsPage: React.FC = () => {
  const stats = [
    { label: 'Sports Teams', value: '20+' },
    { label: 'Pitches & Courts', value: '8' },
    { label: 'Main Sports', value: 'Football, Basketball' },
    { label: 'Annual Tournaments', value: '5' },
  ];

  const images = [
    { src: 'https://picsum.photos/seed/sport1/600/400', caption: 'A local football match underway.' },
    { src: 'https://picsum.photos/seed/sport2/600/400', caption: 'Youth basketball training session.' },
  ];

  const fixtures = [
      { sport: 'Football', match: 'Zone A Lions vs. Zone B Tigers', date: 'Oct 29, 4 PM' },
      { sport: 'Basketball', match: 'Youth League Finals', date: 'Nov 5, 2 PM' },
      { sport: 'Volleyball', match: 'Women\'s Tournament Begins', date: 'Nov 11, 9 AM' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Sports &amp; Recreation</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Promoting physical health, teamwork, and community spirit through organized sports leagues, tournaments, and recreational activities for all ages.
      </p>
      
      <KeyStats stats={stats} />

      <h3 className="text-2xl font-bold mt-8 mb-4">Upcoming Match Fixtures</h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                    <th className="p-3">Sport</th>
                    <th className="p-3">Match</th>
                    <th className="p-3">Date & Time</th>
                </tr>
            </thead>
            <tbody>
                {fixtures.map(fix => (
                    <tr key={fix.match} className="border-b dark:border-slate-700">
                        <td className="p-3 font-semibold">{fix.sport}</td>
                        <td className="p-3">{fix.match}</td>
                        <td className="p-3">{fix.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      
      <ImageGallery images={images} />
    </div>
  );
};

export default SportsPage;
