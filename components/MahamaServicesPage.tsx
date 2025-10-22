import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import NewspaperIcon from './icons/NewspaperIcon';
import WorkSkillsIcon from './icons/WorkSkillsIcon';
import UsersIcon from './icons/UsersIcon';
import PhoneIcon from './icons/PhoneIcon';
import AmbulanceIcon from './icons/AmbulanceIcon';
import ShieldExclamationIcon from './icons/ShieldExclamationIcon';
import MusicIcon from './icons/MusicIcon';
import ScrollIcon from './icons/ScrollIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import { mockArticles } from '../constants';

import { useTranslation } from '../hooks/useTranslation';
import type { Article, Settings, WeatherData } from '../types';
import RightAside from './RightAside';

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

const featuredTalent = {
    name: "Samuel 'Sami' Izere",
    bio: "A gifted singer-songwriter from Mahama, Sami blends traditional Rwandan sounds with modern acoustic folk. His music tells stories of hope, resilience, and community.",
    avatar: "https://i.pravatar.cc/150?u=samuel",
    mediaUrl: "#", // Placeholder
};

const entertainmentEvents = [
    { date: "SAT", time: "7:00 PM", title: "Open Mic Night", location: "Community Hall Stage" },
    { date: "SUN", time: "3:00 PM", title: "Traditional Dance Showcase", location: "Central Field" },
];

const kireheHistory = [
    { year: "1962", event: "Kirehe District is formally established as part of the newly independent Republic of Rwanda." },
    { year: "1994", event: "The district is profoundly affected by the Genocide against the Tutsi, a period of immense loss and subsequent rebuilding." },
    { year: "2006", event: "As part of national administrative reforms, Kirehe's boundaries are redefined to their current state within the Eastern Province." },
    { year: "2015", event: "Mahama Refugee Camp is established to host Burundian refugees, becoming one of the largest in the country." },
    { year: "2020s", event: "Focus on modern agriculture, cross-border trade with Tanzania, and sustainable development projects." },
];

const diasporaStories = [
    { quote: "Though I live in Canada, my heart remembers the hills of Kirehe. I support the local youth center to give back.", author: "Marie, Toronto" },
    { quote: "The skills I learned in Kirehe have helped me build a business in Belgium. I am proud of my roots.", author: "David, Brussels" },
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
    const [communityTab, setCommunityTab] = useState<'events' | 'notices'>('events');
    const [entertainmentTab, setEntertainmentTab] = useState<'spotlight' | 'shows' | 'signup'>('spotlight');

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
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><MusicIcon/> Entertainment & Talent Hub</h2>
                        <div className="flex border-b border-slate-200 dark:border-slate-700 mb-4">
                            <button onClick={() => setEntertainmentTab('spotlight')} className={`px-4 py-2 font-semibold ${entertainmentTab === 'spotlight' ? 'border-b-2 border-deep-red text-deep-red dark:text-gold' : 'text-slate-500'}`}>Talent Spotlight</button>
                            <button onClick={() => setEntertainmentTab('shows')} className={`px-4 py-2 font-semibold ${entertainmentTab === 'shows' ? 'border-b-2 border-deep-red text-deep-red dark:text-gold' : 'text-slate-500'}`}>Upcoming Shows</button>
                            <button onClick={() => setEntertainmentTab('signup')} className={`px-4 py-2 font-semibold ${entertainmentTab === 'signup' ? 'border-b-2 border-deep-red text-deep-red dark:text-gold' : 'text-slate-500'}`}>Open Mic Signup</button>
                        </div>
                        <div className="animate-fade-in">
                            {entertainmentTab === 'spotlight' && (
                                <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                                    <img src={featuredTalent.avatar} alt={featuredTalent.name} className="w-24 h-24 rounded-full flex-shrink-0" />
                                    <div>
                                        <h4 className="text-xl font-bold">{featuredTalent.name}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 my-2">{featuredTalent.bio}</p>
                                        <button className="flex items-center gap-2 text-sm font-semibold text-deep-red dark:text-gold hover:underline">
                                            <PlayCircleIcon className="w-5 h-5"/> Listen to their latest track
                                        </button>
                                    </div>
                                </div>
                            )}
                            {entertainmentTab === 'shows' && (
                                <div className="space-y-3">
                                    {entertainmentEvents.map((event, i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                            <div className="text-center font-bold text-deep-red dark:text-gold">{event.date}</div>
                                            <div>
                                                <p className="font-semibold">{event.title}</p>
                                                <p className="text-sm text-slate-500">{event.time} @ {event.location}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {entertainmentTab === 'signup' && (
                                <form className="space-y-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                    <h4 className="font-bold">Sign up for the next Open Mic!</h4>
                                    <input type="text" placeholder="Your Name" className="w-full p-2 rounded bg-white dark:bg-slate-700"/>
                                    <input type="text" placeholder="Type of Talent (e.g., Singer, Poet)" className="w-full p-2 rounded bg-white dark:bg-slate-700"/>
                                    <button type="submit" className="w-full py-2 bg-deep-red text-white font-semibold rounded-lg">Submit</button>
                                </form>
                            )}
                        </div>
                    </section>

                    <section className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><ScrollIcon/> History of Kirehe</h2>
                        <div className="relative mb-6">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700"></div>
                            <div className="relative flex justify-between">
                                {kireheHistory.map((item, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center group">
                                        <div className="w-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-full group-hover:bg-gold transition-colors"></div>
                                        <div className="absolute top-6 w-40 text-center">
                                            <p className="font-bold text-sm">{item.year}</p>
                                            <p className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{item.event}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="mt-20">
                            <h3 className="text-xl font-bold mb-4 text-center">Voices of the Diaspora</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {diasporaStories.map((story, i) => (
                                    <blockquote key={i} className="p-4 border-l-4 border-gold bg-slate-100 dark:bg-slate-800 rounded-r-lg">
                                        <p className="italic">"{story.quote}"</p>
                                        <cite className="block text-right not-italic font-semibold text-sm mt-2">- {story.author}</cite>
                                    </blockquote>
                                ))}
                            </div>
                        </div>
                    </section>
                    
                     <section className="p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Community Updates</h2>
                        <div className="flex border-b border-slate-200 dark:border-slate-700 mb-4">
                            <button onClick={() => setCommunityTab('events')} className={`px-4 py-2 font-semibold ${communityTab === 'events' ? 'border-b-2 border-deep-red text-deep-red dark:text-gold' : 'text-slate-500'}`}>Events</button>
                            <button onClick={() => setCommunityTab('notices')} className={`px-4 py-2 font-semibold ${communityTab === 'notices' ? 'border-b-2 border-deep-red text-deep-red dark:text-gold' : 'text-slate-500'}`}>Notices</button>
                        </div>
                        {communityTab === 'events' ? (
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