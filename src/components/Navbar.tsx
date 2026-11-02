import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, BookOpen } from 'lucide-react';

interface NavbarProps {
  simplified?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ simplified = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && (location.pathname === '/' || location.pathname === '/index.html')) {
      return true;
    }
    return location.pathname === path || location.pathname === `${path}.html`;
  };

  const navLinkClass = (path: string) =>
    isActive(path)
      ? 'nav-link text-brand-blue font-semibold transition-colors'
      : 'nav-link text-brand-navy hover:text-brand-blue font-medium transition-colors';

  const mobileNavLinkClass = (path: string) =>
    isActive(path)
      ? 'block px-3 py-2 rounded-md text-base font-semibold text-brand-navy bg-brand-bg'
      : 'block px-3 py-2 rounded-md text-base font-medium text-brand-navy hover:bg-brand-bg hover:text-brand-blue';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="text-brand-navy h-8 w-8" />
            <span className="font-bold text-xl text-brand-navy tracking-tight">
              AussiePath Education
            </span>
          </Link>

          {simplified ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/student-portal"
                className="hidden sm:inline-flex items-center text-sm font-medium text-brand-blue hover:text-brand-navy mr-3"
              >
                <BookOpen className="w-4 h-4 mr-1.5" />
                Student Portal
              </Link>
              {location.pathname.includes('signin') ? (
                <Link
                  to="/signup"
                  className="text-brand-navy hover:text-brand-blue font-medium mr-2 text-sm sm:text-base"
                >
                  Don't have an account? Sign Up
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="text-brand-navy hover:text-brand-blue font-medium mr-2 text-sm sm:text-base"
                >
                  Already have an account? Sign In
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className={navLinkClass('/')}>
                  Home
                </Link>
                <Link to="/about" className={navLinkClass('/about')}>
                  About Us
                </Link>
                <Link to="/student-portal" className={navLinkClass('/student-portal')}>
                  Student Portal
                </Link>
                <Link to="/contact" className={navLinkClass('/contact')}>
                  Contact
                </Link>
              </nav>

              {/* Desktop Auth & CTA */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/signin"
                  className="text-brand-navy hover:text-brand-blue font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-brand-navy hover:text-brand-blue font-medium text-sm mr-2"
                >
                  Sign Up
                </Link>
                <Link
                  to="/contact"
                  className="bg-brand-blue hover:bg-brand-navy text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm inline-flex items-center"
                >
                  Book a Consultation
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                <Link
                  to="/student-portal"
                  className="text-xs font-semibold bg-brand-bg text-brand-blue px-2.5 py-1.5 rounded-lg border border-brand-blue/30"
                >
                  Portal
                </Link>
                <button
                  type="button"
                  id="mobile-menu-btn"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-brand-navy hover:text-brand-blue focus:outline-none p-2"
                  aria-label="Toggle Menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {!simplified && mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass('/')}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass('/about')}
            >
              About Us
            </Link>
            <Link
              to="/student-portal"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass('/student-portal')}
            >
              Student Portal
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass('/contact')}
            >
              Contact
            </Link>
            <div className="border-t border-gray-100 my-2 pt-2 space-y-1">
              <Link
                to="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-navy hover:bg-brand-bg hover:text-brand-blue"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-navy hover:bg-brand-bg hover:text-brand-blue"
              >
                Sign Up
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block mt-2 px-3 py-2 text-center rounded-lg text-base font-medium bg-brand-blue text-white hover:bg-brand-navy"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
