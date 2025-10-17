import React from 'react';

interface AuthorInfoProps {
  author: string;
  date: string;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, date }) => {
  return (
    <div className="flex items-center my-6 border-y border-slate-200 dark:border-slate-700 py-4">
      <img
        src={`https://i.pravatar.cc/150?u=${author.replace(/\s+/g, '')}`}
        alt={author}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <p className="font-bold text-slate-800 dark:text-white">{author}</p>
        <p className="text-sm text-slate-500">Published on {date}</p>
      </div>
    </div>
  );
};

export default AuthorInfo;
