import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useThemeStore } from './stores/useThemeStore';
import HomePage from './pages/HomePage';
import ComicDetailPage from './pages/ComicDetailPage';
import ComicReaderPage from './pages/ComicReaderPage';
import Layout from './components/layout/Layout';

const App = () => {
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/comic-detail/:slug" element={<ComicDetailPage />} />
          <Route
            path="/comic-reader/:slug/:chapterName"
            element={<ComicReaderPage />}
          />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
