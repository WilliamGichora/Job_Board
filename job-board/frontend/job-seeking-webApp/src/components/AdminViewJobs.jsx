function AdminViewJobs({ Eachjob }) {

    if (!Eachjob) {
        return <div>Invalid Job Data</div>;
    }

    return (
        <section>
            <div className="bg-white p-4 rounded shadow mb-4">
                <h3 className="font-bold">{Eachjob.title}</h3>
                <p>{Eachjob.description}</p>
                <p className="text-sm text-gray-500">
                    Short Description: {Eachjob.short_desc || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                    Locations: {Eachjob.locations ? Eachjob.locations.join(", ") : "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                    Employment Type: {Eachjob.employment_type || "N/A"}
                </p>
                <p className="text-sm text-gray-500">Salary: {Eachjob.salary || "N/A"}</p>
                <p className="text-sm text-gray-500">Experience: {Eachjob.experience || "N/A"}</p>
                <p className="text-sm text-gray-500">Company: {Eachjob.company || "N/A"}</p>
                <p className="text-sm text-gray-500">
                    Remote Option: {Eachjob.remote_option ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-500">
                    Posted on: {Eachjob.posted_time ? new Date(Eachjob.posted_time).toLocaleString() : "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                    Applicants: {Eachjob.applicants || 0}
                </p>
            </div>
        </section>
    );
}

export default AdminViewJobs;
