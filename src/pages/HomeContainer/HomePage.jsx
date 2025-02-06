import { Helmet } from "react-helmet-async";
import HeroSection from "../../components/HomeGuest/HeroSection/HeroSection";
import AboutStudent from "../../components/HomeGuest/AboutHome/AboutStudent";
import AboutCompany from "../../components/HomeGuest/AboutHome/AboutCompany";
import Faq from "../../components/HomeGuest/Faq/Faq";

function HomePage() {
  return (
    <div className="">
      <Helmet>
        <title>Home | Your Website</title>
        <meta name="description" content="This is an amazing home page" />
        <meta property="og:title" content="Home Page" />
        <meta property="og:description" content="Welcome to the best website" />
      </Helmet>
      <main>
        <HeroSection />
        <AboutStudent />
        <AboutCompany />
        <Faq />
      </main>
    </div>
  );
}

export default HomePage;
