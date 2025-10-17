import React, { useState } from 'react';
import type { Settings } from '../types';

import CloseIcon from './icons/CloseIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SparklesIcon from './icons/SparklesIcon';
import PaletteIcon from './icons/PaletteIcon';
import FontSizeIcon from './icons/FontSizeIcon';
import SansFontIcon from './icons/SansFontIcon';
import SerifFontIcon from './icons/SerifFontIcon';
import TrashIcon from './icons/TrashIcon';
import DataIcon from './icons/DataIcon';

interface SettingsPageProps {
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
  onClearBookmarks: () => void;
  onClearOffline: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onClose, settings, onSettingsChange, onClearBookmarks, onClearOffline }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSettingChange = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-100 dark:bg-navy text-slate-800 dark:text-slate-200 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl h-screen flex flex-col">
        <header className="flex items-center justify-between h-20 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
          <h1 className="text-3xl font-bold">Settings</h1>
          <button onClick={handleSave} className="px-4 py-2 bg-deep-red text-white rounded-lg font-semibold">Save & Close</button>
        </header>

        <main className="py-8 flex-grow overflow-y-auto">
          <div className="space-y-12">
            {/* Appearance Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><PaletteIcon /> Appearance</h2>
              <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-6">
                <div className="flex justify-between items-center">
                  <label className="font-semibold">Theme</label>
                  <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                    <button onClick={() => handleSettingChange('theme', 'light')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.theme === 'light' ? 'bg-white shadow' : ''}`}><SunIcon className="w-5 h-5 inline-block mr-1"/>Light</button>
                    <button onClick={() => handleSettingChange('theme', 'dark')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.theme === 'dark' ? 'bg-navy shadow text-white' : ''}`}><MoonIcon className="w-5 h-5 inline-block mr-1"/>Dark</button>
                    <button onClick={() => handleSettingChange('theme', 'system')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.theme === 'system' ? 'bg-white dark:bg-navy shadow' : ''}`}>System</button>
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
                    <button onClick={() => handleSettingChange('fontFamily', 'sans')} className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${localSettings.fontFamily === 'sans' ? 'bg-white dark:bg-navy shadow' : ''}`}><SansFontIcon /> Sans-serif</button>
                    <button onClick={() => handleSettingChange('fontFamily', 'serif')} className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${localSettings.fontFamily === 'serif' ? 'bg-white dark:bg-navy shadow' : ''}`}><SerifFontIcon /> Serif</button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Advanced Features Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><SparklesIcon className="text-gold" /> Advanced Features</h2>
              <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                    <label className="font-semibold">Homepage Layout</label>
                    <div className="flex items-center gap-2 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                        <button onClick={() => handleSettingChange('homepageLayout', 'Standard')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.homepageLayout === 'Standard' ? 'bg-white dark:bg-navy shadow' : ''}`}>Standard</button>
                        <button onClick={() => handleSettingChange('homepageLayout', 'Dashboard')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.homepageLayout === 'Dashboard' ? 'bg-white dark:bg-navy shadow' : ''}`}>Dashboard</button>
                    </div>
                </div>
                <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-4">
                    <label htmlFor="show-streaming" className="font-semibold">"Now Streaming" Carousel</label>
                    <input type="checkbox" id="show-streaming" checked={localSettings.showNowStreaming} onChange={e => handleSettingChange('showNowStreaming', e.target.checked)} className="h-6 w-6 rounded text-deep-red focus:ring-deep-red" />
                </div>
                <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-4">
                    <label htmlFor="show-timeline" className="font-semibold">"Innovation Timeline" in Tech</label>
                    <input type="checkbox" id="show-timeline" checked={localSettings.showInnovationTimelines} onChange={e => handleSettingChange('showInnovationTimelines', e.target.checked)} className="h-6 w-6 rounded text-deep-red focus:ring-deep-red" />
                </div>
              </div>
            </section>

             {/* Data Management Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><DataIcon /> Data Management</h2>
              <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-4">
                 <button onClick={onClearBookmarks} className="w-full flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30">
                    <span className="font-semibold">Clear All Bookmarks</span>
                    <TrashIcon className="w-5 h-5 text-red-500" />
                 </button>
                 <button onClick={onClearOffline} className="w-full flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30">
                    <span className="font-semibold">Clear All Offline Articles</span>
                    <TrashIcon className="w-5 h-5 text-red-500" />
                 </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
