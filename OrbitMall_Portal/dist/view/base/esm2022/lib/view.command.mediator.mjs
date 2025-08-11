import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Keyboard keys
 */
export var KeyboardKeys;
(function (KeyboardKeys) {
    KeyboardKeys["Control"] = "control";
    KeyboardKeys["Alt"] = "alt";
    KeyboardKeys["Shift"] = "shift";
    KeyboardKeys["Escape"] = "escape";
})(KeyboardKeys || (KeyboardKeys = {}));
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
export const MODIFIER_KEY_GETTERS = {
    alt: (event) => event.altKey,
    control: (event) => event.ctrlKey,
    meta: (event) => event.metaKey,
    shift: (event) => event.shiftKey,
    break: () => false,
};
export class ViewCommandMediator {
    constructor() {
        this._viewCommandMap = new Map();
        /**
         * Get all commands with key
         * @param key string
         * @returns ViewCommandType[] | undefined
         */
        this.getViewCommands = (key) => this._viewCommandMap.get(key);
        /**
         * Get command with key and viewName
         * @param key string
         * @param viewName string
         * @returns ViewCommandType | undefined
         */
        this.getViewCommand = (key, viewName) => {
            const commands = this._viewCommandMap.get(key);
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
        this.deleteCommands = (key) => this._viewCommandMap.delete(key);
    }
    /**
     * Set view command to the map
     *
     * @param key [string] -> e.g. 'keydown.control.s'
     * @param viewName [string] -> view name for the command, eg: 'ViewConstant.CONTACT' -> 'contact'
     * @param viewCommand [ViewCommand] -> ViewCommand to execute, eg: { execute: () => { console.log('view1') } }
     * @param isShortcutRegister [boolean] -> If true, it will be registered as shortcut
     * @param isPermanent [boolean] -> If true, it will be permanent command, it will not be removed
     */
    setViewCommandToMap(key, viewName, viewCommand, isShortcutRegister = false, isPermanent = false) {
        // Get the command with key from the map, It can be multiple commands with same key
        const command = this._viewCommandMap.get(key);
        const viewCommandType = {
            viewName: viewName,
            viewCommand: viewCommand,
            isShortcutRegister: isShortcutRegister,
            isPermanent: isPermanent,
            toRemoveListener: undefined,
        };
        if (!command) {
            // If command not found, then create new command and add to the map
            this._viewCommandMap.set(key, [viewCommandType]);
        }
        else {
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
    executeCommandFromMap(key, data, viewName) {
        // console.log('DEBUG: executeCommandFromMap', key, data, viewName);
        const commands = this._viewCommandMap.get(key);
        if (!commands) {
            console.warn(`[ViewCommandMediator.executeCommandFromMap] Command '${key}' not found to execute ...`);
            return;
        }
        // If viewName is provided, then execute only that command
        if (viewName) {
            const command = this.getViewCommand(key, viewName);
            if (!command) {
                console.warn(`[ViewCommandMediator.executeCommandFromMap] Command '${key}' not found to execute`);
                return;
            }
            command.viewCommand.executeCommand(data);
            console.info(`[ViewCommandMediator.executeCommandFromMap] Command '${key}' executed ...`, data, viewName);
        }
        else {
            // Execute all commands with key
            // TODO: this's never be called
            commands.forEach((command) => {
                command.viewCommand.executeCommand(data);
            });
        }
    }
    /**
     * Delete command with key and viewName
     * @param key
     * @param viewName
     */
    deleteCommand(key, viewName) {
        const commands = this._viewCommandMap.get(key);
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
    getViewCommandsByProperty(propertyKey, propertyValue) {
        const viewCommands = new Map();
        this._viewCommandMap.forEach((commands, key) => {
            let commandsHasKey = [];
            Array.from(commands).forEach((command) => {
                if (command[propertyKey] === propertyValue) {
                    commandsHasKey.push(command);
                }
            });
            viewCommands.set(key, commandsHasKey);
        });
        return viewCommands;
    }
    get size() {
        return this._viewCommandMap.size;
    }
    /**
     * Handle keydown event
     * @param event - KeyboardEvent
     * @param data - ViewData
     * @param viewName - string e.g. 'hub_component'
     * @returns
     */
    onKeydownEventHandler(event, data, viewName) {
        event.preventDefault();
        // Get the key code
        let keycode = KEY_MAP[event.key] || event.key;
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
        }
        else if (keycode === '.') {
            // For dot key
            // @example 'keydown.ctrl.'
            keycode = 'dot';
        }
        Array.from(Object.keys(KeyboardKeys)).forEach((modifierKey, idx) => {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ViewCommandMediator, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ViewCommandMediator, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ViewCommandMediator, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5jb21tYW5kLm1lZGlhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdmlldy9iYXNlL3NyYy9saWIvdmlldy5jb21tYW5kLm1lZGlhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBK0IzQzs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLFlBS1g7QUFMRCxXQUFZLFlBQVk7SUFDdEIsbUNBQW1CLENBQUE7SUFDbkIsMkJBQVcsQ0FBQTtJQUNYLCtCQUFlLENBQUE7SUFDZixpQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBTFcsWUFBWSxLQUFaLFlBQVksUUFLdkI7QUFFRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRztJQUNyQixJQUFJLEVBQUUsV0FBVztJQUNqQixJQUFJLEVBQUUsS0FBSztJQUNYLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEdBQUcsRUFBRSxRQUFRO0lBQ2IsR0FBRyxFQUFFLFFBQVE7SUFDYixJQUFJLEVBQUUsV0FBVztJQUNqQixLQUFLLEVBQUUsWUFBWTtJQUNuQixFQUFFLEVBQUUsU0FBUztJQUNiLElBQUksRUFBRSxXQUFXO0lBQ2pCLElBQUksRUFBRSxhQUFhO0lBQ25CLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLEdBQUcsRUFBRSxJQUFJO0NBQ1YsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQXlEO0lBQ3hGLEdBQUcsRUFBRSxDQUFDLEtBQW9CLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNO0lBQzNDLE9BQU8sRUFBRSxDQUFDLEtBQW9CLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPO0lBQ2hELElBQUksRUFBRSxDQUFDLEtBQW9CLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFP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QWdCO1lBQ2hCLDJCQUEyQjtZQUMzQixPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3BCLENBQUM7YUFBTSxJQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUMzQixjQUFjO1lBQ2QsMkJBQTJCO1lBQzNCLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDbEIsQ0FBQztRQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQW1CLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDekUsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUV4QyxJQUFJLFdBQVcsS0FBSyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFN0YsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLElBQUksaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDdkUsWUFBWSxJQUFJLEdBQUcsV0FBVyxHQUFHLENBQUM7Z0JBQ3BDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxZQUFZLElBQUksT0FBTyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9FLENBQUM7K0dBdk1VLG1CQUFtQjttSEFBbkIsbUJBQW1CLGNBRE4sTUFBTTs7NEZBQ25CLG1CQUFtQjtrQkFEL0IsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaWV3Q29tbWFuZCB9IGZyb20gJy4vdmlldy5jb21tYW5kJztcbmltcG9ydCB7IFZpZXdEYXRhIH0gZnJvbSAnLi92aWV3LnR5cGUnO1xuXG5leHBvcnQgdHlwZSBWaWV3Q29tbWFuZFR5cGUgPSB7XG4gIC8qKlxuICAgKiBWaWV3IE5hbWUgZm9yIHRoZSBjb21tYW5kXG4gICAqL1xuICB2aWV3TmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBWaWV3IENvbW1hbmQgdG8gZXhlY3V0ZVxuICAgKi9cbiAgdmlld0NvbW1hbmQ6IFZpZXdDb21tYW5kO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCBpdCB3aWxsIGJlIHJlZ2lzdGVyZWQgYXMgc2hvcnRjdXRcbiAgICovXG4gIGlzU2hvcnRjdXRSZWdpc3RlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhpcyBpcyBwZXJtYW5lbnQgY29tbWFuZCwgaXQgd2lsbCBub3QgYmUgcmVtb3ZlZFxuICAgKi9cbiAgaXNQZXJtYW5lbnQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRvIHJlbW92ZSBsaXN0ZW5lciBmb3IgZGlzcG9zZSB0aGUgY29tbWFuZFxuICAgKi9cbiAgdG9SZW1vdmVMaXN0ZW5lcjogYW55O1xufTtcblxuLyoqXG4gKiBLZXlib2FyZCBrZXlzXG4gKi9cbmV4cG9ydCBlbnVtIEtleWJvYXJkS2V5cyB7XG4gIENvbnRyb2wgPSAnY29udHJvbCcsXG4gIEFsdCA9ICdhbHQnLFxuICBTaGlmdCA9ICdzaGlmdCcsXG4gIEVzY2FwZSA9ICdlc2NhcGUnLFxufVxuXG4vKipcbiAqIEtleSBNYXAgZm9yIHRoZSBrZXlib2FyZCBrZXlzXG4gKi9cbmV4cG9ydCBjb25zdCBLRVlfTUFQID0ge1xuICAnXFxiJzogJ0JhY2tzcGFjZScsXG4gICdcXHQnOiAnVGFiJyxcbiAgJ1xceDdGJzogJ0RlbGV0ZScsXG4gICdcXHgxQic6ICdFc2NhcGUnLFxuICBEZWw6ICdEZWxldGUnLFxuICBFc2M6ICdFc2NhcGUnLFxuICBMZWZ0OiAnQXJyb3dMZWZ0JyxcbiAgUmlnaHQ6ICdBcnJvd1JpZ2h0JyxcbiAgVXA6ICdBcnJvd1VwJyxcbiAgRG93bjogJ0Fycm93RG93bicsXG4gIE1lbnU6ICdDb250ZXh0TWVudScsXG4gIFNjcm9sbDogJ1Njcm9sbExvY2snLFxuICBXaW46ICdPUycsXG59O1xuXG4vKipcbiAqIE1vZGlmaWVyIGtleSBnZXR0ZXJzXG4gKi9cbmV4cG9ydCBjb25zdCBNT0RJRklFUl9LRVlfR0VUVEVSUzogeyBba2V5OiBzdHJpbmddOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGJvb2xlYW4gfSA9IHtcbiAgYWx0OiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50LmFsdEtleSxcbiAgY29udHJvbDogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5jdHJsS2V5LFxuICBtZXRhOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50Lm1ldGFLZXksXG4gIHNoaWZ0OiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50LnNoaWZ0S2V5LFxuICBicmVhazogKCkgPT4gZmFsc2UsXG59O1xuXG4vKipcbiAqIFZpZXcgQ29tbWFuZCBNYXAgdG8gc3RvcmUgYWxsIHZpZXcgY29tbWFuZHMsIGl0IHdpbGwgYmUgdXNlZCB0byBleGVjdXRlIGNvbW1hbmQgYnkga2V5XG4gKlxuICogQGV4YW1wbGVcbiAqICAna2V5ZG93bi5jdHJsLnMnIC0+IFtcbiAqICAge1xuICogICAgICB2aWV3TmFtZTogJ3ZpZXcxJyxcbiAqICAgICAgdmlld0NvbW1hbmQ6IHsgZXhlY3V0ZTogKCkgPT4geyBjb25zb2xlLmxvZygndmlldzEnKSB9IH0sXG4gKiAgICAgIGlzU2hvcnRjdXRSZWdpc3RlcjogdHJ1ZSxcbiAqICAgICAgaXNQZXJtYW5lbnQ6IGZhbHNlLFxuICogICAgICB0b1JlbW92ZUxpc3RlbmVyOiB1bmRlZmluZWRcbiAqICB9LFxuICogIHtcbiAqICAgICB2aWV3TmFtZTogJ3ZpZXcyJyxcbiAqICAgICB2aWV3Q29tbWFuZDogeyBleGVjdXRlOiAoKSA9PiB7IGNvbnNvbGUubG9nKCd2aWV3MicpIH0gfSxcbiAqICAgICBpc1Nob3J0Y3V0UmVnaXN0ZXI6IHRydWUsXG4gKiAgICAgaXNQZXJtYW5lbnQ6IGZhbHNlLFxuICogICAgIHRvUmVtb3ZlTGlzdGVuZXI6IHVuZGVmaW5lZFxuICogIH1cbiAqIF1cbiAqXG4gKi9cbmV4cG9ydCB0eXBlIFZpZXdDb21tYW5kTWFwID0gTWFwPHN0cmluZywgVmlld0NvbW1hbmRUeXBlW10+O1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFZpZXdDb21tYW5kTWVkaWF0b3Ige1xuICBwcml2YXRlIHJlYWRvbmx5IF92aWV3Q29tbWFuZE1hcDogVmlld0NvbW1hbmRNYXAgPSBuZXcgTWFwPHN0cmluZywgVmlld0NvbW1hbmRUeXBlW10+KCk7XG5cbiAgLyoqXG4gICAqIFNldCB2aWV3IGNvbW1hbmQgdG8gdGhlIG1hcFxuICAgKlxuICAgKiBAcGFyYW0ga2V5IFtzdHJpbmddIC0+IGUuZy4gJ2tleWRvd24uY29udHJvbC5zJ1xuICAgKiBAcGFyYW0gdmlld05hbWUgW3N0cmluZ10gLT4gdmlldyBuYW1lIGZvciB0aGUgY29tbWFuZCwgZWc6ICdWaWV3Q29uc3RhbnQuQ09OVEFDVCcgLT4gJ2NvbnRhY3QnXG4gICAqIEBwYXJhbSB2aWV3Q29tbWFuZCBbVmlld0NvbW1hbmRdIC0+IFZpZXdDb21tYW5kIHRvIGV4ZWN1dGUsIGVnOiB7IGV4ZWN1dGU6ICgpID0+IHsgY29uc29sZS5sb2coJ3ZpZXcxJykgfSB9XG4gICAqIEBwYXJhbSBpc1Nob3J0Y3V0UmVnaXN0ZXIgW2Jvb2xlYW5dIC0+IElmIHRydWUsIGl0IHdpbGwgYmUgcmVnaXN0ZXJlZCBhcyBzaG9ydGN1dFxuICAgKiBAcGFyYW0gaXNQZXJtYW5lbnQgW2Jvb2xlYW5dIC0+IElmIHRydWUsIGl0IHdpbGwgYmUgcGVybWFuZW50IGNvbW1hbmQsIGl0IHdpbGwgbm90IGJlIHJlbW92ZWRcbiAgICovXG4gIHB1YmxpYyBzZXRWaWV3Q29tbWFuZFRvTWFwKGtleTogc3RyaW5nLCB2aWV3TmFtZTogc3RyaW5nLCB2aWV3Q29tbWFuZDogVmlld0NvbW1hbmQsIGlzU2hvcnRjdXRSZWdpc3RlcjogYm9vbGVhbiA9IGZhbHNlLCBpc1Blcm1hbmVudDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgLy8gR2V0IHRoZSBjb21tYW5kIHdpdGgga2V5IGZyb20gdGhlIG1hcCwgSXQgY2FuIGJlIG11bHRpcGxlIGNvbW1hbmRzIHdpdGggc2FtZSBrZXlcbiAgICBjb25zdCBjb21tYW5kOiBWaWV3Q29tbWFuZFR5cGVbXSB8IHVuZGVmaW5lZCA9IHRoaXMuX3ZpZXdDb21tYW5kTWFwLmdldChrZXkpO1xuXG4gICAgY29uc3Qgdmlld0NvbW1hbmRUeXBlOiBWaWV3Q29tbWFuZFR5cGUgPSB7XG4gICAgICB2aWV3TmFtZTogdmlld05hbWUsXG4gICAgICB2aWV3Q29tbWFuZDogdmlld0NvbW1hbmQsXG4gICAgICBpc1Nob3J0Y3V0UmVnaXN0ZXI6IGlzU2hvcnRjdXRSZWdpc3RlcixcbiAgICAgIGlzUGVybWFuZW50OiBpc1Blcm1hbmVudCxcbiAgICAgIHRvUmVtb3ZlTGlzdGVuZXI6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgaWYgKCFjb21tYW5kKSB7XG4gICAgICAvLyBJZiBjb21tYW5kIG5vdCBmb3VuZCwgdGhlbiBjcmVhdGUgbmV3IGNvbW1hbmQgYW5kIGFkZCB0byB0aGUgbWFwXG4gICAgICB0aGlzLl92aWV3Q29tbWFuZE1hcC5zZXQoa2V5LCBbdmlld0NvbW1hbmRUeXBlXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIGNvbW1hbmQgZm91bmQsIHRoZW4gYWRkIG5ldyBjb21tYW5kIHRvIHRoZSBsaXN0XG4gICAgICBjb21tYW5kLnB1c2godmlld0NvbW1hbmRUeXBlKTtcbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmluZm8oYFtWaWV3Q29tbWFuZE1lZGlhdG9yLnNldFZpZXdDb21tYW5kVG9NYXBdIENvbW1hbmQgJyR7a2V5fScgYWRkaW5nIG5ldyBjb21tYW5kIHRvIHRoZSBsaXN0IC4uLmAsIHRoaXMuX3ZpZXdDb21tYW5kTWFwLmdldChrZXkpKTtcbiAgICAvLyBjb25zb2xlLmluZm8oYFtWaWV3Q29tbWFuZE1lZGlhdG9yLnNldFZpZXdDb21tYW5kVG9NYXBdIENvbW1hbmQgJyR7a2V5fScgVG90YWwgY29tbWFuZDogYCk7XG4gICAgLy8gY29uc29sZS50YWJsZShBcnJheS5mcm9tKHRoaXMuX3ZpZXdDb21tYW5kTWFwLmVudHJpZXMoKSwgKFtrLCB2XSkgPT4gKHsga2V5OiBrLCB2YWx1ZTogeyB2IH0gfSkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlIGNvbW1hbmQgYnkga2V5XG4gICAqIEBwYXJhbSBrZXkgICAtPiBzdHJpbmc6IGtleSBzdHJpbmcuIGUuZy4gJ2tleWRvd24uY3RybC5zJ1xuICAgKiBAcGFyYW0gZGF0YSAgLT4gZGF0YSwgaXQgY2FuIGFueSBpbiBqc29uIG9yIHVuZGVmaW5lZCB0byBwYXNzIHRvIHRoZSBjb21tYW5kXG4gICAqIEBwYXJhbSB2aWV3TmFtZSAtPiB2aWV3IG5hbWUgdG8gZXhlY3V0ZSB0aGUgY29tbWFuZC4gSWYgdmlld05hbWUgaXMgcHJvdmlkZWQsIHRoZW4gZXhlY3V0ZSBvbmx5IHRoYXQgY29tbWFuZCBvdGhlcndpc2UgZXhlY3V0ZSBhbGwgY29tbWFuZHMgd2l0aCBrZXlcbiAgICovXG4gIHB1YmxpYyBleGVjdXRlQ29tbWFuZEZyb21NYXAoa2V5OiBzdHJpbmcsIGRhdGE/OiBWaWV3RGF0YSwgdmlld05hbWU/OiBzdHJpbmcpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnREVCVUc6IGV4ZWN1dGVDb21tYW5kRnJvbU1hcCcsIGtleSwgZGF0YSwgdmlld05hbWUpO1xuICAgIGNvbnN0IGNvbW1hbmRzOiBWaWV3Q29tbWFuZFR5cGVbXSB8IHVuZGVmaW5lZCA9IHRoaXMuX3ZpZXdDb21tYW5kTWFwLmdldChrZXkpO1xuXG4gICAgaWYgKCFjb21tYW5kcykge1xuICAgICAgY29uc29sZS53YXJuKGBbVmlld0NvbW1hbmRNZWRpYXRvci5leGVjdXRlQ29tbWFuZEZyb21NYXBdIENvbW1hbmQgJyR7a2V5fScgbm90IGZvdW5kIHRvIGV4ZWN1dGUgLi4uYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgdmlld05hbWUgaXMgcHJvdmlkZWQsIHRoZW4gZXhlY3V0ZSBvbmx5IHRoYXQgY29tbWFuZFxuICAgIGlmICh2aWV3TmFtZSkge1xuICAgICAgY29uc3QgY29tbWFuZDogVmlld0NvbW1hbmRUeXBlIHwgdW5kZWZpbmVkID0gdGhpcy5nZXRWaWV3Q29tbWFuZChrZXksIHZpZXdOYW1lKTtcbiAgICAgIGlmICghY29tbWFuZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oYFtWaWV3Q29tbWFuZE1lZGlhdG9yLmV4ZWN1dGVDb21tYW5kRnJvbU1hcF0gQ29tbWFuZCAnJHtrZXl9JyBub3QgZm91bmQgdG8gZXhlY3V0ZWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb21tYW5kLnZpZXdDb21tYW5kLmV4ZWN1dGVDb21tYW5kKGRhdGEpO1xuICAgICAgY29uc29sZS5pbmZvKGBbVmlld0NvbW1hbmRNZWRpYXRvci5leGVjdXRlQ29tbWFuZEZyb21NYXBdIENvbW1hbmQgJyR7a2V5fScgZXhlY3V0ZWQgLi4uYCwgZGF0YSwgdmlld05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBFeGVjdXRlIGFsbCBjb21tYW5kcyB3aXRoIGtleVxuICAgICAgLy8gVE9ETzogdGhpcydzIG5ldmVyIGJlIGNhbGxlZFxuICAgICAgY29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZDogVmlld0NvbW1hbmRUeXBlKSA9PiB7XG4gICAgICAgIGNvbW1hbmQudmlld0NvbW1hbmQuZXhlY3V0ZUNvbW1hbmQoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCBjb21tYW5kcyB3aXRoIGtleVxuICAgKiBAcGFyYW0ga2V5IHN0cmluZ1xuICAgKiBAcmV0dXJucyBWaWV3Q29tbWFuZFR5cGVbXSB8IHVuZGVmaW5lZFxuICAgKi9cbiAgcHVibGljIGdldFZpZXdDb21tYW5kcyA9IChrZXk6IHN0cmluZykgPT4gdGhpcy5fdmlld0NvbW1hbmRNYXAuZ2V0KGtleSk7XG5cbiAgLyoqXG4gICAqIEdldCBjb21tYW5kIHdpdGgga2V5IGFuZCB2aWV3TmFtZVxuICAgKiBAcGFyYW0ga2V5IHN0cmluZ1xuICAgKiBAcGFyYW0gdmlld05hbWUgc3RyaW5nXG4gICAqIEByZXR1cm5zIFZpZXdDb21tYW5kVHlwZSB8IHVuZGVmaW5lZFxuICAgKi9cbiAgcHVibGljIGdldFZpZXdDb21tYW5kID0gKGtleTogc3RyaW5nLCB2aWV3TmFtZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY29tbWFuZHM6IFZpZXdDb21tYW5kVHlwZVtdIHwgdW5kZWZpbmVkID0gdGhpcy5fdmlld0NvbW1hbmRNYXAuZ2V0KGtleSk7XG5cbiAgICBpZiAoIWNvbW1hbmRzKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFtWaWV3Q29tbWFuZE1lZGlhdG9yLmdldFZpZXdDb21tYW5kXSBDb21tYW5kICcke2tleX0nIG5vdCBmb3VuZCB0byBleGVjdXRlIC4uLmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBjb21tYW5kcy5maW5kKChjb21tYW5kKSA9PiBjb21tYW5kLnZpZXdOYW1lID09PSB2aWV3TmFtZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbGwgY29tbWFuZHMgd2l0aCBrZXlcbiAgICogQHdhcm5pbmcgVGhpcyB3aWxsIGRlbGV0ZSBhbGwgY29tbWFuZHMgd2l0aCBrZXlcbiAgICogQHBhcmFtIGtleVxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUNvbW1hbmRzID0gKGtleTogc3RyaW5nKSA9PiB0aGlzLl92aWV3Q29tbWFuZE1hcC5kZWxldGUoa2V5KTtcblxuICAvKipcbiAgICogRGVsZXRlIGNvbW1hbmQgd2l0aCBrZXkgYW5kIHZpZXdOYW1lXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIHZpZXdOYW1lXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQ29tbWFuZChrZXk6IHN0cmluZywgdmlld05hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGNvbW1hbmRzOiBWaWV3Q29tbWFuZFR5cGVbXSB8IHVuZGVmaW5lZCA9IHRoaXMuX3ZpZXdDb21tYW5kTWFwLmdldChrZXkpO1xuXG4gICAgaWYgKCFjb21tYW5kcykge1xuICAgICAgY29uc29sZS5sb2coYFtWaWV3Q29tbWFuZE1lZGlhdG9yLmRlbGV0ZUNvbW1hbmRdIENvbW1hbmQgJyR7a2V5fScgbm90IGZvdW5kIHRvIGRlbGV0ZSAuLi5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9IGNvbW1hbmRzLmZpbmRJbmRleCgoY29tbWFuZCkgPT4gY29tbWFuZC52aWV3TmFtZSA9PT0gdmlld05hbWUpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgY29tbWFuZHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICAvLyBJZiBubyBjb21tYW5kIGZvdW5kLCB0aGVuIGRlbGV0ZSB0aGUga2V5IGZyb20gdGhlIG1hcFxuICAgIGlmIChjb21tYW5kcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX3ZpZXdDb21tYW5kTWFwLmRlbGV0ZShrZXkpO1xuICAgIH1cblxuICAgIC8vIGNvbnNvbGUuaW5mbyhgW1ZpZXdDb21tYW5kTWVkaWF0b3IuZGVsZXRlQ29tbWFuZF0gQ29tbWFuZCByZW1haW5pbmcgJyR7a2V5fSdgLCB0aGlzLl92aWV3Q29tbWFuZE1hcC5nZXQoa2V5KSk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCB2aWV3IGNvbW1hbmRzIGJ5IHByb3BlcnR5XG4gICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAtIFRoZSBwcm9wZXJ0eSB0byBmaWx0ZXIgYnkgKGUuZy4sICdpc1Nob3J0Y3V0UmVnaXN0ZXInIG9yICdpc1Blcm1hbmVudCcpXG4gICAqIEBwYXJhbSBwcm9wZXJ0eVZhbHVlIC0gVGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB0byBtYXRjaFxuICAgKiBAc2VlIHtAbGluayBWaWV3Q29tbWFuZE1hcH0gLSBBIG1hcCBvZiB2aWV3IGNvbW1hbmRzIHRoYXQgbWF0Y2ggdGhlIHByb3BlcnR5XG4gICAqL1xuICBwdWJsaWMgZ2V0Vmlld0NvbW1hbmRzQnlQcm9wZXJ0eTxUIGV4dGVuZHMga2V5b2YgVmlld0NvbW1hbmRUeXBlPihwcm9wZXJ0eUtleTogVCwgcHJvcGVydHlWYWx1ZTogVmlld0NvbW1hbmRUeXBlW1RdKSB7XG4gICAgY29uc3Qgdmlld0NvbW1hbmRzOiBWaWV3Q29tbWFuZE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBWaWV3Q29tbWFuZFR5cGVbXT4oKTtcblxuICAgIHRoaXMuX3ZpZXdDb21tYW5kTWFwLmZvckVhY2goKGNvbW1hbmRzOiBWaWV3Q29tbWFuZFR5cGVbXSwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGxldCBjb21tYW5kc0hhc0tleTogVmlld0NvbW1hbmRUeXBlW10gPSBbXTtcbiAgICAgIEFycmF5LmZyb20oY29tbWFuZHMpLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgaWYgKGNvbW1hbmRbcHJvcGVydHlLZXldID09PSBwcm9wZXJ0eVZhbHVlKSB7XG4gICAgICAgICAgY29tbWFuZHNIYXNLZXkucHVzaChjb21tYW5kKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2aWV3Q29tbWFuZHMuc2V0KGtleSwgY29tbWFuZHNIYXNLZXkpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZpZXdDb21tYW5kcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld0NvbW1hbmRNYXAuc2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUga2V5ZG93biBldmVudFxuICAgKiBAcGFyYW0gZXZlbnQgLSBLZXlib2FyZEV2ZW50XG4gICAqIEBwYXJhbSBkYXRhIC0gVmlld0RhdGFcbiAgICogQHBhcmFtIHZpZXdOYW1lIC0gc3RyaW5nIGUuZy4gJ2h1Yl9jb21wb25lbnQnXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwdWJsaWMgb25LZXlkb3duRXZlbnRIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhPzogVmlld0RhdGEsIHZpZXdOYW1lPzogc3RyaW5nKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIEdldCB0aGUga2V5IGNvZGVcbiAgICBsZXQga2V5Y29kZSA9IEtFWV9NQVBbZXZlbnQua2V5IGFzIGtleW9mIHR5cGVvZiBLRVlfTUFQXSB8fCBldmVudC5rZXk7XG5cbiAgICB2YXIga2V5Q29tYmluaW5nID0gJyc7XG4gICAgaWYgKGtleWNvZGUgPT0gbnVsbCB8fCBrZXljb2RlID09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS53YXJuKGBbVmlld0NvbW1hbmRNZWRpYXRvci5vbktleWRvd25FdmVudEhhbmRsZXJdIGtleUNvZGUgaXMgbnVsbCBvciB1bmRlZmluZWQgLi4uYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGtleWNvZGUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoa2V5Y29kZSA9PT0gJyAnKSB7XG4gICAgICAvLyBGb3Igc3BhY2Uga2V5XG4gICAgICAvLyBAZXhhbXBsZSAna2V5ZG93bi5zcGFjZSdcbiAgICAgIGtleWNvZGUgPSAnc3BhY2UnO1xuICAgIH0gZWxzZSBpZiAoa2V5Y29kZSA9PT0gJy4nKSB7XG4gICAgICAvLyBGb3IgZG90IGtleVxuICAgICAgLy8gQGV4YW1wbGUgJ2tleWRvd24uY3RybC4nXG4gICAgICBrZXljb2RlID0gJ2RvdCc7XG4gICAgfVxuXG4gICAgQXJyYXkuZnJvbShPYmplY3Qua2V5cyhLZXlib2FyZEtleXMpKS5mb3JFYWNoKChtb2RpZmllcktleTogc3RyaW5nLCBpZHgpID0+IHtcbiAgICAgIG1vZGlmaWVyS2V5ID0gbW9kaWZpZXJLZXkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgaWYgKG1vZGlmaWVyS2V5ICE9PSBrZXljb2RlKSB7XG4gICAgICAgIGNvbnN0IG1vZGlmaWVyS2V5R2V0dGVyID0gTU9ESUZJRVJfS0VZX0dFVFRFUlNbbW9kaWZpZXJLZXldIHx8IE1PRElGSUVSX0tFWV9HRVRURVJTWydicmVhayddO1xuXG4gICAgICAgIGlmIChtb2RpZmllcktleUdldHRlcihldmVudCkgIT09IHVuZGVmaW5lZCAmJiBtb2RpZmllcktleUdldHRlcihldmVudCkpIHtcbiAgICAgICAgICBrZXlDb21iaW5pbmcgKz0gYCR7bW9kaWZpZXJLZXl9LmA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGtleUNvbWJpbmluZyArPSBrZXljb2RlO1xuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVDb21tYW5kRnJvbU1hcChga2V5ZG93bi4ke2tleUNvbWJpbmluZ31gLCBkYXRhLCB2aWV3TmFtZSk7XG4gIH1cbn1cbiJdfQ==