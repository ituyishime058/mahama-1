import React, { useState } from 'react';
import type { Settings } from '../types';

// Icons
import CloseIcon from './icons/CloseIcon';
import MahamaServicesIcon from './icons/MahamaServicesIcon';
import NewspaperIcon from './icons/NewspaperIcon';
import IndustryIcon from './icons/IndustryIcon';
import EntertainmentIcon from './icons/EntertainmentIcon';
import ScrollIcon from './icons/ScrollIcon';
import TourismIcon from './icons/TourismIcon';
import UsersIcon from './icons/UsersIcon';
import LinkIcon from './icons/LinkIcon';
import AgricultureIcon from './icons/AgricultureIcon';
import MiningIcon from './icons/MiningIcon';


interface MahamaServicesPageProps {
  onClose: () => void;
  settings: Settings;
}

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; className?: string }> = ({ icon, title, children, className = '' }) => (
  <section className={`mb-12 ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg text-deep-red dark:text-gold flex-shrink-0">{icon}</div>
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">{title}</h2>
    </div>
    <div className="pl-12">{children}</div>
  </section>
);

const MahamaServicesPage: React.FC<MahamaServicesPageProps> = ({ onClose }) => {
  const mapEmbed = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4209.920137462118!2d30.6389530752215!3d-2.2631997374747073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c4c500078c5f45%3A0xc3605c2533855d6b!2sMahama%20refugee%20camp!5e1!3m2!1sen!2srw!4v1761018194729!5m2!1sen!2srw" width="100%" height="350" style="border:0; border-radius: 0.5rem;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  
  const [activeEcoTab, setActiveEcoTab] = useState('Agriculture');

  const leaders = [
    { name: 'John Doe', title: 'Camp Manager', img: 'https://i.pravatar.cc/150?u=leader1' },
    { name: 'Jane Smith', title: 'Community Leader', img: 'https://i.pravatar.cc/150?u=leader2' },
    { name: 'Peter Jones', title: 'District Mayor', img: 'https://i.pravatar.cc/150?u=leader3' },
  ];

  const kireheNews = [
    { title: 'New Market Opens in Kirehe Town', date: 'Oct 28, 2023', link: '#' },
    { title: 'Local Cooperative Receives Farming Grant', date: 'Oct 25, 2023', link: '#' },
    { title: 'Youth Sports Tournament Concludes', date: 'Oct 22, 2023', link: '#' },
  ];
  
  const historyEvents = [
    { year: '1996', description: 'Kirehe District is formed as part of administrative reforms following the 1994 Genocide against the Tutsi.' },
    { year: '2015', description: 'Mahama Refugee Camp is established in response to the Burundian refugee crisis.' },
    { year: '2020', description: 'Launch of major agricultural development projects in the district, focusing on irrigation and crop diversification.' },
  ];
  
  const diasporaVoices = [
    { quote: "Though I live abroad, my heart remains in Kirehe. I am proud to see the progress and contribute where I can.", author: "Marie-Claire, Canada" },
    { quote: "The diaspora network is a powerful tool for development. We are connecting resources and knowledge back home.", author: "David, Belgium" },
  ];
  
  const tourismSpots = [
      { name: 'Akagera National Park', desc: 'A short drive from Kirehe, offering stunning landscapes and Big Five safaris.', img: 'https://picsum.photos/seed/akagera/400/300' },
      { name: 'Rusumo Falls', desc: 'Powerful waterfalls on the Kagera river, at the border of Rwanda and Tanzania.', img: 'https://picsum.photos/seed/rusumo/400/300' },
  ];
  
  const talentSpotlight = { name: 'The "Mahama Drummers"', desc: 'A youth group preserving traditional drumming and dance, performing regularly at community events.', img: 'https://picsum.photos/seed/drummers/600/400' };

  return (
    <div className="animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <MahamaServicesIcon className="w-12 h-12 text-deep-red dark:text-gold" />
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Mahama & Kirehe Hub</h1>
            <p className="text-slate-500 dark:text-slate-400">Community Information and Services Portal</p>
          </div>
        </div>
        <button onClick={onClose} className="px-6 py-3 self-end bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Close</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
            <Section icon={<UsersIcon />} title="Management & Leaders">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {leaders.map(leader => (
                        <div key={leader.name} className="p-4 bg-white dark:bg-slate-800/50 rounded-lg text-center shadow transition-transform hover:scale-105">
                            <img src={leader.img} alt={leader.name} className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-gold/50" />
                            <h4 className="font-bold">{leader.name}</h4>
                            <p className="text-sm text-slate-500">{leader.title}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section icon={<NewspaperIcon />} title="Latest from Kirehe">
                <ul className="space-y-3">
                    {kireheNews.map(news => (
                        <li key={news.title} className="p-3 bg-white dark:bg-slate-800/50 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                            <a href={news.link} className="flex justify-between items-center">
                                <span className="font-semibold">{news.title}</span>
                                <span className="text-xs text-slate-500 flex-shrink-0 ml-4">{news.date}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </Section>
            
            <Section icon={<IndustryIcon />} title="Economic Sectors">
                <div className="flex border-b border-slate-200 dark:border-slate-700 mb-4">
                    {['Agriculture', 'Industry', 'Mining'].map(tab => (
                        <button key={tab} onClick={() => setActiveEcoTab(tab)} className={`px-4 py-2 font-semibold text-sm transition-colors ${activeEcoTab === tab ? 'border-b-2 border-deep-red text-deep-red dark:text-gold' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeEcoTab === 'Agriculture' && <>
                        <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg"><h4 className="font-bold">Key Crops:</h4><p className="text-sm">Maize, beans, cassava, and bananas form the agricultural backbone.</p></div>
                        <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg"><h4 className="font-bold">Techniques:</h4><p className="text-sm">Focus on irrigation and terracing to maximize yield on hilly terrain.</p></div>
                    </>}
                    {activeEcoTab === 'Industry' && <>
                         <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg"><h4 className="font-bold">Local Crafts:</h4><p className="text-sm">Weaving cooperatives produce traditional 'agaseke' baskets.</p></div>
                         <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg"><h4 className="font-bold">Processing:</h4><p className="text-sm">Small-scale milling factories for maize and cassava are common.</p></div>
                    </>}
                    {activeEcoTab === 'Mining' && <>
                         <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg"><h4 className="font-bold">Resources:</h4><p className="text-sm">Artisanal mining for cassiterite (tin ore) is a key activity in some areas.</p></div>
                         <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg"><h4 className="font-bold">Safety Initiatives:</h4><p className="text-sm">Programs to improve safety standards and provide proper equipment.</p></div>
                    </>}
                </div>
            </Section>

            <Section icon={<EntertainmentIcon />} title="Entertainment & Talent">
                <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-lg overflow-hidden">
                    <img src={talentSpotlight.img} alt={talentSpotlight.name} className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h4 className="font-bold text-lg text-gold">Talent Spotlight: {talentSpotlight.name}</h4>
                        <p className="text-sm mt-1">{talentSpotlight.desc}</p>
                    </div>
                </div>
            </Section>

            <Section icon={<ScrollIcon />} title="History of Kirehe">
                 <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-2">
                    {historyEvents.map((event, index) => (
                    <div key={index} className="mb-6 pl-8 relative">
                        <div className="absolute -left-[10px] top-1 bg-gold w-4 h-4 rounded-full border-2 border-white dark:border-slate-800"></div>
                        <p className="font-bold text-md text-deep-red dark:text-gold">{event.year}</p>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">{event.description}</p>
                    </div>
                    ))}
                </div>
                <h4 className="font-bold mt-6 mb-2">Voices of the Diaspora</h4>
                {diasporaVoices.map((voice, i) => <blockquote key={i} className="p-3 border-l-4 border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800/50 text-sm italic rounded-r-lg mb-2">"{voice.quote}" <cite className="block not-italic text-right text-xs mt-1">- {voice.author}</cite></blockquote>)}
            </Section>

            <Section icon={<TourismIcon />} title="Tourism in Kirehe">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {tourismSpots.map(spot => (
                         <div key={spot.name} className="group relative rounded-lg overflow-hidden shadow-lg">
                             <img src={spot.img} alt={spot.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                             <div className="absolute bottom-0 left-0 p-4 text-white">
                                <h4 className="font-bold">{spot.name}</h4>
                                <p className="text-xs opacity-80">{spot.desc}</p>
                             </div>
                         </div>
                     ))}
                 </div>
            </Section>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
            <div className="lg:sticky top-28 space-y-8">
                <div>
                    <h3 className="text-xl font-bold mb-2">Location Map</h3>
                    <div className="rounded-lg overflow-hidden shadow-lg" dangerouslySetInnerHTML={{ __html: mapEmbed }} />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Community Quick Links</h3>
                    <div className="space-y-2">
                         {['Emergency Services', 'Report an Issue', 'Community Calendar', 'Official Documents'].map(link => (
                            <a key={link} href="#" className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/50 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow hover:shadow-md">
                                <span className="font-semibold">{link}</span>
                                <LinkIcon className="w-4 h-4 text-slate-400"/>
                            </a>
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">Notice Board</h3>
                     <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-lg shadow-sm">
                        <h4 className="font-bold">Community Meeting</h4>
                        <p className="text-sm">A meeting will be held on Nov 5th at the community hall to discuss water distribution.</p>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MahamaServicesPage;
