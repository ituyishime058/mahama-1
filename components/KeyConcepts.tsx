
import React, { useState, useEffect } from 'react';
// FIX: Import Settings type
import type { Article, KeyConcept, Settings } from '../types';
import { extractKeyConcepts } from '../utils/ai';
import KeyIcon from './icons/KeyIcon';
import UserIcon from './icons/UserIcon';
import LocationPinIcon from './icons/LocationPinIcon';
import BuildingIcon from './icons/BuildingIcon';
import SparklesIcon from './icons/SparklesIcon';
import LoadingSpinner from './icons/LoadingSpinner';

interface KeyConceptsProps {
  article: Article;
  // FIX: Add settings prop
  settings: Settings;
}

const typeIcons: Record<KeyConcept['type'], React.FC<any>> = {
  Person: UserIcon,
  Organization: BuildingIcon,
  Location: LocationPinIcon,
  Concept: SparklesIcon,
};

// FIX: Destructure settings from props
const KeyConcepts: React.FC<KeyConceptsProps> = ({ article, settings }) => {
  const [concepts, setConcepts] = useState<KeyConcept[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConcepts = async () => {
      setIsLoading(true);
      try {
        // FIX: Pass settings to extractKeyConcepts
        const result = await extractKeyConcepts(article, settings);
        setConcepts(result);
      } catch (error) {
        console.error("Failed to extract key concepts", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConcepts();
    // FIX: Add settings to dependency array
  }, [article, settings]);

  return (
    <aside className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-extrabold mb-4 border-l-4 border-gold pl-3 flex items-center gap-2">
        <KeyIcon className="w-5 h-5" />
        Key Concepts
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-24">
            <LoadingSpinner className="w-6 h-6" />
        </div>
      ) : concepts.length > 0 ? (
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {concepts.map((concept) => {
            const Icon = typeIcons[concept.type] || SparklesIcon;
            return (
              <div key={concept.term} className="text-sm">
                <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{concept.term}</span>
                </div>
                <p className="ml-6 text-slate-600 dark:text-slate-400">{concept.description}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No key concepts identified.</p>
      )}
    </aside>
  );
};

export default KeyConcepts;
