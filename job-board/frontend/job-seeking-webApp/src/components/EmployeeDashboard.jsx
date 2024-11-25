import  { useState } from 'react';

const EmployeeDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [jobForm, setJobForm] = useState({
        title: '',
        description: '',
        locations: '',
    });

    const handlePostJob = (e) => {
        e.preventDefault();
        const newJob = {
            id: `${Date.now()}`,
            title: jobForm.title,
            description: jobForm.description,
            locations: jobForm.locations.split(',').map((loc) => loc.trim()),
            postedTime: new Date(),
            applicants: 0,
            applications: [],
        };
        setJobs([...jobs, newJob]);
        setJobForm({ title: '', description: '', locations: '' });
    };

    const handleApproveApplicant = (jobId, applicantId) => {
        setJobs((prevJobs) =>
            prevJobs.map((job) =>
                job.id === jobId
                    ? {
                        ...job,
                        applications: job.applications.map((applicant) =>
                            applicant.id === applicantId
                                ? { ...applicant, status: 'Approved' }
                                : applicant
                        ),
                    }
                    : job
            )
        );
    };

    return (
        <div className="p-8 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Post a Job</h2>
                <form onSubmit={handlePostJob} className="space-y-4 bg-white p-4 rounded shadow">
                    <div>
                        <label className="block font-medium">Job Title</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={jobForm.title}
                            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Description</label>
                        <textarea
                            className="w-full p-2 border rounded"
                            value={jobForm.description}
                            onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Locations (comma-separated)</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={jobForm.locations}
                            onChange={(e) => setJobForm({ ...jobForm, locations: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Post Job
                    </button>
                </form>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">Posted Jobs</h2>
                {jobs.map((job) => (
                    <div key={job.id} className="bg-white p-4 rounded shadow mb-4">
                        <h3 className="font-bold">{job.title}</h3>
                        <p>{job.description}</p>
                        <p className="text-sm text-gray-500">Locations: {job.locations.join(', ')}</p>
                        <p className="text-sm text-gray-500">Posted on: {job.postedTime.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Applicants: {job.applicants}</p>

                        {/* View Applicants */}
                        <div className="mt-4">
                            <h4 className="font-medium mb-2">Applicants:</h4>
                            {job.applications.length > 0 ? (
                                job.applications.map((applicant) => (
                                    <div key={applicant.id} className="flex justify-between items-center p-2 border-b">
                                        <div>
                                            <p className="font-medium">{applicant.name}</p>
                                            <p className="text-sm text-gray-500">{applicant.email}</p>
                                            <p className="text-sm text-gray-500">Status: {applicant.status}</p>
                                        </div>
                                        <button
                                            onClick={() => handleApproveApplicant(job.id, applicant.id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            disabled={applicant.status === 'Approved'}
                                        >
                                            {applicant.status === 'Approved' ? 'Approved' : 'Approve'}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No applicants yet.</p>
                            )}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default EmployeeDashboard;
