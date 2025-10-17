import React from 'react';

interface AuthorInfoProps {
  author: string;
  date: string;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, date }) => {
  return (
    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 lg:pl-24">
      <img
        src={`https://i.pravatar.cc/150?u=${author.replace(/\s/g, '')}`}
        alt={author}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <p className="font-bold text-slate-800 dark:text-white text-lg">{author}</p>
        <p className="text-slate-500 dark:text-slate-400">Published on {date}</p>
      </div>
    </div>
  );
};

export default AuthorInfo;
