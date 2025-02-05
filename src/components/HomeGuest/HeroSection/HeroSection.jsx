import HeroImage from "/public/images/heroSection.svg";
import HeroPhoto from "/public/images/Frame 155.png";
function HeroSection() {
  return (
    <section className="my-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="">
            <h1 className="text-[60px] tracking-[3.75px] font-[rubik] font-bold text-[#010318]">
              Welcome to <br /> Step<span className="text-[#3A4C59]">Up</span>{" "}
              community
            </h1>
            <p className="font-[roboto] text-xl font-medium">
              Start your journey today and stepUp to a <br /> brighter future
            </p>
          </div>
          <div className="w-[520px] h-[351px]">
            <img className="" loading="lazy" src={HeroImage} alt="HeroImage" />
          </div>
        </div>
        <div className="bg-[#F3F3F3] my-20 rounded-lg">
          <h2 className="text-center text-[#000000] pt-2 opacity-[80%] tracking-[3.75px] text-[49px] font-bold">
            Get Accepted in top companies{" "}
          </h2>
          <div className="flex justify-center mt-10 p-8">
            <img loading="lazy" className="" src={HeroPhoto} alt="HeroPhoto" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
