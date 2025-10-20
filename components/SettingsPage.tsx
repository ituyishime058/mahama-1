import React, { useState } from 'react';
import type { Settings } from '../types';
import { TTS_VOICES, categories } from '../constants';

import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SparklesIcon from './icons/SparklesIcon';
import PaletteIcon from './icons/PaletteIcon';
import FontSizeIcon from './icons/FontSizeIcon';
import SansFontIcon from './icons/SansFontIcon';
import SerifFontIcon from './icons/SerifFontIcon';
import TrashIcon from './icons/TrashIcon';
import CrownIcon from './icons/CrownIcon';
import ProfileIcon from './icons/ProfileIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import SystemIcon from './icons/SystemIcon';
import ContentFilterIcon from './icons/ContentFilterIcon';
import LayoutStandardIcon from './icons/LayoutStandardIcon';
import LayoutDashboardIcon from './icons/LayoutDashboardIcon';
import NotificationIcon from './icons/NotificationIcon';
import SecurityIcon from './icons/SecurityIcon';
import ConfirmationModal from './ConfirmationModal';
import GoogleIcon from './icons/GoogleIcon';
import AppleIcon from './icons/AppleIcon';

interface SettingsPageProps {
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
  onClose: () => void;
  onClearBookmarks: () => void;
  onClearOffline: () => void;
  onManageSubscription: () => void;
}

const settingsNav = [
  { name: 'Appearance', icon: PaletteIcon },
  { name: 'Personalization', icon: ProfileIcon },
  { name: 'AI & Reading', icon: SparklesIcon },
  { name: 'Notifications', icon: NotificationIcon },
  { name: 'Account', icon: CrownIcon },
  { name: 'Security', icon: SecurityIcon },
  { name: 'Data & Privacy', icon: ShieldCheckIcon },
];

