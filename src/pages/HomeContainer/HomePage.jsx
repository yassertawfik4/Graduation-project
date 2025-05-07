import { Helmet } from "react-helmet-async";
import HeroSection from "../../components/HomeGuest/HeroSection/HeroSection";
import AboutStudent from "../../components/HomeGuest/AboutHome/AboutStudent";
import AboutCompany from "../../components/HomeGuest/AboutHome/AboutCompany";
import Faq from "../../components/HomeGuest/Faq/Faq";
import { useEffect, useState } from "react";
import HeroSectionUser from "../../components/HomeUser/HeroSection/HeroSectionUser";
import RecommendedInternshipSlider from "../../components/HomeUser/RecommendedInternshipSlider/RecommendedInternshipSlider";
import RoadMapHomeSlider from "../../components/HomeUser/RoadMapHome/RoadMapHomeSlider";
import axiosInstance from "../../Api/axiosInstance";
import RecentInernShip from "../../components/HomeUser/RecentInernShip/RecentInernShip";
import IntetnshipHome from "../../components/HomeUser/IntetnshipHome/IntetnshipHome";
import ParticipateInternShipHome from "../../components/HomeUser/ParticipateInternShipHome/ParticipateInternShipHome";

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("accessUsertoken");
    setIsLoggedIn(token);
  }, []);
  const [recommendedInternship, setRecommendedInternships] = useState({});
  const handelGetHomeData = async () => {
    try {
      const response = await axiosInstance.get(`Home/GetHomePageData`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });
      console.log(response.data);
      setRecommendedInternships(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handelGetHomeData();
  }, []);
  return (
    <div className="">
      <Helmet>
        <title>Home | Your Website</title>
        <meta name="description" content="This is an amazing home page" />
        <meta property="og:title" content="Home Page" />
        <meta property="og:description" content="Welcome to the best website" />
      </Helmet>
      <main>
        {isLoggedIn ? (
          <>
            <HeroSectionUser />
            <RecommendedInternshipSlider
              recommendedInternship={recommendedInternship}
            />
            <RecentInernShip recommendedInternship={recommendedInternship} />
            <IntetnshipHome recommendedInternship={recommendedInternship} />
            <ParticipateInternShipHome
              recommendedInternship={recommendedInternship}
            />
            <RoadMapHomeSlider recommendedInternship={recommendedInternship} />
          </>
        ) : (
          <>
            <HeroSection />
            <AboutStudent />
            <AboutCompany />
            <Faq />
          </>
        )}
      </main>
    </div>
  );
}

export default HomePage;
