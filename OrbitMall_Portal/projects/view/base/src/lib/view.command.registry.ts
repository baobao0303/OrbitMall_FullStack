import { InjectionToken } from '@angular/core';

export interface ViewCommandRegistry {
  commandRegister(): void;
  viewName(): string;
}
export const VIEW_COMMAND_REGISTRY = new InjectionToken<ViewCommandRegistry>('VIEW_COMMAND_REGISTRY');

export interface ViewCommandMapperRegistry {
  getKeyViewCommand(name: string): string;
}

export const VIEW_COMMAND_MAPPER_REGISTRY = new InjectionToken<ViewCommandMapperRegistry>('VIEW_COMMAND_MAPPER_REGISTRY');
