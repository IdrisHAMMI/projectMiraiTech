import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projectMiraiTech';

  // FUNCTIONS ARE ONLY FOR USE ON THE ADMIN PANEL FOR THE NAVBAR
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private router: Router) {
    // SUBSCRIBE TO ROUTER EVENTS TO UPDATE THE SIDEBAR VISIBILITY 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSidebarVisibility();
      }
    });
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  isOnAdminRestrictedPage(): boolean {
    // DEFINES THE PATHS OF ADMIN RESTRICTED PAGES
    const adminRestrictedPaths = ['admin/home', 'admin/user', 'admin/product']; // Example paths
    // GET THE CURRENT URL
    const currentUrl = this.router.url;
    // CROSS REFERENCE THE CURRENT ROUTE URL & SEE IF IT MATCHES WITH ANY OF THE ADMIN RESTRICTED PATHS
    return adminRestrictedPaths.some(path => currentUrl.includes(path));
  }

  updateSidebarVisibility(): void {
    // CHECK IF THE CURRENT ROUT MATCHES THE ADMIN RESTRICTED PAGES AND UPDATE SIDEBAR VISIBILITY
    this.isSideNavCollapsed = !this.isOnAdminRestrictedPage();
  }
}
