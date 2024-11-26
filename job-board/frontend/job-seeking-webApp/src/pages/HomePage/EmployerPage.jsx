import EmployeeDashboard from "../../components/EmployeeDashboard"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { Outlet, useMatch } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function EmployerPage() {
  const queryClient = new QueryClient();
  const isParentRoute = useMatch('/employer-homepage')
  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-serif">

        <Header />
        {isParentRoute && (
          <EmployeeDashboard />
        )}

        <Outlet />
        <Footer />
      </div>
    </QueryClientProvider >
  )
}

export default EmployerPage