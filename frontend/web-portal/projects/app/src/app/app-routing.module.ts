import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from '@infrastructure/authorization';
import { GuestGuard } from '@infrastructure/authorization';

export const routes: Routes = [
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./views/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
    canActivate: [GuestGuard],
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./views/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
    data: { ssrOnly: true },
    canActivate: [GuestGuard],
  },
  {
    path: 'shell',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'shell',
    loadComponent: () =>
      import('./views/shell/shell.component').then((c) => c.ShellComponent),
    canActivate: [AuthorizationGuard],
  },
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
