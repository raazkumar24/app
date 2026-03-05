import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useServiceParallax } from '@/hooks/useMouseParallax';
import { servicesConfig } from '@/config';
import { Waves , Wifi, Utensils, Car, Dumbbell, Clock } from 'lucide-react';

// Fixed iconMap - with proper keys
const iconMap: Record<string, React.ElementType> = {
  'Waves': Waves,
  'Wifi': Wifi,
  'Utensils': Utensils,
  'Car': Car,
  'Dumbbell': Dumbbell,
  'Clock': Clock,
  // Add lowercase versions too in case config has lowercase
  'waves': Waves,
  'wifi': Wifi,
  'utensils': Utensils,
  'car': Car,
  'dumbbell': Dumbbell,
  'clock': Clock,
};

interface ServiceCardProps {
  service: { iconName: string; title: string; description: string; image: string };
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { containerRef, getTransform } = useServiceParallax();
  // Get icon from map with fallback to Waves
  const Icon = iconMap[service.iconName] || Waves;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative p-8 lg:p-10 border-t border-[#E5E5E5] transition-colors duration-300 cursor-pointer',
        'hover:bg-[#F5F3EE]/50'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 flex items-center justify-center border border-[#E5E5E5] bg-white">
            <Icon className="w-5 h-5 text-[#111111]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <h3 className="text-xl font-serif text-[#111111]">{service.title}</h3>
          <p className="text-sm text-[#111111]/60 leading-relaxed max-w-md">
            {service.description}
          </p>
        </div>

        {/* Index Number */}
        <div className="hidden lg:block text-xs text-[#111111]/30">
          0{index + 1}
        </div>
      </div>

      {/* Hover Image */}
      <div
        className={cn(
          'absolute right-8 top-1/2 -translate-y-1/2 w-48 h-32 lg:w-64 lg:h-40 overflow-hidden shadow-xl pointer-events-none z-10',
          'transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
        style={getTransform(50, 6)}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export function Services() {
  if (!servicesConfig.heading && servicesConfig.services.length === 0) return null;

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="services" className="w-full py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-16">
          {servicesConfig.label && (
            <div
              className={cn(
                'transition-all duration-800 ease-out-quart',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[#111111]/50">
                {servicesConfig.label}
              </span>
            </div>
          )}

          {servicesConfig.heading && (
            <h2
              className={cn(
                'text-4xl md:text-5xl font-serif text-[#111111] mt-4 transition-all duration-800 ease-out-quart',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              {servicesConfig.heading}
            </h2>
          )}
        </div>

        {/* Services Grid */}
        {servicesConfig.services.length > 0 && (
          <div
            ref={servicesRef}
            className={cn(
              'border-b border-[#E5E5E5] transition-all duration-800 ease-out-quart',
              servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {servicesConfig.services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}