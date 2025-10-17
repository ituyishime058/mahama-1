import React, { useState } from 'react';
import type { Settings, Theme, FontFamily, AiSummaryLength, AiTtsVoice } from '../types';
import { LANGUAGES } from '../constants';
import CloseIcon from './icons/CloseIcon';
import PaletteIcon from './icons/PaletteIcon';
import FontSizeIcon from './icons/FontSizeIcon';
import SansFontIcon from './icons/SansFontIcon';
import SerifFontIcon from './icons/SerifFontIcon';
import NotificationIcon from './icons/NotificationIcon';
import DataIcon from './icons/DataIcon';
import GlobeIcon from './icons/GlobeIcon';
import ContentFilterIcon from './icons/ContentFilterIcon';
import SparklesIcon from './icons/SparklesIcon';
import TextToSpeechIcon from './icons/TextToSpeechIcon';
import TrashIcon from './icons/TrashIcon';

interface SettingsPageProps {
  settings: Settings;
  onUpdateSettings: (newSettings: Partial<Settings>) => void;
  onClose: () => void;
  onClearOfflineData: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onUpdateSettings, onClose, onClearOfflineData }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleUpdate = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onUpdateSettings({ [key]: value });
  };
  
  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const SettingRow: React.FC<{ icon: React.ReactNode; label: string; children: React.ReactNode; }> = ({ icon, label, children }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-semibold">{label}</span>
      </div>
      <div>
        {children}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] bg-slate-100 dark:bg-navy animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <header className="flex items-center justify-between h-20 flex-shrink-0">
          <h1 className="text-2xl font-bold">Settings</h1>
          <button onClick={onClose} className="p-2"><CloseIcon /></button>
        </header>
        <main className="flex-grow overflow-y-auto pb-8">
          <div className="max-w-2xl mx-auto">
            <Section title="Appearance">
              <SettingRow icon={<PaletteIcon />} label="Theme">
                <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-full">
                  {(['light', 'dark', 'system'] as Theme[]).map(theme => (
                    <button
                      key={theme}
                      onClick={() => handleUpdate('theme', theme)}
                      className={`px-3 py-1 text-sm font-semibold rounded-full capitalize transition-colors ${localSettings.theme === theme ? 'bg-white dark:bg-slate-600' : 'text-slate-600 dark:text-slate-300'}`}
                    >{theme}</button>
                  ))}
                </div>
              </SettingRow>
              <SettingRow icon={<FontSizeIcon />} label="Font Size">
                 <div className="flex items-center gap-3">
                    <span className="text-sm">A</span>
                    <input
                        type="range"
                        min="14"
                        max="20"
                        step="1"
                        value={localSettings.fontSize}
                        onChange={(e) => handleUpdate('fontSize', parseInt(e.target.value, 10))}
                        className="w-32"
                    />
                    <span className="text-xl">A</span>
                </div>
              </SettingRow>
              <SettingRow icon={<div className="flex items-center"><SansFontIcon className="w-4 h-4"/><SerifFontIcon className="w-4 h-4"/></div>} label="Font Family">
                 <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-full">
                  {(['sans', 'serif'] as FontFamily[]).map(family => (
                    <button
                      key={family}
                      onClick={() => handleUpdate('fontFamily', family)}
                      className={`px-3 py-1 text-sm font-semibold rounded-full capitalize transition-colors ${localSettings.fontFamily === family ? 'bg-white dark:bg-slate-600' : 'text-slate-600 dark:text-slate-300'}`}
                    >{family}</button>
                  ))}
                </div>
              </SettingRow>
            </Section>

            <Section title="General">
                <SettingRow icon={<NotificationIcon />} label="Enable Notifications">
                    <input type="checkbox" className="toggle-checkbox" checked={localSettings.enableNotifications} onChange={e => handleUpdate('enableNotifications', e.target.checked)} />
                </SettingRow>
                 <SettingRow icon={<DataIcon />} label="Data Saver Mode">
                    <input type="checkbox" className="toggle-checkbox" checked={localSettings.dataSaverMode} onChange={e => handleUpdate('dataSaverMode', e.target.checked)} />
                </SettingRow>
                <SettingRow icon={<GlobeIcon />} label="Language">
                    <select value={localSettings.language} onChange={e => handleUpdate('language', e.target.value)} className="bg-slate-200 dark:bg-slate-700 p-2 rounded-md border-transparent focus:ring-2 focus:ring-deep-red">
                        {LANGUAGES.slice(0, 5).map(lang => <option key={lang} value={lang}>{lang}</option>)}
                    </select>
                </SettingRow>
            </Section>

            <Section title="AI Features">
                 <SettingRow icon={<SparklesIcon />} label="Default Summary Length">
                    <select value={localSettings.aiSummaryLength} onChange={e => handleUpdate('aiSummaryLength', e.target.value as AiSummaryLength)} className="bg-slate-200 dark:bg-slate-700 p-2 rounded-md border-transparent focus:ring-2 focus:ring-deep-red">
                        {(['Short', 'Medium', 'Detailed'] as AiSummaryLength[]).map(len => <option key={len} value={len}>{len}</option>)}
                    </select>
                </SettingRow>
                <SettingRow icon={<TextToSpeechIcon />} label="Text-to-Speech Voice">
                    <select value={localSettings.aiTtsVoice} onChange={e => handleUpdate('aiTtsVoice', e.target.value as AiTtsVoice)} className="bg-slate-200 dark:bg-slate-700 p-2 rounded-md border-transparent focus:ring-2 focus:ring-deep-red">
                        {(['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'] as AiTtsVoice[]).map(voice => <option key={voice} value={voice}>{voice}</option>)}
                    </select>
                </SettingRow>
            </Section>

            <Section title="Data Management">
                 <SettingRow icon={<TrashIcon />} label="Clear Offline Articles">
                    <button onClick={onClearOfflineData} className="px-3 py-2 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 text-sm font-semibold rounded-md">Clear Data</button>
                </SettingRow>
            </Section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
