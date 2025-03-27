import { useEffect, useState } from 'react';
import { request } from '../libs/axios';
import ComicCard from '../components/ui/ComicCard';
import HomeSlider from '../components/ui/HomeSlider';

const SectionTitle = ({ title, color }) => (
  <div className="text-center my-6">
    <h2
      className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wide"
      style={{ color }}
    >
      {title}
    </h2>
    <div
      className="mt-2 h-1 w-16 sm:w-24 mx-auto rounded-full"
      style={{ backgroundColor: color }}
    ></div>
  </div>
);

export default function HomePage() {
  const [latestComics, setLatestComics] = useState([]);
  const [upcomingComics, setUpcomingComics] = useState([]);
  const [ongoingComics, setOngoingComics] = useState([]);
  const [completedComics, setCompletedComics] = useState([]);

  useEffect(() => {
    request.get(`/danh-sach/truyen-moi`).then((response) => {
      setLatestComics(response.data.data.items || []);
    });
    request.get(`/danh-sach/sap-ra-mat`).then((response) => {
      setUpcomingComics(response.data.data.items || []);
    });
    request.get(`/danh-sach/dang-phat-hanh`).then((response) => {
      setOngoingComics(response.data.data.items || []);
    });
    request.get(`/danh-sach/hoan-thanh`).then((response) => {
      setCompletedComics(response.data.data.items || []);
    });
  }, []);

  return (
    <div className="container mx-auto p-2 sm:p-4 space-y-8 sm:space-y-10">
      <HomeSlider />

      <div className="rounded-xl shadow-xl">
        <SectionTitle title="Latest Comics" color="#ff416c" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
          {latestComics.map((comic) => (
            <ComicCard comic={comic} key={comic.slug} />
          ))}
        </div>
      </div>

      <div className="rounded-xl shadow-xl">
        <SectionTitle title="Upcoming Comics" color="#56ccf2" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
          {upcomingComics.map((comic) => (
            <ComicCard comic={comic} key={comic.slug} />
          ))}
        </div>
      </div>

      <div className="rounded-xl shadow-xl">
        <SectionTitle title="Ongoing Comics" color="#f2994a" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
          {ongoingComics.map((comic) => (
            <ComicCard comic={comic} key={comic.slug} />
          ))}
        </div>
      </div>

      <div className="rounded-xl shadow-xl">
        <SectionTitle title="Completed Comics" color="#00b09b" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
          {completedComics.map((comic) => (
            <ComicCard comic={comic} key={comic.slug} />
          ))}
        </div>
      </div>
    </div>
  );
}
