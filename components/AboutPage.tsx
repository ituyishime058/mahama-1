
import React from 'react';
import InfoPage from './InfoPage';
import { useTranslation } from '../hooks/useTranslation';

interface PageProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutPage: React.FC<PageProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  return (
    <InfoPage isOpen={isOpen} title={t('aboutUs')} onClose={onClose}>
      <p className="mb-4">Welcome to {t('logoText')}, where cutting-edge technology meets world-class journalism. Our mission is to provide fast, accurate, and deeply insightful news coverage to a global audience.</p>
      <p className="mb-4">Founded on the principles of integrity and innovation, we leverage the power of artificial intelligence to enhance our reporting, personalize your experience, and uncover the stories behind the headlines. From live breaking news to in-depth interactive features, we are redefining how news is consumed in the digital age.</p>
      <h3 className="text-2xl font-bold mt-6 mb-2">Our Vision</h3>
      <p>To be the most trusted and technologically advanced news source in the world, empowering our readers with knowledge and fostering a more informed global community.</p>
    </InfoPage>
  );
};

export default AboutPage;