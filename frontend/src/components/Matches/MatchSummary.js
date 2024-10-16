import React, { useState } from 'react';
import MatchStatistics from './MatchStatistics.js';
// import { ReactComponent as BackgroundImage } from '../src/assets/background-hero-alt.jpeg';
// import MatchCenter from '../Home/MatchCenter';
import manImage from '../../assets/messi.png'

// Sample data for fans, match stats, polls, and highlights
const fans = [
  { name: 'John Doe', points: 350 },
  { name: 'Jane Smith', points: 320 },
  { name: 'Alex Johnson', points: 310 },
];

const pollsData = [
  {
    question: "Who was the man of the match?",
    options: [
      { label: 'Player A', votes: 20 },
      { label: 'Player B', votes: 40 },
      { label: 'Player C', votes: 30 },
      { label: 'Player D', votes: 10 },
    ],
  },
  {
    question: "Will Team A win the next match?",
    options: [
      { label: 'Yes', votes: 60 },
      { label: 'No', votes: 40 },
    ],
  },
];

const highlights = [
  { id: 1, title: "Goal by Player A", videoUrl: "https://link-to-video-1.com" },
  { id: 2, title: "Amazing Save by Goalkeeper", videoUrl: "https://link-to-video-2.com" },
  { id: 3, title: "Goal by Player B", videoUrl: "https://link-to-video-3.com" },
];


const MatchSummaryPage = () => {
  const matchData = {
    teams: {
      home: 'Siphir Venglun FC',
      away: 'Aizawl FC'
    },
    score: {
      home: 0,
      away: 1
    },
    date: '11 October 2024',
    time: '08:00 PM',
    stadium: 'RG Stadium',
    events: [
      { time: 72, playerIn: 'Liansanglura', playerOut: 'Malsawmfela', team: 'Siphir Venglun FC' },
      { time: 90, goal: true, player: 'Augustine Lalrochana', team: 'Aizawl FC' },
      { time: 88, yellowCard: true, player: 'Augustine Lalrochana', team: 'Aizawl FC' },
    ],
    lineup: [
      { number: 1, name: 'Player 1' },
      { number: 2, name: 'Player 2' },
      { number: 3, name: 'Player 3' },
      // Add the rest of the lineup players here
    ],
    bench: [
      'Bench Player 1', 'Bench Player 2', 'Bench Player 3'
    ],
    playerOfTheMatch: {
      name: 'Lalchhawnkima',
      image: manImage
    }
  };

  // Array to track selected options for each poll
  const [selectedPoll, setSelectedPoll] = useState(pollsData.map(() => ''));

  // Track whether the user has submitted their answer for a poll
  const [pollSubmitted, setPollSubmitted] = useState(pollsData.map(() => false));

  // Function to calculate total votes for a poll
  const getTotalVotes = (pollOptions) => {
    return pollOptions.reduce((total, option) => total + option.votes, 0);
  };

  // Handle Poll Vote
  const handlePollChange = (pollIndex, option) => {
    const updatedPolls = [...selectedPoll];
    const updatedSubmitted = [...pollSubmitted];

    updatedPolls[pollIndex] = option.label;
    updatedSubmitted[pollIndex] = true; // Mark this poll as answered

    setSelectedPoll(updatedPolls);
    setPollSubmitted(updatedSubmitted);
  };

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center bg-background-match-summary">
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="relative z-2 flex flex-col max-w-5xl sm:flex-row justify-center sm:gap-3 mx-auto p-6 shadow-card-background shadow-lg bg-[#0e1217] sm:border-r sm:border-r-gray-500 border-l border-l-gray-500">
        <div className='left sm:border-r sm:border-r-gray-500 sm:pr-3'>
          <h1 className="text-5xl font-bold mb-4 text-left">Match Summary</h1>
          <MatchStatistics matchData = {matchData}/>
          <section className="w-full mb-8 mt-4 sm:mt-4">
            <h2 className="text-2xl font-semibold mb-4">Polls</h2>
            <div className="bg-card-background border border-gray-700 shadow rounded-lg p-4">
              {pollsData.map((poll, pollIndex) => {
                const totalVotes = getTotalVotes(poll.options);
                return (
                  <div key={pollIndex} className="mb-6">
                    <h3 className="font-semibold mb-4">{poll.question}</h3>
                    {poll.options.map((option, index) => {
                      const percentage = Math.round((option.votes / totalVotes) * 100);
                      return (
                        <div key={index} className="mb-4">
                          <label className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name={`poll-${pollIndex}`}
                                value={option.label}
                                checked={selectedPoll[pollIndex] === option.label}
                                onChange={() => handlePollChange(pollIndex, option)}
                                className="mr-3 accent-blue-500 w-5 h-5"
                              />
                              <span className="text-lg">{option.label}</span>
                            </div>
                            {/* Only show percentage if an option is selected for this poll */}
                            {pollSubmitted[pollIndex] && (
                              <span className="text-lg font-medium">{percentage}%</span>
                            )}
                          </label>

                          {/* Only show progress bar if an option is selected */}
                          {pollSubmitted[pollIndex] && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                              <div
                                className="bg-blue-500 h-2.5 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Highlights Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-4">Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((highlight) => (
                <div key={highlight.id} className="bg-card-background border border-gray-700 shadow rounded-lg p-4">
                  <h3 className="font-semibold mb-4">{highlight.title}</h3>
                  <a
                    href={highlight.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Watch Video
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="right max-h-[90vh] overflow-y-hidden w-full sm:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Fan Leaderboard</h2>
          <div className="bg-card-background border border-gray-700 shadow rounded-lg p-4">
            <table className="w-full table-auto p-10">
              <thead>
                <tr className="bg-card-background">
                  <th className="py-2 text-left">Name</th>
                  <th className="py-2">Points</th>
                </tr>
              </thead>
              <tbody>
                {fans.map((fan, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{fan.name}</td>
                    <td className="py-2 text-center">{fan.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MatchSummaryPage;