import React, { useState } from 'react';
import type { Settings, User, Article } from '../types';

import CloseIcon from './icons/CloseIcon';
import ProfileIcon from './icons/ProfileIcon';
import BillingIcon from './icons/BillingIcon';
import HistoryIcon from './icons/HistoryIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import EditIcon from './icons/EditIcon';
import CrownIcon from './icons/CrownIcon';

interface ProfilePageProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUserChange: (newUser: User) => void;
  settings: Settings;
  onManageSubscription: () => void;
  readingHistory: Article[];
}

const navItems = [
  { name: 'Edit Profile', icon: ProfileIcon },
  { name: 'Subscription & Billing', icon: BillingIcon },
  { name: 'My Activity', icon: HistoryIcon },
  { name: 'Privacy', icon: ShieldCheckIcon },
];

const ToggleSwitch: React.FC<{label: string, enabled: boolean, onChange: (enabled: boolean) => void }> = ({ label, enabled, onChange }) => (
    <div className="flex justify-between items-center py-4">
        <label className="font-semibold flex items-center gap-2">{label}</label>
        <button
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-deep-red' : 'bg-slate-300 dark:bg-slate-600'}`}
        >
            <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
        </button>
    </div>
);

const ProfilePage: React.FC<ProfilePageProps> = ({ isOpen, onClose, user, onUserChange, settings, onManageSubscription, readingHistory }) => {
  const [localUser, setLocalUser] = useState(user);
  const [activeTab, setActiveTab] = useState('Edit Profile');

  const handleUserFieldChange = <K extends keyof User>(key: K, value: User[K]) => {
    setLocalUser(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveChanges = () => {
    onUserChange(localUser);
    // In a real app, you'd show a success toast
  };

  if (!isOpen) return null;
  
  const renderContent = () => {
    switch (activeTab) {
      case 'Edit Profile':
        return (
          <div className="space-y-8 animate-fade-in">
            <h3 className="text-2xl font-bold">Public Profile</h3>
            <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg flex items-center gap-6">
                <div className="relative group w-24 h-24 flex-shrink-0">
                    <img src={localUser.avatar} alt="User" className="w-24 h-24 rounded-full"/>
                    <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <EditIcon className="w-6 h-6"/>
                    </button>
                </div>
                <div>
                    <h4 className="text-xl font-bold">{localUser.name}</h4>
                    <p className="text-slate-500">@{localUser.handle}</p>
                    <p className="text-sm text-slate-500 mt-1">Joined on {new Date(localUser.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-4">
                <div>
                    <label htmlFor="name" className="text-sm font-semibold">Full Name</label>
                    <input type="text" id="name" value={localUser.name} onChange={(e) => handleUserFieldChange('name', e.target.value)} className="w-full p-2 mt-1 bg-slate-100 dark:bg-slate-800 rounded-lg"/>
                </div>
                 <div>
                    <label htmlFor="handle" className="text-sm font-semibold">Public Handle</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">@</span>
                        <input type="text" id="handle" value={localUser.handle} onChange={(e) => handleUserFieldChange('handle', e.target.value)} className="w-full p-2 pl-6 mt-1 bg-slate-100 dark:bg-slate-800 rounded-lg"/>
                    </div>
                </div>
                 <div>
                    <label htmlFor="bio" className="text-sm font-semibold">Bio</label>
                    <textarea id="bio" value={localUser.bio} onChange={(e) => handleUserFieldChange('bio', e.target.value)} rows={3} className="w-full p-2 mt-1 bg-slate-100 dark:bg-slate-800 rounded-lg"/>
                </div>
            </div>
          </div>
        );
       case 'Subscription & Billing':
        const isPremium = settings.subscriptionTier === 'Premium';
        return (
          <div className="space-y-8 animate-fade-in">
            <h3 className="text-2xl font-bold">Subscription & Billing</h3>
            <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-semibold text-lg">Current Plan</h4>
                        <div className="mt-1">
                            <span className={`px-3 py-1 text-sm font-bold rounded-full ${isPremium ? 'bg-gold/20 text-gold' : 'bg-slate-200 dark:bg-slate-700'}`}>{settings.subscriptionTier} Member</span>
                        </div>
                    </div>
                    {!isPremium && <button onClick={onManageSubscription} className="px-4 py-2 bg-deep-red text-white font-semibold rounded-lg hover:bg-red-700">Upgrade</button>}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                     {isPremium && (
                        <>
                             <div className="flex justify-between text-sm"><span className="text-slate-500">Next billing date</span><span className="font-semibold">Dec 12, 2024</span></div>
                             <div className="flex justify-between text-sm"><span className="text-slate-500">Payment Method</span><span className="font-semibold">Visa ending in 1234</span></div>
                        </>
                    )}
                    <div className="flex gap-4 pt-2">
                         <button className="text-sm font-semibold text-deep-red dark:text-gold hover:underline">View Billing History</button>
                         {isPremium && <button className="text-sm font-semibold text-slate-500 hover:underline">Cancel Subscription</button>}
                    </div>
                </div>
            </div>
          </div>
        );
      case 'My Activity':
         return (
            <div className="space-y-8 animate-fade-in">
                <h3 className="text-2xl font-bold">My Activity</h3>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4">Reading History</h4>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {readingHistory.map(article => (
                            <div key={article.id} className="flex items-start gap-4">
                                <img src={article.imageUrl} alt="" className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-semibold uppercase text-deep-red">{article.category}</p>
                                    <h5 className="font-semibold leading-tight hover:underline">{article.title}</h5>
                                    <p className="text-xs text-slate-500 mt-1">{article.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
         );
        case 'Privacy':
        return (
            <div className="space-y-8 animate-fade-in">
                <h3 className="text-2xl font-bold">Privacy</h3>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-1 divide-y divide-slate-200 dark:divide-slate-700">
                    <ToggleSwitch label="Public Profile" enabled={localUser.isProfilePublic} onChange={(val) => handleUserFieldChange('isProfilePublic', val)} />
                    <div className="py-4">
                        <p className="text-sm text-slate-500">When your profile is public, others can see your name, handle, bio, and activity. When private, this information is hidden.</p>
                    </div>
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy dark:to-slate-900 overflow-y-auto animate-fade-in">
        <div className="container mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Profile & Settings</h1>
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Close</button>
                    <button onClick={handleSaveChanges} className="px-6 py-3 bg-deep-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">Save Changes</button>
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <aside className="md:col-span-1">
                <nav className="space-y-2 sticky top-8">
                    {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.name;
                    return (
                        <button 
                        key={item.name} 
                        onClick={() => setActiveTab(item.name)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left font-semibold transition-all duration-200 transform ${
                            isActive 
                            ? 'bg-deep-red/10 text-deep-red dark:bg-gold/20 dark:text-gold scale-105' 
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:translate-x-1 text-slate-600 dark:text-slate-300'
                        }`}
                        >
                        <Icon className={`w-6 h-6 ${isActive ? '' : 'text-slate-500'}`} />
                        <span>{item.name}</span>
                        </button>
                    )
                    })}
                </nav>
                </aside>
                <main className="md:col-span-3">
                {renderContent()}
                </main>
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;