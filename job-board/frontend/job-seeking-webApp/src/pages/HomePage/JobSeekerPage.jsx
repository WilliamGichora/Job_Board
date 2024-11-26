import { Outlet, useMatch } from "react-router-dom";
import Filters from "../../components/Filters";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeroSection from "../../components/HeroSection";
import JobList from "../../components/JobList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function JobSeekerPage() {
  const isParentRoute = useMatch("/job-seeker-homepage");
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-specialGrey-100 text-white">
        <Header />
        {isParentRoute && (
          <>
            <HeroSection />
            <Filters />
            <JobList />
          </>
        )}
        <Outlet />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default JobSeekerPage;
