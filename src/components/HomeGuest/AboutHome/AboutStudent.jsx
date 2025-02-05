import StudentImage from "/public/images/Group 205.png";
function AboutStudent() {
  return (
    <section className="my-32">
      <div className="container mx-auto">
        <div className="bg-[#FFFFFF] py-7 px-2 flex justify-between items-center">
          <div>
            <h2 className="font-[rubik] tracking-[-0.25px] font-semibold text-5xl">
              For students
            </h2>
            <ul className="list-disc text-[25px] font-[roboto] text-[#010318] ms-10 leading-[67px] mt-6 font-medium">
              <li>Bridges the gap between students and employers.</li>
              <li>Builds clear roadmaps for career growth.</li>
              <li>Simplifies finding internships with perfect matches.</li>
              <li>Connects students with startup opportunities.</li>
              <li>Gain real-world experience through project contributions.</li>
            </ul>
            <div className="py-5">
              <button className="border-2  text-[24px] font-[roboto] cursor-pointer transition ease-in-out duration-200 hover:bg-white hover:text-[#3A4C59] border-[#3A4C59] font-medium bg-[#3A4C59] text-white py-1 px-4 rounded-lg">
                Join Now
              </button>
            </div>
          </div>
          <div>
            <img loading="lazy" src={StudentImage} alt="StudentImage" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStudent;
