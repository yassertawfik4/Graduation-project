import StudentImage from "/public/images/Group 205.webp";
function AboutStudent() {
  return (
    <section className="my-32">
      <div className="container mx-auto px-2">
        <div className=" py-7 px-3 flex md:justify-between items-center justify-center flex-wrap md:flex-nowrap">
          <div>
            <h2 className="font-[rubik] tracking-[-0.25px] font-semibold md:text-5xl text-4xl">
              For students
            </h2>
            <ul className="list-disc xl:text-[22px] lg:text-[18px] md:text-[15px] font-[roboto] text-[#010318] md:ms-10 ms-7 flex flex-col gap-4 mt-6 font-medium">
              <li>Bridges the gap between students and employers.</li>
              <li>Builds clear roadmaps for career growth.</li>
              <li>Simplifies finding internships with perfect matches.</li>
              <li>Connects students with startup opportunities.</li>
              <li>Gain real-world experience through project contributions.</li>
            </ul>
            <div className="py-5">
              <button className="border-2  xl:text-[24px] md:text-[20px] font-[roboto] cursor-pointer transition ease-in-out duration-200 hover:bg-white hover:text-[#3A4C59] border-[#3A4C59] font-medium bg-[#3A4C59] text-white py-1 px-4 rounded-lg">
                Join Now
              </button>
            </div>
          </div>
          <div>
            <img
              loading="lazy"
              className="xl:w-[540.07px] xl:h-[530.06px] md:w-[320px] md:h-[308px] w-[343px] h-[330px]"
              decoding="async"
              src={StudentImage}
              alt="StudentImage"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStudent;
