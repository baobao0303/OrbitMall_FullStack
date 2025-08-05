/**
 * Represents the different modes a view can be in.
 *
 * - `VIEW`: The view is in read-only mode.
 * - `ADD`: The view is in add mode, allowing new items to be added.
 * - `EDIT`: The view is in edit mode, allowing existing items to be modified.
 * - `REMOVE`: The view is in remove mode, allowing items to be deleted.
 * - `IN_FIRST_PAGE`: The view is on the first page.
 * - `IN_LAST_PAGE`: The view is on the last page.
 */
export type ViewMode = 'VIEW' | 'ADD' | 'EDIT' | 'REMOVE' | 'IN_FIRST_PAGE' | 'IN_LAST_PAGE';

/**
 * Represents the types of action handlers that can be used in the application.
 *
 * Possible values are:
 * - 'OK': Represents an action handler for the OK action.
 * - 'CLOSE': Represents an action handler for the CLOSE action.
 * - 'YES': Represents an action handler for the YES action.
 * - 'NO': Represents an action handler for the NO action.
 * - 'CANCEL': Represents an action handler for the CANCEL action.
 * - 'CONFIRM': Represents an action handler for the CONFIRM action.
 * - 'VERIFY': Represents an action handler for the VERIFY action.
 */
export type ActionHandlerType = 'OK' | 'CLOSE' | 'YES' | 'NO' | 'CANCEL' | 'CONFIRM' | 'VERIFY';

/**
 * Represents a view data object where keys are strings and values are of unknown type.
 * This type can be used to store arbitrary data related to a view.
 */
export type ViewData = Record<string, unknown>;

/**
 * Represents the state of a view in the application.
 *
 * @type {ViewState}
 *
 * @property {'INIT'} INIT - The initial state before any loading has started.
 * @property {'IDLE'} IDLE - The state when the view is not currently loading data.
 * @property {'LOADING'} LOADING - The state when data is currently being loaded.
 * @property {'LOADED'} LOADED - The state when data has been successfully loaded.
 * @property {'ERROR'} ERROR - The state when an error has occurred during loading.
 */
export type ViewState = 'INIT' | 'IDLE' | 'LOADING' | 'LOADED' | 'ERROR';

/**
 * Represents the types of move actions that can be performed.
 *
 * Possible values:
 * - 'NEXT_ITEM': Move to the next item.
 * - 'PREVIOUS_ITEM': Move to the previous item.
 * - 'FIRST_ITEM': Move to the first item.
 * - 'LAST_ITEM': Move to the last item.
 * - 'NEXT_PAGE': Move to the next page.
 * - 'PREVIOUS_PAGE': Move to the previous page.
 * - 'FIRST_PAGE': Move to the first page.
 * - 'LAST_PAGE': Move to the last page.
 */
export type MoveActionType = 'NEXT_ITEM' | 'PREVIOUS_ITEM' | 'FIRST_ITEM' | 'LAST_ITEM' | 'NEXT_PAGE' | 'PREVIOUS_PAGE' | 'FIRST_PAGE' | 'LAST_PAGE';

/**
 * Represents the type of data that can be used in a view context.
 * This type can be a number, string, boolean, object, or any other type.
 */
export type ViewDataType = number | string | boolean | object | any;
