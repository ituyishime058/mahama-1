
import React, { useState, useEffect } from 'react';
import type { Article, QuizQuestion, Settings } from '../types';
import CloseIcon from './icons/CloseIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import QuizIcon from './icons/QuizIcon';
import ForwardIcon from './icons/ForwardIcon';
import BackwardIcon from './icons/BackwardIcon';
import { generateQuiz } from '../utils/ai';

interface QuizModalProps {
  isOpen: boolean;
  article: Article | null;
  settings: Settings;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, article, settings, onClose }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && article) {
      const fetchQuiz = async () => {
        setIsLoading(true);
        setError('');
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        try {
          const quizData = await generateQuiz(article, settings);
          if (quizData && quizData.length > 0) {
            setQuestions(quizData);
          } else {
            setError('Could not generate a quiz for this article.');
          }
        } catch (err: any) {
          setError(err.message || 'An error occurred.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchQuiz();
    }
  }, [isOpen, article, settings]);

  if (!isOpen || !article) return null;

  const handleAnswerSelect = (option: string) => {
    if (showResult) return;
    setSelectedAnswer(option);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      if (!showResult) setScore(s => s + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(i => i + 1);
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center h-full"><LoadingSpinner /> <span className="ml-2">Generating quiz...</span></div>;
    }
    if (error) {
      return <div className="text-center text-red-500">{error}</div>;
    }
    if (questions.length === 0) {
      return <div className="text-center">No quiz available.</div>;
    }
    if (currentQuestionIndex >= questions.length) {
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold">Quiz Complete!</h3>
          <p className="text-lg mt-2">Your score: {score} / {questions.length}</p>
          <button onClick={handleRestart} className="mt-4 px-4 py-2 bg-deep-red text-white rounded-md">Try Again</button>
        </div>
      );
    }

    const question = questions[currentQuestionIndex];
    return (
      <div>
        <p className="text-sm font-bold text-slate-500">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <h4 className="text-xl font-semibold my-4">{question.question}</h4>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isCorrect = option === question.correctAnswer;
            const isSelected = option === selectedAnswer;
            let buttonClass = 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600';
            if (showResult) {
              if (isCorrect) buttonClass = 'bg-green-500 text-white';
              else if (isSelected && !isCorrect) buttonClass = 'bg-red-500 text-white';
            }
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={`w-full text-left p-3 rounded-md transition-colors ${buttonClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-xl bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col transform transition-all duration-300"
        style={{ height: 'clamp(400px, 80vh, 550px)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400"><CloseIcon /></button>
          <div className="flex items-center gap-3"><QuizIcon className="w-7 h-7 text-deep-red dark:text-gold" /><h2 className="text-2xl font-bold">Article Quiz</h2></div>
        </div>
        <div className="flex-grow overflow-y-auto p-6">{renderContent()}</div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 flex justify-end">
           {showResult && currentQuestionIndex < questions.length && (
            <button onClick={handleNext} className="px-4 py-2 bg-deep-red text-white rounded-md flex items-center gap-2">
                Next <ForwardIcon className="w-5 h-5"/>
            </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
