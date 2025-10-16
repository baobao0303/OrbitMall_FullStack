import { ViewBO } from './view.bo';
export declare class GetAllViewsResponse {
    id: string;
    title: string;
    icon: string;
    vId: string;
    label: string;
    parentViewId: string | null;
    viewChildren: ViewBO[];
}
