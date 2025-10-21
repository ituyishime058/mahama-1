
import React from 'react';
import InfoPage from './InfoPage';

interface PageProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvertisePage: React.FC<PageProps> = ({ isOpen, onClose }) => {
  return (
    <InfoPage isOpen={isOpen} title="Advertise with Us" onClose={onClose}>
      <p className="mb-4">Partner with Mahama News Hub to connect with a global audience of engaged, influential, and tech-savvy readers. Our platform offers a unique opportunity to showcase your brand alongside premium, trusted news content.</p>
      
      <h3 className="text-2xl font-bold mt-6 mb-2">Our Offerings</h3>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li><strong>Sponsored Content:</strong> Collaborate with our in-house studio to create compelling stories that resonate with our audience.</li>
        <li><strong>Premium Display Ads:</strong> High-impact, non-intrusive ad placements across our digital properties.</li>
        <li><strong>Podcast & Video Sponsorship:</strong> Integrate your brand into our popular audio and video programming.</li>
        <li><strong>Event Partnerships:</strong> Align your brand with our exclusive events and summits.</li>
      </ul>

      <p>To learn more about our advertising solutions and to request a media kit, please contact our sales team at <a href="mailto:advertise@mahamanewshub.com" className="text-deep-red dark:text-gold hover:underline">advertise@mahamanewshub.com</a>.</p>
    </InfoPage>
  );
};

export default AdvertisePage;