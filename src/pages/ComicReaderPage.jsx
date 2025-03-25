import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { request } from '../libs/axios';

export default function ComicReaderPage() {
  const { slug, chapterName } = useParams();
  const [comic, setComic] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [domainCdn, setDomainCdn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    request
      .get(`/truyen-tranh/${slug}`)
      .then((response) => {
        const comicData = response.data.data.item;
        setComic(comicData);
        setLoading(false);
        const foundChapter = comicData.chapters[0].server_data.find(
          (ch) => ch.chapter_name === chapterName
        );
        if (foundChapter) {
          return axios.get(foundChapter.chapter_api_data);
        } else {
          throw new Error('Chapter not found');
        }
      })
      .then((chapterResponse) => {
        setDomainCdn(chapterResponse.data.data.domain_cdn);
        setChapter(chapterResponse.data.data.item);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch comic details.', err);
        setLoading(false);
      });
  }, [slug, chapterName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        {comic?.name} - Chapter {chapter?.chapter_name}
      </h1>
      <div className="flex flex-col items-center gap-4">
        {chapter?.chapter_image.map((img) => (
          <img
            key={img.image_page}
            src={`${domainCdn}/${chapter.chapter_path}/${img.image_file}`}
            alt={`Page ${img.image_page}`}
            className="w-full max-w-3xl shadow-lg rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
