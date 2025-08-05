import { Injectable } from '@angular/core';
import { ViewCommand } from './view.command';
import { ViewData } from './view.type';

export type ViewCommandType = {
  /**
   * View Name for the command
   */
  viewName: string;

  /**
   * View Command to execute
   */
  viewCommand: ViewCommand;

  /**
   * If true, it will be registered as shortcut
   */
  isShortcutRegister: boolean;

  /**
   * This is permanent command, it will not be removed
   */
  isPermanent: boolean;

  /**
   * To remove listener for dispose the command
   */
  toRemoveListener: any;
};

/**
 * Keyboard keys
 */
export enum KeyboardKeys {
  Control = 'control',
  Alt = 'alt',
  Shift = 'shift',
  Escape = 'escape',
}

/**
 * Key Map for the keyboard keys
 */
export const KEY_MAP = {
  '\b': 'Backspace',
  '\t': 'Tab',
  '\x7F': 'Delete',
  '\x1B': 'Escape',
  Del: 'Delete',
  Esc: 'Escape',
  Left: 'ArrowLeft',
  Right: 'ArrowRight',
  Up: 'ArrowUp',
  Down: 'ArrowDown',
  Menu: 'ContextMenu',
  Scroll: 'ScrollLock',
  Win: 'OS',
};

/**
 * Modifier key getters
 */
export const MODIFIER_KEY_GETTERS: { [key: string]: (event: KeyboardEvent) => boolean } = {
  alt: (event: KeyboardEvent) => event.altKey,
  control: (event: KeyboardEvent) => event.ctrlKey,
  meta: (event: KeyboardEvent) => event.metaKey,
  shift: (event: KeyboardEvent) => event.shiftKey,
  break: () => false,
};

/**
 * View Command Map to store all view commands, it will be used to execute command by key
 *
 * @example
 *  'keydown.ctrl.s' -> [
 *   {
 *      viewName: 'view1',
 *      viewCommand: { execute: () => { console.log('view1') } },
 *      isShortcutRegister: true,
 *      isPermanent: false,
 *      toRemoveListener: undefined
 *  },
 *  {
 *     viewName: 'view2',
 *     viewCommand: { execute: () => { console.log('view2') } },
 *     isShortcutRegister: true,
 *     isPermanent: false,
 *     toRemoveListener: undefined
 *  }
 * ]
 *
 */
export type ViewCommandMap = Map<string, ViewCommandType[]>;

@Injectable({ providedIn: 'root' })
export class ViewCommandMediator {
  private readonly _viewCommandMap: ViewCommandMap = new Map<string, ViewCommandType[]>();

  /**
   * Set view command to the map
   *
   * @param key [string] -> e.g. 'keydown.control.s'
   * @param viewName [string] -> view name for the command, eg: 'ViewConstant.CONTACT' -> 'contact'
   * @param viewCommand [ViewCommand] -> ViewCommand to execute, eg: { execute: () => { console.log('view1') } }
   * @param isShortcutRegister [boolean] -> If true, it will be registered as shortcut
   * @param isPermanent [boolean] -> If true, it will be permanent command, it will not be removed
   */
  public setViewCommandToMap(key: string, viewName: string, viewCommand: ViewCommand, isShortcutRegister: boolean = false, isPermanent: boolean = false) {
    // Get the command with key from the map, It can be multiple commands with same key
    const command: ViewCommandType[] | undefined = this._viewCommandMap.get(key);

    const viewCommandType: ViewCommandType = {
      viewName: viewName,
      viewCommand: viewCommand,
      isShortcutRegister: isShortcutRegister,
      isPermanent: isPermanent,
      toRemoveListener: undefined,
    };

    if (!command) {
      // If command not found, then create new command and add to the map
      this._viewCommandMap.set(key, [viewCommandType]);
    } else {
      // If command found, then add new command to the list
      command.push(viewCommandType);
    }

    // console.info(`[ViewCommandMediator.setViewCommandToMap] Command '${key}' adding new command to the list ...`, this._viewCommandMap.get(key));
    // console.info(`[ViewCommandMediator.setViewCommandToMap] Command '${key}' Total command: `);
    // console.table(Array.from(this._viewCommandMap.entries(), ([k, v]) => ({ key: k, value: { v } })));
  }

