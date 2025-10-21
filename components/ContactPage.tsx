
import React from 'react';
import InfoPage from './InfoPage';

interface PageProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPage: React.FC<PageProps> = ({ isOpen, onClose }) => {
  return (
    <InfoPage isOpen={isOpen} title="Contact Us" onClose={onClose}>
      <p className="mb-4">We'd love to hear from you. Please direct your inquiries to the appropriate department below.</p>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold">General Inquiries</h3>
          <p>For general questions, feedback, or story tips, please email us at: <a href="mailto:contact@mahamanewshub.com" className="text-deep-red dark:text-gold hover:underline">contact@mahamanewshub.com</a></p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Press & Media</h3>
          <p>For all press and media-related inquiries, contact our communications team at: <a href="mailto:press@mahamanewshub.com" className="text-deep-red dark:text-gold hover:underline">press@mahamanewshub.com</a></p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Corrections</h3>
          <p>To report an error or request a correction, please reach out to our editorial team at: <a href="mailto:corrections@mahamanewshub.com" className="text-deep-red dark:text-gold hover:underline">corrections@mahamanewshub.com</a></p>
        </div>
      </div>
    </InfoPage>
  );
};

export default ContactPage;