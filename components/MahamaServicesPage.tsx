import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage, Settings } from '../types';
import { getMahamaInfo } from '../utils/ai';

// Icon Imports
import CloseIcon from './icons/CloseIcon';
import SendIcon from './icons/SendIcon';
import MahamaServicesIcon from './icons/MahamaServicesIcon';
import HealthIcon from './icons/HealthIcon';
import EducationIcon from './icons/EducationIcon';
import CommunityHubIcon from './icons/CommunityHubIcon';
import FinanceIcon from './icons/FinanceIcon';
import YouthIcon from './icons/YouthIcon';
import AgricultureIcon from './icons/AgricultureIcon';
import IndustryIcon from './icons/IndustryIcon';
import MiningIcon from './icons/MiningIcon';
import TourismIcon from './icons/TourismIcon';
import EntertainmentIcon from './icons/EntertainmentIcon';
import SportsIcon from './icons/SportsIcon';
import EnvironmentIcon from './icons/EnvironmentIcon';
import PhoneIcon from './icons/PhoneIcon';
import NewspaperIcon from './icons/NewspaperIcon';

// Component Imports
import { useTranslation } from '../hooks/useTranslation';
import ServiceDetailPage from './ServiceDetailPage';
import HealthSectorPage from './HealthSectorPage';
import EducationSectorPage from './EducationSectorPage';
import CommunitySectorPage from './CommunitySectorPage';
import YouthDevelopmentPage from './YouthDevelopmentPage';
import FinancePage from './FinancePage';
import AgricultureSectorPage from './AgricultureSectorPage';
import IndustrySectorPage from './IndustrySectorPage';
import MiningSectorPage from './MiningSectorPage';
import TourismPage from './TourismPage';
import EntertainmentPage from './EntertainmentPage';
import SportsPage from './SportsPage';
import EnvironmentPage from './EnvironmentPage';


const serviceCategories = [
  { name: 'Health', icon: HealthIcon, component: HealthSectorPage },
  { name: 'Education', icon: EducationIcon, component: EducationSectorPage },
  { name: 'Community', icon: CommunityHubIcon, component: CommunitySectorPage },
  { name: 'Youth Development', icon: YouthIcon, component: YouthDevelopmentPage },
  { name: 'Finance', icon: FinanceIcon, component: FinancePage },
  { name: 'Agriculture', icon: AgricultureIcon, component: AgricultureSectorPage },
  { name: 'Industry', icon: IndustryIcon, component: IndustrySectorPage },
  { name: 'Mining', icon: MiningIcon, component: MiningSectorPage },
  { name: 'Tourism', icon: TourismIcon, component: TourismPage },
  { name: 'Entertainment', icon: EntertainmentIcon, component: EntertainmentPage },
  { name: 'Sports', icon: SportsIcon, component: SportsPage },
  { name: 'Environment', icon: EnvironmentIcon, component: EnvironmentPage },
];

interface MahamaServicesPageProps {
  onClose: () => void;
  settings: Settings;
}

const ServiceCard: React.FC<{ name: string; icon: React.FC<any>; onSelect: () => void; }> = ({ name, icon: Icon, onSelect }) => (
  <button
    onClick={onSelect}
    className="group relative flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 dark:hover:shadow-gold/10 transform hover:-translate-y-1"
  >
    <div className="p-3 bg-deep-red/10 dark:bg-gold/10 rounded-full mb-3 transition-transform duration-300 group-hover:scale-110">
      <Icon className="w-6 h-6 text-deep-red dark:text-gold" />
    </div>
    <h3 className="font-bold text-md text-slate-800 dark:text-white">{name}</h3>
  </button>
);


const MahamaServicesPage: React.FC<MahamaServicesPageProps> = ({ onClose, settings }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  
  const ActiveComponent = serviceCategories.find(c => c.name === activeCategory)?.component;

  useEffect(() => {
    setMessages([{ role: 'model', content: t('mahamaWelcome'), id: Date.now() }]);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        },
        () => {
            // setError(t('mahamaGeolocation')); // Don't show error by default
        }
    );
  }, [t]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent | string) => {
    if (typeof e !== 'string') e.preventDefault();
    const question = (typeof e === 'string') ? e : input;
    if (!question.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: question, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    if (typeof e !== 'string') setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await getMahamaInfo(question, location, settings);
      const modelMessage: ChatMessage = { role: 'model', content: response, id: Date.now() + 1 };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err: any) {
      setError(err.message || 'Failed to get information.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const starterPrompts = [t('mahamaPrompt1'), t('mahamaPrompt2'), t('mahamaPrompt3')];

  return (
    <div className="animate-fade-in">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Mahama Services</h1>
          <p className="text-slate-500 dark:text-slate-400">Your central hub for services and information in Mahama.</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <CloseIcon />
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2">
          {ActiveComponent ? (
            <ServiceDetailPage title={activeCategory!} onBack={() => setActiveCategory(null)}>
              <ActiveComponent />
            </ServiceDetailPage>
          ) : (
            <div className="space-y-8">
              <div className="h-[400px] rounded-lg overflow-hidden shadow-lg border-2 border-slate-200 dark:border-slate-700">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d33720.905719681876!2d30.62771907143557!3d-2.2624932009653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1skirehe%20nyakarambi!5e1!3m2!1sen!2srw!4v1761059383673!5m2!1sen!2srw" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Explore Service Sectors</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {serviceCategories.map(cat => (
                    <ServiceCard key={cat.name} name={cat.name} icon={cat.icon} onSelect={() => setActiveCategory(cat.name)} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
        
        <aside className="lg:col-span-1">
          <div className="sticky top-28 space-y-8">
            <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md flex flex-col h-[75vh] max-h-[800px]">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                  <div className="flex items-center gap-3">
                      <MahamaServicesIcon className="w-6 h-6 text-deep-red dark:text-gold" />
                      <div>
                          <h3 className="font-bold text-lg">AI Assistant</h3>
                      </div>
                  </div>
              </div>
              <div className="p-4 flex-grow overflow-y-auto space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-lg text-sm prose dark:prose-invert max-w-none ${msg.role === 'user' ? 'bg-deep-red text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
                            <p dangerouslySetInnerHTML={{__html: msg.content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>')}}></p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700">
                            <span className="inline-block w-2 h-4 bg-slate-500 dark:bg-slate-300 animate-blink"></span>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef}></div>
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                  {messages.length <= 1 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                          {starterPrompts.map(prompt => (
                              <button key={prompt} onClick={() => handleSubmit(prompt)} className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-full text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                                  {prompt}
                              </button>
                          ))}
                      </div>
                  )}
                  {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                  <form onSubmit={handleSubmit}>
                      <div className="relative">
                      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t('mahamaAskPlaceholder')} disabled={isLoading} className="w-full p-3 pr-12 bg-slate-100 dark:bg-slate-700 rounded-full border-transparent focus:ring-2 focus:ring-deep-red"/>
                      <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-deep-red text-white rounded-full flex items-center justify-center disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-colors">
                          <SendIcon className="w-5 h-5" />
                      </button>
                      </div>
                  </form>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MahamaServicesPage;