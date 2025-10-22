import React from 'react';
import type { ServiceItem } from './MahamaServicesPage';
import HealthIcon from './icons/HealthIcon';
import EducationIcon from './icons/EducationIcon';
import MarketIcon from './icons/MarketIcon';
import TransportIcon from './icons/TransportIcon';
import WorkSkillsIcon from './icons/WorkSkillsIcon';
import UsersIcon from './icons/UsersIcon';
import BuildingIcon from './icons/BuildingIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

const categoryIcons: { [key: string]: React.FC<any> } = {
    Health: HealthIcon,
    Education: EducationIcon,
    Markets: MarketIcon,
    Transport: TransportIcon,
    'Work & Skills': WorkSkillsIcon,
    'Community Groups': UsersIcon,
    'Official Services': BuildingIcon,
    'Safety & Security': ShieldCheckIcon,
};

interface CampMapProps {
    items: ServiceItem[];
    activeCategory: string | null;
    selectedService: ServiceItem | null;
    onPinClick: (item: ServiceItem) => void;
}

const CampMap: React.FC<CampMapProps> = ({ items, activeCategory, selectedService, onPinClick }) => {
    
    const Pin: React.FC<{ item: ServiceItem }> = ({ item }) => {
        const Icon = categoryIcons[item.category] || HealthIcon;
        const isSelected = selectedService?.name === item.name;
        const isCategoryActive = activeCategory === item.category;

        return (
            <button
                onClick={() => onPinClick(item)}
                className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300"
                style={{ left: `${item.coords.x}%`, top: `${item.coords.y}%` }}
            >
                <div className={`relative w-8 h-10 flex items-center justify-center transition-all duration-300 ${isSelected ? 'scale-125' : 'scale-100'}`} >
                    <svg viewBox="0 0 32 40" className={`w-full h-full drop-shadow-lg transition-all duration-300 ${isCategoryActive || isSelected ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}>
                        <path 
                            d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24s16-14 16-24C32 7.163 24.837 0 16 0z" 
                            className={`transition-colors duration-300 ${isSelected ? 'fill-gold' : 'fill-deep-red'}`}
                        />
                        {isCategoryActive && !isSelected && <circle cx="16" cy="16" r="14" fill="currentColor" className="text-deep-red/50 animate-ping" />}
                    </svg>
                    <Icon className="absolute w-4 h-4 text-white top-3.5"/>
                </div>
            </button>
        )
    };

    return (
        <div className="relative w-full aspect-square bg-slate-100 dark:bg-slate-900/50 rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700">
            {/* Basic map layout SVG */}
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                {/* Roads */}
                <path d="M 85 10 V 90" strokeWidth="2" className="stroke-slate-300 dark:stroke-slate-600" />
                <path d="M 10 50 H 90" strokeWidth="3" className="stroke-slate-300 dark:stroke-slate-600" />
                {/* Zones */}
                <rect x="15" y="20" width="30" height="20" rx="2" className="fill-green-500/10" />
                 <text x="30" y="32" className="text-[4px] fill-slate-400 text-anchor-middle">Zone A</text>
                <rect x="55" y="55" width="25" height="30" rx="2" className="fill-blue-500/10" />
                <text x="67.5" y="72" className="text-[4px] fill-slate-400 text-anchor-middle">Zone B</text>
            </svg>

            {/* Pins */}
            {items.map(item => <Pin key={item.name} item={item} />)}
        </div>
    );
};

export default CampMap;
