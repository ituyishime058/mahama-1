

import React, { useState, useEffect } from 'react';
import CloseIcon from './icons/CloseIcon';
import Logo from './Logo';
import GoogleIcon from './icons/GoogleIcon';
import AppleIcon from './icons/AppleIcon';
import EmailIcon from './icons/EmailIcon';
import LockIcon from './icons/LockIcon';
import UserIcon from './icons/UserIcon';

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

  const InputField: React.FC<{ icon: React.ReactNode, type: string, placeholder: string }> = ({ icon, type, placeholder }) => (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400">
        {icon}
      </div>
      <input type={type} placeholder={placeholder} required className="w-full p-3 pl-12 bg-slate-100 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-deep-red border-transparent focus:border-transparent transition"/>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-navy text-slate-900 dark:text-white rounded-2xl shadow-xl transform transition-all duration-300 animate-slide-up overflow-hidden flex"
        onClick={e => e.stopPropagation()}
        style={{minHeight: '600px'}}
      >
        {/* Left Panel */}
        <div className="hidden md:block w-1/2 relative p-8 text-white">
            <div 
                className="absolute inset-0 bg-gradient-to-br from-gold via-deep-red to-navy animate-gradient-shift" 
                style={{ backgroundSize: '200% 200%' }}
            ></div>
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    <Logo className="w-12 h-12" />
                    <h2 className="text-3xl font-bold mt-4">A New Era of News</h2>
                    <p className="mt-2 opacity-80">Intelligent, personalized, and always ahead.</p>
                </div>
                <p className="text-xs opacity-60">&copy; {new Date().getFullYear()} Mahama News Hub. All Rights Reserved.</p>
            </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white"><CloseIcon /></button>
            
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">Welcome</h2>
                <p className="text-slate-500 dark:text-slate-400">{activeTab === 'login' ? 'Sign in to continue' : 'Create an account to get started'}</p>
            </div>

            <div className="relative mb-6">
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-full p-1">
                    <button onClick={() => setActiveTab('login')} className={`flex-1 py-2 font-semibold text-center transition-colors rounded-full ${activeTab === 'login' ? '' : 'text-slate-500'}`}>
                        Login
                    </button>
                    <button onClick={() => setActiveTab('signup')} className={`flex-1 py-2 font-semibold text-center transition-colors rounded-full ${activeTab === 'signup' ? '' : 'text-slate-500'}`}>
                        Sign Up
                    </button>
                </div>
                 <div 
                    className="absolute top-1 bottom-1 bg-white dark:bg-navy shadow-md rounded-full transition-all duration-300 ease-in-out"
                    style={{
                        width: 'calc(50% - 4px)',
                        transform: `translateX(${activeTab === 'login' ? '4px' : 'calc(100% - 4px)'})`
                    }}
                ></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'signup' && (
                    <InputField icon={<UserIcon />} type="text" placeholder="Full Name" />
                )}
                <InputField icon={<EmailIcon />} type="email" placeholder="Email Address" />
                <InputField icon={<LockIcon />} type="password" placeholder="Password" />
                
                {activeTab === 'login' && (
                    <div className="text-right">
                        <a href="#" className="text-sm font-semibold text-deep-red hover:underline">Forgot Password?</a>
                    </div>
                )}

                <button type="submit" className="w-full py-3 bg-deep-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105">
                    {activeTab === 'login' ? 'Login' : 'Create Account'}
                </button>
            </form>

            <div className="flex items-center my-6">
                <hr className="flex-grow border-slate-200 dark:border-slate-700"/>
                <span className="mx-4 text-xs font-semibold text-slate-400 uppercase">Or</span>
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