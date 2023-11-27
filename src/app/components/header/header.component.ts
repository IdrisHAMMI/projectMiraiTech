import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-20px)', // or any other initial position
        display: 'none'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0)',
        display: 'block'
      })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HeaderComponent {
  isSearchVisible = false;

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }
}
