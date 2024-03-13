import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/client/index/index.component';
import { AuthLoginComponent } from './components/client/auth-login/auth-login.component';
import { AuthSignupComponent } from './components/client/auth-signup/auth-signup.component';
import { UserProfileComponent } from './components/client/user-profile/user-profile.component';
import { UserProfileOrdersComponent } from './components/client/user-profile-orders/user-profile-orders.component';
import { UserProfileAddressesComponent } from './components/client/user-profile-addresses/user-profile-addresses.component';
import { ProductInterfaceComponent } from './components/client/product-interface/product-interface.component';
import { ForgotPasswordComponent } from './components/client/forgot-password/forgot-password.component'; 
import { ResetPasswordComponent } from './components/client/reset-password/reset-password.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';

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
  { path: 'product', component: ProductInterfaceComponent},
  { path: 'admin/home', component: AdminHomeComponent},
  { path: 'admin/user', component: AdminUsersComponent},
  { path: 'admin/products', component: AdminProductsComponent},
  { path: '', redirectTo: 'index', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
