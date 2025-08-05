import { effect, inject, Signal, signal } from '@angular/core';
import { ViewCommand } from './view.command';
import { ViewCommandMediator } from './view.command.mediator';

import { ViewData } from './view.type';
import { VIEW_COMMAND_MAPPER_REGISTRY, VIEW_COMMAND_REGISTRY } from './view.command.registry';

/**
 * Native key (shortcut) as command register.
 * It must be used in runInInjectionContext
 * @param key - shortcut key (e.g. 'ctrl+shift+1')
 * @param viewCommand - command to be executed
 * @param isShortcutRegister - is it a shortcut register
 * @param isPermanent - is it a permanent register
 */
export function nativeCommandRegister(key: string, viewCommand: ViewCommand, isShortcutRegister: boolean = false, isPermanent: boolean = false) {
  const _viewCommandMediator = inject(ViewCommandMediator);
  const _viewCommandMapperRegistry = inject(VIEW_COMMAND_MAPPER_REGISTRY);
  const _viewCommandRegistry = inject(VIEW_COMMAND_REGISTRY);

  _viewCommandMediator.setViewCommandToMap(_viewCommandMapperRegistry.getKeyViewCommand(key), _viewCommandRegistry.viewName(), viewCommand, isShortcutRegister, isPermanent);
}

/**
 * Native key (shortcut) as command register.
 * With permanent
 * @param key
 * @param viewCommand
 */
export function nativeCommandWithPermanentRegister(key: string, viewCommand: ViewCommand) {
  nativeCommandRegister(key, viewCommand, false, true);
}

/**
 * Native key (shortcut) as command register.
 * Without permanent
 * @param key
 * @param viewCommand
 */
export function nativeCommandWithoutPermanentRegister(key: string, viewCommand: ViewCommand) {
  nativeCommandRegister(key, viewCommand, false, false);
}

/**
 * Execute commands from everywhere.
 * @warning It must be used in runInInjectionContext
 * @see {@link https://angular.dev/api/core/runInInjectionContext?tab=api}
 * @param key - shortcut key (e.g. 'ctrl+shift+1')
 * @param data - view data {@link ViewData}
 * @param viewName - view name (e.g. 'hub_component')
 */
export function executeShortcutCommand(key: string, data?: ViewData, viewName?: string) {
  const _viewCommandMediator = inject(ViewCommandMediator);

  _viewCommandMediator.executeCommandFromMap(key, data, viewName);
}

/**
 * Creates a debounced signal that updates its value after a specified delay.
 *
 * @template T - The type of the signal value.
 * @param {Signal<T>} sourceSignal - The reference to the original signal.
 * @param {number} [debounceTimeInMs=0] - The delay in milliseconds before the signal updates.
 * @returns {Signal<T>} - A new signal that updates its value after the specified delay.
 */
export function debouncedSignal<T>(sourceSignal: Signal<T>, debounceTimeInMs: number = 0): Signal<T> {
  const debounceSignal = signal(sourceSignal());
  effect(
    (onCleanup) => {
      const value = sourceSignal();
      const timeout = setTimeout(() => debounceSignal.set(value), debounceTimeInMs);

      // The `onCleanup` argument is a function which is called when the effect
      // runs again (and when it is destroyed).
      // By clearing the timeout here we achieve proper debouncing.
      // See https://angular.io/guide/signals#effect-cleanup-functions
      onCleanup(() => clearTimeout(timeout));
    },
    { allowSignalWrites: true },
  );
  return debounceSignal;
}
