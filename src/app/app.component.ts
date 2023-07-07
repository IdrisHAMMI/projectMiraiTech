import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-header></app-header><router-outlet></router-outlet>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projectMiraiTech';
}
