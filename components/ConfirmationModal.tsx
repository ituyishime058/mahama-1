
import React from 'react';
import CloseIcon from './icons/CloseIcon';
import AlertIcon from './icons/AlertIcon';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, title, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 transform transition-all duration-300 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
                <AlertIcon className="h-6 w-6 text-deep-red" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-bold text-slate-900 dark:text-white" id="modal-title">
                    {title}
                </h3>
                <div className="mt-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                    {message}
                    </p>
                </div>
            </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-deep-red text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onConfirm}
            >
                Confirm
            </button>
            <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 dark:border-slate-600 shadow-sm px-4 py-2 bg-white dark:bg-slate-700 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold sm:mt-0 sm:w-auto sm:text-sm"
                onClick={onClose}
            >
                Cancel
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
