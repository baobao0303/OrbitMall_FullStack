import { ViewData } from './view.type';
export interface ViewCommand {
    executeCommand(data?: ViewData, viewName?: string): void;
}
