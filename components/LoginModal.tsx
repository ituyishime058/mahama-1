
import React, { useState, useEffect } from 'react';
import CloseIcon from './icons/CloseIcon';
import Logo from './Logo';
import GoogleIcon from './icons/GoogleIcon';
import AppleIcon from './icons/AppleIcon';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (!isOpen) {
      // Reset to login tab when modal is closed
      const timer = setTimeout(() => setActiveTab('login'), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const socialButtons = (
    <>
      <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
        <GoogleIcon className="w-6 h-6" />
        <span className="font-semibold text-sm">Continue with Google</span>
      </button>
      <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
        <AppleIcon className="w-6 h-6" />
        <span className="font-semibold text-sm">Continue with Apple</span>
      </button>
    </>
  );

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 transform transition-all duration-300 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white"><CloseIcon /></button>
        
        <div className="text-center mb-8">
            <Logo className="w-12 h-12 mx-auto text-deep-red dark:text-gold" />
            <h2 className="text-2xl font-bold mt-4">Welcome to Mahama News</h2>
            <p className="text-slate-500">Your trusted source for global news.</p>
        </div>

        <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
            <button onClick={() => setActiveTab('login')} className={`flex-1 pb-3 font-semibold text-center border-b-2 ${activeTab === 'login' ? 'border-deep-red dark:border-gold text-deep-red dark:text-gold' : 'border-transparent text-slate-500'}`}>
                Login
            </button>
            <button onClick={() => setActiveTab('signup')} className={`flex-1 pb-3 font-semibold text-center border-b-2 ${activeTab === 'signup' ? 'border-deep-red dark:border-gold text-deep-red dark:text-gold' : 'border-transparent text-slate-500'}`}>
                Sign Up
            </button>
        </div>

        <form onSubmit={handleSubmit}>
            {activeTab === 'login' ? (
                 <div className="space-y-4">
                    <input type="email" placeholder="Email Address" required className="w-full p-3 bg-slate-100 dark:bg-slate-700 rounded-lg focus:ring-2 focus:ring-deep-red dark:focus:ring-gold border-transparent focus:border-transparent"/>
                    <input type="password" placeholder="Password" required className="w-full p-3 bg-slate-100 dark:bg-slate-700 rounded-lg focus:ring-2 focus:ring-deep-red dark:focus:ring-gold border-transparent focus:border-transparent"/>
                    <button type="submit" className="w-full py-3 bg-deep-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">Login</button>
                 </div>
            ) : (
                <div className="space-y-4">
                    <input type="text" placeholder="Full Name" required className="w-full p-3 bg-slate-100 dark:bg-slate-700 rounded-lg focus:ring-2 focus:ring-deep-red dark:focus:ring-gold border-transparent focus:border-transparent"/>
                    <input type="email" placeholder="Email Address" required className="w-full p-3 bg-slate-100 dark:bg-slate-700 rounded-lg focus:ring-2 focus:ring-deep-red dark:focus:ring-gold border-transparent focus:border-transparent"/>
                    <input type="password" placeholder="Password" required className="w-full p-3 bg-slate-100 dark:bg-slate-700 rounded-lg focus:ring-2 focus:ring-deep-red dark:focus:ring-gold border-transparent focus:border-transparent"/>
                    <button type="submit" className="w-full py-3 bg-deep-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">Create Account</button>
                </div>
            )}
        </form>

        <div className="flex items-center my-6">
            <hr className="flex-grow border-slate-200 dark:border-slate-700"/>
            <span className="mx-4 text-xs font-semibold text-slate-400">OR</span>
            <hr className="flex-grow border-slate-200 dark:border-slate-700"/>
        </div>
        
        <div className="space-y-3">
            {socialButtons}
        </div>
      </div>
       <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            @keyframes slide-up {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
        `}</style>
    </div>
  );
};

export default LoginModal;
