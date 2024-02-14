import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthSignupComponent } from './components/auth-signup/auth-signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileOrdersComponent } from './components/user-profile-orders/user-profile-orders.component';
import { UserProfileAddressesComponent } from './components/user-profile-addresses/user-profile-addresses.component';
import { ProductInterfaceComponent } from './components/product-interface/product-interface.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'; 
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent},
  { path: 'authLogin', component: AuthLoginComponent},
  { path: 'authSignup', component: AuthSignupComponent},
  { path: 'userProfile', component: UserProfileComponent},
  { path: 'userProfile/info', component: UserProfileComponent},  
  { path: 'userProfile/orders', component: UserProfileOrdersComponent},  
  { path: 'userProfile/addresses', component: UserProfileAddressesComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'reset/:token ', component: ResetPasswordComponent },
  { path: 'product', component: ProductInterfaceComponent},
  { path: '', redirectTo: 'index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
