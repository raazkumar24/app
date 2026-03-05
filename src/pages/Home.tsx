import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { heroConfig, roomsConfig, servicesConfig, testimonialsConfig } from '@/config';
import { Button } from '@/components/ui/button';
import { Waves, Wifi, Utensils, Car, Dumbbell, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Icon map for services
const iconMap: Record<string, React.ElementType> = {
  'Waves': Waves,
  'Wifi': Wifi,
  'Utensils': Utensils,
  'Car': Car,
  'Dumbbell': Dumbbell,
  'Clock': Clock,
  // Lowercase versions in case config has lowercase
  'waves': Waves,
  'wifi': Wifi,
  'utensils': Utensils,
  'car': Car,
  'dumbbell': Dumbbell,
  'clock': Clock,
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline({ delay: 0.3 });
      
      if (heroLeftRef.current) {
        heroTl.fromTo(heroLeftRef.current, 
          { x: '-60vw', opacity: 1 }, 
          { x: 0, duration: 1, ease: 'power3.out' }
        );
      }
      if (heroRightRef.current) {
        heroTl.fromTo(heroRightRef.current, 
          { x: '60vw', opacity: 1 }, 
          { x: 0, duration: 1, ease: 'power3.out' }, 
          '-=0.85'
        );
      }
      if (heroContentRef.current) {
        heroTl.fromTo(heroContentRef.current, 
          { scale: 0.85, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
          '-=0.5'
        );
      }

      // Statement section parallax
      const statementImg = statementRef.current?.querySelector('img');
      if (statementImg) {
        gsap.fromTo(statementImg,
          { scale: 1.18, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            }
          }
        );
      }

      // Statement headline reveal
      const headlineWords = statementRef.current?.querySelectorAll('.headline-word');
      if (headlineWords && headlineWords.length > 0) {
        gsap.fromTo(headlineWords,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      }

      // Rooms section animation
      const roomImage = roomsRef.current?.querySelector('.room-image');
      if (roomImage) {
        gsap.fromTo(roomImage,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: roomsRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      }

      const roomContent = roomsRef.current?.querySelector('.room-content');
      if (roomContent) {
        gsap.fromTo(roomContent,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: roomsRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      }

      // Amenities cards stagger
      const amenityCards = amenitiesRef.current?.querySelectorAll('.amenity-card');
      if (amenityCards && amenityCards.length > 0) {
        gsap.fromTo(amenityCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: amenitiesRef.current,
              start: 'top 70%',
              end: 'top 30%',
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
            stagger: 0.08,
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      }

      // Reviews section
      const reviewImage = reviewsRef.current?.querySelector('.review-image');
      if (reviewImage) {
        gsap.fromTo(reviewImage,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: reviewsRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      }

      const reviewContent = reviewsRef.current?.querySelector('.review-content');
      if (reviewContent) {
        gsap.fromTo(reviewContent,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: reviewsRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      }

      // CTA section
      const ctaContent = ctaRef.current?.querySelector('.cta-content');
      if (ctaContent) {
        gsap.fromTo(ctaContent,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 70%',
              end: 'top 40%',
              scrub: 1,
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* Hero Section - Split Reveal */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-[#F5F3EE]">
        {/* Left Image Panel */}
        <div 
          ref={heroLeftRef}
          className="absolute left-0 top-0 w-1/2 h-full"
        >
          <img 
            src={heroConfig.leftImage} 
            alt="Hotel Lounge"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Image Panel */}
        <div 
          ref={heroRightRef}
          className="absolute right-0 top-0 w-1/2 h-full"
        >
          <img 
            src={heroConfig.rightImage} 
            alt="Hotel Bedroom"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center Seam Line */}
        <div className="absolute left-1/2 top-[10vh] h-[80vh] w-px bg-white/35 transform -translate-x-1/2" />

        {/* Center Content */}
        <div 
          ref={heroContentRef}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10"
        >
          <div className="bg-white/90 backdrop-blur-sm px-8 py-10 md:px-12 md:py-14 shadow-2xl">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full border-2 border-[#C9A86C] flex items-center justify-center">
              <span className="text-[#C9A86C] text-xl md:text-2xl font-serif">G</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#111111] tracking-wider mb-2">
              {heroConfig.name}
            </h1>
            <p className="text-xs md:text-sm tracking-[0.3em] text-[#6E6E6E] uppercase">
              {heroConfig.roles.join(' • ')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button className="bg-[#C9A86C] hover:bg-[#B8985A] text-white px-8 py-3 rounded-none tracking-wider">
                  {heroConfig.ctaPrimary}
                </Button>
              </Link>
              <Link to="/rooms">
                <Button variant="outline" className="border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white px-8 py-3 rounded-none tracking-wider">
                  {heroConfig.ctaSecondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute left-6 md:left-10 bottom-8 text-xs tracking-[0.2em] text-[#6E6E6E] uppercase">
          Scroll
        </div>
      </section>

      {/* Statement Section */}
      <section ref={statementRef} className="relative h-screen w-full overflow-hidden">
        <img 
          src="/images/living_gallery_lounge.jpg" 
          alt="Hotel Lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Hairlines */}
        <div className="absolute top-[8vh] left-[6vw] w-[88vw] h-px bg-white/35" />
        <div className="absolute bottom-[8vh] left-[6vw] w-[88vw] h-px bg-white/35" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl tracking-wider leading-tight">
            <span className="headline-word block">EXPERIENCE</span>
            <span className="headline-word block">LUXURY</span>
            <span className="headline-word block">& COMFORT</span>
          </h2>
        </div>
        
        {/* Bottom Labels */}
        <div className="absolute bottom-8 left-6 md:left-10 text-xs tracking-[0.2em] text-white/80 uppercase flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Chandigarh, India
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section ref={roomsRef} className="min-h-screen bg-[#F5F3EE] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image */}
            <div className="room-image relative overflow-hidden">
              <img 
                src={roomsConfig.rooms[1].image} 
                alt={roomsConfig.rooms[1].title}
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#C9A86C] text-white px-4 py-2 text-xs tracking-wider uppercase">
                Featured
              </div>
            </div>
            
            {/* Content */}
            <div className="room-content">
              <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">{roomsConfig.label}</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#111111] mt-4 mb-6 tracking-wide">
                {roomsConfig.heading}
              </h2>
              <p className="text-[#6E6E6E] text-lg leading-relaxed mb-8">
                {roomsConfig.description}
              </p>
              
              {/* Featured Room Card */}
              <div className="bg-white p-6 md:p-8 shadow-lg mb-8">
                <h3 className="font-serif text-2xl text-[#111111] mb-2">{roomsConfig.rooms[1].title}</h3>
                <p className="text-[#6E6E6E] mb-4">{roomsConfig.rooms[1].description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-[#6E6E6E] mb-4">
                  <span>₹{roomsConfig.rooms[1].price.toLocaleString()}/night</span>
                  <span>•</span>
                  <span>{roomsConfig.rooms[1].size}</span>
                  <span>•</span>
                  <span>{roomsConfig.rooms[1].bedType}</span>
                </div>
                <Link to="/rooms">
                  <Button variant="outline" className="border-[#C9A86C] text-[#C9A86C] hover:bg-[#C9A86C] hover:text-white rounded-none">
                    View All Rooms <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Preview Section - FIXED */}
      <section ref={amenitiesRef} className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">{servicesConfig.label}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#111111] mt-4 tracking-wide">
              {servicesConfig.heading}
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {servicesConfig.services.slice(0, 6).map((service, index) => {
              // Get icon from map, fallback to Waves if not found
              const IconComponent = iconMap[service.iconName] || Waves;
              
              return (
                <div 
                  key={index} 
                  className="amenity-card group bg-[#F5F3EE] p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-[#C9A86C]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A86C] transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-[#C9A86C] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-serif text-xl text-[#111111] mb-3">{service.title}</h3>
                  <p className="text-[#6E6E6E] text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/amenities">
              <Button variant="outline" className="border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white rounded-none px-8">
                View All Amenities <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section ref={galleryRef} className="py-20 md:py-32 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">Gallery</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#111111] mt-4 tracking-wide">
                Every Corner Tells a Story
              </h2>
            </div>
            <Link to="/gallery" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-[#C9A86C] text-[#C9A86C] hover:bg-[#C9A86C] hover:text-white rounded-none">
                View Full Gallery <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { src: '/images/deluxe_room.jpg', title: 'Deluxe Room', category: 'Rooms' },
              { src: '/images/living_gallery_lounge.jpg', title: 'Hotel Lounge', category: 'Interior' },
              { src: '/images/dining_table.jpg', title: 'Fine Dining', category: 'Restaurant' },
              { src: '/images/spa_pool.jpg', title: 'Spa Pool', category: 'Wellness' },
              { src: '/images/rooftop_sunset.jpg', title: 'Rooftop Lounge', category: 'Outdoor' },
              { src: '/images/courtyard_architecture.jpg', title: 'Courtyard', category: 'Outdoor' },
            ].map((item, index) => (
              <div 
                key={index} 
                className={`gallery-item group relative overflow-hidden cursor-pointer ${
                  index === 0 || index === 4 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <img 
                  src={item.src} 
                  alt={item.title}
                  className="w-full h-48 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 md:p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs tracking-wider uppercase">{item.category}</span>
                    <h4 className="font-serif text-lg md:text-xl">{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section ref={reviewsRef} className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image */}
            <div className="review-image relative overflow-hidden">
              <img 
                src={testimonialsConfig.testimonials[0].image} 
                alt="Guest"
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="review-content">
              <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">{testimonialsConfig.label}</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#111111] mt-4 mb-8 tracking-wide">
                {testimonialsConfig.heading}
              </h2>
              
              {/* Review Card */}
              <div className="bg-[#F5F3EE] p-8 md:p-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonialsConfig.testimonials[0].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C9A86C] text-[#C9A86C]" />
                  ))}
                </div>
                <blockquote className="font-serif text-xl md:text-2xl text-[#111111] mb-6 leading-relaxed">
                  "{testimonialsConfig.testimonials[0].quote}"
                </blockquote>
                <div>
                  <p className="font-medium text-[#111111]">{testimonialsConfig.testimonials[0].author}</p>
                  <p className="text-sm text-[#6E6E6E]">{testimonialsConfig.testimonials[0].company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img 
          src="/images/night_exterior.jpg" 
          alt="Hotel Night View"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="cta-content absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {['Luxury Stay', 'Premium Service', 'Unforgettable Experience'].map((tag, i) => (
              <span key={i} className="text-xs tracking-[0.2em] uppercase border border-white/40 px-4 py-2">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 tracking-wide">
            Ready to Arrive?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mb-10">
            Reserve your dates and we'll handle the rest. Experience the perfect blend of luxury and comfort.
          </p>
          <Link to="/booking">
            <Button className="bg-[#C9A86C] hover:bg-[#B8985A] text-white px-10 py-4 rounded-none tracking-wider text-lg">
              Check Availability
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}