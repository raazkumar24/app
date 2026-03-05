import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navigationConfig } from '@/config';

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Fade in navbar after page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Determine text color based on page and scroll state
  const getTextColor = () => {
    if (isScrolled) return 'text-[#111111]';
    if (isHomePage) return 'text-white';
    return 'text-[#111111]';
  };

  const getBgColor = () => {
    if (isScrolled) return 'bg-white/95 backdrop-blur-md shadow-sm';
    return 'bg-transparent';
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
          getBgColor()
        )}
      >
        <div className="w-full px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className={cn(
                "text-xl md:text-2xl font-serif tracking-wider transition-colors duration-500",
                getTextColor()
              )}>
                {navigationConfig.logo}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigationConfig.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    "text-sm tracking-wide transition-colors duration-500 relative group uppercase",
                    getTextColor(),
                    location.pathname === link.href && "font-medium"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full",
                    isScrolled || !isHomePage ? "bg-[#111111]" : "bg-white",
                    location.pathname === link.href && "w-full"
                  )} />
                </Link>
              ))}
            </div>

            {/* Contact Button */}
            <div className="hidden lg:block">
              <Link to="/booking">
                <button
                  className={cn(
                    "px-6 py-2 text-sm tracking-wider uppercase transition-all duration-300",
                    isScrolled || !isHomePage
                      ? "bg-[#C9A86C] text-white hover:bg-[#B8985A]"
                      : "border border-white text-white hover:bg-white hover:text-[#111111]"
                  )}
                >
                  {navigationConfig.contactLabel}
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-8 h-6 flex flex-col justify-between"
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  'w-full h-0.5 transition-all duration-500 origin-center',
                  isScrolled || !isHomePage ? 'bg-[#111111]' : 'bg-white',
                  isMenuOpen && 'translate-y-[10px] rotate-[-45deg] bg-[#111111]'
                )}
              />
              <span
                className={cn(
                  'w-full h-0.5 transition-all duration-300',
                  isScrolled || !isHomePage ? 'bg-[#111111]' : 'bg-white',
                  isMenuOpen && 'scale-0 opacity-0'
                )}
              />
              <span
                className={cn(
                  'w-full h-0.5 transition-all duration-500 origin-center',
                  isScrolled || !isHomePage ? 'bg-[#111111]' : 'bg-white',
                  isMenuOpen && '-translate-y-[10px] rotate-[45deg] bg-[#111111]'
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white transition-all duration-500 lg:hidden',
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navigationConfig.links.map((link, index) => (
            <Link
              key={link.label}
              to={link.href}
              className={cn(
                'text-2xl font-serif text-[#111111] transition-all duration-500',
                isMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8',
                location.pathname === link.href && "text-[#C9A86C]"
              )}
              style={{ transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/booking"
            className={cn(
              'mt-4 px-8 py-3 bg-[#C9A86C] text-white text-lg tracking-wider uppercase transition-all duration-500',
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
          >
            {navigationConfig.contactLabel}
          </Link>
        </div>
      </div>
    </>
  );
}
