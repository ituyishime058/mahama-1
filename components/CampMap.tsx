import React, { useState } from 'react';
import type { ServiceItem } from '../types';
import { mockServiceItems } from '../constants'; // Import mock data
import HealthIcon from './icons/HealthIcon';
import EducationIcon from './icons/EducationIcon';
import MarketIcon from './icons/MarketIcon';
import TransportIcon from './icons/TransportIcon';
import WorkSkillsIcon from './icons/WorkSkillsIcon';
import CommunityHubIcon from './icons/CommunityHubIcon';
import BuildingIcon from './icons/BuildingIcon';
import ShieldExclamationIcon from './icons/ShieldExclamationIcon';

const categoryConfig = {
    Health: { icon: HealthIcon, color: 'text-red-500' },
    Education: { icon: EducationIcon, color: 'text-blue-500' },
    Markets: { icon: MarketIcon, color: 'text-green-500' },
    Transport: { icon: TransportIcon, color: 'text-yellow-500' },
    'Work & Skills': { icon: WorkSkillsIcon, color: 'text-purple-500' },
    'Community Groups': { icon: CommunityHubIcon, color: 'text-indigo-500' },
    'Official Services': { icon: BuildingIcon, color: 'text-gray-500' },
    'Safety & Security': { icon: ShieldExclamationIcon, color: 'text-orange-500' },
};

const CampMap: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);

    return (
        <div className="p-4 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4">Interactive Camp Map</h3>
            <div className="flex-grow relative bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                <img src="https://i.imgur.com/2Y4z22J.png" alt="Mahama Camp Map Background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                {mockServiceItems.map(item => {
                    const Icon = categoryConfig[item.category].icon;
                    const color = categoryConfig[item.category].color;
                    return (
                        <div
                            key={item.name}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                            style={{ left: `${item.coords.x}%`, top: `${item.coords.y}%` }}
                            onMouseEnter={() => setSelectedItem(item)}
                            onMouseLeave={() => setSelectedItem(null)}
                        >
                            <div className="relative">
                                <Icon className={`w-8 h-8 ${color} bg-white/80 dark:bg-slate-800/80 p-1 rounded-full shadow-lg`} />
                                {selectedItem?.name === item.name && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-slate-800 text-white text-xs font-bold rounded-md whitespace-nowrap z-10">
                                        {item.name}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="h-20 flex-shrink-0 mt-4 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
                {selectedItem ? (
                    <div>
                        <h4 className="font-bold">{selectedItem.name}</h4>
                        <p className="text-sm text-slate-500">{selectedItem.description || `Service: ${selectedItem.category}`}</p>
                    </div>
                ) : (
                    <p className="text-sm text-slate-500 text-center">Hover over a point on the map to see details.</p>
                )}
            </div>
        </div>
    );
};

export default CampMap;
