

import React from 'react';
import type { Article, NetworkNode, NetworkLink } from '../types';
import { mockArticles } from '../constants'; // Using mock data for now
import NetworkIcon from './icons/NetworkIcon';
import InvestigatesIcon from './icons/InvestigatesIcon';

interface MahamaInvestigatesPageProps {
  onArticleClick: (article: Article) => void;
}

// Mock data for the network graph
const nodes: NetworkNode[] = [
    { id: 'QuantumLeap', type: 'company' },
    { id: 'BioSynth', type: 'company' },
    { id: 'StellarForge', type: 'company' },
    { id: 'USA', type: 'country' },
    { id: 'China', type: 'country' },
    { id: 'Dr. Evelyn Reed', type: 'person' },
];

const links: NetworkLink[] = [
    { source: 'QuantumLeap', target: 'USA' },
    { source: 'QuantumLeap', target: 'Dr. Evelyn Reed' },
    { source: 'BioSynth', target: 'China' },
    { source: 'StellarForge', target: 'USA' },
    { source: 'Dr. Evelyn Reed', target: 'StellarForge' },
];

const MahamaInvestigatesPage: React.FC<MahamaInvestigatesPageProps> = ({ onArticleClick }) => {
    const leadArticle = mockArticles.find(a => a.category === 'Technology') || mockArticles[3];
    const relatedArticles = mockArticles.filter(a => a.category === 'World' || a.category === 'Economy').slice(0, 4);

    return (
        <div className="animate-fade-in text-white -mx-4 sm:-mx-6 lg:-mx-8 bg-navy">
             <header className="relative p-8 md:p-12 text-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 opacity-50"></div>
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-4">
                        <InvestigatesIcon className="w-12 h-12 text-deep-red" />
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Mahama Investigates</h1>
                    </div>
                    <p className="mt-4 max-w-3xl mx-auto text-slate-300">
                        Uncovering the stories behind the headlines. Our in-depth reports connect the dots on the world's most complex issues.
                    </p>
                </div>
            </header>

            <div className="p-4 sm:p-6 lg:p-8">
                {/* Lead Investigation */}
                <section className="mb-12">
                     <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
                        Featured Investigation
                    </h2>
                     <div 
                        className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-800/50 p-6 rounded-lg cursor-pointer"
                        onClick={() => onArticleClick(leadArticle)}
                    >
                        <div className="relative overflow-hidden rounded-lg aspect-video">
                            <img src={leadArticle.imageUrl} alt={leadArticle.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <div>
                            <p className="font-semibold uppercase tracking-wider text-deep-red mb-2">{leadArticle.category}</p>
                            <h3 className="text-3xl font-extrabold !leading-tight tracking-tight mb-4 group-hover:text-gold transition-colors">{leadArticle.title}</h3>
                            <p className="text-slate-300">{leadArticle.excerpt}</p>
                        </div>
                    </div>
                </section>

                {/* Network Graph Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4 flex items-center gap-3">
                       <NetworkIcon/> Investigation Network
                    </h2>
                    <div className="p-6 bg-slate-800/50 rounded-lg">
                        <p className="text-slate-400 mb-4">This interactive graph visualizes the connections between key entities in our ongoing investigations. Click on nodes to explore further.</p>
                        <div className="w-full h-96 bg-slate-900/50 rounded flex items-center justify-center text-slate-500">
                           <p>Interactive Network Graph Placeholder</p>
                        </div>
                    </div>
                </section>

                {/* Related Articles */}
                <section>
                    <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
                        From the Archives
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedArticles.map(article => (
                            <div key={article.id} className="group cursor-pointer" onClick={() => onArticleClick(article)}>
                                <div className="relative overflow-hidden rounded-lg aspect-video mb-2">
                                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <p className="text-xs font-semibold uppercase text-deep-red">{article.category}</p>
                                <h4 className="font-semibold leading-tight group-hover:underline">{article.title}</h4>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default MahamaInvestigatesPage;
