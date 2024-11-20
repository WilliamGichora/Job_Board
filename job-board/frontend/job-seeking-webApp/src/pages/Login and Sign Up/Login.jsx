import { Link } from "react-router-dom"
import Aside from "./Aside"


function Login() {
    return (
        <main className="flex items-center justify-center h-screen w-full bg-specialBlue-500 ">
            <div className="flex sm:flex-row  m-40 h-3/4 w-3/4 flex-col">
                
                <Aside />
                <form action="" className="flex flex-col items-center justify-center flex-1 bg-white rounded-lg">
                    <h4 className="font-sans" >Sign in</h4>
                    <div className=" w-1/2">
                        <label className="block text-gray-700 text-sm" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border-b border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full p-2 border-b border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-2/5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                    <div>
                        <p>Don&apos;t have an Account? <span><Link to={'/register'} className="text-blue-400">Signup Here</Link></span></p>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login