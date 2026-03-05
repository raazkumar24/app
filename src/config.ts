// Site configuration for The Grand Chandigarh Hotel

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  title: "The Grand Chandigarh | Luxury Boutique Hotel",
  description: "Experience luxury and comfort at The Grand Chandigarh, a premium boutique hotel offering exquisite rooms, world-class dining, and exceptional service in the heart of Chandigarh, India.",
};

// Navigation configuration
export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  links: NavLink[];
  contactLabel: string;
  contactHref: string;
}

export const navigationConfig: NavigationConfig = {
  logo: "THE GRAND",
  links: [
    { label: "Home", href: "/" },
    { label: "Rooms", href: "/rooms" },
    { label: "Amenities", href: "/amenities" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  contactLabel: "Book Now",
  contactHref: "/booking",
};

// Hero section configuration
export interface HeroConfig {
  name: string;
  roles: string[];
  backgroundImage: string;
  leftImage: string;
  rightImage: string;
  tagline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export const heroConfig: HeroConfig = {
  name: "THE GRAND",
  roles: ["BOUTIQUE HOTEL", "CHANDIGARH"],
  backgroundImage: "/images/living_gallery_lounge.jpg",
  leftImage: "/images/hero_sofa_window.jpg",
  rightImage: "/images/hero_bedroom.jpg",
  tagline: "Experience Luxury & Comfort",
  ctaPrimary: "Book Now",
  ctaSecondary: "View Rooms",
};

// About section configuration
export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutImage {
  src: string;
  alt: string;
}

export interface AboutConfig {
  label: string;
  description: string;
  experienceValue: string;
  experienceLabel: string;
  stats: AboutStat[];
  images: AboutImage[];
  story: string;
  philosophy: string;
}

export const aboutConfig: AboutConfig = {
  label: "ABOUT US",
  description: "The Grand Chandigarh is a luxury boutique hotel that combines contemporary elegance with warm hospitality. Nestled in the heart of Chandigarh, we offer an oasis of tranquility for discerning travelers.",
  experienceValue: "15+",
  experienceLabel: "Years of\nExcellence",
  stats: [
    { value: "50+", label: "Luxury Rooms" },
    { value: "3", label: "Dining Venues" },
    { value: "5★", label: "Guest Rating" },
  ],
  images: [
    { src: "/images/courtyard_architecture.jpg", alt: "Hotel Courtyard" },
    { src: "/images/living_gallery_lounge.jpg", alt: "Hotel Lounge" },
    { src: "/images/room_detail_bed.jpg", alt: "Room Detail" },
    { src: "/images/dining_table.jpg", alt: "Dining Experience" },
  ],
  story: "Founded in 2009, The Grand Chandigarh was born from a vision to create a sanctuary of luxury in the City Beautiful. Our hotel seamlessly blends modern architecture with the serene landscape of Chandigarh, offering guests an unforgettable experience of comfort and sophistication.",
  philosophy: "We believe that true luxury lies in the details. From the moment you step through our doors, every element of your stay is carefully curated to ensure your complete satisfaction. Our dedicated team is committed to providing personalized service that exceeds expectations.",
};

// Services/Amenities section configuration
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  label: string;
  heading: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  label: "AMENITIES",
  heading: "World-Class Facilities",
  services: [
    {
      iconName: "Waves",
      title: "Swimming Pool",
      description: "Indoor and outdoor pools with temperature control and poolside service.",
      image: "/images/pool_outdoor.jpg",
    },
    {
      iconName: "Wifi",
      title: "Free WiFi",
      description: "High-speed internet access throughout the hotel for all guests.",
      image: "/images/gallery_interior_detail.jpg",
    },
    {
      iconName: "Utensils",
      title: "Restaurant",
      description: "Award-winning dining with local and international cuisine.",
      image: "/images/restaurant_interior.jpg",
    },
    {
      iconName: "Car",
      title: "Parking",
      description: "Complimentary valet parking and secure on-site parking facility.",
      image: "/images/night_exterior.jpg",
    },
    {
      iconName: "Dumbbell",
      title: "Fitness Center",
      description: "State-of-the-art gym equipment with personal training available.",
      image: "/images/gym.jpg",
    },
    {
      iconName: "Clock",
      title: "24/7 Reception",
      description: "Round-the-clock concierge and front desk service for your needs.",
      image: "/images/event_space.jpg",
    },
  ],
};

// Rooms section configuration
export interface RoomItem {
  id: string;
  title: string;
  category: string;
  price: number;
  size: string;
  bedType: string;
  amenities: string[];
  image: string;
  featured?: boolean;
  description: string;
}

export interface RoomsConfig {
  label: string;
  heading: string;
  description: string;
  rooms: RoomItem[];
}

export const roomsConfig: RoomsConfig = {
  label: "OUR ROOMS",
  heading: "Luxurious Accommodations",
  description: "Each room is designed as a quiet retreat—soft linens, warm wood, and daylight that shifts gently through the day.",
  rooms: [
    {
      id: "deluxe",
      title: "Deluxe Room",
      category: "Standard",
      price: 8500,
      size: "32 m²",
      bedType: "King Bed",
      amenities: ["WiFi", "TV", "Mini Bar", "Safe"],
      image: "/images/deluxe_room.jpg",
      description: "Our Deluxe Rooms offer a perfect blend of comfort and style with modern amenities and elegant furnishings.",
    },
    {
      id: "executive",
      title: "Executive Suite",
      category: "Suite",
      price: 15000,
      size: "55 m²",
      bedType: "King Bed",
      amenities: ["WiFi", "TV", "Mini Bar", "Safe", "Lounge", "City View"],
      image: "/images/executive_suite.jpg",
      featured: true,
      description: "Spacious suite with separate living area, premium amenities, and stunning city views for the ultimate luxury experience.",
    },
    {
      id: "family",
      title: "Family Room",
      category: "Family",
      price: 12000,
      size: "48 m²",
      bedType: "2 Queen Beds",
      amenities: ["WiFi", "TV", "Mini Bar", "Safe", "Kids Area"],
      image: "/images/family_room.jpg",
      description: "Designed for families, featuring two queen beds, extra space, and child-friendly amenities.",
    },
  ],
};

// Portfolio/Gallery section configuration
export interface GalleryItem {
  title: string;
  category: string;
  image: string;
  featured?: boolean;
}

export interface GalleryConfig {
  label: string;
  heading: string;
  description: string;
  items: GalleryItem[];
  cta: {
    label: string;
    heading: string;
    linkText: string;
    linkHref: string;
  };
}

export const galleryConfig: GalleryConfig = {
  label: "GALLERY",
  heading: "Every Corner Tells a Story",
  description: "A curated collection of spaces, details, and moments that define our stay.",
  items: [
    {
      title: "Deluxe Room",
      category: "Rooms",
      image: "/images/deluxe_room.jpg",
      featured: true,
    },
    {
      title: "Hotel Lounge",
      category: "Interior",
      image: "/images/living_gallery_lounge.jpg",
    },
    {
      title: "Fine Dining",
      category: "Restaurant",
      image: "/images/dining_table.jpg",
    },
    {
      title: "Spa Pool",
      category: "Wellness",
      image: "/images/spa_pool.jpg",
    },
    {
      title: "Rooftop Lounge",
      category: "Outdoor",
      image: "/images/rooftop_sunset.jpg",
      featured: true,
    },
    {
      title: "Courtyard",
      category: "Outdoor",
      image: "/images/courtyard_architecture.jpg",
    },
  ],
  cta: {
    label: "EXPLORE",
    heading: "View Full Gallery",
    linkText: "See All Photos",
    linkHref: "/gallery",
  },
};

// Testimonials section configuration
export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  rating: number;
}

export interface TestimonialsConfig {
  label: string;
  heading: string;
  testimonials: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  label: "TESTIMONIALS",
  heading: "Loved by Our Guests",
  testimonials: [
    {
      quote: "The perfect balance of design and comfort. We didn't want to leave. The staff went above and beyond to make our anniversary special.",
      author: "Amit & Priya",
      role: "Guests",
      company: "Mumbai",
      image: "/images/reviews_lifestyle.jpg",
      rating: 5,
    },
    {
      quote: "Exceptional service and attention to detail. The Grand Chandigarh sets a new standard for luxury hospitality in India.",
      author: "Rajesh Kumar",
      role: "Business Traveler",
      company: "Delhi",
      image: "/images/reviews_lifestyle.jpg",
      rating: 5,
    },
    {
      quote: "A serene oasis in the heart of the city. The spa treatments were divine and the dining experience was unforgettable.",
      author: "Sarah Mitchell",
      role: "International Guest",
      company: "London",
      image: "/images/reviews_lifestyle.jpg",
      rating: 5,
    },
  ],
};

// CTA section configuration
export interface CTAConfig {
  tags: string[];
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  email: string;
  backgroundImage: string;
}

export const ctaConfig: CTAConfig = {
  tags: ["Luxury Stay", "Premium Service", "Unforgettable Experience"],
  heading: "Ready to Arrive?",
  description: "Reserve your dates and we'll handle the rest. Experience the perfect blend of luxury and comfort at The Grand Chandigarh.",
  buttonText: "Check Availability",
  buttonHref: "/booking",
  email: "stay@thegrandchandigarh.com",
  backgroundImage: "/images/night_exterior.jpg",
};

// Contact section configuration
export interface ContactConfig {
  label: string;
  heading: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  socialLinks: {
    iconName: string;
    href: string;
    label: string;
  }[];
}

export const contactConfig: ContactConfig = {
  label: "CONTACT",
  heading: "Get in Touch",
  description: "We'd love to hear from you. Reach out for reservations, inquiries, or special requests.",
  address: "Sector 9, Chandigarh, 160009, India",
  phone: "+91 172 000 0000",
  email: "stay@thegrandchandigarh.com",
  hours: "24/7 Front Desk",
  socialLinks: [
    { iconName: "Instagram", href: "#", label: "Instagram" },
    { iconName: "Facebook", href: "#", label: "Facebook" },
    { iconName: "Twitter", href: "#", label: "Twitter" },
  ],
};

// Booking section configuration
export interface BookingConfig {
  label: string;
  heading: string;
  description: string;
  roomTypes: {
    value: string;
    label: string;
  }[];
  guestOptions: {
    value: string;
    label: string;
  }[];
}

export const bookingConfig: BookingConfig = {
  label: "BOOKING",
  heading: "Book Your Stay",
  description: "Complete the form below to request your reservation. Our team will confirm your booking within 24 hours.",
  roomTypes: [
    { value: "deluxe", label: "Deluxe Room" },
    { value: "executive", label: "Executive Suite" },
    { value: "family", label: "Family Room" },
  ],
  guestOptions: [
    { value: "1", label: "1 Guest" },
    { value: "2", label: "2 Guests" },
    { value: "3", label: "3 Guests" },
    { value: "4", label: "4 Guests" },
    { value: "5+", label: "5+ Guests" },
  ],
};

// Footer section configuration
export interface FooterLinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterConfig {
  logo: string;
  description: string;
  columns: FooterLinkColumn[];
  socialLinks: SocialLink[];
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  newsletterPlaceholder: string;
  copyright: string;
  credit: string;
}

export const footerConfig: FooterConfig = {
  logo: "THE GRAND",
  description: "A luxury boutique hotel in the heart of Chandigarh, offering exceptional hospitality and unforgettable experiences.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Rooms", href: "/rooms" },
        { label: "Dining", href: "/amenities" },
        { label: "Spa", href: "/amenities" },
        { label: "Gallery", href: "/gallery" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Booking", href: "/booking" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cancellation Policy", href: "#" },
      ],
    },
  ],
  socialLinks: [
    { iconName: "Instagram", href: "#", label: "Instagram" },
    { iconName: "Facebook", href: "#", label: "Facebook" },
    { iconName: "Twitter", href: "#", label: "Twitter" },
  ],
  newsletterHeading: "Stay Updated",
  newsletterDescription: "Subscribe to receive special offers and news from The Grand.",
  newsletterButtonText: "Subscribe",
  newsletterPlaceholder: "Enter your email",
  copyright: "© 2024 The Grand Chandigarh. All rights reserved.",
  credit: "Designed with elegance in mind.",
};
