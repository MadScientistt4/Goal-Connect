import React from 'react';


// Sample data for job listings
const jobListings = [
    {
        id: 1,
        title: 'Head Coach',
        description: 'Seeking a head coach with experience in leading teams to success.',
        requirements: '5+ years of coaching experience, excellent communication skills.',
    },
    {
        id: 2,
        title: 'Assistant Coach',
        description: 'Looking for an assistant coach to support training and game strategy.',
        requirements: '3+ years of coaching experience, ability to work in a team.',
    },
    {
        id: 3,
        title: 'Fitness Trainer',
        description: 'Hiring a fitness trainer to develop training programs for players.',
        requirements: 'Certified fitness trainer, experience with sports teams.',
    },
    // Add more jobs as needed
];

const JobListings = () => {
    return (
        <div className="p-8 text-white">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Job Listings</h1>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {jobListings.map((job) => (
                    <div key={job.id} className="bg-gray-800 p-6 rounded-lg transition-transform transform hover:scale-105">
                        <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                        <p className="mb-4">{job.description}</p>
                        <h3 className="font-semibold">Requirements:</h3>
                        <p>{job.requirements}</p>
                        
                    </div>
                ))}
            </section>
        </div>
    );
};

export default JobListings;
