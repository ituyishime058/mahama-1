import React, { useState, useEffect } from 'react';

const POLL_ID = 'mahama-poll-01';

interface PollData {
  question: string;
  options: { id: number; text: string; votes: number }[];
}

const initialPollData: PollData = {
  question: "What is the most pressing global issue right now?",
  options: [
    { id: 1, text: "Climate Change", votes: 152 },
    { id: 2, text: "Economic Instability", votes: 110 },
    { id: 3, text: "Political Conflicts", votes: 85 },
    { id: 4, text: "Misinformation", votes: 68 },
  ],
};

const useCountUp = (end: number, duration = 1000) => {
    const [count, setCount] = useState(0);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    useEffect(() => {
        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = (frame / totalFrames);
            const currentCount = Math.round(end * progress);
            setCount(currentCount);

            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameRate);

        return () => clearInterval(counter);
    }, [end, duration, frameRate, totalFrames]);

    return count;
};

const AnimatedPercentage: React.FC<{ value: number }> = ({ value }) => {
    const count = useCountUp(value);
    return <span>{count}%</span>;
};

const CommunityPoll: React.FC = () => {
  const [pollData, setPollData] = useState<PollData>(initialPollData);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    try {
      const storedVote = localStorage.getItem(POLL_ID);
      if (storedVote) {
        setHasVoted(true);
      }
    } catch (error) {
      console.error("Could not read from localStorage", error);
    }
  }, []);

  const handleVote = () => {
    if (selectedOption !== null && !hasVoted) {
      setPollData(prevData => {
        const newOptions = prevData.options.map(option =>
          option.id === selectedOption ? { ...option, votes: option.votes + 1 } : option
        );
        return { ...prevData, options: newOptions };
      });
      setHasVoted(true);
      try {
        localStorage.setItem(POLL_ID, selectedOption.toString());
      } catch (error) {
        console.error("Could not write to localStorage", error);
      }
    }
  };

  const totalVotes = pollData.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <aside className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-extrabold mb-4 border-l-4 border-gold pl-3">
        Community Poll
      </h2>
      <p className="font-semibold mb-4">{pollData.question}</p>
      <div className="space-y-3">
        {pollData.options.map(option => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          return hasVoted ? (
            <div key={option.id} className="text-sm">
              <div className="flex justify-between mb-1 font-semibold">
                <span>{option.text}</span>
                <AnimatedPercentage value={Math.round(percentage)} />
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <div 
                  className="bg-deep-red dark:bg-gold h-2.5 rounded-full animate-progress-bar" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <label key={option.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 cursor-pointer">
              <input
                type="radio"
                name="poll"
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
                className="form-radio h-4 w-4 text-deep-red focus:ring-deep-red"
              />
              <span>{option.text}</span>
            </label>
          );
        })}
      </div>
      {!hasVoted && (
        <button
          onClick={handleVote}
          disabled={selectedOption === null}
          className="w-full mt-4 bg-deep-red text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 hover:bg-red-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          Vote
        </button>
      )}
    </aside>
  );
};

export default CommunityPoll;