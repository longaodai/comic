import { useEffect, useState } from 'react';
import { request } from '../libs/axios';
import ComicCard from '../components/ui/ComicCard';
import HomeSlider from '../components/ui/HomeSlider';
import SectionTitle from '../components/ui/SectionTitle';
import SkeletonHomePage from '../components/ui/skeletons/SkeletonHomePage';

export default function HomePage() {
  const [latestComics, setLatestComics] = useState([]);
  const [upcomingComics, setUpcomingComics] = useState([]);
  const [ongoingComics, setOngoingComics] = useState([]);
  const [completedComics, setCompletedComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [latest, upcoming, ongoing, completed] = await Promise.all([
          request.get(`/danh-sach/truyen-moi`),
          request.get(`/danh-sach/sap-ra-mat`),
          request.get(`/danh-sach/dang-phat-hanh`),
          request.get(`/danh-sach/hoan-thanh`),
        ]);

        setLatestComics(latest.data.data.items || []);
        setUpcomingComics(upcoming.data.data.items || []);
        setOngoingComics(ongoing.data.data.items || []);
        setCompletedComics(completed.data.data.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <SkeletonHomePage />;
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 space-y-8 sm:space-y-10 pt-0">
      <HomeSlider comics={latestComics} />

      {latestComics.length > 0 && (
        <div className="rounded-xl shadow-xl mt-16">
          <SectionTitle title="Latest Comics" color="#ff416c" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
            {latestComics.map((comic) => (
              <ComicCard comic={comic} key={comic.slug} />
            ))}
          </div>
        </div>
      )}

      {upcomingComics.length > 0 && (
        <div className="rounded-xl shadow-xl mt-16">
          <SectionTitle title="Upcoming Comics" color="#56ccf2" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
            {upcomingComics.map((comic) => (
              <ComicCard comic={comic} key={comic.slug} />
            ))}
          </div>
        </div>
      )}

      {ongoingComics.length > 0 && (
        <div className="rounded-xl shadow-xl mt-16">
          <SectionTitle title="Ongoing Comics" color="#f2994a" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
            {ongoingComics.map((comic) => (
              <ComicCard comic={comic} key={comic.slug} />
            ))}
          </div>
        </div>
      )}

      {completedComics.length > 0 && (
        <div className="rounded-xl shadow-xl mt-16">
          <SectionTitle title="Completed Comics" color="#00b09b" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
            {completedComics.map((comic) => (
              <ComicCard comic={comic} key={comic.slug} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
