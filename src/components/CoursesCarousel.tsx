import React, { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CourseCard from './CourseCard';
import { Course } from '@/data/coursesData';

interface CoursesCarouselProps {
  courses: Course[];
}

const CoursesCarousel: React.FC<CoursesCarouselProps> = ({ courses }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: courses.length > 3,
    align: 'start',
    axis: 'x',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-advance with pause on hover
  useEffect(() => {
    if (!emblaApi) return;
    if (!isHovered && courses.length > 3) {
      intervalRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, 4500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [emblaApi, isHovered, courses.length]);

  const nextSlide = () => emblaApi?.scrollNext();
  const prevSlide = () => emblaApi?.scrollPrev();

  const snaps = emblaApi?.scrollSnapList().length ?? 0;

  return (
    <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-md border border-gray-100 disabled:opacity-40"
          disabled={courses.length <= 3 || !canScrollPrev}
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 text-[#1e5563]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-md border border-gray-100 disabled:opacity-40"
          disabled={courses.length <= 3 || !canScrollNext}
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 text-[#1e5563]" />
        </button>

        {/* Viewport */}
        <div className="overflow-hidden py-3 sm:py-4" ref={emblaRef}>
          <div className="flex -ml-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="pl-6 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full transform transition-all duration-300 hover:shadow-xl hover:ring-1 hover:ring-gray-200">
                  <CourseCard course={course} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        {courses.length > 3 && snaps > 0 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: snaps }).map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-[#1e5563] w-8'
                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesCarousel;