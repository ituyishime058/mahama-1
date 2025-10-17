import React, { useState } from 'react';
import type { Settings, Theme, FontFamily, AiSummaryLength, AiTtsVoice } from '../types';
import { categories, LANGUAGES } from '../constants';
import CloseIcon from './icons/CloseIcon';
import PaletteIcon from './icons/PaletteIcon';
import FontSizeIcon from './icons/FontSizeIcon';
import NotificationIcon from './icons/NotificationIcon';
import DataIcon from './icons/DataIcon';
import SparklesIcon from './icons/SparklesIcon';
import TranslateIcon from './icons/TranslateIcon';
import ContentFilterIcon from './icons/ContentFilterIcon';

interface SettingsPageProps {
  settings: Settings;
  onSettingsChange: (newSettings: Partial<Settings>) => void;
  onClose: () => void;
  onClearBookmarks: () => void;
  onClearOfflineArticles: () => void;
}

type SettingsTab = 'Appearance' | 'Content' | 'Language' | 'AI Features' | 'Data';

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onSettingsChange, onClose, onClearBookmarks, onClearOfflineArticles }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('Appearance');

  const handleCategoryToggle = (category: string) => {
    const newHidden = settings.hiddenCategories.includes(category)
      ? settings.hiddenCategories.filter(c => c !== category)
      : [...settings.hiddenCategories, category];
    onSettingsChange({ hiddenCategories: newHidden });
  };
  
  const NavItem: React.FC<{ tab: SettingsTab, icon: React.ReactNode, label: string }> = ({ tab, icon, label }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 w-full p-3 rounded-lg text-left font-semibold transition-colors ${activeTab === tab ? 'bg-deep-red/10 text-deep-red dark:bg-gold/10 dark:text-gold' : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-navy">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-navy/80 backdrop-blur-sm shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Settings</h1>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <CloseIcon />
                </button>
            </div>
        </header>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <aside className="md:col-span-1">
                    <nav className="space-y-2 p-4 bg-white dark:bg-slate-800/50 rounded-lg">
                        <NavItem tab="Appearance" icon={<PaletteIcon className="w-5 h-5"/>} label="Appearance" />
                        <NavItem tab="Content" icon={<ContentFilterIcon className="w-5 h-5"/>} label="Content Preferences" />
                        <NavItem tab="Language" icon={<TranslateIcon className="w-5 h-5"/>} label="Language" />
                        <NavItem tab="AI Features" icon={<SparklesIcon className="w-5 h-5"/>} label="AI Features" />
                        <NavItem tab="Data" icon={<DataIcon className="w-5 h-5"/>} label="Data Management" />
                    </nav>
                </aside>

                <div className="md:col-span-3">
                    <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-sm p-6">
                        {activeTab === 'Appearance' && (
                            <div className="space-y-6">
                               <h2 className="text-xl font-bold">Appearance</h2>
                               {/* Theme setting, Font Size etc. */}
                            </div>
                        )}
                        {activeTab === 'Content' && (
                            <div className="space-y-4">
                               <h2 className="text-xl font-bold">Content Preferences</h2>
                               <p className="text-sm text-slate-500">Hide categories you're not interested in from the "All" feed.</p>
                               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                                   {categories.map(cat => (
                                       <label key={cat} className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg cursor-pointer">
                                           <input type="checkbox" checked={!settings.hiddenCategories.includes(cat)} onChange={() => handleCategoryToggle(cat)} className="form-checkbox h-5 w-5 rounded text-deep-red focus:ring-deep-red/50" />
                                           <span className="font-semibold">{cat}</span>
                                       </label>
                                   ))}
                               </div>
                            </div>
                        )}
                         {activeTab === 'Language' && (
                            <div className="space-y-4">
                               <h2 className="text-xl font-bold">Language Settings</h2>
                               <p className="text-sm text-slate-500">Choose the default language for AI article translations.</p>
                               <select value={settings.language} onChange={e => onSettingsChange({ language: e.target.value })} className="w-full max-w-sm p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600">
                                   {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                               </select>
                            </div>
                        )}
                        {activeTab === 'AI Features' && (
                             <div className="space-y-6">
                               <h2 className="text-xl font-bold">AI Features</h2>
                               <div>
                                   <label className="font-semibold">Summary Length</label>
                                   <p className="text-sm text-slate-500">Set the default length for AI-generated article summaries.</p>
                                   <div className="flex gap-2 mt-2">
                                       {(['Short', 'Medium', 'Detailed'] as AiSummaryLength[]).map(len => (
                                           <button key={len} onClick={() => onSettingsChange({ aiSummaryLength: len })} className={`px-4 py-2 text-sm font-semibold rounded-full ${settings.aiSummaryLength === len ? 'bg-deep-red text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{len}</button>
                                       ))}
                                   </div>
                               </div>
                               <div>
                                   <label className="font-semibold">Text-to-Speech Voice</label>
                                    <p className="text-sm text-slate-500">Select your preferred voice for the "Read Aloud" feature.</p>
                                   <select value={settings.aiTtsVoice} onChange={e => onSettingsChange({ aiTtsVoice: e.target.value as AiTtsVoice })} className="w-full max-w-sm p-2 mt-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600">
                                       {(['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'] as AiTtsVoice[]).map(voice => <option key={voice} value={voice}>{voice}</option>)}
                                   </select>
                               </div>
                            </div>
                        )}
                        {activeTab === 'Data' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold">Data Management</h2>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold">Clear Bookmarks</h3>
                                        <p className="text-sm text-slate-500">Permanently remove all your saved bookmarks.</p>
                                    </div>
                                    <button onClick={onClearBookmarks} className="mt-2 sm:mt-0 px-4 py-2 bg-red-100 text-deep-red font-semibold rounded-md text-sm hover:bg-red-200">Clear</button>
                                </div>
                                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold">Clear Offline Articles</h3>
                                        <p className="text-sm text-slate-500">Permanently remove all articles saved for offline reading.</p>
                                    </div>
                                    <button onClick={onClearOfflineArticles} className="mt-2 sm:mt-0 px-4 py-2 bg-red-100 text-deep-red font-semibold rounded-md text-sm hover:bg-red-200">Clear</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
};

export default SettingsPage;