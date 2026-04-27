'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const reviews = [
  {
    src: 'https://admin.moroccan-carpet.com/wp-content/uploads/2023/11/REVIEW-01-min-800x800.jpg',
    alt: 'Customer review of Moroccan rug',
  },
  {
    src: 'https://admin.moroccan-carpet.com/wp-content/uploads/2023/11/REVIEW-02-min-800x800.jpg',
    alt: 'Customer review of Berber rug',
  },
  {
    src: 'https://admin.moroccan-carpet.com/wp-content/uploads/2023/11/REVIEW-03-min-800x800.jpg',
    alt: 'Customer review of handmade rug',
  },
  {
    src: 'https://admin.moroccan-carpet.com/wp-content/uploads/2023/11/REVIEW-04-min-800x800.jpg',
    alt: 'Customer testimonial for Moroccan carpet',
  },
  {
    src: 'https://admin.moroccan-carpet.com/wp-content/uploads/2023/11/REVIEW-05-min-800x800.jpg',
    alt: 'Happy customer with authentic Moroccan rug',
  },
];

export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -1; i <= 1; i++) {
      indices.push((currentIndex + i + reviews.length) % reviews.length);
    }
    return indices;
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Desktop: 3 images */}
      <div className="hidden md:block">
        <div className="flex justify-center items-center gap-4">
          {getVisibleIndices().map((index, i) => (
            <div
              key={index}
              className={`relative rounded overflow-hidden transition-all duration-500 ${
                i === 1
                  ? 'w-72 h-72 scale-100 shadow-lg z-10'
                  : 'w-56 h-56 opacity-50 scale-90'
              }`}
            >
              <Image
                src={reviews[index].src}
                alt={reviews[index].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 288px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: 1 image */}
      <div className="md:hidden">
        <div className="relative w-64 h-64 mx-auto rounded overflow-hidden shadow-lg">
          <Image
            src={reviews[currentIndex].src}
            alt={reviews[currentIndex].alt}
            fill
            className="object-cover"
            sizes="256px"
          />
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={goToPrev}
        className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-2 rounded-full shadow transition-colors z-20 text-gray-700"
        aria-label="Previous"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-2 rounded-full shadow transition-colors z-20 text-gray-700"
        aria-label="Next"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
