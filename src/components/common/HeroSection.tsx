import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  link?: string;
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Enhanced hero slides data with more sophisticated content
  const slides: HeroSlide[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
      subtitle: 'Premium Properties',
      title: 'Luxury Villa Collection',
      description: 'Immerse yourself in architectural excellence with our handpicked luxury villas featuring world-class amenities and breathtaking locations.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
      subtitle: 'Exclusive Estates',
      title: 'Oceanfront Paradise',
      description: 'Wake up to endless ocean views in these exceptional waterfront properties where luxury meets tranquility in perfect harmony.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
      subtitle: 'Urban Living',
      title: 'Metropolitan Heights',
      description: 'Experience the pinnacle of city living with panoramic skyline views and cutting-edge modern design in the heart of the metropolis.'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
      subtitle: 'Family Homes',
      title: 'Dream Family Residences',
      description: 'Create lasting memories in thoughtfully designed family homes that blend comfort, style, and functionality in prestigious neighborhoods.'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
      subtitle: 'Elite Properties',
      title: 'Penthouse Perfection',
      description: 'Reach new heights of luxury living with our exclusive penthouse collection offering unmatched privacy, space, and spectacular views.'
    }
  ];

  // Component mount animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play functionality with pause on interaction
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Slower transition for better UX

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 1000);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <section 
      className={`relative h-screen w-full overflow-hidden bg-gray-900 transition-all duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-float"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 4}s`
            }}
          />
        ))}
      </div>

      {/* Slides Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 h-full w-full transition-all duration-1500 ease-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image with Parallax Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(1.05)' : 'scale(1.1)'
              }}
            >
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
            </div>

            {/* Content Overlay with Enhanced Animations */}
            <div className="relative z-20 flex h-full items-center justify-center">
              <div className="max-w-5xl px-6 text-center text-white">
                {/* Animated Subtitle with Glow Effect */}
                <div className={`mb-6 transition-all duration-1000 ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '200ms' }}>
                  <span className="inline-block px-6 py-2 text-xs font-bold uppercase tracking-widest text-blue-300 border border-blue-400/30 rounded-full bg-blue-500/10 backdrop-blur-sm shadow-lg shadow-blue-500/20">
                    {slide.subtitle}
                  </span>
                </div>
                
                {/* Main Title with Staggered Animation */}
                <div className={`mb-8 transition-all duration-1000 ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`} style={{ transitionDelay: '400ms' }}>
                  <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl xl:text-8xl">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                      {slide.title}
                    </span>
                  </h1>
                </div>
                
                {/* Enhanced Description */}
                <div className={`mb-10 transition-all duration-1000 ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '600ms' }}>
                  <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-200 md:text-xl lg:text-2xl font-light">
                    {slide.description}
                  </p>
                </div>

                {/* Enhanced Call to Action Buttons */}
                <div className={`flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-1000 ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '800ms' }}>
                  <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-4 text-sm font-bold uppercase text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
                    <span className="relative z-10">Explore Properties</span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                  </button>
                  <button className="group rounded-xl border-2 border-white/80 px-10 py-4 text-sm font-bold uppercase text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-gray-900 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/30">
                    <span className="transition-colors duration-300">Contact Agent</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 group"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} className="transition-transform duration-300 group-hover:-translate-x-1" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 group"
        aria-label="Next slide"
      >
        <ChevronRight size={28} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-12 left-1/2 z-30 flex -translate-x-1/2 space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative h-3 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentSlide
                ? 'w-12 bg-white shadow-lg shadow-white/30'
                : 'w-3 bg-white/40 hover:bg-white/70 hover:scale-125'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-80"></div>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-0 left-0 z-30 h-1 w-full bg-black/20">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 transition-all duration-500 ease-out shadow-lg shadow-blue-500/50"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Social Proof Overlay */}
      <div className="absolute top-8 right-8 z-30 hidden lg:block">
        <div className="rounded-xl bg-white/10 px-6 py-3 backdrop-blur-md border border-white/20">
          <div className="flex items-center space-x-2 text-white">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-yellow-400"></div>
              ))}
            </div>
            <span className="text-sm font-medium">10K+ Happy Clients</span>
          </div>
        </div>
      </div>

      {/* Enhanced CSS for animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: 200px 0;
          }
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;