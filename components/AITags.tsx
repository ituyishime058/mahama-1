import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface AITagsProps {
  tags: string[];
  isLoading: boolean;
}

const AITags: React.FC<AITagsProps> = ({ tags, isLoading }) => {
  
  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <SparklesIcon className="w-4 h-4 text-gold" />
          <span>AI Generated Tags:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-7 w-24 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
        <SparklesIcon className="w-4 h-4 text-gold" />
        <span>AI Generated Tags:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm font-semibold">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AITags;
