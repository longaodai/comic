import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { request } from '../libs/axios';

export default function ComicReaderPage() {
  const { slug, chapterName } = useParams();
  const navigate = useNavigate();
  const [comic, setComic] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [domainCdn, setDomainCdn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevChapter, setPrevChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [fadeIn, setFadeIn] = useState(false); // Hiệu ứng chuyển chapter

  useEffect(() => {
    setFadeIn(false); // Reset hiệu ứng khi đổi chapter

    request
      .get(`/truyen-tranh/${slug}`)
      .then((response) => {
        const comicData = response.data.data.item;
        setComic(comicData);

        const chapters = comicData.chapters[0].server_data.sort(
          (a, b) => Number(a.chapter_name) - Number(b.chapter_name)
        );

        const currentIndex = chapters.findIndex(
          (ch) => ch.chapter_name === chapterName
        );
        if (currentIndex !== -1) {
          setPrevChapter(chapters[currentIndex - 1] || null);
          setNextChapter(chapters[currentIndex + 1] || null);

          return axios.get(chapters[currentIndex].chapter_api_data);
        } else {
          throw new Error('Chapter not found');
        }
      })
      .then((chapterResponse) => {
        setDomainCdn(chapterResponse.data.data.domain_cdn);
        setChapter(chapterResponse.data.data.item);
        setLoading(false);
        setFadeIn(true); // Kích hoạt hiệu ứng khi load xong

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
      })
      .catch(() => {
        setError('Failed to fetch comic details.');
        setLoading(false);
      });
  }, [slug, chapterName]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 500) {
        setShowStickyNav(false);
      }

      if (currentScrollY < lastScrollY - 50) {
        setShowStickyNav(true);
      } else if (currentScrollY > lastScrollY + 50) {
        setShowStickyNav(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
        <p className="text-gray-500 mt-2">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 🔹 Title luôn hiển thị cố định */}
      <h1 className="text-2xl font-bold text-center mb-4">
        {comic?.name} - Chapter {chapter?.chapter_name}
      </h1>

      {/* 🔹 Nút Prev / Next ở đầu trang */}
      <div className="flex justify-between items-center mb-4">
        <button
          disabled={!prevChapter}
          onClick={() =>
            navigate(`/comic-reader/${slug}/${prevChapter?.chapter_name}`)
          }
          className={`btn ${prevChapter ? 'btn-primary' : 'btn-disabled'}`}
        >
          ← Chương trước
        </button>

        <button
          disabled={!nextChapter}
          onClick={() =>
            navigate(`/comic-reader/${slug}/${nextChapter?.chapter_name}`)
          }
          className={`btn ${nextChapter ? 'btn-primary' : 'btn-disabled'}`}
        >
          Chương tiếp theo →
        </button>
      </div>

      {/* 📜 Nội dung chapter với hiệu ứng fade-in */}
      <div
        className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {chapter?.chapter_image.map((img) => (
          <img
            key={img.image_page}
            src={`${domainCdn}/${chapter.chapter_path}/${img.image_file}`}
            alt={`Page ${img.image_page}`}
            loading="lazy"
            className="w-full max-w-3xl rounded-lg shadow-md transition-opacity duration-300 ease-in-out hover:opacity-90"
          />
        ))}
      </div>

      <div
        className={`fixed top-0 left-0 right-0 bg-black bg-opacity-80 p-3 text-white z-50 transition-transform duration-300 ${
          showStickyNav ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <h2 className="text-lg font-bold text-center">
          {comic?.name} - Chapter {chapter?.chapter_name}
        </h2>
      </div>

      {/* 🔻 Thanh điều hướng khi cuộn lên (ở bottom) */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 p-3 text-white z-50 transition-transform duration-300 ${
          showStickyNav ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="container mx-auto flex justify-between">
          <button
            disabled={!prevChapter}
            onClick={() =>
              navigate(`/comic-reader/${slug}/${prevChapter?.chapter_name}`)
            }
            className={`btn ${prevChapter ? 'btn-primary' : 'btn-disabled'}`}
          >
            ← Chương trước
          </button>
          <button
            disabled={!nextChapter}
            onClick={() =>
              navigate(`/comic-reader/${slug}/${nextChapter?.chapter_name}`)
            }
            className={`btn ${nextChapter ? 'btn-primary' : 'btn-disabled'}`}
          >
            Chương tiếp theo →
          </button>
        </div>
      </div>

      {/* 🔻 Nút Prev / Next ở cuối trang */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={!prevChapter}
          onClick={() =>
            navigate(`/comic-reader/${slug}/${prevChapter?.chapter_name}`)
          }
          className={`btn ${prevChapter ? 'btn-primary' : 'btn-disabled'}`}
        >
          ← Chương trước
        </button>

        <button
          disabled={!nextChapter}
          onClick={() =>
            navigate(`/comic-reader/${slug}/${nextChapter?.chapter_name}`)
          }
          className={`btn ${nextChapter ? 'btn-primary' : 'btn-disabled'}`}
        >
          Chương tiếp theo →
        </button>
      </div>
    </div>
  );
}
