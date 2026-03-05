import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Waves, Utensils, Dumbbell, Wifi, Car, Clock,
  Sparkles, Coffee, Bath, Wind, Flower2, UserCheck
} from 'lucide-react';
import { servicesConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

// Icon map for main services
const mainIconMap: Record<string, React.ElementType> = {
  'Waves': Waves,
  'Utensils': Utensils,
  'Dumbbell': Dumbbell,
  'Wifi': Wifi,
  'Car': Car,
  'Clock': Clock,
  // Add more mappings as needed
};

const additionalAmenities = [
  {
    icon: Sparkles,
    title: "Room Service",
    description: "24-hour in-room dining with our full menu available at any time.",
  },
  {
    icon: Coffee,
    title: "Breakfast Buffet",
    description: "Complimentary continental and hot breakfast served daily.",
  },
  {
    icon: UserCheck,
    title: "Concierge",
    description: "Personal assistance for reservations, tours, and local recommendations.",
  },
  {
    icon: Bath,
    title: "Spa Services",
    description: "In-room spa treatments and massage services available.",
  },
  {
    icon: Wind,
    title: "Air Conditioning",
    description: "Climate-controlled rooms for your comfort in any season.",
  },
  {
    icon: Flower2,
    title: "Housekeeping",
    description: "Daily housekeeping service to keep your room pristine.",
  },
];

export default function Amenities() {
  const heroRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const additionalRef = useRef<HTMLDivElement>(null);

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

      // Main amenities cards
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

      // Additional amenities
      const additionalCards = additionalRef.current?.querySelectorAll('.additional-card');
      if (additionalCards && additionalCards.length > 0) {
        gsap.fromTo(additionalCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            scrollTrigger: {
              trigger: additionalRef.current,
              start: 'top 70%',
              end: 'top 30%',
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
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img 
          src="/images/spa_pool.jpg" 
          alt="Hotel Spa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <span className="text-xs tracking-[0.3em] uppercase mb-4 text-white/80">{servicesConfig.label}</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide">
            {servicesConfig.heading}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mt-6">
            Experience world-class facilities designed for your comfort and enjoyment.
          </p>
        </div>
      </section>

      {/* Main Amenities Grid */}
      <section ref={amenitiesRef} className="py-20 md:py-32 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {servicesConfig.services.map((service, index) => {
              // Get the icon component from the map using the iconName string
              // If not found, default to Waves
              const IconComponent = mainIconMap[service.iconName] || Waves;
              
              return (
                <div 
                  key={index} 
                  className="amenity-card group bg-white p-8 md:p-10 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#C9A86C]/20"
                >
                  <div className="w-14 h-14 bg-[#C9A86C]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A86C] transition-colors duration-300">
                    <IconComponent className="w-7 h-7 text-[#C9A86C] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-[#111111] mb-4">{service.title}</h3>
                  <p className="text-[#6E6E6E] leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Amenities with Images */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Swimming Pool */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-20 md:mb-32">
            <div className="relative overflow-hidden group">
              <img 
                src="/images/pool_outdoor.jpg" 
                alt="Swimming Pool"
                className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div>
              <div className="w-12 h-12 bg-[#C9A86C]/10 flex items-center justify-center mb-6">
                <Waves className="w-6 h-6 text-[#C9A86C]" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-[#111111] mb-4">Swimming Pool</h3>
              <p className="text-[#6E6E6E] leading-relaxed mb-6">
                Dive into relaxation at our stunning outdoor swimming pool. Surrounded by lush landscaping 
                and comfortable lounge chairs, it's the perfect place to unwind and soak up the sun. 
                Our pool is temperature-controlled for year-round enjoyment.
              </p>
              <ul className="space-y-3">
                {['Temperature controlled', 'Poolside service', 'Towels provided', 'Open 6 AM - 10 PM'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#111111]">
                    <span className="w-1.5 h-1.5 bg-[#C9A86C] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Restaurant */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-20 md:mb-32">
            <div className="md:order-2 relative overflow-hidden group">
              <img 
                src="/images/restaurant_interior.jpg" 
                alt="Restaurant"
                className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="md:order-1">
              <div className="w-12 h-12 bg-[#C9A86C]/10 flex items-center justify-center mb-6">
                <Utensils className="w-6 h-6 text-[#C9A86C]" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-[#111111] mb-4">Fine Dining</h3>
              <p className="text-[#6E6E6E] leading-relaxed mb-6">
                Savor exquisite culinary creations at our award-winning restaurant. Our expert chefs 
                craft seasonal menus using the finest local and international ingredients. From 
                breakfast buffets to romantic dinners, every meal is an occasion.
              </p>
              <ul className="space-y-3">
                {['Farm-to-table cuisine', '24-hour room service', 'Private dining available', 'Wine cellar selection'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#111111]">
                    <span className="w-1.5 h-1.5 bg-[#C9A86C] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Fitness Center */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative overflow-hidden group">
              <img 
                src="/images/gym.jpg" 
                alt="Fitness Center"
                className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div>
              <div className="w-12 h-12 bg-[#C9A86C]/10 flex items-center justify-center mb-6">
                <Dumbbell className="w-6 h-6 text-[#C9A86C]" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-[#111111] mb-4">Fitness Center</h3>
              <p className="text-[#6E6E6E] leading-relaxed mb-6">
                Maintain your fitness routine in our state-of-the-art gym. Equipped with the latest 
                cardio machines, free weights, and strength training equipment. Personal trainers 
                are available upon request for customized workout sessions.
              </p>
              <ul className="space-y-3">
                {['Modern equipment', 'Personal training', 'Yoga classes', 'Open 24/7'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#111111]">
                    <span className="w-1.5 h-1.5 bg-[#C9A86C] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Amenities */}
      <section ref={additionalRef} className="py-20 md:py-32 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">More Services</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#111111] mt-4 tracking-wide">
              Additional Amenities
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalAmenities.map((amenity, index) => {
              const IconComponent = amenity.icon;
              return (
                <div 
                  key={index} 
                  className="additional-card flex items-start gap-4 bg-white p-6"
                >
                  <div className="w-10 h-10 bg-[#C9A86C]/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-[#C9A86C]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#111111] mb-1">{amenity.title}</h4>
                    <p className="text-sm text-[#6E6E6E]">{amenity.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}