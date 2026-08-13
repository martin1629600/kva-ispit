import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cart } from './cart/cart';
import { Details } from './details/details';
import { Login } from './login/login';
import { User } from './user/user';
import { Register } from './register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cart', component: Cart },
  { path: 'details/:toyId', component: Details },
  { path: 'login', component: Login },
  { path: 'user', component: User },
  { path: 'register', component: Register },
];
