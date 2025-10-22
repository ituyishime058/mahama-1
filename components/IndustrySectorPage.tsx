import React from 'react';
import IndustryIcon from './icons/IndustryIcon';

const IndustrySectorPage: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <IndustryIcon className="w-12 h-12 text-blue-500" />
        <h2 className="text-3xl font-bold">Industry & Skills</h2>
      </div>
      <div className="space-y-4 prose dark:prose-invert max-w-none">
        <p>Developing local industry and vocational skills is crucial for long-term economic growth. Programs are designed to foster entrepreneurship and create employment opportunities within the community.</p>
        <h3 className="text-xl font-semibold">Key Areas:</h3>
        <ul>
            <li><strong>Vocational Training:</strong> Courses in tailoring, carpentry, welding, and ICT to equip individuals with marketable skills.</li>
            <li><strong>Small Business Incubation:</strong> Support for startups and small enterprises through mentorship and access to micro-finance.</li>
            <li><strong>Manufacturing:</strong> Promoting small-scale manufacturing of goods for local consumption and trade.</li>
        </ul>
      </div>
    </div>
  );
};

export default IndustrySectorPage;
