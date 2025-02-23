import Banner from "../components/landingPage/Banner";
import Benefit from "../components/landingPage/Benefit";
import Features from "../components/landingPage/Features";
import Footer from "../components/landingPage/Footer";
import Navbar from "../components/landingPage/Navbar";
const landingPage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Benefit />
      <Features />
      <Footer />
    </div>
  );
};

export default landingPage;
