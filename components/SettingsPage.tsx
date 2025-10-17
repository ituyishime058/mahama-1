import React, { useState } from 'react';
import type { AiSummaryLength, AiTtsVoice } from '../types';
import { LANGUAGES } from '../constants';

import CloseIcon from './icons/CloseIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SparklesIcon from './icons/SparklesIcon';
import TranslateIcon from './icons/TranslateIcon';
import ReadAloudIcon from './icons/ReadAloudIcon';

interface SettingsPageProps {
  onClose: () => void;
  currentSettings: {
    summaryLength: AiSummaryLength;
    ttsVoice: AiTtsVoice;
    defaultLanguage: string;
  };
  onSave: (newSettings: {
    summaryLength: AiSummaryLength;
    ttsVoice: AiTtsVoice;
    defaultLanguage: string;
  }) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onClose, currentSettings, onSave, theme, onToggleTheme }) => {
  const [settings, setSettings] = useState(currentSettings);

  const handleSave = () => {
    onSave(settings);
    onClose();
  };
  
  const ttsVoices: AiTtsVoice[] = ['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'];

  return (
    <div className="fixed inset-0 z-[60] bg-slate-100 dark:bg-navy text-slate-800 dark:text-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <header className="flex items-center justify-between h-20 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold">Settings</h1>
          <button onClick={onClose} aria-label="Close settings"><CloseIcon /></button>
        </header>

        <main className="py-8 space-y-8">
          {/* Appearance Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">Appearance</h2>
            <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg">
              <div className="flex justify-between items-center">
                <label className="font-semibold">Theme</label>
                <div className="flex items-center gap-2 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                  <button onClick={() => theme !== 'light' && onToggleTheme()} className={`p-2 rounded-full ${theme === 'light' ? 'bg-white shadow' : ''}`}><SunIcon className="w-5 h-5"/></button>
                  <button onClick={() => theme !== 'dark' && onToggleTheme()} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-navy shadow' : ''}`}><MoonIcon className="w-5 h-5"/></button>
                </div>
              </div>
            </div>
          </section>

          {/* AI Features Section */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><SparklesIcon className="text-gold" /> AI Features</h2>
            <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg space-y-4">
              <div>
                <label htmlFor="summary-length" className="block font-semibold mb-2">Default Summary Length</label>
                <select 
                  id="summary-length" 
                  value={settings.summaryLength} 
                  onChange={(e) => setSettings(s => ({...s, summaryLength: e.target.value as AiSummaryLength}))}
                  className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600"
                >
                  <option value="Short">Short (1 sentence)</option>
                  <option value="Medium">Medium (bullet points)</option>
                  <option value="Detailed">Detailed (multi-paragraph)</option>
                </select>
              </div>
              <div>
                <label htmlFor="tts-voice" className="block font-semibold mb-2 flex items-center gap-2"><ReadAloudIcon /> Text-to-Speech Voice</label>
                <select 
                  id="tts-voice" 
                  value={settings.ttsVoice} 
                  onChange={(e) => setSettings(s => ({...s, ttsVoice: e.target.value as AiTtsVoice}))}
                  className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600"
                >
                  {ttsVoices.map(voice => <option key={voice} value={voice}>{voice}</option>)}
                </select>
              </div>
               <div>
                <label htmlFor="translation-lang" className="block font-semibold mb-2 flex items-center gap-2"><TranslateIcon /> Default Translation Language</label>
                <select 
                  id="translation-lang" 
                  value={settings.defaultLanguage} 
                  onChange={(e) => setSettings(s => ({...s, defaultLanguage: e.target.value}))}
                  className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600"
                >
                  {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>
            </div>
          </section>
        </main>
        
        <footer className="py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button onClick={handleSave} className="bg-deep-red text-white font-bold py-2 px-6 rounded-lg">Save Changes</button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsPage;
