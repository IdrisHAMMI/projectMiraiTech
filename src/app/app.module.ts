import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
//HTTP CLIENT IMPORT
import { HttpClientModule } from '@angular/common/http';
//HEADER & FOOTER IMPORT
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
//INDEX IMPORT
import { IndexComponent } from './components/index/index.component';

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
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthSignupComponent } from './components/auth-signup/auth-signup.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { UserProfileOrdersComponent } from './components/user-profile-orders/user-profile-orders.component';
import { UserProfileAddressesComponent } from './components/user-profile-addresses/user-profile-addresses.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    FooterComponent,
    UserProfileComponent,
    AuthSignupComponent,
    AuthLoginComponent,
    UserProfileOrdersComponent,
    UserProfileAddressesComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

