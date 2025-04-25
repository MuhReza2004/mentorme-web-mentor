import Footer from "../../components/landingPage/Footer";
import Navbar from "../../components/landingPage/Navbar";
import MentorContent from "../../content/LandingPage/MentorContent";

const MentorLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Navbar />
      <MentorContent />
      <Footer />
    </div>
  );
};

export default MentorLayout;
