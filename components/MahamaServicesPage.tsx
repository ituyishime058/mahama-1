import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import WeatherWidget from './WeatherWidget';
import HealthIcon from './icons/HealthIcon';
import EducationIcon from './icons/EducationIcon';
import MarketIcon from './icons/MarketIcon';
import TransportIcon from './icons/TransportIcon';
import WorkSkillsIcon from './icons/WorkSkillsIcon';
import UsersIcon from './icons/UsersIcon';
import BuildingIcon from './icons/BuildingIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import PhoneIcon from './icons/PhoneIcon';
import AmbulanceIcon from './icons/AmbulanceIcon';
import ShieldExclamationIcon from './icons/ShieldExclamationIcon';
import CampMap from './CampMap';

import { useTranslation } from '../hooks/useTranslation';
import type { WeatherData, Article, Settings } from '../types';
import SubscriptionCard from './SubscriptionCard';
import TrendingNews from './TrendingNews';
import ThisDayInHistory from './ThisDayInHistory';
import CommunityPoll from './CommunityPoll';

export interface ServiceItem {
    name: string;
    details: string;
    category: string;
    coords: { x: number; y: number };
    image?: string;
    contact?: string;
}

const directoryData: { [key: string]: ServiceItem[] } = {
    Health: [
        { name: "Mahama Health Center", details: "Open 24/7, General services", category: "Health", coords: { x: 55, y: 35 }, image: "https://picsum.photos/seed/health/300/200", contact: "112" },
        { name: "Unity Pharmacy", details: "Mon-Sat, 8am-8pm", category: "Health", coords: { x: 60, y: 40 }, image: "https://picsum.photos/seed/pharmacy/300/200" }
    ],
    Education: [
        { name: "Mahama Primary School", details: "Grades 1-6", category: "Education", coords: { x: 30, y: 60 }, image: "https://picsum.photos/seed/school/300/200" },
        { name: "Youth Learning Center", details: "Library & computer access", category: "Education", coords: { x: 35, y: 55 }, image: "https://picsum.photos/seed/learning/300/200" }
    ],
    Markets: [
        { name: "Central Market", details: "Open daily, fresh produce & goods", category: "Markets", coords: { x: 50, y: 50 }, image: "https://picsum.photos/seed/market/300/200" }
    ],
    Transport: [
        { name: "Main Bus Stop", details: "Routes to Kigali & Kayonza", category: "Transport", coords: { x: 80, y: 85 }, image: "https://picsum.photos/seed/bus/300/200" }
    ],
    'Work & Skills': [
        { name: "Vocational Training", details: "Tailoring, IT, construction.", category: 'Work & Skills', coords: { x: 25, y: 45 }, image: "https://picsum.photos/seed/work/300/200" }
    ],
    'Community Groups': [
        { name: "Community Hall", details: "Weekly meetings and events.", category: 'Community Groups', coords: { x: 45, y: 65 }, image: "https://picsum.photos/seed/community/300/200" }
    ],
    'Official Services': [
        { name: "Camp Administration", details: "Registration & inquiries.", category: 'Official Services', coords: { x: 70, y: 25 }, image: "https://picsum.photos/seed/admin/300/200", contact: "0788-XXX-XXX" }
    ],
    'Safety & Security': [
        { name: "Main Security Post", details: "Located at the camp entrance.", category: 'Safety & Security', coords: { x: 85, y: 78 }, image: "https://picsum.photos/seed/security/300/200", contact: "111" }
    ],
};

const allServices = Object.values(directoryData).flat();

const eventsData = [
    { date: "25", month: "DEC", title: "Community Christmas Celebration", time: "2:00 PM @ Community Hall" },
    { date: "01", month: "JAN", title: "New Year's Football Match", time: "4:00 PM @ Central Field" },
    { date: "15", month: "JAN", title: "Farmer's Cooperative Meeting", time: "10:00 AM @ Camp Office" },
];

const noticesData = [
    { title: "Water distribution schedule update", content: "New schedule will be effective from next Monday. Please check the notice boards at water points.", posted: "3 days ago" },
    { title: "Youth vocational training registration", content: "Registration is now open for tailoring and carpentry courses. Visit the youth center for more information.", posted: "1 week ago" },
];

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

interface MahamaServicesPageProps {
    onClose: () => void;
    weatherData: WeatherData | null;
    isWeatherLoading: boolean;
    trendingArticles: Article[];
    onArticleClick: (article: Article) => void;
    settings: Settings;
    onGoPremium: () => void;
}

