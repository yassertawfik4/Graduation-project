import HeroUserLogin from "/public/images/HeroUserLogin.png";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
function HeroSectionUser() {
  const [isEmpty, setIsEmpty] = useState(true);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing function for animations
    });
  }, []);
  return (
    <section className="my-5 relative overflow-hidden">
      <div className="container mx-auto px-2">
        <div className="flex md:justify-between justify-center items-center flex-wrap md:flex-nowrap  ">
          <div data-aos="fade-right" className="">
            <h1 className="xl:text-[50px] md:text-[34px] sm:text-[40px] text-[29px] tracking-[3.75px] font-[rubik] font-bold text-[#010318]">
              Light Your Path <br /> Step
              <span className="text-[#3A4C59]">Up</span>{" "}
            </h1>
          </div>
          <div data-aos="fade-left" className="">
            <img
              className="xl:w-[547px] md:w-[350px]  w-[343px] "
              decoding="async"
              src={HeroUserLogin}
              alt="HeroUserLogin"
            />
          </div>
        </div>
        <div data-aos="fade-down" className="my-5">
          <h2 className=" text-[#010318] pt-2 xl:text-[49px] md:text-[40px] sm:text-[30px] text-[25px] font-bold">
            Find your next step{" "}
          </h2>
          <div className="w-full mt-5 py-2 relative flex items-center gap-2">
            <div className="w-full">
              <input
                className="w-full border bg-white border-[#3A4C59] py-2 rounded-lg px-6 font-medium"
                type="search"
                onChange={(e) => setIsEmpty(e.target.value.trim() === "")}
              />
              {isEmpty && (
                <div className="absolute text-[#3A4C59] opacity-80 left-3 top-4 flex items-center gap-2 pointer-events-none transition-opacity duration-300">
                  <FaSearch size={20} />
                  <span className="font-[rubik]">Search</span>
                </div>
              )}
            </div>
            <div>
              <VscSettings className="cursor-pointer" size={30} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSectionUser;
