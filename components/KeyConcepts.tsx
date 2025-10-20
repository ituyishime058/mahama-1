import React from 'react';
import type { KeyConcept } from '../types';
import UserIcon from './icons/UserIcon';
import LocationPinIcon from './icons/LocationPinIcon';
import BuildingIcon from './icons/BuildingIcon';
import SparklesIcon from './icons/SparklesIcon';
import LoadingSpinner from './icons/LoadingSpinner';

interface KeyConceptsProps {
  keyConcepts: KeyConcept[];
  conceptsLoading: boolean;
}

const typeIcons: Record<KeyConcept['type'], React.FC<any>> = {
  Person: UserIcon,
  Organization: BuildingIcon,
  Location: LocationPinIcon,
  Concept: SparklesIcon,
};

const KeyConcepts: React.FC<KeyConceptsProps> = ({ keyConcepts, conceptsLoading }) => {
  
  if (conceptsLoading) {
    return (
        <div className="flex justify-center items-center h-full">
            <LoadingSpinner className="w-8 h-8" />
        </div>
      );
  }

  if (keyConcepts.length === 0) {
    return (
        <div className="flex justify-center items-center h-full text-center text-sm text-slate-500 p-4">
            <p>No key concepts were identified in this article.</p>
        </div>
    );
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="space-y-4">
        {keyConcepts.map((concept) => {
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
    </div>
  );
};

export default KeyConcepts;