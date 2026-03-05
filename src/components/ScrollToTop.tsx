// components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Har route change par page top par scroll karo
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 'auto' bhi kar sakte ho
    });
  }, [pathname]);

  return null;
}