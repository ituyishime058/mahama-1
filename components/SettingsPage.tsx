import React, { useState } from 'react';
import type { Settings } from '../types';
import { categories, TTS_VOICES } from '../constants';

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
import ContentFilterIcon from './icons/ContentFilterIcon';
import TranslateIcon from './icons/TranslateIcon';
import BellIcon from './icons/BellIcon';
import MicIcon from './icons/MicIcon';
import MagicWandIcon from './icons/MagicWandIcon';
import TextToSpeechIcon from './icons/TextToSpeechIcon';
import GlossaryIcon from './icons/GlossaryIcon';
import CrownIcon from './icons/CrownIcon';

interface SettingsPageProps {
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
  onClearBookmarks: () => void;
  onClearOffline: () => void;
  onManageSubscription: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onClose, settings, onSettingsChange, onClearBookmarks, onClearOffline, onManageSubscription }) => {
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
  
  const handleTogglePreference = (category: string) => {
    if (category === 'All' || category === 'For You') return;
    const currentPrefs = localSettings.contentPreferences || [];
    const newPrefs = currentPrefs.includes(category)
        ? currentPrefs.filter(p => p !== category)
        : [...currentPrefs, category];
    handleSettingChange('contentPreferences', newPrefs);
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };
  
  const isPremium = localSettings.subscriptionTier === 'Premium';

  return (
    <div className="fixed inset-0 z-[60] bg-slate-100 dark:bg-navy text-slate-800 dark:text-slate-200 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl h-screen flex flex-col">
        <header className="flex items-center justify-between h-20 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
          <h1 className="text-3xl font-bold">Settings</h1>
          <button onClick={handleSave} className="px-4 py-2 bg-deep-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">Save & Close</button>
        </header>

        <main className="py-8 flex-grow overflow-y-auto">
          <div className="space-y-12">
            {/* Subscription Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><CrownIcon className="text-gold"/> Subscription</h2>
              <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg flex justify-between items-center">
                  <div>
                      <p className="font-semibold">Your current plan:</p>
                      <p className={`text-2xl font-bold ${isPremium ? 'text-gold' : 'text-slate-600 dark:text-slate-300'}`}>{localSettings.subscriptionTier}</p>
                  </div>
                  <button onClick={onManageSubscription} className="px-4 py-2 bg-gold text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                      {isPremium ? 'Manage Subscription' : 'Upgrade to Premium'}
                  </button>
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
            
            {/* Content Preferences Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ContentFilterIcon /> Content Preferences</h2>
              <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                <p className="mb-4 text-slate-600 dark:text-slate-400">Select topics you're interested in to personalize your "For You" feed.</p>
                <div className="flex flex-wrap gap-2">
                    {categories.filter(c => c !== 'All' && c !== 'For You').map(category => {
                        const isSelected = localSettings.contentPreferences.includes(category);
                        return (
                            <button
                                key={category}
                                onClick={() => handleTogglePreference(category)}
                                className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${
                                    isSelected
                                        ? 'bg-deep-red text-white'
                                        : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                                }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
              </div>
            </section>

            {/* Advanced Features Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><SparklesIcon className="text-gold" /> AI & Reading Experience</h2>
              <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-4 divide-y divide-slate-200 dark:divide-slate-700">
                <div className="flex justify-between items-center pt-4 first:pt-0">
                    <label className="font-semibold flex items-center gap-2"><SparklesIcon/> AI Model Preference</label>
                    <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                        {/* FIX: Changed 'Fast' to 'Speed' to match the AIModelPreference type and fixed button text. */}
                        <button onClick={() => handleSettingChange('aiModelPreference', 'Speed')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.aiModelPreference === 'Speed' ? 'bg-white dark:bg-navy shadow' : ''}`}>Speed</button>
                        <button onClick={() => handleSettingChange('aiModelPreference', 'Quality')} disabled={!isPremium} className={`relative px-3 py-1 rounded-full text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${localSettings.aiModelPreference === 'Quality' ? 'bg-white dark:bg-navy shadow' : ''}`}>
                            Quality
                            {!isPremium && <CrownIcon className="absolute -top-1 -right-1 w-4 h-4 text-gold"/>}
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <label htmlFor="interactive-glossary" className="font-semibold flex items-center gap-2"><GlossaryIcon/> Interactive Glossary</label>
                  <input type="checkbox" id="interactive-glossary" checked={localSettings.interactiveGlossary} onChange={e => handleSettingChange('interactiveGlossary', e.target.checked)} className="h-6 w-6 rounded text-deep-red focus:ring-deep-red" />
                </div>
                <div className="flex justify-between items-center pt-4">
                    <label className="font-semibold flex items-center gap-2"><MagicWandIcon className="w-5 h-5"/> Default Reading Lens</label>
                    <select
                        value={localSettings.aiReadingLens}
                        onChange={(e) => handleSettingChange('aiReadingLens', e.target.value as Settings['aiReadingLens'])}
                        className="p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600 font-semibold"
                    >
                        <option value="None">None</option>
                        <option value="Simplify">Simplify Language</option>
                        <option value="DefineTerms">Define Key Terms</option>
                    </select>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <label className="font-semibold flex items-center gap-2"><TextToSpeechIcon className="w-5 h-5"/> Text-to-Speech Voice</label>
                  <select
                      value={localSettings.ttsVoice}
                      onChange={(e) => handleSettingChange('ttsVoice', e.target.value as Settings['ttsVoice'])}
                      className="p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600 font-semibold max-w-xs"
                  >
                      {TTS_VOICES.map(voice => (
                          <option key={voice.value} value={voice.value}>{voice.name}</option>
                      ))}
                  </select>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <label className="font-semibold flex items-center gap-2"><MicIcon className="w-5 h-5"/> AI Voice Personality</label>
                    <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                        <button onClick={() => handleSettingChange('aiVoicePersonality', 'Friendly')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.aiVoicePersonality === 'Friendly' ? 'bg-white dark:bg-navy shadow' : ''}`}>Friendly</button>
                        <button onClick={() => handleSettingChange('aiVoicePersonality', 'Professional')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.aiVoicePersonality === 'Professional' ? 'bg-white dark:bg-navy shadow' : ''}`}>Professional</button>
                        <button onClick={() => handleSettingChange('aiVoicePersonality', 'Witty')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.aiVoicePersonality === 'Witty' ? 'bg-white dark:bg-navy shadow' : ''}`}>Witty</button>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <label className="font-semibold">Homepage Layout</label>
                    <div className="flex items-center gap-2 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                        <button onClick={() => handleSettingChange('homepageLayout', 'Standard')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.homepageLayout === 'Standard' ? 'bg-white dark:bg-navy shadow' : ''}`}>Standard</button>
                        <button onClick={() => handleSettingChange('homepageLayout', 'Dashboard')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.homepageLayout === 'Dashboard' ? 'bg-white dark:bg-navy shadow' : ''}`}>Dashboard</button>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <label htmlFor="auto-translate" className="font-semibold flex items-center gap-2"><TranslateIcon/> Auto-translate articles</label>
                    <input type="checkbox" id="auto-translate" checked={localSettings.autoTranslate} onChange={e => handleSettingChange('autoTranslate', e.target.checked)} className="h-6 w-6 rounded text-deep-red focus:ring-deep-red" />
                </div>
                <div className="flex justify-between items-center pt-4">
                    <label htmlFor="show-streaming" className="font-semibold">"Now Streaming" Carousel</label>
                    <input type="checkbox" id="show-streaming" checked={localSettings.showNowStreaming} onChange={e => handleSettingChange('showNowStreaming', e.target.checked)} className="h-6 w-6 rounded text-deep-red focus:ring-deep-red" />
                </div>
                <div className="flex justify-between items-center pt-4">
                    <label htmlFor="show-timeline" className="font-semibold">"Innovation Timeline" in Tech</label>
                    <input type="checkbox" id="show-timeline" checked={localSettings.showInnovationTimelines} onChange={e => handleSettingChange('showInnovationTimelines', e.target.checked)} className="h-6 w-6 rounded text-deep-red focus:ring-deep-red" />
                </div>
                 <div className="flex justify-between items-center pt-4">
                    <label htmlFor="show-counterpoint" className="font-semibold">AI Counterpoint Feature</label>
                    <input type="checkbox" id="show-counterpoint" checked={localSettings.showCounterpoint} onChange={e => handleSettingChange('showCounterpoint', e.target.checked)} className="h-6 w-6 rounded text-deep-red focus:ring-deep-red" />
                </div>
              </div>
            </section>
            
            {/* Notifications Section */}
            <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><BellIcon /> Notifications</h2>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-4 divide-y divide-slate-200 dark:divide-slate-700">
                    <div className="flex justify-between items-center pt-4 first:pt-0">
                        <label htmlFor="notif-breaking" className="font-semibold">Breaking News Alerts</label>
                        <input type="checkbox" id="notif-breaking" checked={localSettings.notificationPreferences.breakingNews} onChange={() => handleNotificationChange('breakingNews')} className="h-6 w-6 rounded text-deep-red focus:ring-deep-red" />
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <label htmlFor="notif-digest" className="font-semibold">Daily Digest Email</label>
                        <input type="checkbox" id="notif-digest" checked={localSettings.notificationPreferences.dailyDigest} onChange={() => handleNotificationChange('dailyDigest')} className="h-6 w-6 rounded text-deep-red focus:ring-deep-red" />
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <label htmlFor="notif-ai" className="font-semibold">AI Recommendation Alerts</label>
                        <input type="checkbox" id="notif-ai" checked={localSettings.notificationPreferences.aiRecommendations} onChange={() => handleNotificationChange('aiRecommendations')} className="h-6 w-6 rounded text-deep-red focus:ring-deep-red" />
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
