import { useState } from "react";
import { useJobs } from "../api/ReactQuery";
import AdminViewJobs from "./AdminViewJobs";

const EmployeeDashboard = () => {
    const [jobs, setJobs] = useState([]); // List of jobs
    const [jobForm, setJobForm] = useState({
        title: "",
        description: "",
        short_desc: "",
        locations: "",
        employment_type: "",
        salary: "",
        experience: "",
        company: "",
        remote_option: false,
    });

    const { data: fetchedjobs, isLoading, isError } = useJobs();

    const handlePostJob = async (e) => {
        e.preventDefault();

        const newJob = {
            ...jobForm,
            locations: jobForm.locations.split(",").map((loc) => loc.trim()),
        };

        try {
            const response = await fetch("http://localhost:8080/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newJob),
            });

            if (response.ok) {
                const createdJob = await response.json();
                setJobs([...jobs, createdJob]);
                setJobForm({
                    title: "",
                    description: "",
                    short_desc: "",
                    locations: "",
                    employment_type: "",
                    salary: "",
                    experience: "",
                    company: "",
                    remote_option: false,
                });
                window.location.reload();
            } else {
                console.error("Failed to post job");
            }
        } catch (error) {
            console.error("Error posting job:", error);
        }
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
                        <label className="block font-medium">Short Description</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={jobForm.short_desc}
                            onChange={(e) => setJobForm({ ...jobForm, short_desc: e.target.value })}
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

                    {/* Employment Type */}
                    <div>
                        <label className="block font-medium">Employment Type</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={jobForm.employment_type}
                            onChange={(e) =>
                                setJobForm({ ...jobForm, employment_type: e.target.value })
                            }
                            placeholder="e.g., Full-time, Part-time"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Salary</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={jobForm.salary}
                            onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                            placeholder="e.g., $50,000 - $70,000"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Experience Level</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={jobForm.experience}
                            onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                            placeholder="e.g., 3+ years"
                            required
                        />
                    </div>

                    {/* Company */}
                    <div>
                        <label className="block font-medium">Company</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={jobForm.company}
                            onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                            required
                        />
                    </div>

                    {/* Remote Option */}
                    <div>
                        <label className="block font-medium">
                            Remote Work Allowed?
                        </label>
                        <input
                            type="checkbox"
                            checked={jobForm.remote_option}
                            onChange={(e) =>
                                setJobForm({ ...jobForm, remote_option: e.target.checked })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Post Job
                    </button>
                </form>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">Posted Jobs</h2>
                {isLoading || isError ? <div>May be loading or if it takes too long, error</div> : (fetchedjobs.map((job) => <AdminViewJobs Eachjob={job} key={job._id} />
                ))}

            </section>
        </div>
    );
};

export default EmployeeDashboard;
