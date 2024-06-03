import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Content = () => {
  return (
    <div className='h-[250px] sm:h-full'>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        style={{ height: '100%' }} // Swiper bileşeninin yüksekliğini ayarlamak için stil ekleyin
      >
        <SwiperSlide style={{ height: '100%' }}> 
          <img src="/images/slider1.png" style={{ height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
        <SwiperSlide style={{ height: '100%' }}>
          <img src="/images/slider2.png" style={{ height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
        <SwiperSlide style={{ height: '100%' }}>
          <img src="/images/slider3.png" style={{ height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
        <SwiperSlide style={{ height: '100%' }}>
          <img src="/images/slider4.png" style={{ height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Content;
