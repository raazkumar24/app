import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter } from 'lucide-react';
import { contactConfig } from '@/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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
          { x: -60, opacity: 0 },
          {
            x: 0,
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

      // Info section
      if (infoRef.current) {
        gsap.fromTo(infoRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: infoRef.current,
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
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img 
          src="/images/gallery_interior_detail.jpg" 
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <span className="text-xs tracking-[0.3em] uppercase mb-4 text-white/80">{contactConfig.label}</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide">
            {contactConfig.heading}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mt-6">
            {contactConfig.description}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            {/* Contact Form */}
            <div ref={formRef}>
              <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">Send a Message</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#111111] mt-4 mb-8 tracking-wide">
                Get in Touch
              </h2>
              
              {submitted ? (
                <div className="bg-[#C9A86C]/10 p-8 text-center">
                  <div className="w-16 h-16 bg-[#C9A86C] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#111111] mb-2">Message Sent!</h3>
                  <p className="text-[#6E6E6E]">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#6E6E6E] mb-2">Your Name</label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-white border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-[#C9A86C]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#6E6E6E] mb-2">Email Address</label>
                      <Input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="bg-white border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-[#C9A86C]"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#6E6E6E] mb-2">Phone Number</label>
                      <Input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="bg-white border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-[#C9A86C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#6E6E6E] mb-2">Subject</label>
                      <Input 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Reservation Inquiry"
                        className="bg-white border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-[#C9A86C]"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-[#6E6E6E] mb-2">Your Message</label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={6}
                      className="bg-white border-[#E5E5E5] rounded-none focus:border-[#C9A86C] focus:ring-[#C9A86C] resize-none"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bg-[#C9A86C] hover:bg-[#B8985A] text-white px-10 py-3 rounded-none tracking-wider w-full sm:w-auto"
                  >
                    Send Message <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>
            
            {/* Contact Info */}
            <div ref={infoRef}>
              <span className="text-xs tracking-[0.2em] text-[#C9A86C] uppercase">Contact Information</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#111111] mt-4 mb-8 tracking-wide">
                Reach Us Directly
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white p-6">
                  <div className="w-12 h-12 bg-[#C9A86C]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#C9A86C]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#111111] mb-1">Address</h4>
                    <p className="text-[#6E6E6E]">{contactConfig.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white p-6">
                  <div className="w-12 h-12 bg-[#C9A86C]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#C9A86C]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#111111] mb-1">Phone</h4>
                    <p className="text-[#6E6E6E]">{contactConfig.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white p-6">
                  <div className="w-12 h-12 bg-[#C9A86C]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#C9A86C]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#111111] mb-1">Email</h4>
                    <p className="text-[#6E6E6E]">{contactConfig.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white p-6">
                  <div className="w-12 h-12 bg-[#C9A86C]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#C9A86C]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#111111] mb-1">Hours</h4>
                    <p className="text-[#6E6E6E]">{contactConfig.hours}</p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-8">
                <h4 className="font-medium text-[#111111] mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-[#111111] flex items-center justify-center hover:bg-[#C9A86C] transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-[#111111] flex items-center justify-center hover:bg-[#C9A86C] transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-[#111111] flex items-center justify-center hover:bg-[#C9A86C] transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] md:h-[500px] bg-[#E5E5E5]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.5269263725!2d76.8023!3d30.7333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sSector%209%2C%20Chandigarh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="The Grand Chandigarh Location"
        />
      </section>
    </div>
  );
}
