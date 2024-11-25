import { useJobs } from '../api/ReactQuery'
import JobCard from './JobCard'; // JobCard for individual job display
import { useState } from 'react';

const JobList = () => {
    const { data: jobs, isLoading, isError } = useJobs(); // Fetching data using react-query
    const [hoveredJob, setHoveredJob] = useState(null); // State for hovered job details

    if (isLoading) return <div>Loading jobs...</div>;
    if (isError) return <div>Error fetching jobs. Please try again later.</div>;

    return (
        <div className="py-8 px-8">
            {/* Search input */}
            <input
                type="text"
                placeholder="Type here to search"
                className="p-2 w-full rounded mb-6 text-black"
            />

            {jobs.map((job, index) => (
                <div
                    key={job.id}
                    onMouseEnter={() => setHoveredJob(job)}
                    onMouseLeave={() => setHoveredJob(null)}
                    className="relative mb-4 bg-white text-black p-4 rounded shadow-md hover:shadow-lg transition-shadow"
                >
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <p className="text-gray-500">{job.company}</p>
                    <p className="text-sm text-gray-700">
                        Locations: {job.locations.join(', ')}
                    </p>
                    <p className="text-sm text-gray-400">{job.timePosted}</p>
                    <p className="text-gray-600">{job.description.substring(0, 50)}...</p>

                    {/* Hover panel */}
                    {hoveredJob && hoveredJob.id === job.id && (
                        <div className="absolute top-0 left-full ml-4 bg-white text-black p-4 rounded shadow-lg w-64">
                            <h4 className="text-lg font-bold">{hoveredJob.title}</h4>
                            <p className="text-gray-700">{hoveredJob.longDescription}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Locations: {hoveredJob.locations.join(', ')}
                            </p>
                            <p className="text-sm text-gray-400">{hoveredJob.timePosted}</p>
                        </div>
                    )}
                </div>
            ))}

            {/* "See more" button */}
            <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded hover:bg-yellow-500 mt-4">
                See more
            </button>
        </div>
    );
};

export default JobList;
