import React, { useState, useEffect } from 'react';

interface ArticleProgressBarProps {
  targetRef: React.RefObject<HTMLElement>;
}

const ArticleProgressBar: React.FC<ArticleProgressBarProps> = ({ targetRef }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollListener = () => {
    if (!targetRef.current) {
      return;
    }

    const element = targetRef.current;
    const totalHeight = element.clientHeight - element.offsetTop - window.innerHeight;
    const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }
    
    setReadingProgress((windowScrollTop / totalHeight) * 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-50">
      <div 
        style={{ width: `${readingProgress}%` }} 
        className="h-full bg-gradient-to-r from-gold to-deep-red transition-all duration-100 ease-linear"
      />
    </div>
  );
};

export default ArticleProgressBar;