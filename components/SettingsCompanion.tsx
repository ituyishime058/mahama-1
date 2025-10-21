import React from 'react';
import InfoCircleIcon from './icons/InfoCircleIcon';
import SparklesIcon from './icons/SparklesIcon';
import PaletteIcon from './icons/PaletteIcon';
import { useTranslation } from '../hooks/useTranslation';

const SettingsCompanion: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="p-6 rounded-lg bg-slate-100 dark:bg-slate-800/50 space-y-4 animate-fade-in">
            <h3 className="font-bold text-lg flex items-center gap-2">
                <InfoCircleIcon className="w-5 h-5 text-deep-red dark:text-gold" /> 
                {t('settingsTips')}
            </h3>
            
            <div className="text-sm border-t border-slate-200 dark:border-slate-700 pt-3">
                <p className="font-semibold flex items-center gap-1"><PaletteIcon className="w-4 h-4"/> {t('makeItYours')}</p>
                <p className="text-slate-600 dark:text-slate-400">{t('makeItYoursDesc')}</p>
            </div>
            
            <div className="text-sm border-t border-slate-200 dark:border-slate-700 pt-3">
                <p className="font-semibold flex items-center gap-1"><SparklesIcon className="w-4 h-4 text-gold" /> {t('aiPower')}</p>
                <p className="text-slate-600 dark:text-slate-400">{t('aiPowerDesc')}</p>
            </div>

            <div className="text-sm border-t border-slate-200 dark:border-slate-700 pt-3">
                <p className="font-semibold">{t('yourFeedYourRules')}</p>
                <p className="text-slate-600 dark:text-slate-400">{t('yourFeedYourRulesDesc')}</p>
            </div>
        </div>
    );
}

export default SettingsCompanion;