const MahamaServicesPage: React.FC<MahamaServicesPageProps> = ({ 
    onClose, 
    weatherData, 
    isWeatherLoading,
    trendingArticles,
    onArticleClick,
    settings,
    onGoPremium,
}) => {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState<string | null>('Health');
    const [selectedService, setSelectedService] = useState<ServiceItem | null>(allServices.find(s => s.category === 'Health') || null);
    const [activeTab, setActiveTab] = useState<'events' | 'notices'>('events');

    const handleCategorySelect = (category: string) => {
        setActiveCategory(category);
        setSelectedService(null);
    };

    const handlePinClick = (service: ServiceItem) => {
        setActiveCategory(service.category);
        setSelectedService(service);
    };

    const ServiceCategoryButton: React.FC<{ category: string; }> = ({ category }) => {
        const Icon = categoryIcons[category];
        const isActive = activeCategory === category;
        return (
            <button onClick={() => handleCategorySelect(category)} className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all text-center w-full ${isActive ? 'bg-deep-red/10 dark:bg-gold/10 scale-105 shadow-md' : 'bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50'}`}>
                <Icon className={`w-7 h-7 ${isActive ? 'text-deep-red dark:text-gold' : 'text-slate-500'}`} />
                <span className={`font-semibold text-xs ${isActive ? 'text-deep-red dark:text-gold' : ''}`}>{category}</span>
            </button>
        )
    };

    return (
        <div className="animate-fade-in">
            <header className="flex items-center justify-between mb-6">
                <button onClick={onClose} className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold">
                    <ChevronLeftIcon className="w-5 h-5"/> {t('backToHome')}
                </button>
                <div>
                     <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white text-right">Mahama Community Hub</h1>
                     <p className="text-slate-500 text-right">Your guide to local services & events.</p>
                </div>
            </header>
            
            {/* Quick Access Bar */}
            <section className="mb-8 p-4 bg-deep-red text-white rounded-lg shadow-lg">
                <h3 className="font-bold text-center mb-3 text-lg">Emergency & Quick Contacts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <a href="tel:111" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <ShieldExclamationIcon className="w-8 h-8 mx-auto mb-1"/>
                        <p className="font-semibold">Security</p>
                        <p className="font-mono text-sm">111</p>
                    </a>
                    <a href="tel:112" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <AmbulanceIcon className="w-8 h-8 mx-auto mb-1"/>
                        <p className="font-semibold">Medical Emergency</p>
                        <p className="font-mono text-sm">112</p>
                    </a>
                    <a href="tel:0788-XXX-XXX" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <PhoneIcon className="w-8 h-8 mx-auto mb-1"/>
                        <p className="font-semibold">Info Line</p>
                        <p className="font-mono text-sm">0788-XXX-XXX</p>
                    </a>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <main className="md:col-span-2 space-y-8">
                    {/* Map & Details */}
                    <section className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Interactive Camp Map</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <CampMap items={allServices} activeCategory={activeCategory} onPinClick={handlePinClick} selectedService={selectedService} />
                            </div>
                            <div className="min-h-[200px]">
                                {selectedService ? (
                                    <div className="animate-fade-in p-4 bg-slate-50 dark:bg-slate-800 rounded-lg h-full flex flex-col">
                                        {selectedService.image && <img src={selectedService.image} alt={selectedService.name} className="w-full h-32 object-cover rounded-md mb-3" />}
                                        <h4 className="font-bold text-lg">{selectedService.name}</h4>
                                        <p className="text-sm text-slate-500 flex-grow">{selectedService.details}</p>
                                        {selectedService.contact && (
                                            <a href={`tel:${selectedService.contact}`} className="mt-3 w-full text-center flex items-center justify-center gap-2 p-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors">
                                                <PhoneIcon className="w-5 h-5"/> Call Now
                                            </a>
                                        )}
                                    </div>
                                ) : (
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg h-full flex flex-col items-center justify-center text-center">
                                        <p className="font-semibold">Select a category below or a pin on the map to see details.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Directory */}
                    <section className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Local Directory</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {Object.keys(directoryData).map(cat => <ServiceCategoryButton key={cat} category={cat} />)}
                        </div>
                    </section>
                    
                     {/* Community Updates */}
                     <section className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Community Updates</h2>
                        <div className="flex border-b border-slate-200 dark:border-slate-700 mb-4">
                            <button onClick={() => setActiveTab('events')} className={`px-4 py-2 font-semibold ${activeTab === 'events' ? 'border-b-2 border-deep-red text-deep-red dark:text-gold' : 'text-slate-500'}`}>Events</button>
                            <button onClick={() => setActiveTab('notices')} className={`px-4 py-2 font-semibold ${activeTab === 'notices' ? 'border-b-2 border-deep-red text-deep-red dark:text-gold' : 'text-slate-500'}`}>Notices</button>
                        </div>
                        {activeTab === 'events' ? (
                            <div className="space-y-4 animate-fade-in">
                                {eventsData.map((event, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="text-center flex-shrink-0 w-16">
                                            <p className="text-3xl font-bold text-deep-red dark:text-gold">{event.date}</p>
                                            <p className="text-sm font-semibold uppercase">{event.month}</p>
                                        </div>
                                        <div className="border-l-2 border-slate-200 dark:border-slate-700 pl-4">
                                            <p className="font-semibold">{event.title}</p>
                                            <p className="text-sm text-slate-500">{event.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <div className="space-y-4 animate-fade-in">
                                {noticesData.map((notice, i) => (
                                    <div key={i} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold">{notice.title}</h4>
                                            <p className="text-xs text-slate-500">{notice.posted}</p>
                                        </div>
                                        <p className="text-sm mt-1">{notice.content}</p>
                                    </div>
                                ))}
                             </div>
                        )}
                    </section>
                </main>

                <aside className="md:col-span-1 space-y-8">
                    <div className="sticky top-28 space-y-8">
                        <WeatherWidget weatherData={weatherData} isLoading={isWeatherLoading} />
                        {settings.subscriptionTier === 'Free' && <SubscriptionCard onClick={onGoPremium} />}
                        <TrendingNews articles={trendingArticles} onArticleClick={onArticleClick} />
                        <ThisDayInHistory settings={settings} />
                        <CommunityPoll />
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default MahamaServicesPage;
