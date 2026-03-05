import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { PageOverlay } from '@/components/PageOverlay';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Footer } from '@/sections/Footer';
import { usePageLoad } from '@/hooks/usePageLoad';

// Pages
import Home from '@/pages/Home';
import Rooms from '@/pages/Rooms';
import Amenities from '@/pages/Amenities';
import Gallery from '@/pages/Gallery';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Booking from '@/pages/Booking';
import { ScrollToTop } from '@/components/ScrollToTop';

function App() {
  const { showOverlay } = usePageLoad(500);

  return (
    <Router>
            <ScrollToTop />

      <div className="min-h-screen bg-[#F5F3EE]">
        {/* Page Load Overlay */}
        <PageOverlay isVisible={showOverlay} />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* WhatsApp Floating Button */}
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
