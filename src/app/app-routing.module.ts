import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IsLoggedInGuard} from "./auth/guards/is-logged-in.guard";


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then((m) => m.AuthModule)
  },
  {
    path: 'emails',
    canActivate: [IsLoggedInGuard],
    loadChildren: () => import('./email-list/email-list.module')
      .then((m) => m.EmailListModule)
  },
  {
    path: 'create',
    canActivate: [IsLoggedInGuard],
    loadChildren: () => import('./email/pages/create-email-page/create-email-page.module')
      .then((m) => m.CreateEmailPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./email/pages/edit-email-page/edit-email-page.module')
      .then((m) => m.EditEmailPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module')
      .then((m) => m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
