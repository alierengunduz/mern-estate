import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Content = () => {
  return (
    <Swiper
    slidesPerView={'auto'}
    spaceBetween={30}
    pagination={{
      clickable: true,
    }}
    modules={[Pagination]}
    className="mySwiper"
  >
    <SwiperSlide>
      <img src="/images/slider1.png" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="/images/slider2.png" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="/images/slider3.png" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="/images/slider4.png" />
    </SwiperSlide>
   
  </Swiper>
  )
}

export default Content