import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  private isSmallScreenSubject = new BehaviorSubject<boolean>(false);
  isSmallScreen$ = this.isSmallScreenSubject.asObservable();
 
  constructor() {
     window.addEventListener('resize', () => this.checkViewportSize());
     this.checkViewportSize();
  }
 
  private checkViewportSize() {
     const isSmallScreen = window.innerWidth < 768; // Adjust the breakpoint as needed
     this.isSmallScreenSubject.next(isSmallScreen);
  }
 }