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
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './components/client/user-profile/user-profile.component';
import { UserProfileOrdersComponent } from './components/client/user-profile-orders/user-profile-orders.component';
import { UserProfileAddressesComponent } from './components/client/user-profile-addresses/user-profile-addresses.component';
import { ProductInterfaceComponent } from './components/client/product-interface/product-interface.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminSidenavComponent } from './components/admin/admin-sidenav/admin-sidenav.component';
import { AdminBodyComponent } from './components/admin/admin-body/admin-body.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AddProductModalComponent } from './components/admin/add-product-modal/add-product-modal.component';
import { EditUserModalComponent } from './components/admin/edit-user-modal/edit-user-modal.component';
import { DeleteProductModalComponent } from './components/admin/delete-product-modal/delete-product-modal.component';
import { DeleteUserComponent } from './components/admin/delete-user/delete-user.component';
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
    AdminPanelComponent,
    AdminSidenavComponent,
    AdminBodyComponent,
    AdminHomeComponent,
    AdminProductsComponent,
    AddProductModalComponent,
    EditUserModalComponent,
    AdminUsersComponent,
    DeleteUserComponent
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
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule
  ],    
  providers: [
    
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

