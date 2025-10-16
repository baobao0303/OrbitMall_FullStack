import { Component, Type } from '@angular/core';
import { SignUpContext } from './sign-up.context';
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
import { ButtonModule } from 'primeng/button';

// Create a simple implementation of ViewRenderActionRegistry
class SignUpViewRenderRegistry implements ViewRenderActionRegistry {
  constructor(private readonly component: SignUpComponent) {}

  viewName(): string {
    return 'sign-up';
  }

  viewType(): Type<ViewRenderRegistry> {
    return SignUpViewRenderRegistry as any;
  }

  viewReload(filter?: ViewDataType): void {
    console.log('Reloading sign-up view with filter:', filter);
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
  selector: 'orbitmail-sign-up',
  imports: [ButtonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  providers: [
    { provide: VIEW_CONTEXT, useClass: SignUpContext },
    {
      provide: VIEW_RENDER_REGISTRY,
      useFactory: (component: SignUpComponent) =>
        new SignUpViewRenderRegistry(component),
      deps: [SignUpComponent],
    },
  ],
})
export class SignUpComponent extends ViewBase {}
