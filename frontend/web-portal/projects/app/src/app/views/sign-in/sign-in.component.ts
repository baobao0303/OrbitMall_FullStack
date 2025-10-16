import { Component, Type } from '@angular/core';
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
  imports: [],
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
export class SignInComponent extends ViewBase {}
