import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/client/index/index.component';
import { AuthLoginComponent } from './components/client/auth-login/auth-login.component';
import { AuthSignupComponent } from './components/client/auth-signup/auth-signup.component';
import { UserProfileComponent } from './components/client/user-profile/user-profile.component';
import { UserProfileOrdersComponent } from './components/client/user-profile-orders/user-profile-orders.component';
import { UserProfileAddressesComponent } from './components/client/user-profile-addresses/user-profile-addresses.component';
import { ForgotPasswordComponent } from './components/client/forgot-password/forgot-password.component'; 
import { ResetPasswordComponent } from './components/client/reset-password/reset-password.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { ProductInterfaceComponent } from './components/client/product-interface/product-interface.component';
import { CartComponent } from './components/client/cart/cart.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent},
  { path: 'authLogin', component: AuthLoginComponent},
  { path: 'authSignup', component: AuthSignupComponent},
  { path: 'userProfile', component: UserProfileComponent},
  { path: 'userProfile/info', component: UserProfileComponent},  
  { path: 'userProfile/orders', component: UserProfileOrdersComponent},  
  { path: 'userProfile/addresses', component: UserProfileAddressesComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'reset/:token', component: ResetPasswordComponent },
  { path: 'productItem/:id', component: ProductInterfaceComponent},
  { path: 'cart', component: CartComponent},

  // ADMIN PANEL ROUTES
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      { path: 'home', component: AdminHomeComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'products', component: AdminProductsComponent },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
