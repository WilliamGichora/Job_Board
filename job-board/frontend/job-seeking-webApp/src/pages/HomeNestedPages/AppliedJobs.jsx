import { useJobs } from "../../api/ReactQuery";
import useAuthStore from "../../stores/userAuthentication";

function AppliedJobs() {
  const email = useAuthStore(state => state.email);
  const { data: fetchedJobs, isLoading, isError } = useJobs();

  if (isLoading) return <div>Data is loading...</div>;
  if (isError) return <div>Fetch failed. Please reload or try again.</div>;

  const appliedJobs = fetchedJobs.filter(
    job => job.applicants > 0 && job.applications && job.applications.length > 0 && job.applications.some(applicant=>applicant.email===email)
  );

  return (
    <div className="space-y-6">
      {appliedJobs.length > 0 ? (
        appliedJobs.map(job => (
          <div key={job.id} className="relative bg-white text-black p-6 rounded shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-gray-700 font-semibold">{job.company}</p>
            <p className="text-sm text-gray-600">
              Locations: {job.locations.join(", ")}
            </p>
            <p className="text-sm text-gray-500">
              Employment Type: {job.employment_type}
            </p>
            <p className="text-sm text-gray-600">Salary: {job.salary}</p>
            <p className="text-sm text-gray-500">
              Experience Required: {job.experience}
            </p>
            <p className="text-sm text-gray-500">
              Remote Option: {job.remote_option ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-500">
              Posted on: {new Date(job.posted_time).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              Total Applicants: {job.applicants}
            </p>
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Applications:</h4>
              <ul className="list-disc ml-5">
                {job.applications.map((application, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    <p><strong>Name:</strong> {application.name}</p>
                    <p><strong>Email:</strong> {application.email}</p>
                    <p><strong>Resume:</strong> {application.resume}</p>
                    <p><strong>Applied Time:</strong> {new Date(application.applied_time).toLocaleString()}</p>
                    <p><strong>Status:</strong> {application.status}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500 ">No jobs with applications found for this user.</div>
      )}
    </div>
  );
}

export default AppliedJobs;
