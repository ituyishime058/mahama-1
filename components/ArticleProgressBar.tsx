
import React, { useState, useEffect } from 'react';

interface ArticleProgressBarProps {
  targetRef: React.RefObject<HTMLElement>;
}

// This component is no longer used, replaced by the global ScrollProgressBar.
// It is kept to avoid breaking imports but can be removed in a future cleanup.
const ArticleProgressBar: React.FC<ArticleProgressBarProps> = ({ targetRef }) => {
  return null;
};

export default ArticleProgressBar;
