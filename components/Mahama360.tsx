
import React from 'react';
import type { Article } from '../types';

interface Mahama360Props {
  articles: Article[];
}

const Mahama360: React.FC<Mahama360Props> = ({ articles }) => {
  return (
    <section className="my-16 p-8 md:p-12 bg-navy rounded-lg shadow-2xl bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/1200/400?blur=5&random=30')"}}>
        <div className="bg-navy/80 p-8 rounded-md">
            <h2 className="text-4xl font-extrabold mb-2 text-white">Mahama <span className="text-gold">360°</span></h2>
            <p className="text-slate-300 mb-8 max-w-2xl">Experience the news like never before. Dive into our interactive stories, virtual tours, and live data dashboards.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.map(article => (
                    <div key={article.id} className="group relative rounded-lg overflow-hidden shadow-lg h-80">
                        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <span className="text-xs font-bold uppercase tracking-wider bg-gold/80 px-2 py-1 rounded">{article.category}</span>
                            <h3 className="text-xl font-bold mt-2">{article.title}</h3>
                            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                                {article.excerpt}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Mahama360;
