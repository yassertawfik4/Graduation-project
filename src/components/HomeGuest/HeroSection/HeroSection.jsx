import HeroImage from "/public/images/heroSection.webp";
import HeroPhoto from "/public/images/Frame 155.webp";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { useEffect } from "react";
function HeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing function for animations
    });
  }, []);
  return (
    <section className="my-16 relative overflow-hidden">
      <div className="container mx-auto px-2">
        <div className="flex md:justify-between justify-center items-center flex-wrap md:flex-nowrap  ">
          <div data-aos="fade-right" className="">
            <h1 className="xl:text-[50px] md:text-[34px] sm:text-[40px] text-[30px] tracking-[3.75px] font-[rubik] font-bold text-[#010318]">
              Welcome to <br /> Step<span className="text-[#3A4C59]">Up</span>{" "}
              community
            </h1>
            <p className="font-[roboto] md:text-[18px] text-[15px] my-4 font-medium">
              Start your journey today and stepUp to a <br /> brighter future
            </p>
          </div>
          <div data-aos="fade-left" className="">
            <img
              className="xl:w-[520px] xl:h-[351px] md:w-[350px] md:h-[235px] w-[343px] h-[230px]"
              decoding="async"
              src={HeroImage}
              alt="HeroImage"
            />
          </div>
        </div>
        <div data-aos="fade-down" className="bg-[#F3F3F3] my-20 rounded-lg">
          <h2 className="text-center text-[#000000] pt-2 opacity-[80%] tracking-[3.75px] xl:text-[49px] md:text-[40px] sm:text-[30px] text-[25px] font-bold">
            Get Accepted in top companies{" "}
          </h2>
          <div className="flex justify-center mt-10 md:p-8 py-2">
            <img
              loading="lazy"
              decoding="async"
              className=""
              src={HeroPhoto}
              alt="HeroPhoto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
