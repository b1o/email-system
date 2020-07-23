import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then((m) => m.AuthModule)
  },
  {
    path: 'emails',
    loadChildren: () => import('./email-list/email-list.module')
      .then((m) => m.EmailListModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./email/pages/create-email-page/create-email-page.module')
      .then((m) => m.CreateEmailPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./email/pages/edit-email-page/edit-email-page.module')
      .then((m) => m.EditEmailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
