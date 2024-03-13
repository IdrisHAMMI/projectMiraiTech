import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
//HTTP CLIENT IMPORT
import { HttpClientModule } from '@angular/common/http';
//HEADER & FOOTER IMPORT
import { HeaderComponent } from './components/client/header/header.component';
import { FooterComponent } from './components/client/footer/footer.component';
//INDEX IMPORT
import { IndexComponent } from './components/client/index/index.component';

//FIRESTORM IMPORTS
//import { provideFirestore, getFirestore } from '@angular/fire/firestore';
//import { provideFirebaseApp, getApp } from '@angular/fire/app';
//import { initializeApp } from '@angular/fire/app';

//ANGULAR MATERIAL COMPONENTS
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './components/client/user-profile/user-profile.component';
import { UserProfileOrdersComponent } from './components/client/user-profile-orders/user-profile-orders.component';
import { UserProfileAddressesComponent } from './components/client/user-profile-addresses/user-profile-addresses.component';
import { ProductInterfaceComponent } from './components/client/product-interface/product-interface.component';
import { AddproductsComponent } from './components/client/addproducts/addproducts.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminSidenavComponent } from './components/admin/admin-sidenav/admin-sidenav.component';
import { AdminBodyComponent } from './components/admin/admin-body/admin-body.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    FooterComponent,
    UserProfileComponent,
    UserProfileOrdersComponent,
    UserProfileAddressesComponent,
    ProductInterfaceComponent,
    AddproductsComponent,
    AdminPanelComponent,
    AdminSidenavComponent,
    AdminBodyComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatListModule,
    BrowserAnimationsModule,
    
  ],    
  providers: [
    
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

