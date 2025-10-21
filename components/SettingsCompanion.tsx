import React from 'react';
import InfoCircleIcon from './icons/InfoCircleIcon';
import SparklesIcon from './icons/SparklesIcon';
import PaletteIcon from './icons/PaletteIcon';

const SettingsCompanion: React.FC = () => {
    return (
        <div className="p-6 rounded-lg bg-slate-100 dark:bg-slate-800/50 space-y-4 animate-fade-in">
            <h3 className="font-bold text-lg flex items-center gap-2">
                <InfoCircleIcon className="w-5 h-5 text-deep-red dark:text-gold" /> 
                Settings Tips
            </h3>
            
            <div className="text-sm border-t border-slate-200 dark:border-slate-700 pt-3">
                <p className="font-semibold flex items-center gap-1"><PaletteIcon className="w-4 h-4"/> Make It Yours</p>
                <p className="text-slate-600 dark:text-slate-400">Adjust the theme, font size, and layout in 'Appearance' to match your reading preferences.</p>
            </div>
            
            <div className="text-sm border-t border-slate-200 dark:border-slate-700 pt-3">
                <p className="font-semibold flex items-center gap-1"><SparklesIcon className="w-4 h-4 text-gold" /> AI Power</p>
                <p className="text-slate-600 dark:text-slate-400">Premium users can switch to the 'Quality' AI model in 'AI & Reading' for more in-depth analysis.</p>
            </div>

            <div className="text-sm border-t border-slate-200 dark:border-slate-700 pt-3">
                <p className="font-semibold">Your Feed, Your Rules</p>
                <p className="text-slate-600 dark:text-slate-400">Use 'Personalization' to tailor the "For You" section to your favorite topics.</p>
            </div>
        </div>
    );
}

export default SettingsCompanion;