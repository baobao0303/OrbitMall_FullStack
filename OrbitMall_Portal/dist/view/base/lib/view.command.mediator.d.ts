import { ViewCommand } from './view.command';
import { ViewData } from './view.type';
import * as i0 from "@angular/core";
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
export declare enum KeyboardKeys {
    Control = "control",
    Alt = "alt",
    Shift = "shift",
    Escape = "escape"
}
/**
 * Key Map for the keyboard keys
 */
export declare const KEY_MAP: {
    '\b': string;
    '\t': string;
    '': string;
    '\u001B': string;
    Del: string;
    Esc: string;
    Left: string;
    Right: string;
    Up: string;
    Down: string;
    Menu: string;
    Scroll: string;
    Win: string;
};
/**
 * Modifier key getters
 */
export declare const MODIFIER_KEY_GETTERS: {
    [key: string]: (event: KeyboardEvent) => boolean;
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
export declare class ViewCommandMediator {
    private readonly _viewCommandMap;
    /**
     * Set view command to the map
     *
     * @param key [string] -> e.g. 'keydown.control.s'
     * @param viewName [string] -> view name for the command, eg: 'ViewConstant.CONTACT' -> 'contact'
     * @param viewCommand [ViewCommand] -> ViewCommand to execute, eg: { execute: () => { console.log('view1') } }
     * @param isShortcutRegister [boolean] -> If true, it will be registered as shortcut
     * @param isPermanent [boolean] -> If true, it will be permanent command, it will not be removed
     */
    setViewCommandToMap(key: string, viewName: string, viewCommand: ViewCommand, isShortcutRegister?: boolean, isPermanent?: boolean): void;
    /**
     * Execute command by key
     * @param key   -> string: key string. e.g. 'keydown.ctrl.s'
     * @param data  -> data, it can any in json or undefined to pass to the command
     * @param viewName -> view name to execute the command. If viewName is provided, then execute only that command otherwise execute all commands with key
     */
    executeCommandFromMap(key: string, data?: ViewData, viewName?: string): void;
    /**
     * Get all commands with key
     * @param key string
     * @returns ViewCommandType[] | undefined
     */
    getViewCommands: (key: string) => ViewCommandType[] | undefined;
    /**
     * Get command with key and viewName
     * @param key string
     * @param viewName string
     * @returns ViewCommandType | undefined
     */
    getViewCommand: (key: string, viewName: string) => ViewCommandType | undefined;
    /**
     * Delete all commands with key
     * @warning This will delete all commands with key
     * @param key
     */
    deleteCommands: (key: string) => boolean;
    /**
     * Delete command with key and viewName
     * @param key
     * @param viewName
     */
    deleteCommand(key: string, viewName: string): void;
    /**
     * Get all view commands by property
     * @param propertyKey - The property to filter by (e.g., 'isShortcutRegister' or 'isPermanent')
     * @param propertyValue - The value of the property to match
     * @see {@link ViewCommandMap} - A map of view commands that match the property
     */
    getViewCommandsByProperty<T extends keyof ViewCommandType>(propertyKey: T, propertyValue: ViewCommandType[T]): ViewCommandMap;
    get size(): number;
    /**
     * Handle keydown event
     * @param event - KeyboardEvent
     * @param data - ViewData
     * @param viewName - string e.g. 'hub_component'
     * @returns
     */
    onKeydownEventHandler(event: KeyboardEvent, data?: ViewData, viewName?: string): false | void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewCommandMediator, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewCommandMediator>;
}
