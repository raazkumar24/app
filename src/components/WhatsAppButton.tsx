import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// WhatsApp SVG Icon
const WhatsAppIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-14 h-14 text-white"
  >
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.607-1.446c.157-.174.342-.218.456-.218l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.423-.101.828z"/>
  </svg>
);

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Show button after scrolling down a bit
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneNumber = '919999999999'; // Replace with actual hotel WhatsApp number
  const message = 'Hello! I would like to inquire about a reservation at The Grand Chandigarh.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        )}
      >
        {/* Expanded Message Card */}
        {isExpanded && (
          <div className="bg-white rounded-lg shadow-xl p-4 mb-2 max-w-[280px] animate-fade-in">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                  <WhatsAppIcon />
                </div>
                <span className="font-medium text-[#111111]">The Grand Chandigarh</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-[#6E6E6E] hover:text-[#111111] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-[#6E6E6E] mb-3">
              Hi there! How can we help you today?
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#25D366] text-white text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-[#128C7E] transition-colors"
            >
              Start Chat
            </a>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300',
            'bg-[#25D366] hover:bg-[#128C7E] hover:scale-110'
          )}
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon />
          
          {/* Pulse Animation Ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 bg-[#111111] text-white text-xs px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with us
          </span>
        </button>
      </div>
    </>
  );
}