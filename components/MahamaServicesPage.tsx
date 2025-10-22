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
import { useTranslation } from '../hooks/useTranslation';
import type { WeatherData, Article, Settings } from '../types';
import SubscriptionCard from './SubscriptionCard';
import TrendingNews from './TrendingNews';
import ThisDayInHistory from './ThisDayInHistory';
import CommunityPoll from './CommunityPoll';

const directoryData = {
    Health: [
        { name: "Mahama Health Center", details: "Open 24/7, General services" }, 
        { name: "Unity Pharmacy", details: "Mon-Sat, 8am-8pm" }
    ],
    Education: [
        { name: "Mahama Primary School", details: "Grades 1-6" }, 
        { name: "Kirehe Secondary School", details: "Located nearby" }
    ],
    Markets: [
        { name: "Central Market", details: "Open daily, fresh produce & goods" }, 
        { name: "Evening Market", details: "Tues/Thurs/Sat, 4pm onwards" }
    ],
    Transport: [
        { name: "Mahama Bus Stop", details: "Routes to Kigali & Kayonza" }, 
        { name: "Moto Taxi Stand", details: "Main crossroads" }
    ],
    'Work & Skills': [
        { name: "Vocational Training Center", details: "Courses in tailoring, IT, and construction." },
        { name: "Job Opportunity Board", details: "Located at the community center noticeboard." },
    ],
    'Community Groups': [
        { name: "Youth Sports League", details: "Football and basketball teams. Sign-ups at the youth center." },
        { name: "Women's Empowerment Association", details: "Weekly meetings on Wednesdays at the community hall." },
    ],
    'Official Services': [
        { name: "Camp Administration Office", details: "For registration and official inquiries. Open weekdays 9am-4pm." },
        { name: "Legal Aid Clinic", details: "Free legal advice on Tuesdays at the community hall." },
    ],
    'Safety & Security': [
        { name: "Main Security Post", details: "Located at the camp entrance, open 24/7." },
        { name: "Emergency Hotline", details: "Dial 112 for any emergencies." },
    ],
};

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

    const ServiceCategoryButton: React.FC<{ category: string; }> = ({ category }) => {
        const Icon = categoryIcons[category];
        const isActive = activeCategory === category;
        return (
            <button onClick={() => setActiveCategory(category)} className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all text-center ${isActive ? 'bg-deep-red/10 dark:bg-gold/10 scale-105' : 'bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50'}`}>
                <Icon className={`w-8 h-8 ${isActive ? 'text-deep-red dark:text-gold' : 'text-slate-500'}`} />
                <span className={`font-semibold text-sm ${isActive ? 'text-deep-red dark:text-gold' : ''}`}>{category}</span>
            </button>
        )
    };

    return (
        <div className="animate-fade-in">
            <header className="flex items-center justify-between mb-8">
                <button onClick={onClose} className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold">
                    <ChevronLeftIcon className="w-5 h-5"/> {t('backToHome')}
                </button>
                <div>
                     <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white text-right">Mahama Community Hub</h1>
                     <p className="text-slate-500 text-right">Your guide to local services & events.</p>
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <main className="md:col-span-2 space-y-8">
                    {/* Directory */}
                    <section className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Local Directory</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                            {Object.keys(directoryData).map(cat => <ServiceCategoryButton key={cat} category={cat} />)}
                        </div>
                        <div className="space-y-3 min-h-[150px]">
                            {activeCategory && directoryData[activeCategory as keyof typeof directoryData].map((item, i) => (
                                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md animate-fade-in">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-slate-500">{item.details}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    {/* Events */}
                    <section className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
                        <div className="space-y-4">
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
                    </section>

                    {/* Bulletin Board */}
                     <section className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Bulletin Board</h2>
                         <div className="space-y-4">
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
                    </section>
                </main>

                <aside className="md:col-span-1 space-y-8">
                    <div className="sticky top-28 space-y-8">
                        {settings.subscriptionTier === 'Free' && <SubscriptionCard onClick={onGoPremium} />}
                        <TrendingNews articles={trendingArticles} onArticleClick={onArticleClick} />
                        <ThisDayInHistory settings={settings} />
                        <WeatherWidget weatherData={weatherData} isLoading={isWeatherLoading} />
                        <CommunityPoll />
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default MahamaServicesPage;