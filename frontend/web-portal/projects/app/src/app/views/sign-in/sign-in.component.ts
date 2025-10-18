import { Component, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  VIEW_CONTEXT,
  ViewBase,
  ViewRenderActionRegistry,
  VIEW_RENDER_REGISTRY,
  ViewData,
  ViewMode,
  ViewDataType,
  ViewRenderRegistry,
} from '@view/base';

import { SignInContext } from './sign-in.context';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
// Create a simple implementation of ViewRenderActionRegistry
class SignInViewRenderRegistry implements ViewRenderActionRegistry {
  constructor(private readonly component: SignInComponent) {}

  viewName(): string {
    return 'sign-in';
  }

  viewType(): Type<ViewRenderRegistry> {
    return SignInViewRenderRegistry as any;
  }

  viewReload(filter?: ViewDataType): void {
    console.log('Reloading sign-in view with filter:', filter);
  }

  setViewMode(viewMode: ViewMode): void {
    this.component.setViewMode(viewMode);
  }

  getViewMode(): ViewMode {
    return this.component.getViewMode();
  }

  actionHandler(actionType: string, data?: ViewData): void {
    console.log('Handling action:', actionType, 'with data:', data);
  }

  setTabIndex(value: number): void {
    console.log('Setting tab index:', value);
  }

  setFocused(focused: boolean): void {
    console.log('Setting focused:', focused);
  }

  setDisabled(disabled: boolean): void {
    console.log('Setting disabled:', disabled);
  }
}

@Component({
  selector: 'orbitmail-sign-in',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    RouterModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  providers: [
    { provide: VIEW_CONTEXT, useClass: SignInContext },
    {
      provide: VIEW_RENDER_REGISTRY,
      useFactory: (component: SignInComponent) =>
        new SignInViewRenderRegistry(component),
      deps: [SignInComponent],
    },
  ],
})
export class SignInComponent extends ViewBase {
  // FORM CONTROL
  private readonly _signInForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(255),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(255),
    ]),
    isTogglePassword: new FormControl(false, []),
  });

  // public property
  public get signInForm(): FormGroup {
    return this._signInForm;
  }
  public get signInContext(): SignInContext {
    return this.getContextAs<SignInContext>();
  }

  public submitSignIn(): void {
    if (this._signInForm.invalid) {
      this._signInForm.markAllAsTouched();
      return;
    }
    this.signInContext.submitSignIn({
      email: this._signInForm.value.email as string,
      password: this._signInForm.value.password as string,
      isRemember: this._signInForm.value.isTogglePassword as boolean,
    });
  }
}
