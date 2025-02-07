import cover from "/public/images/Group 217.webp";
// import PhotoCover from "/public/images/PhotoCover.webp";
import FirstFrame from "/public/images/FirstFrame.webp";
import SecondFrame from "/public/images/SecoundFrame.webp";
import mobileFrame from "/public/images/FrameMobile.png";
import useWindowSize from "../../../hooks/useWindowSize";

function AboutCompany() {
  const { width } = useWindowSize();

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-2">
        <div className=" py-7 px-2 flex md:justify-between justify-center flex-wrap md:flex-nowrap items-center">
          <div className="relative" data-aos="fade-right">
            <img
              className="xl:w-[651px] xl:h-[496px] md:w-[324px] md:h-[245.6px] w-[343px] h-[260px]"
              loading="lazy"
              decoding="async"
              src={cover}
              alt="Cover"
            />
          </div>
          <div data-aos="fade-left">
            <h2 className="font-[rubik] tracking-[-0.25px] font-semibold md:text-5xl text-4xl">
              For companies
            </h2>
            <ul className="list-disc xl:text-[22px] lg:text-[18px] md:text-[15px] font-[roboto] text-[#010318] md:ms-10 ms-7 flex flex-col gap-4 mt-6 font-medium">
              <li>Hire candidates prepared to meet your needs.</li>
              <li>Build your brand among top students.</li>
              <li>Quickly fill positions with motivated applicants.</li>
              <li>Post roadmaps for skills your company needs.</li>
              <li>Collaborate with students on real projects.</li>
            </ul>
            <div className="py-5">
              <button className="border-2 md:text-[24px] text-[18px] font-[roboto] cursor-pointer transition ease-in-out duration-200 hover:bg-white hover:text-[#3A4C59] border-[#3A4C59] font-medium bg-[#3A4C59] text-white py-1 px-4 rounded-lg">
                Join Now
              </button>
            </div>
          </div>
        </div>
        <div className="mt-24" data-aos="fade-up">
          <h2 className="text-center font-[rubik] tracking-[-0.21px] font-semibold text-5xl py-5">
            How it works
          </h2>
          <div className="flex items-center gap-24 justify-center mt-14 w-full flex-col">
            {width > 768 ? (
              <>
                <img
                  className="xl:w-[1152px] xl:h-[108px] md:w-[753px] w-[643px]"
                  loading="lazy"
                  src={FirstFrame}
                  decoding="async"
                  alt="FirstFrame"
                />
                <img
                  className="xl:w-[627px] xl:h-[94px] md:w-[452px] w-[300px] "
                  loading="lazy"
                  src={SecondFrame}
                  decoding="async"
                  alt="SecondFrame"
                />
              </>
            ) : (
              <>
                <img
                  className="w-[303px]"
                  loading="lazy"
                  src={mobileFrame}
                  decoding="async"
                  alt="FirstFrame"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;
