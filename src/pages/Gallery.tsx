import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/images/deluxe_room.jpg', title: 'Deluxe Room', category: 'Rooms' },
  { src: '/images/executive_suite.jpg', title: 'Executive Suite', category: 'Rooms' },
  { src: '/images/family_room.jpg', title: 'Family Room', category: 'Rooms' },
  { src: '/images/living_gallery_lounge.jpg', title: 'Main Lounge', category: 'Interior' },
  { src: '/images/hero_sofa_window.jpg', title: 'Lounge Corner', category: 'Interior' },
  { src: '/images/gallery_interior_detail.jpg', title: 'Hotel Corridor', category: 'Interior' },
  { src: '/images/dining_table.jpg', title: 'Fine Dining', category: 'Restaurant' },
  { src: '/images/restaurant_interior.jpg', title: 'Restaurant', category: 'Restaurant' },
  { src: '/images/spa_pool.jpg', title: 'Spa Pool', category: 'Wellness' },
  { src: '/images/pool_outdoor.jpg', title: 'Outdoor Pool', category: 'Outdoor' },
  { src: '/images/rooftop_sunset.jpg', title: 'Rooftop Lounge', category: 'Outdoor' },
  { src: '/images/courtyard_architecture.jpg', title: 'Courtyard', category: 'Outdoor' },
  { src: '/images/event_space.jpg', title: 'Event Space', category: 'Interior' },
  { src: '/images/gym.jpg', title: 'Fitness Center', category: 'Wellness' },
  { src: '/images/night_exterior.jpg', title: 'Night View', category: 'Exterior' },
];

const categories = ['All', 'Rooms', 'Interior', 'Restaurant', 'Wellness', 'Outdoor', 'Exterior'];

export default function Gallery() {
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      const heroImg = heroRef.current?.querySelector('img');
      if (heroImg) {
        gsap.fromTo(heroImg,
          { scale: 1.1 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            }
          }
        );
      }

      // Gallery items
      const galleryItems = galleryRef.current?.querySelectorAll('.gallery-item');
      if (galleryItems && galleryItems.length > 0) {
        gsap.fromTo(galleryItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, [filteredImages]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img 
          src="/images/courtyard_architecture.jpg" 
          alt="Hotel Gallery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <span className="text-xs tracking-[0.3em] uppercase mb-4 text-white/80">Gallery</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide">
            Every Corner<br />Tells a Story
          </h1>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 md:py-32 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 text-sm tracking-wider uppercase transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#C9A86C] text-white'
                    : 'bg-white text-[#111111] hover:bg-[#C9A86C] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div ref={galleryRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {filteredImages.map((image, index) => (
              <div 
                key={image.src}
                className="gallery-item group relative overflow-hidden cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 md:p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs tracking-wider uppercase">{image.category}</span>
                    <h4 className="font-serif text-lg md:text-xl">{image.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          <button 
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[80vh] px-20">
            <img 
              src={filteredImages[currentImageIndex].src} 
              alt={filteredImages[currentImageIndex].title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="text-center mt-4 text-white">
              <span className="text-xs tracking-wider uppercase text-white/60">
                {filteredImages[currentImageIndex].category}
              </span>
              <h4 className="font-serif text-xl mt-1">{filteredImages[currentImageIndex].title}</h4>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {currentImageIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
