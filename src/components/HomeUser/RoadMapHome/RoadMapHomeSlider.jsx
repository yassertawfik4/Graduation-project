import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowRight } from "react-icons/fa";
import { RoadMapHomeCard } from "./RoadMapHomeCard";

function RoadMapHomeSlider({ recommendedInternship }) {
  return (
    <div className="my-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-[#000000] font-bold font-[rubik] text-[38px] my-4">
            Mapping your road ahead
          </h2>
          <p className="text-[#000000] flex items-center gap-2 font-[rubik] font-medium text-[17px]">
            view all{" "}
            <span>
              <FaArrowRight />
            </span>
          </p>
        </div>
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            loop={false}
            centeredSlides={false}
            pagination={true}
            initialSlide={1}
            loopAddBlankSlides={false}
            allowTouchMove={true}
            speed={500}
            spaceBetween={20}
            breakpoints={{
              270: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 20,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              },
              450: {
                slidesPerView: 1.5,
                slidesPerGroup: 3,
                spaceBetween: 0,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              },
              570: {
                slidesPerView: 1.5,
                slidesPerGroup: 1,
                spaceBetween: 10,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              },
              767: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 10,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              },
              991: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 10,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              },
              1024: {
                slidesPerView: 2.4,
                slidesPerGroup: 2,
                spaceBetween: 20,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              },
            }}
          >
            {recommendedInternship?.roadmaps?.map((item) => (
              <SwiperSlide key={item.id}>
                <RoadMapHomeCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default RoadMapHomeSlider;