  /**
   * Execute command by key
   * @param key   -> string: key string. e.g. 'keydown.ctrl.s'
   * @param data  -> data, it can any in json or undefined to pass to the command
   * @param viewName -> view name to execute the command. If viewName is provided, then execute only that command otherwise execute all commands with key
   */
  public executeCommandFromMap(key: string, data?: ViewData, viewName?: string) {
    // console.log('DEBUG: executeCommandFromMap', key, data, viewName);
    const commands: ViewCommandType[] | undefined = this._viewCommandMap.get(key);

    if (!commands) {
      console.warn(`[ViewCommandMediator.executeCommandFromMap] Command '${key}' not found to execute ...`);
      return;
    }

    // If viewName is provided, then execute only that command
    if (viewName) {
      const command: ViewCommandType | undefined = this.getViewCommand(key, viewName);
      if (!command) {
        console.warn(`[ViewCommandMediator.executeCommandFromMap] Command '${key}' not found to execute`);
        return;
      }
      command.viewCommand.executeCommand(data);
      console.info(`[ViewCommandMediator.executeCommandFromMap] Command '${key}' executed ...`, data, viewName);
    } else {
      // Execute all commands with key
      // TODO: this's never be called
      commands.forEach((command: ViewCommandType) => {
        command.viewCommand.executeCommand(data);
      });
    }
  }

  /**
   * Get all commands with key
   * @param key string
   * @returns ViewCommandType[] | undefined
   */
  public getViewCommands = (key: string) => this._viewCommandMap.get(key);

  /**
   * Get command with key and viewName
   * @param key string
   * @param viewName string
   * @returns ViewCommandType | undefined
   */
  public getViewCommand = (key: string, viewName: string) => {
    const commands: ViewCommandType[] | undefined = this._viewCommandMap.get(key);

    if (!commands) {
      console.warn(`[ViewCommandMediator.getViewCommand] Command '${key}' not found to execute ...`);
      return;
    }

    return commands.find((command) => command.viewName === viewName);
  };

  /**
   * Delete all commands with key
   * @warning This will delete all commands with key
   * @param key
   */
  public deleteCommands = (key: string) => this._viewCommandMap.delete(key);

  /**
   * Delete command with key and viewName
   * @param key
   * @param viewName
   */
  public deleteCommand(key: string, viewName: string) {
    const commands: ViewCommandType[] | undefined = this._viewCommandMap.get(key);

    if (!commands) {
      console.log(`[ViewCommandMediator.deleteCommand] Command '${key}' not found to delete ...`);
      return;
    }

    const index = commands.findIndex((command) => command.viewName === viewName);

    if (index !== -1) {
      commands.splice(index, 1);
    }

    // If no command found, then delete the key from the map
    if (commands.length === 0) {
      this._viewCommandMap.delete(key);
    }

    // console.info(`[ViewCommandMediator.deleteCommand] Command remaining '${key}'`, this._viewCommandMap.get(key));

    return;
  }

  /**
   * Get all view commands by property
   * @param propertyKey - The property to filter by (e.g., 'isShortcutRegister' or 'isPermanent')
   * @param propertyValue - The value of the property to match
   * @see {@link ViewCommandMap} - A map of view commands that match the property
   */
  public getViewCommandsByProperty<T extends keyof ViewCommandType>(propertyKey: T, propertyValue: ViewCommandType[T]) {
    const viewCommands: ViewCommandMap = new Map<string, ViewCommandType[]>();

    this._viewCommandMap.forEach((commands: ViewCommandType[], key: string) => {
      let commandsHasKey: ViewCommandType[] = [];
      Array.from(commands).forEach((command) => {
        if (command[propertyKey] === propertyValue) {
          commandsHasKey.push(command);
        }
      });
      viewCommands.set(key, commandsHasKey);
    });

    return viewCommands;
  }

  public get size() {
    return this._viewCommandMap.size;
  }

  /**
   * Handle keydown event
   * @param event - KeyboardEvent
   * @param data - ViewData
   * @param viewName - string e.g. 'hub_component'
   * @returns
   */
  public onKeydownEventHandler(event: KeyboardEvent, data?: ViewData, viewName?: string) {
    event.preventDefault();

    // Get the key code
    let keycode = KEY_MAP[event.key as keyof typeof KEY_MAP] || event.key;

    var keyCombining = '';
    if (keycode == null || keycode == undefined) {
      console.warn(`[ViewCommandMediator.onKeydownEventHandler] keyCode is null or undefined ...`);
      return false;
    }
    keycode.toLowerCase();
    if (keycode === ' ') {
      // For space key
      // @example 'keydown.space'
      keycode = 'space';
    } else if (keycode === '.') {
      // For dot key
      // @example 'keydown.ctrl.'
      keycode = 'dot';
    }

    Array.from(Object.keys(KeyboardKeys)).forEach((modifierKey: string, idx) => {
      modifierKey = modifierKey.toLowerCase();

      if (modifierKey !== keycode) {
        const modifierKeyGetter = MODIFIER_KEY_GETTERS[modifierKey] || MODIFIER_KEY_GETTERS['break'];

        if (modifierKeyGetter(event) !== undefined && modifierKeyGetter(event)) {
          keyCombining += `${modifierKey}.`;
        }
      }
    });

    keyCombining += keycode;
    return this.executeCommandFromMap(`keydown.${keyCombining}`, data, viewName);
  }
}
