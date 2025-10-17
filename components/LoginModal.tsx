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
      const timer = setTimeout(() => setActiveTab('login'), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const SocialButton: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
      <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">
        {icon}
        <span className="font-semibold text-sm">{text}</span>
      </button>
  );

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-navy text-slate-900 dark:text-white rounded-2xl shadow-xl transform transition-all duration-300 animate-slide-up overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-deep-red/10 to-navy/10 animate-gradient-shift" style={{ backgroundSize: '200% 200%' }}></div>
        
        <div className="relative p-8">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white"><CloseIcon /></button>
            
            <div className="text-center mb-8">
                <Logo className="w-16 h-16 mx-auto text-deep-red" />
                <h2 className="text-3xl font-bold mt-4">Welcome Back</h2>
                <p className="text-slate-500 dark:text-slate-400">Your trusted source for global news.</p>
            </div>

            <div className="relative mb-6">
                <div className="flex">
                    <button onClick={() => setActiveTab('login')} className={`flex-1 pb-3 font-semibold text-center transition-colors ${activeTab === 'login' ? 'text-deep-red dark:text-gold' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}>
                        Login
                    </button>
                    <button onClick={() => setActiveTab('signup')} className={`flex-1 pb-3 font-semibold text-center transition-colors ${activeTab === 'signup' ? 'text-deep-red dark:text-gold' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}>
                        Sign Up
                    </button>
                </div>
                <div 
                    className="absolute bottom-0 h-0.5 bg-deep-red dark:bg-gold transition-all duration-300 ease-in-out"
                    style={{
                        width: '50%',
                        transform: `translateX(${activeTab === 'login' ? '0%' : '100%'})`
                    }}
                ></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'signup' && (
                    <input type="text" placeholder="Full Name" required className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-deep-red border-transparent focus:border-transparent transition"/>
                )}
                <input type="email" placeholder="Email Address" required className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-deep-red border-transparent focus:border-transparent transition"/>
                <input type="password" placeholder="Password" required className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-deep-red border-transparent focus:border-transparent transition"/>
                <button type="submit" className="w-full py-3 bg-deep-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105">
                    {activeTab === 'login' ? 'Login' : 'Create Account'}
                </button>
            </form>

            <div className="flex items-center my-6">
                <hr className="flex-grow border-slate-200 dark:border-slate-700"/>
                <span className="mx-4 text-xs font-semibold text-slate-400">OR</span>
                <hr className="flex-grow border-slate-200 dark:border-slate-700"/>
            </div>
            
            <div className="space-y-3">
                <SocialButton icon={<GoogleIcon className="w-6 h-6" />} text="Continue with Google" />
                <SocialButton icon={<AppleIcon className="w-6 h-6 text-black dark:text-white" />} text="Continue with Apple" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;