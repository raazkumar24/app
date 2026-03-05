import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Users, Bed, Check, ArrowRight, Clock } from 'lucide-react';
import { roomsConfig, bookingConfig } from '@/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

gsap.registerPlugin(ScrollTrigger);

export default function Booking() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: 'deluxe',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedRoom = roomsConfig.rooms.find(r => r.id === bookingData.roomType);
  
  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const totalPrice = selectedRoom ? calculateNights() * selectedRoom.price : 0;

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

      // Form section
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      }

      // Summary section
      if (summaryRef.current) {
        gsap.fromTo(summaryRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: summaryRef.current,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img 
          src="/images/night_exterior.jpg" 
          alt="Book Your Stay"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <span className="text-xs tracking-[0.3em] uppercase mb-4 text-white/80">{bookingConfig.label}</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide">
            {bookingConfig.heading}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mt-6">
            {bookingConfig.description}
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 md:py-32 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div ref={formRef} className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white p-12 text-center">
                  <div className="w-20 h-20 bg-[#C9A86C] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="font-serif text-3xl text-[#111111] mb-4">Booking Request Received!</h2>
                  <p className="text-[#6E6E6E] mb-6">
                    Thank you for choosing The Grand Chandigarh. Our team will review your request 
                    and confirm your reservation within 24 hours.
                  </p>
                  <div className="bg-[#F5F3EE] p-6 text-left max-w-md mx-auto">
                    <p className="text-sm text-[#6E6E6E] mb-2">Booking Reference</p>
                    <p className="font-serif text-2xl text-[#111111]">GC-{Date.now().toString().slice(-6)}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12">
                  <h2 className="font-serif text-2xl md:text-3xl text-[#111111] mb-8 tracking-wide">
                    Reservation Details
                  </h2>
                  
                  {/* Date Selection */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm text-[#6E6E6E] mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#C9A86C]" />
                        Check-in Date
                      </label>
                      <Input 
                        type="date"
                        name="checkIn"
                        value={bookingData.checkIn}
                        onChange={handleChange}
                        className="bg-[#F5F3EE] border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-[#C9A86C]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#6E6E6E] mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#C9A86C]" />
                        Check-out Date
                      </label>
                      <Input 
                        type="date"
                        name="checkOut"
                        value={bookingData.checkOut}
                        onChange={handleChange}
                        className="bg-[#F5F3EE] border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-[#C9A86C]"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Guests & Room Type */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm text-[#6E6E6E] mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#C9A86C]" />
                        Number of Guests
                      </label>
                      <select
                        name="guests"
                        value={bookingData.guests}
                        onChange={handleChange}
                        className="w-full h-10 px-3 bg-[#F5F3EE] border border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-1 focus:ring-[#C9A86C] outline-none"
                        required
                      >
                        {bookingConfig.guestOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-[#6E6E6E] mb-2 flex items-center gap-2">
                        <Bed className="w-4 h-4 text-[#C9A86C]" />
                        Room Type
                      </label>
                      <select
                        name="roomType"
                        value={bookingData.roomType}
                        onChange={handleChange}
                        className="w-full h-10 px-3 bg-[#F5F3EE] border border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-1 focus:ring-[#C9A86C] outline-none"
                        required
                      >
                        {bookingConfig.roomTypes.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Personal Details */}
                  <div className="border-t border-[#E5E5E5] pt-8 mb-8">
                    <h3 className="font-serif text-xl text-[#111111] mb-6">Personal Information</h3>
                    
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm text-[#6E6E6E] mb-2">Full Name</label>
                        <Input 
                          name="name"
                          value={bookingData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="bg-[#F5F3EE] border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-[#C9A86C]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#6E6E6E] mb-2">Email Address</label>
                        <Input 
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="bg-[#F5F3EE] border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-[#C9A86C]"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm text-[#6E6E6E] mb-2">Phone Number</label>
                      <Input 
                        type="tel"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="bg-[#F5F3EE] border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-[#C9A86C]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-[#6E6E6E] mb-2">Special Requests (Optional)</label>
                      <textarea
                        name="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={handleChange}
                        placeholder="Any special requirements or requests..."
                        rows={4}
                        className="w-full px-3 py-2 bg-[#F5F3EE] border border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-1 focus:ring-[#C9A86C] outline-none resize-none"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bg-[#C9A86C] hover:bg-[#B8985A] text-white px-10 py-4 rounded-none tracking-wider text-lg w-full"
                  >
                    Request Booking <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <p className="text-center text-sm text-[#6E6E6E] mt-4">
                    No payment required now. We'll confirm your booking within 24 hours.
                  </p>
                </form>
              )}
            </div>
            
            {/* Booking Summary */}
            <div ref={summaryRef}>
              <div className="bg-white p-8 sticky top-24">
                <h3 className="font-serif text-xl text-[#111111] mb-6">Booking Summary</h3>
                
                {selectedRoom && (
                  <div className="mb-6">
                    <img 
                      src={selectedRoom.image} 
                      alt={selectedRoom.title}
                      className="w-full h-48 object-cover mb-4"
                    />
                    <h4 className="font-serif text-lg text-[#111111]">{selectedRoom.title}</h4>
                    <p className="text-sm text-[#6E6E6E]">{selectedRoom.size} • {selectedRoom.bedType}</p>
                  </div>
                )}
                
                <div className="space-y-4 border-t border-[#E5E5E5] pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6E6E6E]">Check-in</span>
                    <span className="text-[#111111]">
                      {bookingData.checkIn || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6E6E6E]">Check-out</span>
                    <span className="text-[#111111]">
                      {bookingData.checkOut || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6E6E6E]">Guests</span>
                    <span className="text-[#111111]">{bookingData.guests} Guest(s)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6E6E6E]">Nights</span>
                    <span className="text-[#111111]">{calculateNights()}</span>
                  </div>
                </div>
                
                <div className="border-t border-[#E5E5E5] mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6E6E6E]">Total</span>
                    <span className="font-serif text-2xl text-[#C9A86C]">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  {calculateNights() > 0 && selectedRoom && (
                    <p className="text-xs text-[#6E6E6E] text-right mt-1">
                      ₹{selectedRoom.price.toLocaleString()} × {calculateNights()} nights
                    </p>
                  )}
                </div>
                
                <div className="mt-6 p-4 bg-[#F5F3EE]">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#C9A86C] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-[#111111] font-medium">Need Help?</p>
                      <p className="text-xs text-[#6E6E6E] mt-1">
                        Call us at +91 172 000 0000 for immediate assistance with your booking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
