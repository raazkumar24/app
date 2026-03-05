import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Heart, Star } from 'lucide-react';
import { aboutConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: 'Passion for Service',
    description: 'We pour our hearts into every interaction, ensuring each guest feels truly valued.',
  },
  {
    icon: Award,
    title: 'Excellence in Everything',
    description: 'From room cleanliness to dining experiences, we strive for perfection in every detail.',
  },
  {
    icon: Users,
    title: 'Personalized Attention',
    description: 'Every guest is unique, and we tailor our services to meet individual preferences.',
  },
  {
    icon: Star,
    title: 'Memorable Experiences',
    description: 'We create moments that linger in memory long after your stay has ended.',
  },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

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

      // Story section
      const storyContent = storyRef.current?.querySelectorAll('.story-content');
      if (storyContent && storyContent.length > 0) {
        gsap.fromTo(storyContent,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      }

      // Stats counter animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems && statItems.length > 0) {
        gsap.fromTo(statItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      }

      // Values cards
      const valueCards = valuesRef.current?.querySelectorAll('.value-card');
      if (valueCards && valueCards.length > 0) {
        gsap.fromTo(valueCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: valuesRef.current,
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
          src="/images/courtyard_architecture.jpg" 
          alt="The Grand Chandigarh"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <span className="text-xs tracking-[0.3em] uppercase mb-4 text-white/80">About Us</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide">
            Our Story
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-20 md:py-32 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Images Grid */}
            <div className="story-content grid grid-cols-2 gap-4">
              <img 
                src={aboutConfig.images[0].src} 
                alt={aboutConfig.images[0].alt}
                className="w-full h-48 md:h-64 object-cover"
              />
              <img 
                src={aboutConfig.images[1].src} 
                alt={aboutConfig.images[1].alt}
                className="w-full h-48 md:h-64 object-cover mt-8"
              />
              <img 
                src={aboutConfig.images[2].src} 
                alt={aboutConfig.images[2].alt}
                className="w-full h-48 md:h-64 object-cover -mt-8"
              />
              <img 
                src={aboutConfig.images[3].src} 
                alt={aboutConfig.images[3].alt}
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="story-content">
              <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">{aboutConfig.label}</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#111111] mt-4 mb-6 tracking-wide">
                A Legacy of Luxury
              </h2>
              <p className="text-[#6E6E6E] text-lg leading-relaxed mb-6">
                {aboutConfig.story}
              </p>
              <p className="text-[#6E6E6E] leading-relaxed">
                {aboutConfig.philosophy}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Main Experience Stat */}
            <div className="stat-item text-center md:text-left col-span-2 md:col-span-1">
              <span className="font-serif text-6xl md:text-7xl lg:text-8xl text-[#C9A86C]">
                {aboutConfig.experienceValue}
              </span>
              <p className="text-[#6E6E6E] mt-2 whitespace-pre-line">
                {aboutConfig.experienceLabel}
              </p>
            </div>
            
            {/* Other Stats */}
            {aboutConfig.stats.map((stat, index) => (
              <div key={index} className="stat-item text-center md:text-left">
                <span className="font-serif text-5xl md:text-6xl text-[#111111]">
                  {stat.value}
                </span>
                <p className="text-[#6E6E6E] mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 md:py-32 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">Our Values</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#111111] mt-4 tracking-wide">
              What We Stand For
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="value-card bg-white p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-[#C9A86C]/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-[#C9A86C]" />
                </div>
                <h3 className="font-serif text-xl text-[#111111] mb-4">{value.title}</h3>
                <p className="text-[#6E6E6E] text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">Our Team</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#111111] mt-4 mb-6 tracking-wide">
                Dedicated to Your Comfort
              </h2>
              <p className="text-[#6E6E6E] text-lg leading-relaxed mb-6">
                Behind every exceptional stay is a team of passionate individuals committed to 
                making your experience unforgettable. From our front desk to our housekeeping 
                staff, chefs to concierge, every member of The Grand Chandigarh family shares 
                a common goal: your complete satisfaction.
              </p>
              <p className="text-[#6E6E6E] leading-relaxed">
                Our staff undergoes rigorous training to ensure they meet the highest standards 
                of hospitality. We take pride in anticipating your needs and going above and 
                beyond to exceed your expectations.
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="/images/living_gallery_lounge.jpg" 
                alt="Our Team"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#C9A86C] text-white p-8">
                <span className="font-serif text-4xl">100+</span>
                <p className="text-sm tracking-wider uppercase mt-1">Team Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 md:py-32 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 md:order-1 relative">
              <img 
                src="/images/rooftop_sunset.jpg" 
                alt="Chandigarh Location"
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            <div className="order-1 md:order-2">
              <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">Location</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#111111] mt-4 mb-6 tracking-wide">
                In the Heart of Chandigarh
              </h2>
              <p className="text-[#6E6E6E] text-lg leading-relaxed mb-6">
                Located in the prestigious Sector 9, The Grand Chandigarh offers easy access 
                to the city's major attractions, business districts, and shopping centers. 
                Our prime location combines the tranquility of a residential area with the 
                convenience of urban living.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-[#C9A86C] rounded-full" />
                  <span className="text-[#111111]">5 minutes from Sector 17 Market</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-[#C9A86C] rounded-full" />
                  <span className="text-[#111111]">10 minutes from Rock Garden</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-[#C9A86C] rounded-full" />
                  <span className="text-[#111111]">15 minutes from Chandigarh Airport</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-[#C9A86C] rounded-full" />
                  <span className="text-[#111111]">Close to major business hubs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
