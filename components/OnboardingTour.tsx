

import React, { useState } from 'react';
import CloseIcon from './icons/CloseIcon';

interface OnboardingTourProps {
  onClose: () => void;
}

const steps = [
  {
    title: 'Welcome to Mahama News Hub!',
    content: 'Let\'s take a quick tour of the powerful features that make your news experience smarter and more personal.',
    position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  },
  {
    title: 'Your Personal AI Briefing',
    content: 'Click here to get a daily audio summary of top news, tailored just for you. You can even choose the AI\'s personality!',
    position: { top: '170px', left: 'calc(50% - 350px)'},
  },
  {
    title: 'Live AI Conversations',
    content: 'Have a question? Start a real-time voice conversation with our news AI for instant answers and discussions.',
    position: { bottom: '90px', right: '30px' },
  },
  {
    title: 'The Article Companion',
    content: 'When reading an article, this powerful sidebar appears. Chat with an AI about the text, get key concepts, and see historical timelines.',
    position: { top: '200px', right: '30px'},
  },
  {
    title: 'You\'re All Set!',
    content: 'Enjoy your enhanced news experience. You can always customize everything in the Settings menu.',
    position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  }
];

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
        setStep(s => s - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm animate-fade-in">
        <div 
            className="absolute p-6 bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-80"
            style={currentStep.position}
        >
            <button onClick={onClose} className="absolute top-3 right-3 text-slate-400"><CloseIcon/></button>
            <h3 className="font-bold text-lg mb-2">{currentStep.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{currentStep.content}</p>
            <div className="flex justify-between items-center">
                <div className="flex gap-1.5">
                    {steps.map((_, i) => (
                        <button key={i} onClick={() => setStep(i)} className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-deep-red' : 'bg-slate-300'}`}></button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    {step > 0 && <button onClick={handlePrev} className="text-sm font-semibold text-slate-500 hover:underline">Back</button>}
                    <button onClick={handleNext} className="px-4 py-1.5 bg-deep-red text-white font-semibold rounded-full text-sm">
                        {step === steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default OnboardingTour;