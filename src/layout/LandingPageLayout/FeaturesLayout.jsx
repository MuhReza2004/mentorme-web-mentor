import Footer from "../../components/landingPage/Footer";
import Navbar from "../../components/landingPage/Navbar";
import FeaturesContent from "../../content/LandingPage/FiturContent";

const FeaturesLayout = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <FeaturesContent />
      <Footer />
    </div>
  );
};

export default FeaturesLayout;
