import Login from './pages/Login and Sign Up/Login';
import Register from './pages/Login and Sign Up/Register';
import JobSeekerPage from './pages/HomePage/JobSeekerPage';
import EmployerPage from './pages/HomePage/EmployerPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './stores/userAuthentication';
import ProtectedRoute from './routes/ProtectedRoute';
import AppliedJobs from './pages/HomeNestedPages/AppliedJobs';
import JobList from './components/JobList';

function App() {
  const { isLoggedIn, userType } = useAuthStore();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            userType === 'jobSeeker' ? (
              <Navigate to="/job-seeker-homepage" />
            ) : (
              <Navigate to="/employer-homepage" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route
        path="/job-seeker-homepage"
        element={
          <ProtectedRoute>
            {userType === "jobSeeker" ? (
              <JobSeekerPage />
            ) : (
              <div>Error: Unauthorized access to Job-Seeker Homepage</div>
            )}
          </ProtectedRoute>
        }
      >
        <Route path="browse-jobs" element={<JobList/>} />
        <Route path="applied-jobs" element={<AppliedJobs/>} />
      </Route>

      <Route
        path="/employer-homepage"
        element={
          <ProtectedRoute>
            {userType === "employer" ? (
              <EmployerPage />
            ) : (
              <div>Error: Unauthorized access to Employer Homepage</div>
            )}
          </ProtectedRoute>
        }
      >

      </Route>
    </Routes>
  );
}

export default App;
