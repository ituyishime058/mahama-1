import React from 'react';
import type { Article } from '../types';
import TwitterIcon from './icons/TwitterIcon';

const AuthorInfo: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="mt-12 lg:pl-24">
        <div className="p-6 bg-slate-100 dark:bg-slate-800/50 rounded-lg flex items-start gap-6">
            <img 
                src={`https://i.pravatar.cc/150?u=${article.author.replace(/\s/g, '')}`} 
                alt={article.author} 
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
            />
            <div>
                <p className="text-xs font-semibold uppercase text-slate-500">Written By</p>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{article.author}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {article.author} is a senior correspondent at Mahama News Hub, specializing in {article.category}. With over a decade of experience, their work focuses on in-depth analysis and investigative reporting.
                </p>
                <a href="#" className="flex items-center gap-1 text-sm font-semibold text-blue-500 hover:underline mt-2">
                    <TwitterIcon className="w-4 h-4" />
                    Follow on Twitter
                </a>
            </div>
        </div>
    </div>
  );
};

export default AuthorInfo;