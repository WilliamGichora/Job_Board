import { Link } from "react-router-dom";
import useAuthStore from "../stores/userAuthentication";

const Header = () => {
    const { userType, logout } = useAuthStore();
    const handleLogout = () => {
        logout();
    }
    return (
        <header className="flex justify-between items-center py-4 px-8 bg-specialGrey-100 shadow-md sticky">
            <div className="text-xl font-bold text-white">
                <Link to={userType === 'jobSeeker' ? '/job-seeker-homepage' : 'employer-homepage'}>Jobify</Link>
            </div>
            
            <nav className="space-x-6">
                {userType === "jobSeeker" ? (
                    <>
                        <a href="/job-seeker-homepage/browse-jobs" className="hover:text-yellow-400">Browse Jobs</a>
                        <a href="/job-seeker-homepage/applied-jobs" className="hover:text-yellow-400">Applied Jobs</a>
                    </>
                ) : (
                    <>
                        <a href="/employer-homepage/view-jobs" className="hover:text-yellow-400">View Posted jobs</a>
                        <a href="/employer-homepage/view-applicants" className="hover:text-yellow-400">View Applicants</a>
                    </>
                )}
                <button onClick={handleLogout} className="bg-red-500 text-blue-900 px-4 py-2 rounded hover:bg-yellow-500">
                    Logout
                </button>
            </nav>

        </header>
    );
};

export default Header;
