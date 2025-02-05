import cover from "/public/images/Cover.png";
import PhotoCover from "/public/images/PhotoCover.svg";
function AboutCompany() {
  return (
    <section className="">
      <div className="container mx-auto">
        <div className=" py-7 px-2 flex justify-between items-center">
          <div className="relative">
            <img loading="lazy" src={cover} alt="Cover" />
            <img
              loading="lazy"
              className="absolute top-0"
              src={PhotoCover}
              alt="PhotoCover"
            />
          </div>
          <div>
            <h2 className="font-[rubik] tracking-[-0.25px] font-semibold text-5xl">
              For companies
            </h2>
            <ul className="list-disc text-[25px] font-[roboto] text-[#010318] ms-10 leading-[67px] mt-6 font-medium">
              <li>Hire candidates prepared to meet your needs.</li>
              <li>Build your brand among top students.</li>
              <li>Quickly fill positions with motivated applicants.</li>
              <li>Post roadmaps for skills your company needs.</li>
              <li>Collaborate with students on real projects.</li>
            </ul>
            <div className="py-5">
              <button className="border-2  text-[24px] font-[roboto] cursor-pointer transition ease-in-out duration-200 hover:bg-white hover:text-[#3A4C59] border-[#3A4C59] font-medium bg-[#3A4C59] text-white py-1 px-4 rounded-lg">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;
