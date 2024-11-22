import { useState } from "react"
import Aside from "./Aside"
import { Link } from "react-router-dom"
import apiClient from "../../api/Axios";

function Register() {

  const [fulllname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState("jobSeeker");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("http://localhost:8080/api/register", {
        fulllname,
        email,
        password,
        userType
      });
      console.log("Registration Successful:", response.data);
      
      setFullname('');
      setEmail('');
      setPassword('');
      setUserType('jobSeeker')
      
    } catch (error) {
      console.error("Error during registration",error.response?.data||error.message);
    }
  }

  return (
    <main className="flex items-center justify-center h-screen w-full bg-specialBlue-500 ">
      <div className="flex sm:flex-row  m-30 h-7/8 w-3/4 flex-col">
        <Aside />
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center flex-1 bg-white rounded-lg">
          <h4 className="font-sans" >Create Account</h4>
          <div>
            <div className="block my-8 p-3 border-2 rounded-md"><a href="#">Sign Up with Google</a></div>
          </div>
          <div className=" w-1/2">
            <label className="block text-gray-700 text-sm" htmlFor="email">
              Full Name
            </label>
            <input
              type="text"
              id="text"
              value={fulllname}
              onChange={(e)=> setFullname(e.target.value)}
              className="w-full p-1 border-b border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className=" w-1/2">
            <label className="block text-gray-700 text-sm" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-1 border-b border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-1 border-b border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/2 mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="userType">
              Account Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full p-2 border-b border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="jobSeeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-2/5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <div>
            <p>Already Have an Account? <span><Link to={'/login'} className="text-blue-400">Login</Link></span></p>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Register