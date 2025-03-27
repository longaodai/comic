import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { request } from '../libs/axios';
import SectionTitle from '../components/ui/SectionTitle';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SkeletonComicReader from '../components/ui/skeletons/SkeletonComicReader';

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
  const [allChapters, setAllChapters] = useState([]);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(false);

    request
      .get(`/truyen-tranh/${slug}`)
      .then((response) => {
        const comicData = response.data.data.item;
        setComic(comicData);

        const chapters = comicData.chapters[0].server_data.sort(
          (a, b) => Number(a.chapter_name) - Number(b.chapter_name)
        );

        setAllChapters(chapters);

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
        setFadeIn(true);

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
    return <SkeletonComicReader />;
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
      <SectionTitle
        title={`${comic?.name} - Chapter ${chapter?.chapter_name}`}
      />

      <div className="flex justify-between items-center mb-4 gap-4">
        <button
          disabled={!prevChapter}
          onClick={() =>
            navigate(`/comic-reader/${slug}/${prevChapter?.chapter_name}`)
          }
          className={`btn ${prevChapter ? 'btn-primary' : 'btn-disabled'}`}
        >
          <ArrowLeft size={20} /> Chương trước
        </button>

        <select
          value={chapterName}
          onChange={(e) => navigate(`/comic-reader/${slug}/${e.target.value}`)}
          className="select select-bordered select-lg w-full max-w-xs focus:outline-none"
        >
          {allChapters.map((ch) => (
            <option key={ch.chapter_name} value={ch.chapter_name}>
              Chương {ch.chapter_name}{' '}
              {ch.chapter_title ? `- ${ch.chapter_title}` : ''}
            </option>
          ))}
        </select>

        <button
          disabled={!nextChapter}
          onClick={() =>
            navigate(`/comic-reader/${slug}/${nextChapter?.chapter_name}`)
          }
          className={`btn ${nextChapter ? 'btn-primary' : 'btn-disabled'}`}
        >
          Chương tiếp theo <ArrowRight size={20} />
        </button>
      </div>

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

      <div className="mt-20"></div>

      <div className="flex justify-between items-center mb-4 gap-4">
        <button
          disabled={!prevChapter}
          onClick={() =>
            navigate(`/comic-reader/${slug}/${prevChapter?.chapter_name}`)
          }
          className={`btn ${prevChapter ? 'btn-primary' : 'btn-disabled'}`}
        >
          <ArrowLeft size={20} /> Chương trước
        </button>

        <select
          value={chapterName}
          onChange={(e) => navigate(`/comic-reader/${slug}/${e.target.value}`)}
          className="select select-bordered select-lg w-full max-w-xs focus:outline-none"
        >
          {allChapters.map((ch) => (
            <option key={ch.chapter_name} value={ch.chapter_name}>
              Chương {ch.chapter_name}{' '}
              {ch.chapter_title ? `- ${ch.chapter_title}` : ''}
            </option>
          ))}
        </select>

        <button
          disabled={!nextChapter}
          onClick={() =>
            navigate(`/comic-reader/${slug}/${nextChapter?.chapter_name}`)
          }
          className={`btn ${nextChapter ? 'btn-primary' : 'btn-disabled'}`}
        >
          Chương tiếp theo <ArrowRight size={20} />
        </button>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 bg-base-200 bg-opacity-90 border-t border-base-300 p-4 text-base-content z-50 transition-transform duration-300 shadow-lg ${
          showStickyNav ? 'translate-y-0' : 'translate-y-full'
        } rounded-t-lg`}
      >
        <div className="container mx-auto flex justify-between items-center gap-4">
          <button
            disabled={!prevChapter}
            onClick={() =>
              navigate(`/comic-reader/${slug}/${prevChapter?.chapter_name}`)
            }
            className={`btn ${
              prevChapter ? 'btn-primary' : 'btn-disabled'
            } flex items-center gap-1`}
          >
            <ArrowLeft size={20} /> Chương trước
          </button>

          <select
            value={chapterName}
            onChange={(e) =>
              navigate(`/comic-reader/${slug}/${e.target.value}`)
            }
            className="select select-bordered select-lg w-full max-w-xs focus:outline-none"
          >
            {allChapters.map((ch) => (
              <option key={ch.chapter_name} value={ch.chapter_name}>
                Chương {ch.chapter_name}{' '}
                {ch.chapter_title ? `- ${ch.chapter_title}` : ''}
              </option>
            ))}
          </select>

          <button
            disabled={!nextChapter}
            onClick={() =>
              navigate(`/comic-reader/${slug}/${nextChapter?.chapter_name}`)
            }
            className={`btn ${
              nextChapter ? 'btn-primary' : 'btn-disabled'
            } flex items-center gap-1`}
          >
            Chương tiếp theo <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
