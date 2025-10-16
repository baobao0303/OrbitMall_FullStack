import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./views/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./views/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
    data: { ssrOnly: true },
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/sign-in' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
