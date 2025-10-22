import React from 'react';
import { mockStreamingContent } from '../constants';
import { StreamingContent } from '../types';
import Carousel from './Carousel';

interface NowStreamingProps {
    onWatchMovie: (movie: StreamingContent) => void;
    onWatchTrailer: (url: string) => void;
}

const NowStreaming: React.FC<NowStreamingProps> = ({ onWatchMovie, onWatchTrailer }) => {
  return (
    <section className="my-12">
      <Carousel 
        title="Now Streaming"
        items={mockStreamingContent.slice(0, 10)}
        onWatchMovie={onWatchMovie}
        onWatchTrailer={onWatchTrailer}
      />
    </section>
  );
};

export default NowStreaming;