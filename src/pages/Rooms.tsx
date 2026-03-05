import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Bed, Users, Maximize, Wifi, Tv, Wine, Check, ArrowRight } from 'lucide-react';
import { roomsConfig } from '@/config';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const amenityIcons: Record<string, React.ElementType> = {
  'WiFi': Wifi,
  'TV': Tv,
  'Mini Bar': Wine,
  'Safe': Check,
  'Lounge': Users,
  'City View': Maximize,
  'Kids Area': Users,
};

export default function Rooms() {
  const heroRef = useRef<HTMLDivElement>(null);
  const roomsListRef = useRef<HTMLDivElement>(null);

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

      // Room cards stagger
      const roomCards = roomsListRef.current?.querySelectorAll('.room-card');
      if (roomCards && roomCards.length > 0) {
        gsap.fromTo(roomCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            scrollTrigger: {
              trigger: roomsListRef.current,
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
          src="/images/room_detail_bed.jpg" 
          alt="Luxury Room"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <span className="text-xs tracking-[0.3em] uppercase mb-4 text-white/80">{roomsConfig.label}</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide">
            {roomsConfig.heading}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mt-6">
            {roomsConfig.description}
          </p>
        </div>
      </section>

      {/* Rooms List Section */}
      <section ref={roomsListRef} className="py-20 md:py-32 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid gap-16 md:gap-24">
            {roomsConfig.rooms.map((room, index) => (
              <div 
                key={room.id} 
                className={`room-card grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                  index % 2 === 1 ? 'md:direction-rtl' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden group ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <img 
                    src={room.image} 
                    alt={room.title}
                    className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {room.featured && (
                    <div className="absolute top-4 left-4 bg-[#C9A86C] text-white px-4 py-2 text-xs tracking-wider uppercase">
                      Most Popular
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className={`${index % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                  <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">{room.category}</span>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#111111] mt-3 mb-4 tracking-wide">
                    {room.title}
                  </h2>
                  <p className="text-[#6E6E6E] text-lg leading-relaxed mb-6">
                    {room.description}
                  </p>
                  
                  {/* Room Details */}
                  <div className={`flex flex-wrap gap-6 mb-8 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                    <div className="flex items-center gap-2 text-[#111111]">
                      <Maximize className="w-5 h-5 text-[#C9A86C]" />
                      <span>{room.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#111111]">
                      <Bed className="w-5 h-5 text-[#C9A86C]" />
                      <span>{room.bedType}</span>
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div className={`flex flex-wrap gap-3 mb-8 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                    {room.amenities.map((amenity, i) => {
                      const Icon = amenityIcons[amenity] || Check;
                      return (
                        <span 
                          key={i} 
                          className="inline-flex items-center gap-2 bg-white px-4 py-2 text-sm text-[#6E6E6E]"
                        >
                          <Icon className="w-4 h-4 text-[#C9A86C]" />
                          {amenity}
                        </span>
                      );
                    })}
                  </div>
                  
                  {/* Price & CTA */}
                  <div className={`flex items-center gap-6 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                    <div>
                      <span className="text-3xl md:text-4xl font-serif text-[#111111]">
                        ₹{room.price.toLocaleString()}
                      </span>
                      <span className="text-[#6E6E6E] text-sm"> / night</span>
                    </div>
                    <Link to="/booking">
                      <Button className="bg-[#C9A86C] hover:bg-[#B8985A] text-white px-8 py-3 rounded-none tracking-wider">
                        Book Now <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">Compare</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#111111] mt-4 tracking-wide">
              Room Comparison
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-[#111111]">
                  <th className="text-left py-4 px-4 font-serif text-lg">Feature</th>
                  {roomsConfig.rooms.map(room => (
                    <th key={room.id} className="text-center py-4 px-4 font-serif text-lg">
                      {room.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#E5E5E5]">
                  <td className="py-4 px-4 text-[#6E6E6E]">Size</td>
                  {roomsConfig.rooms.map(room => (
                    <td key={room.id} className="text-center py-4 px-4">{room.size}</td>
                  ))}
                </tr>
                <tr className="border-b border-[#E5E5E5]">
                  <td className="py-4 px-4 text-[#6E6E6E]">Bed Type</td>
                  {roomsConfig.rooms.map(room => (
                    <td key={room.id} className="text-center py-4 px-4">{room.bedType}</td>
                  ))}
                </tr>
                <tr className="border-b border-[#E5E5E5]">
                  <td className="py-4 px-4 text-[#6E6E6E]">Price per Night</td>
                  {roomsConfig.rooms.map(room => (
                    <td key={room.id} className="text-center py-4 px-4 font-medium">
                      ₹{room.price.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[#E5E5E5]">
                  <td className="py-4 px-4 text-[#6E6E6E]">WiFi</td>
                  {roomsConfig.rooms.map(room => (
                    <td key={room.id} className="text-center py-4 px-4">
                      <Check className="w-5 h-5 text-[#C9A86C] mx-auto" />
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[#E5E5E5]">
                  <td className="py-4 px-4 text-[#6E6E6E]">Mini Bar</td>
                  {roomsConfig.rooms.map(room => (
                    <td key={room.id} className="text-center py-4 px-4">
                      <Check className="w-5 h-5 text-[#C9A86C] mx-auto" />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 text-[#6E6E6E]">City View</td>
                  {roomsConfig.rooms.map(room => (
                    <td key={room.id} className="text-center py-4 px-4">
                      {room.amenities.includes('City View') ? (
                        <Check className="w-5 h-5 text-[#C9A86C] mx-auto" />
                      ) : (
                        <span className="text-[#CCC]">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
