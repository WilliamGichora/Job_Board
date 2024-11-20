import Login from './pages/Login and Sign Up/Login'
import Register from './pages/Login and Sign Up/Register'
import { Routes,Route } from 'react-router-dom'

function App() {

  return (
    
    <Routes>
      <Route path='/' element={<Login />}>
        <Route path='/login' element={<Login />}/>
      </Route>
      <Route path='/register' element={<Register /> } />
      </Routes>
    
  )
}

export default App
