import React from 'react';

const CommentsSection: React.FC = () => {
  return (
    <div className="mt-12 lg:pl-24">
      <h3 className="text-2xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
        Join the Conversation
      </h3>
      <div className="p-6 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
        <textarea
          placeholder="Write your comment here..."
          className="w-full p-3 rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-deep-red dark:focus:ring-gold transition"
          rows={4}
          disabled
        ></textarea>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-slate-500">Comments feature coming soon!</p>
          <button 
            disabled 
            className="bg-deep-red text-white font-bold py-2 px-6 rounded-full disabled:bg-slate-400 dark:disabled:bg-slate-600 cursor-not-allowed"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;