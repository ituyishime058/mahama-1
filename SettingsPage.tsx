import React, { useState } from 'react';
import type { Settings } from '../types';
import { categories, TTS_VOICES } from '../constants';

import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SparklesIcon from './icons/SparklesIcon';
import PaletteIcon from './icons/PaletteIcon';
import FontSizeIcon from './icons/FontSizeIcon';
import SansFontIcon from './icons/SansFontIcon';
import SerifFontIcon from './icons/SerifFontIcon';
import TrashIcon from './icons/TrashIcon';
import DataIcon from './icons/DataIcon';
import ContentFilterIcon from './icons/ContentFilterIcon';
import TranslateIcon from './icons/TranslateIcon';
import BellIcon from './icons/BellIcon';
import MicIcon from './icons/MicIcon';
import MagicWandIcon from './icons/MagicWandIcon';
import TextToSpeechIcon from './icons/TextToSpeechIcon';
import GlossaryIcon from './icons/GlossaryIcon';
import CrownIcon from './icons/CrownIcon';
import ProfileIcon from './icons/ProfileIcon';
import DensityIcon from './icons/DensityIcon';

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

  const handleNotificationChange = (key: keyof Settings['notificationPreferences']) => {
    handleSettingChange('notificationPreferences', {
      ...localSettings.notificationPreferences,
      [key]: !localSettings.notificationPreferences[key],
    });
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };
  
  const isPremium = localSettings.subscriptionTier === 'Premium';

  return (
    <div>
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-extrabold">Settings</h1>
            <button onClick={handleSave} className="px-6 py-3 bg-deep-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">Save Changes</button>
        </div>

        <div className="space-y-12">
            
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><CrownIcon className="text-gold"/> Subscription</h2>
              <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                <p>You are on the <span className={`font-bold ${isPremium ? 'text-gold' : ''}`}>{localSettings.subscriptionTier}</span> plan.</p>
              </div>
            </section>
            
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
            
             {/* Personalization Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ProfileIcon /> Personalization</h2>
              <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-6">
                 <div className="flex justify-between items-center">
                    <label className="font-semibold flex items-center gap-2"><DensityIcon /> Visual Density</label>
                    <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                        <button onClick={() => handleSettingChange('informationDensity', 'Comfortable')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.informationDensity === 'Comfortable' ? 'bg-white dark:bg-navy shadow' : ''}`}>Comfortable</button>
                        <button onClick={() => handleSettingChange('informationDensity', 'Compact')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.informationDensity === 'Compact' ? 'bg-white dark:bg-navy shadow' : ''}`}>Compact</button>
                    </div>
                </div>
              </div>
            </section>

            {/* AI & Reading Experience Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><SparklesIcon className="text-gold" /> AI & Reading Experience</h2>
              <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-4 divide-y divide-slate-200 dark:divide-slate-700">
                <div className="flex justify-between items-center pt-4 first:pt-0">
                    <label className="font-semibold flex items-center gap-2"><SparklesIcon/> AI Model Preference</label>
                    <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                        <button onClick={() => handleSettingChange('aiModelPreference', 'Speed')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.aiModelPreference === 'Speed' ? 'bg-white dark:bg-navy shadow' : ''}`}>Speed</button>
                        <button onClick={() => { if (isPremium) handleSettingChange('aiModelPreference', 'Quality')}} className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold transition-colors ${localSettings.aiModelPreference === 'Quality' ? 'bg-white dark:bg-navy shadow' : ''} ${!isPremium ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!isPremium}>
                            Quality
                            {!isPremium && <CrownIcon className="w-4 h-4 text-gold"/>}
                        </button>
                    </div>
                </div>
                
                 <div className="flex justify-between items-center pt-4">
                  <label className="font-semibold flex items-center gap-2"><TextToSpeechIcon className="w-5 h-5"/> Text-to-Speech Voice</label>
                  <select
                      value={localSettings.ttsVoice}
                      onChange={(e) => handleSettingChange('ttsVoice', e.target.value as Settings['ttsVoice'])}
                      className="p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600 font-semibold max-w-[50%]"
                  >
                     {TTS_VOICES.map(voice => (
                         <option key={voice.value} value={voice.value}>{voice.name}</option>
                     ))}
                  </select>
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
    </div>
  );
};

export default SettingsPage;
