import React, { useState } from 'react';
import type { Comment, User } from '../types';
import { mockUsers, mockCurrentUser } from '../constants';
import HeartIcon from './icons/HeartIcon';
import ReplyIcon from './icons/ReplyIcon';
import ShareIcon from './icons/ShareIcon';
import SendIcon from './icons/SendIcon';
import { useTranslation } from '../hooks/useTranslation';

interface CommentsSectionProps {
  initialComments: Comment[];
}

const CommentCard: React.FC<{ comment: Comment; onLike: (id: string) => void; onReply: (id: string, text: string) => void; level?: number }> = ({ comment, onLike, onReply, level = 0 }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleReplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(replyText.trim()){
            onReply(comment.id, replyText);
            setReplyText('');
            setIsReplying(false);
        }
    }

    return (
        <div className={`flex items-start gap-4 ${level > 0 ? 'ml-8' : ''}`}>
            <img src={comment.user.avatar} alt={comment.user.name} className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="flex-grow">
                <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-3">
                    <p className="font-bold text-sm text-slate-800 dark:text-white">{comment.user.name}</p>
                    <p className="text-slate-700 dark:text-slate-300">{comment.text}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mt-1 pl-3">
                    <button onClick={() => onLike(comment.id)} className="flex items-center gap-1 hover:text-deep-red">
                        <HeartIcon className="w-4 h-4" /> {comment.likes}
                    </button>
                    <button onClick={() => setIsReplying(!isReplying)} className="hover:text-deep-red">Reply</button>
                    <span>{comment.timestamp}</span>
                </div>
                {isReplying && (
                    <form onSubmit={handleReplySubmit} className="mt-2 flex gap-2">
                        <input 
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Replying to ${comment.user.name}...`}
                            className="flex-grow p-2 text-sm bg-white dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-1 focus:ring-deep-red"
                        />
                        <button type="submit" className="p-2 bg-deep-red text-white rounded-lg"><SendIcon className="w-5 h-5"/></button>
                    </form>
                )}
                 <div className="mt-4 space-y-4">
                    {comment.replies.map(reply => (
                        <CommentCard key={reply.id} comment={reply} onLike={onLike} onReply={onReply} level={level + 1} />
                    ))}
                </div>
            </div>
        </div>
    );
}


const CommentsSection: React.FC<CommentsSectionProps> = ({ initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const { t } = useTranslation();

  const findComment = (id: string, commentList: Comment[]): Comment | null => {
      for (const comment of commentList) {
          if (comment.id === id) return comment;
          const foundInReply = findComment(id, comment.replies);
          if (foundInReply) return foundInReply;
      }
      return null;
  };

  const handleLike = (id: string) => {
    setComments(prev => {
        const newComments = JSON.parse(JSON.stringify(prev));
        const comment = findComment(id, newComments);
        if (comment) {
            comment.likes += 1;
        }
        return newComments;
    });
  };

  const handleReply = (id: string, text: string) => {
      setComments(prev => {
        const newComments = JSON.parse(JSON.stringify(prev));
        const comment = findComment(id, newComments);
        if (comment) {
            comment.replies.push({
                id: `c${Date.now()}`,
                user: {
                    id: mockCurrentUser.id,
                    name: mockCurrentUser.name,
                    avatar: mockCurrentUser.avatar,
                },
                text,
                timestamp: 'Just now',
                likes: 0,
                replies: [],
            });
        }
        return newComments;
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObject: Comment = {
        id: `c${Date.now()}`,
        user: {
            id: mockCurrentUser.id,
            name: mockCurrentUser.name,
            avatar: mockCurrentUser.avatar,
        },
        text: newComment,
        timestamp: 'Just now',
        likes: 0,
        replies: [],
      };
      setComments(prev => [newCommentObject, ...prev]);
      setNewComment('');
    }
  };


  return (
    <div className="mt-12 lg:pl-24">
      <h3 className="text-2xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
        {t('joinTheConversation')} ({comments.length})
      </h3>
      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        {/* New Comment Form */}
        <form onSubmit={handleAddComment} className="flex items-start gap-4 mb-8">
            <img src={mockCurrentUser.avatar} alt="Your avatar" className="w-10 h-10 rounded-full" />
            <div className="flex-grow relative">
                 <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t('writeYourComment')}
                    className="w-full p-3 pr-12 rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-deep-red dark:focus:ring-gold transition"
                    rows={2}
                ></textarea>
                <button 
                    type="submit"
                    className="absolute right-2 bottom-2 p-2 bg-deep-red text-white rounded-full hover:bg-red-700 transition-colors disabled:bg-slate-400"
                    disabled={!newComment.trim()}
                    aria-label={t('postComment')}
                >
                    <SendIcon className="w-5 h-5"/>
                </button>
            </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
            {comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} onLike={handleLike} onReply={handleReply} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
