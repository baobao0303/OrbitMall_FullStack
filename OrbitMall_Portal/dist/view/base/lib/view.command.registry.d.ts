import { InjectionToken } from '@angular/core';
export interface ViewCommandRegistry {
    commandRegister(): void;
    viewName(): string;
}
export declare const VIEW_COMMAND_REGISTRY: InjectionToken<ViewCommandRegistry>;
export interface ViewCommandMapperRegistry {
    getKeyViewCommand(name: string): string;
}
export declare const VIEW_COMMAND_MAPPER_REGISTRY: InjectionToken<ViewCommandMapperRegistry>;
