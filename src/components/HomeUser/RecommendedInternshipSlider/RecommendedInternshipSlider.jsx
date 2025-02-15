import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // ✅ استيراد أنماط التنقل

import RecommendedInternshipcard from "./RecommendedInternshipcard";

function RecommendedInternshipSlider() {
  return (
    <div className="my-16">
      <div className="container mx-auto">
        <h2 className="text-[#000000] font-bold font-[rubik] text-[38px] my-4">
          Recommended for you
        </h2>
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
                slidesPerView:1,
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
                slidesPerView: 2.5,
                slidesPerGroup: 2,
                spaceBetween: 10,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              },
            }}
          >
            <SwiperSlide>
              <RecommendedInternshipcard />
            </SwiperSlide>
            <SwiperSlide>
              <RecommendedInternshipcard />
            </SwiperSlide>
            <SwiperSlide>
              <RecommendedInternshipcard />
            </SwiperSlide>
            <SwiperSlide>
              <RecommendedInternshipcard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default RecommendedInternshipSlider;
