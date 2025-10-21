
import React from 'react';
import InfoPage from './InfoPage';

interface PageProps {
  isOpen: boolean;
  onClose: () => void;
}

const CareersPage: React.FC<PageProps> = ({ isOpen, onClose }) => {
  return (
    <InfoPage isOpen={isOpen} title="Careers at Mahama News Hub" onClose={onClose}>
      <p className="mb-4">Join a team that's at the forefront of media innovation. At Mahama News Hub, we are a diverse group of passionate journalists, engineers, designers, and data scientists dedicated to building the future of news.</p>
      <h3 className="text-2xl font-bold mt-6 mb-2">Why Work With Us?</h3>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li><strong>Impact:</strong> Shape how millions of people understand the world.</li>
        <li><strong>Innovation:</strong> Work with cutting-edge AI and interactive storytelling tools.</li>
        <li><strong>Growth:</strong> We invest in our people with continuous learning and development opportunities.</li>
        <li><strong>Culture:</strong> A collaborative, fast-paced, and mission-driven environment.</li>
      </ul>
      <p>We are always looking for talented individuals to join our team. Please check our open listings or send your resume to <a href="mailto:careers@mahamanewshub.com" className="text-deep-red dark:text-gold hover:underline">careers@mahamanewshub.com</a>.</p>
    </InfoPage>
  );
};

export default CareersPage;