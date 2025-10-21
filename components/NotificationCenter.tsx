import React from 'react';
import type { Notification } from '../types';
import CloseIcon from './icons/CloseIcon';
import BriefingIcon from './icons/BriefingIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

const NotificationTypeIcon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
  switch (type) {
    case 'briefing': return <BriefingIcon className="w-5 h-5 text-gold" />;
    case 'comment':
    case 'mention':
      return <ChatBubbleIcon className="w-5 h-5 text-blue-500" />;
    case 'news':
    default:
      return <DocumentTextIcon className="w-5 h-5 text-green-500" />;
  }
};

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose, notifications, onMarkAsRead, onMarkAllAsRead }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div 
        className="absolute top-20 right-4 sm:right-6 lg:right-8 w-full max-w-sm bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 animate-fade-in-down flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        <header className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <h3 className="font-bold text-lg">Notifications</h3>
          <button onClick={onMarkAllAsRead} className="text-sm font-semibold text-deep-red dark:text-gold hover:underline">Mark all as read</button>
        </header>
        <div className="overflow-y-auto flex-grow">
          {notifications.length > 0 ? (
            <ul>
              {notifications.map(n => (
                <li key={n.id} className={`border-b border-slate-100 dark:border-slate-700/50 ${!n.read ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}>
                  <button onClick={() => onMarkAsRead(n.id)} className="w-full text-left p-4 flex gap-4 items-start hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center">
                        <NotificationTypeIcon type={n.type} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm">{n.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{n.timestamp}</p>
                    </div>
                     {!n.read && <div className="w-2.5 h-2.5 bg-deep-red rounded-full flex-shrink-0 mt-1 self-center"></div>}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-8 text-center text-slate-500">No new notifications.</p>
          )}
        </div>
        <footer className="p-2 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
            <button className="w-full text-center text-sm font-semibold py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50">View all notifications</button>
        </footer>
      </div>
    </div>
  );
};

export default NotificationCenter;
