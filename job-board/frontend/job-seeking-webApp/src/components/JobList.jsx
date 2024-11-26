import { useJobs } from '../api/ReactQuery'
import JobCard from './JobCard'; // JobCard for individual job display
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
    const { data: jobs, isLoading, isError } = useJobs();
    const [hoveredJob, setHoveredJob] = useState(null);
    const navigate = useNavigate();

    const handleApplyClick = (jobId) => {
        navigate(`/apply/${jobId}`);
    }
    
    if (isLoading) return <div>Loading jobs...</div>;
    if (isError) return <div>Error fetching jobs. Please try again later.</div>;

    return (
        <div className="py-8 px-8">
        
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
                    <p className="text-sm text-gray-700 my-1">
                        Locations: {job.locations.join(', ')}
                    </p>
                    <p className="text-sm text-gray-400">{job.timePosted}</p>
                    <p className="text-gray-600"><b>Description: </b>{job.description.substring(0, 50)}...</p>
                    <p className='my-2'>{job.remote_option?"Remote ":"On-Site" }</p>

                    <button className='bg-green-400 px-3 py-2 rounded-lg' onClick={()=>handleApplyClick(job.id)}>Apply</button>

                    
                    {hoveredJob && hoveredJob.id === job.id && (
                        <div className="absolute top-0 left-[40%] ml-4 bg-pink-200 text-black p-4 rounded shadow-lg w-1/3 h-52">
                            <h4 className="text-lg font-bold">{hoveredJob.title}</h4>
                            <p className="text-gray-700">{hoveredJob.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Locations: {hoveredJob.locations.join(', ')}
                            </p>
                            <p className="text-sm text-gray-400">{hoveredJob.posted_time}</p>
                        </div>
                    )}
                </div>
            ))}

            <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded hover:bg-yellow-500 mt-4">
                See more
            </button>
        </div>
    );
};

export default JobList;
