import React, { useState, useEffect, useMemo } from 'react';
// FIX: Import NetworkNode and NetworkLink from the central types file.
import type { Article, Settings, NetworkNode, NetworkLink } from '../types';
import { generateInvestigationSummary, identifyKeyPlayers } from '../utils/ai';
import LoadingSpinner from './icons/LoadingSpinner';
import SparklesIcon from './icons/SparklesIcon';
import NetworkIcon from './icons/NetworkIcon';
import TimelineIcon from './icons/TimelineIcon';
import ChartBarIcon from './icons/ChartBarIcon';

interface MahamaInvestigatesPageProps {
  settings: Settings;
  onArticleClick: (article: Article) => void;
  allArticles: Article[];
}

const investigationTopic = "The Global Semiconductor Shortage";

// FIX: Update local type definitions to use the imported shared types.
type Node = NetworkNode & { x: number; y: number };
type Link = NetworkLink;

// FIX: Update the component's props to use the shared types.
const KeyPlayerNetwork: React.FC<{ data: { nodes: NetworkNode[], links: Link[] } }> = ({ data }) => {
    const layout = useMemo(() => {
        if (!data || !data.nodes) return { nodes: [], links: [] };
        const radius = 120;
        const centerX = 150;
        const centerY = 150;
        const angleStep = (2 * Math.PI) / data.nodes.length;
        
        const nodes: Node[] = data.nodes.map((node, i) => ({
            ...node,
            x: centerX + radius * Math.cos(i * angleStep),
            y: centerY + radius * Math.sin(i * angleStep),
        }));
        
        return { nodes, links: data.links };
    }, [data]);
    
    if (layout.nodes.length === 0) return null;

    const getNodeById = (id: string) => layout.nodes.find(n => n.id === id);

    return (
        <svg viewBox="0 0 300 300" className="w-full h-auto">
            <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                </marker>
            </defs>
            {layout.links.map((link, i) => {
                const source = getNodeById(link.source);
                const target = getNodeById(link.target);
                if (!source || !target) return null;
                return (
                    <line
                        key={i}
                        x1={source.x} y1={source.y}
                        x2={target.x} y2={target.y}
                        className="stroke-slate-400 dark:stroke-slate-600"
                        strokeWidth="1.5"
                        markerEnd="url(#arrow)"
                    />
                );
            })}
            {layout.nodes.map(node => (
                <g key={node.id} className="group cursor-pointer">
                    <circle cx={node.x} cy={node.y} r="8" className="fill-gold group-hover:fill-deep-red transition-colors" />
                    <text x={node.x} y={node.y} dy="-12" textAnchor="middle" className="text-xs font-bold fill-slate-700 dark:fill-slate-300 group-hover:fill-deep-red dark:group-hover:fill-gold transition-colors">
                        {node.id}
                    </text>
                </g>
            ))}
        </svg>
    );
};

const MahamaInvestigatesPage: React.FC<MahamaInvestigatesPageProps> = ({ settings, onArticleClick, allArticles }) => {
  const [summary, setSummary] = useState({ overview: '', status: '' });
  // FIX: Update the state to use the imported shared types.
  const [keyPlayers, setKeyPlayers] = useState<{ nodes: NetworkNode[], links: NetworkLink[] }>({ nodes: [], links: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const [summaryResult, playersResult] = await Promise.all([
          generateInvestigationSummary(investigationTopic, settings),
          identifyKeyPlayers(investigationTopic, settings)
        ]);
        setSummary(summaryResult);
        setKeyPlayers(playersResult);
      } catch (err: any) {
        setError(err.message || 'Failed to load investigation data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [settings]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner className="w-12 h-12" />
        <span className="ml-4 text-xl font-semibold">Compiling Investigation...</span>
      </div>
    );
  }
  
  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }
  
  const relatedArticles = allArticles.filter(a => a.category === 'Technology' || a.category === 'Economy').slice(0,3);

  return (
    <div className="bg-slate-50 dark:bg-black text-slate-800 dark:text-slate-200 -mx-4 sm:-mx-6 lg:-mx-8 py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center max-w-4xl mx-auto mb-12 animate-fade-in-up">
        <h1 className="text-sm font-bold uppercase tracking-widest text-deep-red dark:text-gold">Mahama Investigates</h1>
        <h2 className="text-4xl md:text-6xl font-extrabold mt-2">{investigationTopic}</h2>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
            <section className="p-6 bg-white dark:bg-slate-900/50 rounded-lg shadow-md animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h3 className="flex items-center gap-2 text-xl font-bold mb-3"><SparklesIcon className="text-gold w-5 h-5"/> AI Summary</h3>
                <p className="text-slate-600 dark:text-slate-400">{summary.overview}</p>
                 <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h4 className="font-semibold">Current Status:</h4>
                    <p className="text-slate-600 dark:text-slate-400">{summary.status}</p>
                </div>
            </section>
            <section className="p-6 bg-white dark:bg-slate-900/50 rounded-lg shadow-md animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h3 className="flex items-center gap-2 text-xl font-bold mb-3"><NetworkIcon className="w-5 h-5"/> Key Player Network</h3>
                <KeyPlayerNetwork data={keyPlayers} />
            </section>
        </div>
        
        {/* Right Column */}
        <div className="space-y-8">
            <section className="p-6 bg-white dark:bg-slate-900/50 rounded-lg shadow-md animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <h3 className="flex items-center gap-2 text-xl font-bold mb-3"><TimelineIcon className="w-5 h-5"/> Timeline</h3>
                <ul className="space-y-3 text-sm border-l-2 border-slate-200 dark:border-slate-700 ml-1 pl-4">
                    <li className="relative"><strong className="block">2020:</strong> Pandemic disrupts supply chains, demand for electronics surges.</li>
                    <li className="relative"><strong className="block">2021:</strong> Automotive industry hit hard, forcing production cuts.</li>
                    <li className="relative"><strong className="block">2022:</strong> Geopolitical tensions and factory fires exacerbate the issue.</li>
                    <li className="relative"><strong className="block">2023:</strong> New fabs announced in US and EU; shortage begins to ease for some components.</li>
                </ul>
            </section>
             <section className="p-6 bg-white dark:bg-slate-900/50 rounded-lg shadow-md animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <h3 className="flex items-center gap-2 text-xl font-bold mb-3"><ChartBarIcon className="w-5 h-5"/> Data Deep Dive</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Projected Fab Investment (Billions USD)</p>
                 <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2"><span className="font-semibold w-16">USA:</span><div className="h-4 bg-deep-red rounded-r-full" style={{width: '60%'}}></div></div>
                    <div className="flex items-center gap-2"><span className="font-semibold w-16">EU:</span><div className="h-4 bg-gold rounded-r-full" style={{width: '45%'}}></div></div>
                    <div className="flex items-center gap-2"><span className="font-semibold w-16">Asia:</span><div className="h-4 bg-slate-400 rounded-r-full" style={{width: '85%'}}></div></div>
                </div>
            </section>
             <section className="p-6 bg-white dark:bg-slate-900/50 rounded-lg shadow-md animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <h3 className="flex items-center gap-2 text-xl font-bold mb-3">Related Deep Dives</h3>
                 <div className="space-y-3">
                    {relatedArticles.map(article => (
                        <button key={article.id} onClick={() => onArticleClick(article)} className="text-left group">
                            <h4 className="font-semibold group-hover:underline text-deep-red dark:text-gold">{article.title}</h4>
                            <p className="text-xs text-slate-500">{article.excerpt}</p>
                        </button>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default MahamaInvestigatesPage;