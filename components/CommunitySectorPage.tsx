import React from 'react';
import KeyStats from './KeyStats';
import UsersIcon from './icons/UsersIcon';
import LocationPinIcon from './icons/LocationPinIcon';

const groups = [
    { name: "Women's Empowerment Group", description: 'Provides support, skills training, and advocacy for women.' },
    { name: 'Youth Sports League', description: 'Organizes football, basketball, and volleyball competitions.' },
    { name: 'Farming Cooperatives', description: 'Supports local farmers with resources and market access.' },
    { name: 'Cultural Performance Troupes', description: 'Preserves and promotes traditional dance and music.' },
];

const CommunitySectorPage: React.FC = () => {
  return (
    <div className="space-y-6">
        <p className="text-slate-600 dark:text-slate-400">
            A vibrant community is built on connection and collaboration. Discover the various groups and associations that bring people together in Mahama.
        </p>

        <KeyStats stats={[
            { label: 'Registered Groups', value: '45' },
            { label: 'Active Members', value: '3,000+' },
        ]} />

        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><UsersIcon/> Featured Groups</h3>
            <ul className="space-y-3 list-disc list-inside">
                {groups.map(g => (
                    <li key={g.name}>
                        <span className="font-semibold">{g.name}:</span> {g.description}
                    </li>
                ))}
            </ul>
        </div>

        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <h4 className="font-semibold flex items-center gap-2 mb-2"><LocationPinIcon/> Community Center</h4>
            <p>The main Community Center is located in Zone C and is open daily from 9 AM to 6 PM. It serves as a meeting point for many groups and events.</p>
        </div>
    </div>
  );
};
export default CommunitySectorPage;