import Login from './pages/Login and Sign Up/Login'
import Register from './pages/Login and Sign Up/Register'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {

  return (

    <Routes>
      <Route path='/' element={<Login />}>
        <Route path='/login' element={<Login />} />
      </Route>

      <Route path='/register' element={<Register />} />

      <Route path="/job-seeker-homepage" element={
        <ProtectedRoute allowedUserTypes={["jobSeeker"]}>
          <JobSeekerPage />
        </ProtectedRoute>
      } />
      
      <Route path="/employer-homepage" element={
        <ProtectedRoute allowedUserTypes={["employer"]}>
          <EmployerPage />
        </ProtectedRoute>
      } />
    </Routes>

  )
}

export default App
