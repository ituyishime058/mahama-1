import React from 'react';
import PhoneIcon from './icons/PhoneIcon';
import NewspaperIcon from './icons/NewspaperIcon';

const emergencyContacts = [
    { name: 'Camp Security', number: '111' },
    { name: 'Ambulance', number: '112' },
    { name: 'Fire Department', number: '113' },
    { name: 'Help Desk', number: '114' },
];

const announcements = [
    { title: 'New Vaccination Drive starting next week at all health posts.', date: 'Oct 25, 2023' },
    { title: 'Registration for vocational training in tailoring and IT is now open.', date: 'Oct 24, 2023' },
    { title: 'Water distribution schedule has been updated for Zone C.', date: 'Oct 23, 2023' },
];

const MahamaServicesAside: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-deep-red rounded-r-lg">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><PhoneIcon/> Emergency Contacts</h3>
                <ul className="space-y-2 text-sm">
                    {emergencyContacts.map(contact => (
                        <li key={contact.name} className="flex justify-between items-center">
                            <span className="font-semibold">{contact.name}</span>
                            <a href={`tel:${contact.number}`} className="font-bold text-deep-red dark:text-gold tracking-wider">{contact.number}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><NewspaperIcon/> Latest Announcements</h3>
                 <ul className="space-y-4">
                    {announcements.map(item => (
                        <li key={item.title} className="border-l-2 border-slate-200 dark:border-slate-700 pl-3">
                           <p className="font-semibold text-sm leading-tight">{item.title}</p>
                           <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.date}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MahamaServicesAside;