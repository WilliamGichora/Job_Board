const JobCard = ({ job, onHover }) => {
    return (
        <div
            className="relative bg-white text-black p-4 rounded shadow-md hover:shadow-lg transition-shadow"
            onMouseEnter={() => onHover(job)}
            onMouseLeave={() => onHover(null)}
        >
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-gray-500">{job.company}</p>
            <p className="text-sm text-gray-700">
                Locations: {job.locations.join(', ')}
            </p>
            <p className="text-sm text-gray-400">{job.timePosted}</p>
            <p className="text-gray-600">{job.description.substring(0, 50)}...</p>
        </div>
    );
};

export default JobCard;
