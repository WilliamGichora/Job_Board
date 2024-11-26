import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../stores/userAuthentication";

const ApplyForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        resume: null,
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { jobId } = useParams();
    const loggedInEmail = useAuthStore(state => state.email); 

    const handleFileChange = (e) => {
        setForm({ ...form, resume: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(form.email!==loggedInEmail) return <div className="relative top-10 left-10">email must match logged in email</div>
        try {
            const appliedTime = new Date().toISOString();
            const applicationData = {
                name: form.name,
                email: form.email,
                status: "Pending",
                applied_time: appliedTime,
            };

            const response = await fetch(`http://localhost:8080/api/jobs/${jobId}/applications`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(applicationData),
            });

            
            if (response.ok) {
                alert("Application submitted successfully");
                navigate("/job-seeker-homepage");
            } else {
                const responseData = await response.json();
                setError(responseData.message || "Failed to apply for the job. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while submitting the application. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="p-8 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Apply for Job</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Attach CV</label>
                    <input
                        type="file"
                        className="w-full p-2 border rounded"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Submit Application
                </button>
            </form>
        </div>
    );
};

export default ApplyForm;
