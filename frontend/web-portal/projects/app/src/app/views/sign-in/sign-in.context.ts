import { Injectable, signal } from '@angular/core';
import { ViewContext } from '@view/base';

@Injectable({ providedIn: 'root' })
export class SignInContext extends ViewContext {
  // Biến signal để test
  testSignal = signal<string>('Hello from SignIn Context!');
  counterSignal = signal<number>(0);

  // Methods để test
  updateTestMessage(message: string) {
    this.testSignal.set(message);
  }

  incrementCounter() {
    this.counterSignal.update((count) => count + 1);
  }

  resetCounter() {
    this.counterSignal.set(0);
  }

  setActiveItem(item: any): void {}
  getActiveItem(filter?: any) {}
  getViewData(filter?: any) {
    return {
      testMessage: this.testSignal(),
      counter: this.counterSignal(),
    };
  }
}
