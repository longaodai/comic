import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { getLatestChapter, timeAgo } from '../../utils/utils.js';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomeSlider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch('https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=2')
      .then((res) => res.json())
      .then((data) => setSlides(data.data.items || []))
      .catch((err) => console.error('Error fetching slides:', err));
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
          <SwiperSlide key={comic._id}>
            <Link to={`/comic-detail/${comic.slug}`} className="block group">
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
                  alt={comic.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hiển thị tiêu đề, chương mới nhất và thời gian cập nhật */}
                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-xs p-2">
                  {/* Tiêu đề truyện (tối đa 2 dòng) */}
                  <h3 className="text-sm md:text-base font-bold text-white line-clamp-2">
                    {comic.name}
                  </h3>
                  {/* Chương mới nhất & thời gian cập nhật */}
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-bold text-secondary">
                      Chap {getLatestChapter(comic.chaptersLatest)}
                    </span>
                    <span className="text-gray-300">
                      {timeAgo(comic.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
