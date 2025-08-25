import { Signal } from '@angular/core';
import { ViewCommand } from './view.command';
import { ViewData } from './view.type';
/**
 * Native key (shortcut) as command register.
 * It must be used in runInInjectionContext
 * @param key - shortcut key (e.g. 'ctrl+shift+1')
 * @param viewCommand - command to be executed
 * @param isShortcutRegister - is it a shortcut register
 * @param isPermanent - is it a permanent register
 */
export declare function nativeCommandRegister(key: string, viewCommand: ViewCommand, isShortcutRegister?: boolean, isPermanent?: boolean): void;
/**
 * Native key (shortcut) as command register.
 * With permanent
 * @param key
 * @param viewCommand
 */
export declare function nativeCommandWithPermanentRegister(key: string, viewCommand: ViewCommand): void;
/**
 * Native key (shortcut) as command register.
 * Without permanent
 * @param key
 * @param viewCommand
 */
export declare function nativeCommandWithoutPermanentRegister(key: string, viewCommand: ViewCommand): void;
/**
 * Execute commands from everywhere.
 * @warning It must be used in runInInjectionContext
 * @see {@link https://angular.dev/api/core/runInInjectionContext?tab=api}
 * @param key - shortcut key (e.g. 'ctrl+shift+1')
 * @param data - view data {@link ViewData}
 * @param viewName - view name (e.g. 'hub_component')
 */
export declare function executeShortcutCommand(key: string, data?: ViewData, viewName?: string): void;
/**
 * Creates a debounced signal that updates its value after a specified delay.
 *
 * @template T - The type of the signal value.
 * @param {Signal<T>} sourceSignal - The reference to the original signal.
 * @param {number} [debounceTimeInMs=0] - The delay in milliseconds before the signal updates.
 * @returns {Signal<T>} - A new signal that updates its value after the specified delay.
 */
export declare function debouncedSignal<T>(sourceSignal: Signal<T>, debounceTimeInMs?: number): Signal<T>;
