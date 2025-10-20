import React, { useState } from 'react';
import type { Settings } from '../types';
import { TTS_VOICES } from '../constants';

import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SparklesIcon from './icons/SparklesIcon';
import PaletteIcon from './icons/PaletteIcon';
import FontSizeIcon from './icons/FontSizeIcon';
import SansFontIcon from './icons/SansFontIcon';
import SerifFontIcon from './icons/SerifFontIcon';
import TrashIcon from './icons/TrashIcon';
import TextToSpeechIcon from './icons/TextToSpeechIcon';
import CrownIcon from './icons/CrownIcon';
import ProfileIcon from './icons/ProfileIcon';
import DensityIcon from './icons/DensityIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

interface SettingsPageProps {
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
  onClose: () => void;
  onClearBookmarks: () => void;
  onClearOffline: () => void;
}

const settingsNav = [
  { name: 'Appearance', icon: PaletteIcon },
  { name: 'Personalization', icon: ProfileIcon },
  { name: 'AI & Reading', icon: SparklesIcon },
  { name: 'Account', icon: CrownIcon },
  { name: 'Data & Privacy', icon: ShieldCheckIcon },
];

const ToggleSwitch: React.FC<{label: string, enabled: boolean, onChange: (enabled: boolean) => void}> = ({ label, enabled, onChange }) => (
    <div className="flex justify-between items-center">
        <label className="font-semibold">{label}</label>
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

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onSettingsChange, onClose, onClearBookmarks, onClearOffline }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState('Appearance');
  
  const handleSettingChange = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };
  
  const isPremium = localSettings.subscriptionTier === 'Premium';

  const renderContent = () => {
    switch (activeTab) {
      case 'Appearance':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold">Appearance</h3>
            <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-6">
                <div className="flex justify-between items-center">
                  <label className="font-semibold">Theme</label>
                  <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                    <button onClick={() => handleSettingChange('theme', 'light')} className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${localSettings.theme === 'light' ? 'bg-white shadow' : ''}`}><SunIcon className="w-5 h-5"/>Light</button>
                    <button onClick={() => handleSettingChange('theme', 'dark')} className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${localSettings.theme === 'dark' ? 'bg-navy shadow text-white' : ''}`}><MoonIcon className="w-5 h-5"/>Dark</button>
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
                <div className="flex justify-between items-center">
                    <label className="font-semibold flex items-center gap-2"><DensityIcon /> Visual Density</label>
                    <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                        <button onClick={() => handleSettingChange('informationDensity', 'Comfortable')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.informationDensity === 'Comfortable' ? 'bg-white dark:bg-navy shadow' : ''}`}>Comfortable</button>
                        <button onClick={() => handleSettingChange('informationDensity', 'Compact')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.informationDensity === 'Compact' ? 'bg-white dark:bg-navy shadow' : ''}`}>Compact</button>
                    </div>
                </div>
            </div>
          </div>
        );
      case 'Personalization':
        return (
            <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl font-bold">Homepage Customization</h3>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-4 divide-y divide-slate-200 dark:divide-slate-700">
                    <ToggleSwitch label="Show Mahama 360° Section" enabled={localSettings.showMahama360} onChange={(val) => handleSettingChange('showMahama360', val)} />
                    <ToggleSwitch label="Show Interactive News Map" enabled={localSettings.showNewsMap} onChange={(val) => handleSettingChange('showNewsMap', val)} />
                    <ToggleSwitch label="Show Data-Driven Insights" enabled={localSettings.showDataInsights} onChange={(val) => handleSettingChange('showDataInsights', val)} />
                    <ToggleSwitch label="Show Innovation Timeline" enabled={localSettings.showInnovationTimelines} onChange={(val) => handleSettingChange('showInnovationTimelines', val)} />
                    <ToggleSwitch label="Show Now Streaming Section" enabled={localSettings.showNowStreaming} onChange={(val) => handleSettingChange('showNowStreaming', val)} />
                </div>
            </div>
        );
      case 'AI & Reading':
        return (
            <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl font-bold">AI & Reading Experience</h3>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg space-y-4 divide-y divide-slate-200 dark:divide-slate-700">
                    <div className="flex justify-between items-center pt-4 first:pt-0">
                        <label className="font-semibold flex items-center gap-2"><SparklesIcon/> AI Model Preference</label>
                        <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                            <button onClick={() => handleSettingChange('aiModelPreference', 'Speed')} className={`px-3 py-1 rounded-full text-sm font-semibold ${localSettings.aiModelPreference === 'Speed' ? 'bg-white dark:bg-navy shadow' : ''}`}>Speed</button>
                            <button onClick={() => { if (isPremium) handleSettingChange('aiModelPreference', 'Quality')}} className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold transition-colors ${localSettings.aiModelPreference === 'Quality' ? 'bg-white dark:bg-navy shadow' : ''} ${!isPremium ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!isPremium}>
                                Quality {!isPremium && <CrownIcon className="w-4 h-4 text-gold"/>}
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
                            {TTS_VOICES.map(voice => (<option key={voice.value} value={voice.value}>{voice.name}</option>))}
                        </select>
                    </div>
                     <div className="flex justify-between items-center pt-4">
                        <label className="font-semibold flex items-center gap-2">AI Voice Personality</label>
                         <select
                            value={localSettings.aiVoicePersonality}
                            onChange={(e) => handleSettingChange('aiVoicePersonality', e.target.value as Settings['aiVoicePersonality'])}
                            className="p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600 font-semibold"
                        >
                            <option value="Friendly">Friendly</option>
                            <option value="Professional">Professional</option>
                            <option value="Witty">Witty</option>
                        </select>
                    </div>
                </div>
            </div>
        );
      case 'Account':
        return (
            <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl font-bold">Account</h3>
                <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                    <p>You are on the <span className={`font-bold ${isPremium ? 'text-gold' : ''}`}>{localSettings.subscriptionTier}</span> plan.</p>
                </div>
            </div>
        );
      case 'Data & Privacy':
        return (
            <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl font-bold">Data & Privacy</h3>
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
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold">Settings</h1>
        <div className="flex items-center gap-4">
            <button onClick={onClose} className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-6 py-3 bg-deep-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">Save & Close</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <nav className="space-y-2 sticky top-28">
            {settingsNav.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button 
                  key={item.name} 
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left font-semibold transition-colors ${
                    isActive 
                      ? 'bg-deep-red/10 text-deep-red dark:bg-gold/20 dark:text-gold' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800'
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
  );
};

export default SettingsPage;