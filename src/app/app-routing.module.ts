import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {IsLoggedInGuard} from './auth/guards/is-logged-in.guard'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'emails',
    canActivate: [IsLoggedInGuard],
    loadChildren: () =>
      import('./email-list/email-list.module').then((m) => m.EmailListModule),
  },
  {
    path: 'email',
    canActivate: [IsLoggedInGuard],
    loadChildren: () =>
      import('./email/pages/create-email/create-email-page.module').then(
        (m) => m.CreateEmailPageModule
      ),
  },
  {
    path: 'users',
    canActivate:  [IsLoggedInGuard],
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
