import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ComicCard from './ComicCard';
import { request } from '../../libs/axios';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomeSlider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    request.get(`/home`).then((response) => {
      setSlides(response.data.data.items || []);
    });
  }, []);

  if (!slides.length) return null;

  return (
    <div className="container mx-auto my-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        slidesPerGroup={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="rounded-lg shadow-lg"
      >
        {slides.map((comic) => (
          <SwiperSlide key={comic.slug}>
            <ComicCard comic={comic} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
