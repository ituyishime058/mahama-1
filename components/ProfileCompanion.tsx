import React from 'react';
import type { User } from '../types';
import CheckCircleIcon from './icons/CheckCircleIcon';
import HistoryIcon from './icons/HistoryIcon';

const ProfileCompanion: React.FC<{ user: User }> = ({ user }) => {
    const profileCompletion = 75; // Mock value
    return (
        <div className="p-6 rounded-lg bg-slate-100 dark:bg-slate-800/50 space-y-4 animate-fade-in">
            <h3 className="font-bold text-lg">Welcome back, {user.name.split(' ')[0]}!</h3>
            
            <div>
                <p className="text-sm font-semibold mb-1">Profile Completion</p>
                <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${profileCompletion}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">{profileCompletion}% complete. Consider adding more details!</p>
            </div>
            
             <div className="text-sm border-t border-slate-200 dark:border-slate-700 pt-4">
                <p className="font-semibold flex items-center gap-2"><HistoryIcon className="w-5 h-5 text-deep-red dark:text-gold" /> Quick Actions</p>
                <ul className="list-disc list-inside ml-2 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                    <li><button className="hover:underline">View your reading history</button></li>
                    <li><button className="hover:underline">Manage privacy settings</button></li>
                    <li><button className="hover:underline">Check billing</button></li>
                </ul>
            </div>
        </div>
    );
}

export default ProfileCompanion;
