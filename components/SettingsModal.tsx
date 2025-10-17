import React, { useState } from 'react';
import type { Settings } from '../types';
import CloseIcon from './icons/CloseIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import PaletteIcon from './icons/PaletteIcon';
import SansFontIcon from './icons/SansFontIcon';
import SerifFontIcon from './icons/SerifFontIcon';
import AccessibilityIcon from './icons/AccessibilityIcon';
import DataIcon from './icons/DataIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onUpdateSettings: (newSettings: Partial<Settings>) => void;
  onClearOffline: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onUpdateSettings, onClearOffline }) => {
  const [activeTab, setActiveTab] = useState('appearance');

  if (!isOpen) return null;

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <SettingGroup title="Theme">
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => onUpdateSettings({ theme: 'light' })} className={`p-4 rounded-lg border-2 ${settings.theme === 'light' ? 'border-blue-500' : 'border-slate-300 dark:border-slate-600'}`}>
            <SunIcon className="mx-auto mb-2 w-8 h-8"/>
            <span className="font-semibold">Light</span>
          </button>
           <button onClick={() => onUpdateSettings({ theme: 'dark' })} className={`p-4 rounded-lg border-2 ${settings.theme === 'dark' ? 'border-blue-500' : 'border-slate-300 dark:border-slate-600'}`}>
            <MoonIcon className="mx-auto mb-2 w-8 h-8"/>
            <span className="font-semibold">Dark</span>
          </button>
        </div>
      </SettingGroup>
      <SettingGroup title="Accent Color">
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => onUpdateSettings({ accentColor: 'gold' })} className={`flex items-center gap-3 p-4 rounded-lg border-2 ${settings.accentColor === 'gold' ? 'border-blue-500' : 'border-slate-300 dark:border-slate-600'}`}>
            <div className="w-6 h-6 rounded-full bg-gold"></div>
            <span className="font-semibold">Gold</span>
          </button>
          <button onClick={() => onUpdateSettings({ accentColor: 'deep-red' })} className={`flex items-center gap-3 p-4 rounded-lg border-2 ${settings.accentColor === 'deep-red' ? 'border-blue-500' : 'border-slate-300 dark:border-slate-600'}`}>
            <div className="w-6 h-6 rounded-full bg-deep-red"></div>
            <span className="font-semibold">Red</span>
          </button>
        </div>
      </SettingGroup>
      <SettingGroup title="Font Style">
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => onUpdateSettings({ fontFamily: 'sans' })} className={`p-4 rounded-lg border-2 ${settings.fontFamily === 'sans' ? 'border-blue-500' : 'border-slate-300 dark:border-slate-600'}`}>
            <SansFontIcon className="mx-auto mb-2 w-8 h-8"/>
            <span className="font-semibold font-sans">Sans-Serif</span>
          </button>
           <button onClick={() => onUpdateSettings({ fontFamily: 'serif' })} className={`p-4 rounded-lg border-2 ${settings.fontFamily === 'serif' ? 'border-blue-500' : 'border-slate-300 dark:border-slate-600'}`}>
            <SerifFontIcon className="mx-auto mb-2 w-8 h-8"/>
            <span className="font-semibold font-serif">Serif</span>
          </button>
        </div>
      </SettingGroup>
    </div>
  );

  const renderAccessibilityTab = () => (
      <div className="space-y-6">
          <SettingGroupSwitch
              title="Reduce Motion"
              description="Disables animations and parallax effects for a simpler experience."
              enabled={settings.reduceMotion}
              onChange={(val) => onUpdateSettings({ reduceMotion: val })}
          />
           <SettingGroup title="Font Size">
                <div className="flex items-center justify-between rounded-lg bg-slate-100 dark:bg-slate-700 p-2">
                    <button onClick={() => onUpdateSettings({ fontSize: 'sm'})} className={`px-5 py-2 rounded-md text-sm ${settings.fontSize === 'sm' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}>A-</button>
                    <button onClick={() => onUpdateSettings({ fontSize: 'md'})} className={`px-5 py-2 rounded-md text-base ${settings.fontSize === 'md' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}>A</button>
                    <button onClick={() => onUpdateSettings({ fontSize: 'lg'})} className={`px-5 py-2 rounded-md text-lg ${settings.fontSize === 'lg' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}>A+</button>
                </div>
            </SettingGroup>
      </div>
  );
    
  const renderDataTab = () => (
    <div className="space-y-6">
        <SettingGroup title="Offline Articles">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Clear all articles saved for offline reading to free up space on your device.
            </p>
            <button onClick={onClearOffline} className="w-full bg-red-600/10 text-red-600 font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-red-600/20">
                Clear Offline Data
            </button>
        </SettingGroup>
    </div>
  );

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col md:flex-row transform transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ height: 'clamp(400px, 90vh, 600px)' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white z-20"><CloseIcon /></button>
        {/* Sidebar */}
        <div className="w-full md:w-1/3 flex-shrink-0 bg-slate-50 dark:bg-slate-800/50 p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="space-y-2">
                <TabButton name="Appearance" icon={<PaletteIcon/>} isActive={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')} />
                <TabButton name="Accessibility" icon={<AccessibilityIcon/>} isActive={activeTab === 'accessibility'} onClick={() => setActiveTab('accessibility')} />
                <TabButton name="Data" icon={<DataIcon/>} isActive={activeTab === 'data'} onClick={() => setActiveTab('data')} />
            </div>
        </div>
        {/* Content */}
        <div className="flex-grow p-8 overflow-y-auto">
            {activeTab === 'appearance' && renderAppearanceTab()}
            {activeTab === 'accessibility' && renderAccessibilityTab()}
            {activeTab === 'data' && renderDataTab()}
        </div>
      </div>
    </div>
  );
};


const TabButton: React.FC<{ name: string, icon: React.ReactNode, isActive: boolean, onClick: () => void }> = ({ name, icon, isActive, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg font-semibold transition-colors ${isActive ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
        {icon}
        {name}
    </button>
);

const SettingGroup: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-bold mb-3">{title}</h3>
        {children}
    </div>
);

const SettingGroupSwitch: React.FC<{ title: string; description: string; enabled: boolean; onChange: (enabled: boolean) => void; }> = ({ title, description, enabled, onChange }) => (
    <div>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">{description}</p>
            </div>
            <button
                type="button"
                className={`${enabled ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                role="switch"
                aria-checked={enabled}
                onClick={() => onChange(!enabled)}
            >
                <span className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}/>
            </button>
        </div>
    </div>
);

export default SettingsModal;