import React from 'react';


const MatchStatistics = ({ matchData }) => {
    const { teams, score, date, time, stadium, events, lineup, bench, playerOfTheMatch } = matchData;

    return (
        <div className="flex flex-col gap-4 items-center justify-between mx-auto max-w-5xl shadow-lg text-white">
            {/* Left Panel - Match Details & Events */}
            <div className="w-full shadow-lg border border-gray-700 bg-card-background px-4 pt-2 pb-4 rounded-lg">
                {/* Match Header */}
                <div className="text-center text-white p-2 rounded-lg mb-4">
                    <h2 className="text-lg text-red-200 font-bold">THIS MATCH HAS FINISHED</h2>
                    <p className="text-sm">{date} - {time} - {stadium}</p>
                </div>

                {/* Score */}
                <div className="flex-col sm:flex sm:flex-row sm:justify-between justify-center items-center mb-6">
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold">{teams.home}</h3>
                    </div>
                    <div className="text-center text-3xl font-bold">
                        {score.home} - {score.away}
                    </div>
                    <div className="text-center sm:text-right">
                        <h3 className="text-xl font-bold">{teams.away}</h3>
                    </div>
                </div>

                {/* Match Events */}
                <div className="border pt-3 sm:px-3 border-gray-700 rounded-lg overflow-y-auto]">
                    {events.map((event, index) => (
                        <div key={index} className="flex justify-between items-center mb-2 p-1 sm:p-1">
                            <div className="text-gray-300 text-xs">
                                {event.time}' {event.playerIn && `🔄 Substitution: ${event.playerOut} ⬇️ → ${event.playerIn} ⬆️`}
                                {event.goal && `⚽ Goal: ${event.player}`}
                                {event.yellowCard && `🟨 Yellow Card: ${event.player}`}
                                {event.redCard && `🟥 Red Card: ${event.player}`}
                            </div>
                            <div className="text-gray-300 text-sm">{event.team}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel - Lineup, Bench, and Player of the Match */}
            <div className="flex justify-center items-center flex-col min-[445px]:gap-4 sm:w-full">
                {/* Lineup */}
                <div className='top flex w-full justify-evenly gap-5 max-[441px]:flex-col'>
                    <div className="w-full bg-gray-800 shadow-lg p-4 rounded-lg max-[441px]:w-[80vw]">
                        <h3 className="text-lg font-semibold text-center mb-4">Line Up</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {lineup.map((player, index) => (
                                <div key={index} className="text-center">
                                    <p>{player.number}</p>
                                    <p className="text-sm font-semibold text-gray-300">{player.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bench */}
                    <div className="bg-gray-800 w-full shadow-lg p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-center mb-4">Bench</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {bench.map((player, index) => (
                                <div key={index} className="text-center">
                                    <p className="text-sm text-gray-300">{player}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default MatchStatistics;
