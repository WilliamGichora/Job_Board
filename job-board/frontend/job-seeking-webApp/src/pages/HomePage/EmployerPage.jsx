import EmployeeDashboard from "../../components/EmployeeDashboard"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { Outlet,useMatch } from "react-router-dom"

function EmployerPage() {
  const isParentRoute = useMatch('/employer-homepage')
  return (
    <div>
      <Header />
      {isParentRoute && (
        <>
          <EmployeeDashboard/>
        </>
      )}

      <Outlet/>
      <Footer/>
    </div>
  )
}

export default EmployerPage