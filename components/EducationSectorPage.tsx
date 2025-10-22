import React from 'react';
import KeyStats from './KeyStats';
import ClockIcon from './icons/ClockIcon';
import LocationPinIcon from './icons/LocationPinIcon';
import ScrollIcon from './icons/ScrollIcon';

const programs = [
    { name: 'Early Childhood Development (ECD)', description: 'Centers for children aged 3-6.' },
    { name: 'Primary Education', description: 'Full curriculum for grades 1-6.' },
    { name: 'Secondary Education', description: 'Comprehensive secondary schooling.' },
    { name: 'Adult Literacy Programs', description: 'Basic reading and writing classes for adults.' },
    { name: 'Vocational & Skills Training', description: 'Courses in IT, tailoring, and carpentry.' },
];

const EducationSectorPage: React.FC = () => {
  return (
    <div className="space-y-6">
        <p className="text-slate-600 dark:text-slate-400">
            Access to quality education for all ages is a cornerstone of our community. We offer a range of programs from early childhood to adult learning.
        </p>

        <KeyStats stats={[
            { label: 'Schools', value: '10' },
            { label: 'Students Enrolled', value: '18,000+' },
            { label: 'Teachers & Staff', value: '300+' },
            { label: 'Literacy Rate', value: '85%' },
        ]} />

        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <h3 className="font-bold text-lg mb-3">Educational Programs</h3>
            <ul className="space-y-3 list-disc list-inside">
                {programs.map(p => (
                    <li key={p.name}>
                        <span className="font-semibold">{p.name}:</span> {p.description}
                    </li>
                ))}
            </ul>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2 mb-2"><ClockIcon className="w-5 h-5"/> School Hours</h4>
                <p>Monday - Friday</p>
                <p>8:00 AM - 4:00 PM</p>
            </div>
             <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2 mb-2"><ScrollIcon className="w-5 h-5"/> Enrollment</h4>
                <p>Enrollment takes place at the start of each term. Visit the Education Office in Zone A for details.</p>
            </div>
        </div>
    </div>
  );
};
export default EducationSectorPage;