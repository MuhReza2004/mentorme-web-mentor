import Footer from "../../components/landingPage/Footer";
import Navbar from "../../components/landingPage/Navbar";
import AboutContent from "../../content/LandingPage/AboutContent";

const AboutLayout = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <AboutContent />
      <Footer />
    </div>
  );
};

export default AboutLayout;
