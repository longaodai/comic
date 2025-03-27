import ScrollToTop from '../ui/ScrollToTop';
import CategoryMenu from './CategoryMenu';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      {/* Header */}
      <Header />

      {/* Category Menu */}
      <CategoryMenu />

      {/* Main Content */}
      <main>{children}</main>

      <ScrollToTop />

      {/* Footer */}
      <footer className="bg-neutral text-neutral-content py-4 text-center mt-6">
        <p>&copy; 2025 Comic. All rights reserved.</p>
      </footer>
    </div>
  );
}