const ToggleSwitch: React.FC<{label: string, enabled: boolean, onChange: (enabled: boolean) => void, isPremium?: boolean, userIsPremium?: boolean}> = ({ label, enabled, onChange, isPremium=false, userIsPremium=false }) => (
    <div className="flex justify-between items-center py-4">
        <label className="font-semibold flex items-center gap-2">
            {label}
            {isPremium && !userIsPremium && <CrownIcon className="w-4 h-4 text-gold"/>}
        </label>
        <button
            onClick={() => (isPremium && !userIsPremium) ? null : onChange(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-deep-red' : 'bg-slate-300 dark:bg-slate-600'} ${(isPremium && !userIsPremium) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={(isPremium && !userIsPremium)}
        >
            <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
        </button>
    </div>
);

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onSettingsChange, onClose, onClearBookmarks, onClearOffline, onManageSubscription }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState('Appearance');
  const [confirmClear, setConfirmClear] = useState<'bookmarks' | 'offline' | null>(null);
  
  const handleSettingChange = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };
  
  const isPremium = localSettings.subscriptionTier === 'Premium';

  const handleContentPreferenceToggle = (categoryName: string) => {
    const currentPrefs = localSettings.contentPreferences;
    const newPrefs = currentPrefs.includes(categoryName)
      ? currentPrefs.filter(c => c !== categoryName)
      : [...currentPrefs, categoryName];
    handleSettingChange('contentPreferences', newPrefs);
  };

  const handleClear = (type: 'bookmarks' | 'offline') => {
    if (type === 'bookmarks') onClearBookmarks();
    if (type === 'offline') onClearOffline();
    setConfirmClear(null);
  };

  const handleNotificationChange = (key: keyof Settings['notificationPreferences']) => {
    handleSettingChange('notificationPreferences', {
      ...localSettings.notificationPreferences,
      [key]: !localSettings.notificationPreferences[key],
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Appearance':
        return (
          <div className="space-y-8 animate-fade-in">
            <h3 className="text-2xl font-bold">Appearance</h3>
            <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <label className="font-semibold mb-2 sm:mb-0">Theme</label>
                  <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                    <button onClick={() => handleSettingChange('theme', 'light')} className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${localSettings.theme === 'light' ? 'bg-white dark:bg-slate-800 shadow' : ''}`}><SunIcon className="w-5 h-5"/>Light</button>
                    <button onClick={() => handleSettingChange('theme', 'dark')} className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${localSettings.theme === 'dark' ? 'bg-navy shadow text-white' : ''}`}><MoonIcon className="w-5 h-5"/>Dark</button>
                    <button onClick={() => handleSettingChange('theme', 'system')} className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${localSettings.theme === 'system' ? 'bg-white dark:bg-slate-800 shadow' : ''}`}><SystemIcon className="w-5 h-5"/>System</button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <label htmlFor="font-size" className="font-semibold flex items-center gap-2"><FontSizeIcon /> Font Size</label>
                  <div className='flex items-center gap-4 w-1/2'>
                    <input type="range" id="font-size" min="14" max="20" step="1" value={localSettings.fontSize} onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value, 10))} className="w-full" />
                    <span className="font-bold">{localSettings.fontSize}px</span>
                  </div>
                </div>
                 <div className="flex justify-between items-center">
                  <label className="font-semibold">Font Family</label>
                  <div className="flex items-center gap-2 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                    <button onClick={() => handleSettingChange('fontFamily', 'sans')} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${localSettings.fontFamily === 'sans' ? 'bg-white dark:bg-navy shadow' : ''}`}><SansFontIcon /> Sans-serif</button>
                    <button onClick={() => handleSettingChange('fontFamily', 'serif')} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${localSettings.fontFamily === 'serif' ? 'bg-white dark:bg-navy shadow' : ''}`}><SerifFontIcon /> Serif</button>
                  </div>
                </div>
            </div>
          </div>
        );
      case 'Personalization':
        return (
            <div className="space-y-8 animate-fade-in">
                <h3 className="text-2xl font-bold">Personalization</h3>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-6">
                    <div>
                        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2"><ContentFilterIcon/> Content Preferences</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Select your favorite topics to personalize your "For You" feed.</p>
                        <div className="flex flex-wrap gap-2">
                            {categories.filter(c => c.name !== 'For You' && c.name !== 'All').map(cat => (
                                <button key={cat.name} onClick={() => handleContentPreferenceToggle(cat.name)} className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${localSettings.contentPreferences.includes(cat.name) ? 'bg-deep-red text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-3">Homepage Layout</h4>
                        <div className="grid grid-cols-2 gap-4">
                           <button onClick={() => handleSettingChange('homepageLayout', 'Standard')} className={`p-4 border-2 rounded-lg text-center transition-colors ${localSettings.homepageLayout === 'Standard' ? 'border-deep-red bg-red-50 dark:bg-red-900/20' : 'border-slate-300 dark:border-slate-700 hover:border-deep-red'}`}>
                                <LayoutStandardIcon className="w-16 h-16 mx-auto text-slate-400"/>
                                <p className="font-semibold mt-2">Standard</p>
                           </button>
                            <button onClick={() => handleSettingChange('homepageLayout', 'Dashboard')} className={`p-4 border-2 rounded-lg text-center transition-colors ${localSettings.homepageLayout === 'Dashboard' ? 'border-deep-red bg-red-50 dark:bg-red-900/20' : 'border-slate-300 dark:border-slate-700 hover:border-deep-red'}`}>
                                <LayoutDashboardIcon className="w-16 h-16 mx-auto text-slate-400"/>
                                <p className="font-semibold mt-2">Dashboard</p>
                           </button>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-1 divide-y divide-slate-200 dark:divide-slate-700">
                    <h4 className="font-semibold text-lg mb-2">Homepage Sections</h4>
                    <ToggleSwitch label="Show Mahama 360°" enabled={localSettings.showMahama360} onChange={(val) => handleSettingChange('showMahama360', val)} />
                    <ToggleSwitch label="Show News Map" enabled={localSettings.showNewsMap} onChange={(val) => handleSettingChange('showNewsMap', val)} />
                    <ToggleSwitch label="Show Data Insights" enabled={localSettings.showDataInsights} onChange={(val) => handleSettingChange('showDataInsights', val)} />
                    <ToggleSwitch label="Show Innovation Timeline" enabled={localSettings.showInnovationTimelines} onChange={(val) => handleSettingChange('showInnovationTimelines', val)} />
                </div>
            </div>
        );
      case 'AI & Reading':
        return (
            <div className="space-y-8 animate-fade-in">
                <h3 className="text-2xl font-bold">AI & Reading</h3>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-4 divide-y divide-slate-200 dark:divide-slate-700">
                    <div className="flex justify-between items-center pt-4 first:pt-0">
                        <label className="font-semibold">AI Model Preference</label>
                        <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                            <button onClick={() => handleSettingChange('aiModelPreference', 'Speed')} className={`px-3 py-1.5 rounded-full text-sm font-semibold ${localSettings.aiModelPreference === 'Speed' ? 'bg-white dark:bg-navy shadow' : ''}`}>Speed</button>
                            <button onClick={() => isPremium && handleSettingChange('aiModelPreference', 'Quality')} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${localSettings.aiModelPreference === 'Quality' ? 'bg-white dark:bg-navy shadow' : ''} ${!isPremium ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!isPremium}>
                                Quality {!isPremium && <CrownIcon className="w-4 h-4 text-gold"/>}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <label className="font-semibold">AI Summary Length</label>
                        <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                            <button onClick={() => handleSettingChange('summaryLength', 'short')} className={`px-3 py-1.5 rounded-full text-sm font-semibold ${localSettings.summaryLength === 'short' ? 'bg-white dark:bg-navy shadow' : ''}`}>Short</button>
                            <button onClick={() => handleSettingChange('summaryLength', 'medium')} className={`px-3 py-1.5 rounded-full text-sm font-semibold ${localSettings.summaryLength === 'medium' ? 'bg-white dark:bg-navy shadow' : ''}`}>Medium</button>
                            <button onClick={() => handleSettingChange('summaryLength', 'long')} className={`px-3 py-1.5 rounded-full text-sm font-semibold ${localSettings.summaryLength === 'long' ? 'bg-white dark:bg-navy shadow' : ''}`}>Long</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <label className="font-semibold">Text-to-Speech Voice</label>
                        <select
                            value={localSettings.ttsVoice}
                            onChange={(e) => handleSettingChange('ttsVoice', e.target.value as Settings['ttsVoice'])}
                            className="p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600 font-semibold max-w-[50%]"
                        >
                            {TTS_VOICES.map(voice => (<option key={voice.value} value={voice.value}>{voice.name}</option>))}
                        </select>
                    </div>
                    <ToggleSwitch label="Interactive Glossary" enabled={localSettings.interactiveGlossary} onChange={(val) => handleSettingChange('interactiveGlossary', val)} />
                </div>
            </div>
        );
      case 'Notifications':
        return (
            <div className="space-y-8 animate-fade-in">
                <h3 className="text-2xl font-bold">Notifications</h3>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-1 divide-y divide-slate-200 dark:divide-slate-700">
                    <h4 className="font-semibold text-lg mb-2">Push Notifications</h4>
                    <ToggleSwitch label="Breaking News Alerts" enabled={localSettings.notificationPreferences.breakingNews} onChange={() => handleNotificationChange('breakingNews')} />
                    <ToggleSwitch label="Daily Digest" enabled={localSettings.notificationPreferences.dailyDigest} onChange={() => handleNotificationChange('dailyDigest')} isPremium userIsPremium={isPremium}/>
                    <ToggleSwitch label="AI Recommendations" enabled={localSettings.notificationPreferences.aiRecommendations} onChange={() => handleNotificationChange('aiRecommendations')} isPremium userIsPremium={isPremium} />
                </div>
            </div>
        )
      case 'Account':
        return (
            <div className="space-y-8 animate-fade-in">
                <h3 className="text-2xl font-bold">Account</h3>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg flex items-center gap-6">
                    <img src="https://i.pravatar.cc/150?u=currentuser" alt="User" className="w-24 h-24 rounded-full"/>
                    <div>
                        <h4 className="text-xl font-bold">Eleanor Vance</h4>
                        <p className="text-slate-500">eleanor.v@example.com</p>
                        <div className="mt-2">
                             <span className={`px-3 py-1 text-sm font-bold rounded-full ${isPremium ? 'bg-gold/20 text-gold' : 'bg-slate-200 dark:bg-slate-700'}`}>{localSettings.subscriptionTier} Member</span>
                        </div>
                    </div>
                </div>
                 <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4">Connected Accounts</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                            <div className="flex items-center gap-3"><GoogleIcon className="w-6 h-6"/> <span className="font-semibold">Google</span></div>
                            <button className="text-sm font-semibold text-red-500 hover:underline">Disconnect</button>
                        </div>
                         <div className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                            <div className="flex items-center gap-3"><AppleIcon className="w-6 h-6 text-black dark:text-white"/> <span className="font-semibold">Apple</span></div>
                            <button className="text-sm font-semibold text-red-500 hover:underline">Disconnect</button>
                        </div>
                    </div>
                 </div>
                 <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                    <button onClick={onManageSubscription} className="w-full text-center py-3 bg-deep-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
                        Manage Subscription
                    </button>
                 </div>
            </div>
        );
      case 'Security':
        return (
            <div className="space-y-8 animate-fade-in">
                <h3 className="text-2xl font-bold">Security</h3>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-1 divide-y divide-slate-200 dark:divide-slate-700">
                    <ToggleSwitch label="Two-Factor Authentication" enabled={false} onChange={() => {}} />
                    <div className="py-4">
                        <h4 className="font-semibold">Password</h4>
                        <button className="mt-2 text-sm font-semibold text-deep-red dark:text-gold hover:underline">Change Password</button>
                    </div>
                    <div className="py-4">
                        <h4 className="font-semibold">Login History</h4>
                        <button className="mt-2 text-sm font-semibold text-deep-red dark:text-gold hover:underline">View Recent Activity</button>
                    </div>
                </div>
            </div>
        );
      case 'Data & Privacy':
        return (
            <div className="space-y-8 animate-fade-in">
                <h3 className="text-2xl font-bold">Data & Privacy</h3>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage your locally stored data. These actions cannot be undone.</p>
                    <button onClick={() => setConfirmClear('bookmarks')} className="w-full flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                        <span className="font-semibold">Clear All Bookmarks</span>
                        <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                    <button onClick={() => setConfirmClear('offline')} className="w-full flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                        <span className="font-semibold">Clear All Offline Articles</span>
                        <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy dark:to-slate-900 overflow-y-auto animate-fade-in">
        <style>{`
          .settings-gradient-bg {
             background: linear-gradient(-45deg, #0a192f, #1e293b, #b91c1c, #d97706);
             background-size: 400% 400%;
             animation: gradient-shift 15s ease infinite;
          }
        `}</style>
        <div className="container mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Settings</h1>
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-3 bg-deep-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">Save & Close</button>
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <aside className="md:col-span-1">
                <nav className="space-y-2 sticky top-8">
                    {settingsNav.map(item => {
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
        <ConfirmationModal 
            isOpen={!!confirmClear}
            onClose={() => setConfirmClear(null)}
            onConfirm={() => handleClear(confirmClear!)}
            title={`Clear All ${confirmClear === 'bookmarks' ? 'Bookmarks' : 'Offline Articles'}?`}
            message="This action is permanent and cannot be undone. Are you sure you want to proceed?"
        />
    </div>
  );
};

export default SettingsPage;