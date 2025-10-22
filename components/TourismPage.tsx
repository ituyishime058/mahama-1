import React from 'react';
import TourismIcon from './icons/TourismIcon';

const TourismPage: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <TourismIcon className="w-12 h-12 text-amber-500" />
        <h2 className="text-3xl font-bold">Tourism & Culture</h2>
      </div>
      <div className="space-y-4 prose dark:prose-invert max-w-none">
        <p>The region boasts a rich cultural heritage and natural beauty, offering unique tourism opportunities. The focus is on community-based tourism that preserves culture and directly benefits local residents.</p>
        <h3 className="text-xl font-semibold">Key Areas:</h3>
        <ul>
            <li><strong>Cultural Experiences:</strong> Guided tours, traditional craft markets, and cultural performances that showcase local heritage.</li>
            <li><strong>Eco-Tourism:</strong> Nature walks, bird watching, and promoting the conservation of local landscapes.</li>
            <li><strong>Hospitality Training:</strong> Training programs for guest house management, tour guiding, and culinary arts.</li>
        </ul>
      </div>
    </div>
  );
};

export default TourismPage;
