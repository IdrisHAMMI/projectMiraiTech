import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthSignupComponent } from './components/auth-signup/auth-signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileOrdersComponent } from './components/user-profile-orders/user-profile-orders.component';
import { UserProfileAddressesComponent } from './components/user-profile-addresses/user-profile-addresses.component';


const routes: Routes = [
  { path: 'index', component: IndexComponent},
  { path: 'authLogin', component: AuthLoginComponent},
  { path: 'authSignup', component: AuthSignupComponent},
  { path: 'userProfile', component: UserProfileComponent},
  { path: 'userProfile/info', component: UserProfileComponent},  
  { path: 'userProfile/orders', component: UserProfileOrdersComponent},  
  { path: 'userProfile/addresses', component: UserProfileAddressesComponent},
  { path: '', redirectTo: 'index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
