import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setMenuOpen(false);
    }
  };

  return (
    <header className="bg-base-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-primary">
          <Link to="/">Comic</Link>
        </h1>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-base-200 rounded-full px-4 py-2 transition-all border-2 border-secondary focus-within:ring-secondary shadow-sm hover:shadow-md"
        >
          <input
            type="text"
            placeholder="Tìm kiếm truyện..."
            className="bg-transparent outline-none px-3 py-1 w-60 text-lg focus:w-72 transition-all text-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 bg-secondary text-white p-2 rounded-full hover:bg-primary transition-all"
          >
            <Search className="text-white" size={20} />
          </button>
        </form>

        {/* Navigation & Theme Toggle */}
        <nav className="hidden md:flex items-center gap-6 text-lg">
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="hover:text-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-secondary">
                Thể Loại
              </Link>
            </li>
            <li>
              <Link to="/top" className="hover:text-secondary">
                Top Truyện
              </Link>
            </li>
          </ul>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl transition-transform transform hover:scale-110"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu with Smooth Transition */}
      <div
        className={`md:hidden bg-base-200 shadow-lg transition-all duration-300 overflow-hidden ${
          menuOpen
            ? 'max-h-96 opacity-100 py-4 px-2'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <ul className="space-y-4 text-lg">
          <li>
            <Link to="/" className="block" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className="block"
              onClick={() => setMenuOpen(false)}
            >
              Thể Loại
            </Link>
          </li>
          <li>
            <Link
              to="/top"
              className="block"
              onClick={() => setMenuOpen(false)}
            >
              Top Truyện
            </Link>
          </li>
        </ul>
        <div className="mt-4">
          <ThemeToggle />
        </div>
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-base-300 rounded-full px-4 py-2 mt-4 transition-all border-2 border-secondary focus-within:ring-secondary shadow-sm hover:shadow-md"
        >
          <input
            type="text"
            placeholder="Tìm kiếm truyện..."
            className="bg-transparent outline-none px-3 py-1 w-full text-lg focus:w-full transition-all text-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 bg-secondary text-white p-2 rounded-full hover:bg-primary transition-all"
          >
            <Search className="text-white" size={20} />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
