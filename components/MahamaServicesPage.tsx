import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import NewspaperIcon from './icons/NewspaperIcon';
import WorkSkillsIcon from './icons/WorkSkillsIcon';
import UsersIcon from './icons/UsersIcon';
import PhoneIcon from './icons/PhoneIcon';
import AmbulanceIcon from './icons/AmbulanceIcon';
import ShieldExclamationIcon from './icons/ShieldExclamationIcon';
import { mockArticles } from '../constants'; // For Kirehe News

import { useTranslation } from '../hooks/useTranslation';
import type { Article, Settings, WeatherData } from '../types';
import RightAside from './RightAside'; // Re-importing the RightAside

// Mock Data for new sections
const kireheNews = mockArticles.filter(a => a.category === 'World' || a.region === 'Africa').slice(0, 5);

const leaders = [
    { name: "Esther Mutoni", title: "Camp Manager", office: "Main Administration Office", avatar: "https://i.pravatar.cc/150?u=esther" },
    { name: "Jean-Pierre Nsenga", title: "District Mayor, Kirehe", office: "Kirehe District Office", avatar: "https://i.pravatar.cc/150?u=jean" },
    { name: "Aline Uwera", title: "Community Health Lead", office: "Mahama Health Center", avatar: "https://i.pravatar.cc/150?u=aline" },
];

const opportunities = [
    { title: "Tailoring Apprenticeship", organization: "Community Sewing Cooperative", type: "Training" },
    { title: "Farm Hand for Maize Harvest", organization: "Local Farmers Union", type: "Job" },
    { title: "IT Skills Workshop", organization: "Youth Learning Center", type: "Training" },
    { title: "Market Stall Assistant", organization: "Central Market Vendors", type: "Job" },
];


interface MahamaServicesPageProps {
    onClose: () => void;
    weatherData: WeatherData | null;
    isWeatherLoading: boolean;
    trendingArticles: Article[];
    onArticleClick: (article: Article) => void;
    settings: Settings;
    onGoPremium: () => void;
}

const MahamaServicesPage: React.FC<MahamaServicesPageProps> = (props) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'events' | 'notices'>('events');

    const eventsData = [
        { date: "25", month: "DEC", title: "Community Christmas Celebration", time: "2:00 PM @ Community Hall" },
        { date: "01", month: "JAN", title: "New Year's Football Match", time: "4:00 PM @ Central Field" },
    ];

    const noticesData = [
        { title: "Water distribution schedule update", content: "New schedule will be effective from next Monday.", posted: "3 days ago" },
        { title: "Youth vocational training registration", content: "Registration is now open. Visit the youth center.", posted: "1 week ago" },
    ];


    const NewsCard: React.FC<{ article: Article }> = ({ article }) => (
        <div className="flex-shrink-0 w-72 group cursor-pointer" onClick={() => props.onArticleClick(article)}>
            <div className="relative overflow-hidden rounded-lg aspect-video mb-2">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h4 className="font-semibold leading-tight group-hover:underline text-sm">{article.title}</h4>
            <p className="text-xs text-slate-500">{article.date}</p>
        </div>
    );
    
    const LeaderProfileCard: React.FC<{ leader: typeof leaders[0] }> = ({ leader }) => (
         <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg flex items-center gap-4">
            <img src={leader.avatar} alt={leader.name} className="w-16 h-16 rounded-full flex-shrink-0" />
            <div>
                <h4 className="font-bold">{leader.name}</h4>
                <p className="text-sm text-deep-red dark:text-gold font-semibold">{leader.title}</p>
                <p className="text-xs text-slate-500">{leader.office}</p>
            </div>
        </div>
    );

    const OpportunityCard: React.FC<{ opp: typeof opportunities[0] }> = ({ opp }) => (
        <div className="p-4 border-l-4 rounded-r-lg bg-slate-50 dark:bg-slate-800/30" style={{ borderColor: opp.type === 'Job' ? '#b91c1c' : '#d97706' }}>
            <div className="flex justify-between items-center">
                <h4 className="font-bold">{opp.title}</h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${opp.type === 'Job' ? 'bg-deep-red/10 text-deep-red' : 'bg-gold/10 text-gold'}`}>{opp.type}</span>
            </div>
            <p className="text-sm text-slate-500">{opp.organization}</p>
        </div>
    );


    return (
        <div className="animate-fade-in">
            <header className="flex items-center justify-between mb-6">
                <button onClick={props.onClose} className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold">
                    <ChevronLeftIcon className="w-5 h-5"/> {t('backToHome')}
                </button>
                <div>
                     <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white text-right">Mahama Community Hub</h1>
                     <p className="text-slate-500 text-right">Your guide to local services, news & events.</p>
                </div>
            </header>
            
            <section className="mb-8 p-4 bg-deep-red text-white rounded-lg shadow-lg">
                <h3 className="font-bold text-center mb-3 text-lg">Emergency & Quick Contacts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <a href="tel:111" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <ShieldExclamationIcon className="w-8 h-8 mx-auto mb-1"/>
                        <p className="font-semibold">Security</p><p className="font-mono text-sm">111</p>
                    </a>
                    <a href="tel:112" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <AmbulanceIcon className="w-8 h-8 mx-auto mb-1"/>
                        <p className="font-semibold">Medical Emergency</p><p className="font-mono text-sm">112</p>
                    </a>
                    <a href="tel:0788-XXX-XXX" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <PhoneIcon className="w-8 h-8 mx-auto mb-1"/>
                        <p className="font-semibold">Info Line</p><p className="font-mono text-sm">0788-XXX-XXX</p>
                    </a>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <main className="md:col-span-2 space-y-8">

                    <section className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Camp Location</h2>
                        <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4209.920137462118!2d30.6389530752215!3d-2.2631997374747073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c4c500078c5f45%3A0xc3605c2533855d6b!2sMahama%20refugee%20camp!5e1!3m2!1sen!2srw!4v1761018194729!5m2!1sen!2srw" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><NewspaperIcon/> Latest from Kirehe</h2>
                        <div className="relative">
                            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                                {kireheNews.map(article => <NewsCard key={article.id} article={article} />)}
                            </div>
                        </div>
                    </section>

                    <section className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><UsersIcon/> Camp Leadership</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {leaders.map(leader => <LeaderProfileCard key={leader.name} leader={leader} />)}
                        </div>
                    </section>

                    <section className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><WorkSkillsIcon/> Local Opportunities</h2>
                        <div className="space-y-4">
                           {opportunities.map(opp => <OpportunityCard key={opp.title} opp={opp} />)}
                        </div>
                    </section>
                    
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
                                        <div className="text-center flex-shrink-0 w-16"><p className="text-3xl font-bold text-deep-red dark:text-gold">{event.date}</p><p className="text-sm font-semibold uppercase">{event.month}</p></div>
                                        <div className="border-l-2 border-slate-200 dark:border-slate-700 pl-4"><p className="font-semibold">{event.title}</p><p className="text-sm text-slate-500">{event.time}</p></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <div className="space-y-4 animate-fade-in">
                                {noticesData.map((notice, i) => (
                                    <div key={i} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400">
                                        <div className="flex justify-between items-center"><h4 className="font-bold">{notice.title}</h4><p className="text-xs text-slate-500">{notice.posted}</p></div>
                                        <p className="text-sm mt-1">{notice.content}</p>
                                    </div>
                                ))}
                             </div>
                        )}
                    </section>
                </main>

                 <aside className="md:col-span-1 space-y-8">
                    <div className="sticky top-28 space-y-8">
                       <RightAside {...props} />
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default MahamaServicesPage;
