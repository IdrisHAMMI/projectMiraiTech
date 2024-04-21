import { Component, AfterViewInit } from '@angular/core';
import { Carousel } from 'flowbite';
import type { CarouselItem, CarouselOptions, CarouselInterface } from "flowbite";
import { InstanceOptions } from 'flowbite';

@Component({
 selector: 'app-carousel',
 templateUrl: './carousel.component.html',
 styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {

 ngAfterViewInit() {
    this.initializeCarousel();
 }

 initializeCarousel() {
    const carouselElement: HTMLElement = document.getElementById('carousel-example');

    const items: CarouselItem[] = [
      { position: 0, el: document.getElementById('carousel-item-1') },
      { position: 1, el: document.getElementById('carousel-item-2') },
      { position: 2, el: document.getElementById('carousel-item-3') },
    ];

    const options: CarouselOptions = {
      defaultPosition: 1,
      interval: 3000,
      indicators: {
        activeClasses: 'bg-white dark:bg-gray-800',
        inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
        items: [
          { position: 0, el: document.getElementById('carousel-indicator-1') },
          { position: 1, el: document.getElementById('carousel-indicator-2') },
          { position: 2, el: document.getElementById('carousel-indicator-3') },
        ],
      },
    };

    const instanceOptions: InstanceOptions = {
      id: 'carousel-example',
      override: true
    };

    const carousel: CarouselInterface = new Carousel(carouselElement, items, options, instanceOptions);
    carousel.cycle();

    const $prevButton = document.getElementById('data-carousel-prev');
    const $nextButton = document.getElementById('data-carousel-next');

    $prevButton.addEventListener('click', () => {
      carousel.prev();
    });

    $nextButton.addEventListener('click', () => {
      carousel.next();
    });
 }
}