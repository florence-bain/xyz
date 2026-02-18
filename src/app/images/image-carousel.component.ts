import { Component, signal, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

interface CarouselImage {
  url: string;
  alt?: string;
  credit?: string;
}

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit, OnDestroy {
  // --- Carousel Data ---
  images: CarouselImage[] = [
    {
      url: 'assets/IMG_4023.JPG',
      alt: 'Image 1'
      
    },
    {
      url: 'assets/IMG_1674.JPG',
      alt: 'Image 2'
    },
    {
      url: 'assets/IMG_4027.JPG',
      alt: 'Image 3'
      
    }
  ];

  // --- Carousel State (Signals) ---
  currentSlideIndex = signal(0);
  private intervalId: any;
  private readonly autoPlayInterval = 3000; // 3 seconds

  // --- Computed Signal for Display (Not used in the minimal template, but good for logic) ---
  currentSlideNumber = computed(() => this.currentSlideIndex() + 1);

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  /**
   * Starts the automatic sliding interval.
   */
  startAutoPlay(): void {
    this.stopAutoPlay(); // Clear any existing interval
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  /**
   * Clears the automatic sliding interval.
   */
  stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Moves to the next slide, looping to the start if necessary.
   */
  nextSlide(): void {
    const newIndex = (this.currentSlideIndex() + 1) % this.images.length;
    this.currentSlideIndex.set(newIndex);
    this.startAutoPlay(); // Restart the timer on manual interaction
  }

  /**
   * Moves to the previous slide, looping to the end if necessary.
   */
  prevSlide(): void {
    const lastIndex = this.images.length - 1;
    let newIndex = this.currentSlideIndex() - 1;

    if (newIndex < 0) {
      newIndex = lastIndex; // Loop back to the last slide
    }
    this.currentSlideIndex.set(newIndex);
    this.startAutoPlay(); // Restart the timer on manual interaction
  }

  /**
   * Jumps directly to a specific slide index.
   * @param index The index of the slide to go to.
   */
  goToSlide(index: number): void {
    this.currentSlideIndex.set(index);
    this.startAutoPlay(); // Restart the timer on manual interaction
  }

  trackByUrl(index: number, image: CarouselImage): string {
    return image.url;
  }
}
