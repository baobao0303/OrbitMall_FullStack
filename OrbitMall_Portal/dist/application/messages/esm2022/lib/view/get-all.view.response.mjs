import { __decorate } from "tslib";
import { propertyMapper } from '@core/base';
import { ViewBO } from './view.bo';
export class GetAllViewsResponse {
    constructor() {
        this.id = '';
        this.title = '';
        this.icon = '';
        this.vId = '';
        this.label = '';
        this.parentViewId = null;
        this.viewChildren = [];
    }
}
__decorate([
    propertyMapper('id', String)
], GetAllViewsResponse.prototype, "id", void 0);
__decorate([
    propertyMapper('title', String)
], GetAllViewsResponse.prototype, "title", void 0);
__decorate([
    propertyMapper('icon', String)
], GetAllViewsResponse.prototype, "icon", void 0);
__decorate([
    propertyMapper('vId', String)
], GetAllViewsResponse.prototype, "vId", void 0);
__decorate([
    propertyMapper('label', String)
], GetAllViewsResponse.prototype, "label", void 0);
__decorate([
    propertyMapper('parentViewId', String)
], GetAllViewsResponse.prototype, "parentViewId", void 0);
__decorate([
    propertyMapper('viewChildren', ViewBO)
], GetAllViewsResponse.prototype, "viewChildren", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWFsbC52aWV3LnJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXBwbGljYXRpb24vbWVzc2FnZXMvc3JjL2xpYi92aWV3L2dldC1hbGwudmlldy5yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLE1BQU0sT0FBTyxtQkFBbUI7SUFBaEM7UUFFUyxPQUFFLEdBQVcsRUFBRSxDQUFDO1FBR2hCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFHbkIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUdsQixRQUFHLEdBQVcsRUFBRSxDQUFDO1FBR2pCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFHbkIsaUJBQVksR0FBa0IsSUFBSSxDQUFDO1FBR25DLGlCQUFZLEdBQWEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7Q0FBQTtBQW5CUTtJQUROLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDOytDQUNOO0FBR2hCO0lBRE4sY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7a0RBQ047QUFHbkI7SUFETixjQUFjLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztpREFDTjtBQUdsQjtJQUROLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO2dEQUNOO0FBR2pCO0lBRE4sY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7a0RBQ047QUFHbkI7SUFETixjQUFjLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQzt5REFDRztBQUduQztJQUROLGNBQWMsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDO3lEQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvcGVydHlNYXBwZXIgfSBmcm9tICdAY29yZS9iYXNlJztcbmltcG9ydCB7IFZpZXdCTyB9IGZyb20gJy4vdmlldy5ibyc7XG5cbmV4cG9ydCBjbGFzcyBHZXRBbGxWaWV3c1Jlc3BvbnNlIHtcbiAgQHByb3BlcnR5TWFwcGVyKCdpZCcsIFN0cmluZylcbiAgcHVibGljIGlkOiBzdHJpbmcgPSAnJztcblxuICBAcHJvcGVydHlNYXBwZXIoJ3RpdGxlJywgU3RyaW5nKVxuICBwdWJsaWMgdGl0bGU6IHN0cmluZyA9ICcnO1xuXG4gIEBwcm9wZXJ0eU1hcHBlcignaWNvbicsIFN0cmluZylcbiAgcHVibGljIGljb246IHN0cmluZyA9ICcnO1xuXG4gIEBwcm9wZXJ0eU1hcHBlcigndklkJywgU3RyaW5nKVxuICBwdWJsaWMgdklkOiBzdHJpbmcgPSAnJztcblxuICBAcHJvcGVydHlNYXBwZXIoJ2xhYmVsJywgU3RyaW5nKVxuICBwdWJsaWMgbGFiZWw6IHN0cmluZyA9ICcnO1xuXG4gIEBwcm9wZXJ0eU1hcHBlcigncGFyZW50Vmlld0lkJywgU3RyaW5nKVxuICBwdWJsaWMgcGFyZW50Vmlld0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBAcHJvcGVydHlNYXBwZXIoJ3ZpZXdDaGlsZHJlbicsIFZpZXdCTylcbiAgcHVibGljIHZpZXdDaGlsZHJlbjogVmlld0JPW10gPSBbXTtcbn1cbiJdfQ==