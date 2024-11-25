import { Outlet, useMatch } from "react-router-dom";
import Filters from "../../components/Filters";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeroSection from "../../components/HeroSection";
import JobList from "../../components/JobList";

function JobSeekerPage() {
  const isParentRoute = useMatch("/job-seeker-homepage");

  return (
    <div className="bg-specialGrey-100 text-white">
      <Header />

      {/* Conditionally render components based on route */}
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
  );
}

export default JobSeekerPage;
