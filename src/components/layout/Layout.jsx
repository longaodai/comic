import { Link } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      {/* Header */}
      <header className="bg-primary text-primary-content shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <h1 className="text-3xl font-bold">
            <Link to="/">Comic</Link>
          </h1>
          <nav className="flex items-center gap-6 text-lg">
            <ul className="flex gap-6">
              <li>
                <Link to="/" className="hover:text-secondary">
                  Home
                </Link>
              </li>
            </ul>

            {/* Theme Toggle Button */}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-neutral text-neutral-content py-4 text-center mt-6">
        <p>&copy; 2025 Comic. All rights reserved.</p>
      </footer>
    </div>
  );
}
