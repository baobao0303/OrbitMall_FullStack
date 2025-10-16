import { __decorate } from "tslib";
import { propertyMapper } from '@core/base';
import { ViewAllowBO } from './view-allow.bo';
export class GetByRoleIdViewResponse {
    constructor() {
        this.id = '';
        this.title = '';
        this.icon = '';
        this.vId = '';
        this.label = '';
        this.action = [];
    }
}
__decorate([
    propertyMapper('id', String)
], GetByRoleIdViewResponse.prototype, "id", void 0);
__decorate([
    propertyMapper('title', String)
], GetByRoleIdViewResponse.prototype, "title", void 0);
__decorate([
    propertyMapper('icon', String)
], GetByRoleIdViewResponse.prototype, "icon", void 0);
__decorate([
    propertyMapper('vId', String)
], GetByRoleIdViewResponse.prototype, "vId", void 0);
__decorate([
    propertyMapper('label', String)
], GetByRoleIdViewResponse.prototype, "label", void 0);
__decorate([
    propertyMapper('action', ViewAllowBO)
], GetByRoleIdViewResponse.prototype, "action", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWJ5LXJvbGUtaWQudmlldy5yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FwcGxpY2F0aW9uL21lc3NhZ2VzL3NyYy9saWIvdmlldy9nZXQtYnktcm9sZS1pZC52aWV3LnJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxNQUFNLE9BQU8sdUJBQXVCO0lBQXBDO1FBRVMsT0FBRSxHQUFXLEVBQUUsQ0FBQztRQUdoQixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBR25CLFNBQUksR0FBVyxFQUFFLENBQUM7UUFHbEIsUUFBRyxHQUFXLEVBQUUsQ0FBQztRQUdqQixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBR25CLFdBQU0sR0FBa0IsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Q0FBQTtBQWhCUTtJQUROLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO21EQUNOO0FBR2hCO0lBRE4sY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7c0RBQ047QUFHbkI7SUFETixjQUFjLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztxREFDTjtBQUdsQjtJQUROLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO29EQUNOO0FBR2pCO0lBRE4sY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7c0RBQ047QUFHbkI7SUFETixjQUFjLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQzt1REFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb3BlcnR5TWFwcGVyIH0gZnJvbSAnQGNvcmUvYmFzZSc7XG5pbXBvcnQgeyBWaWV3QWxsb3dCTyB9IGZyb20gJy4vdmlldy1hbGxvdy5ibyc7XG5leHBvcnQgY2xhc3MgR2V0QnlSb2xlSWRWaWV3UmVzcG9uc2Uge1xuICBAcHJvcGVydHlNYXBwZXIoJ2lkJywgU3RyaW5nKVxuICBwdWJsaWMgaWQ6IHN0cmluZyA9ICcnO1xuXG4gIEBwcm9wZXJ0eU1hcHBlcigndGl0bGUnLCBTdHJpbmcpXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gJyc7XG5cbiAgQHByb3BlcnR5TWFwcGVyKCdpY29uJywgU3RyaW5nKVxuICBwdWJsaWMgaWNvbjogc3RyaW5nID0gJyc7XG5cbiAgQHByb3BlcnR5TWFwcGVyKCd2SWQnLCBTdHJpbmcpXG4gIHB1YmxpYyB2SWQ6IHN0cmluZyA9ICcnO1xuXG4gIEBwcm9wZXJ0eU1hcHBlcignbGFiZWwnLCBTdHJpbmcpXG4gIHB1YmxpYyBsYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgQHByb3BlcnR5TWFwcGVyKCdhY3Rpb24nLCBWaWV3QWxsb3dCTylcbiAgcHVibGljIGFjdGlvbjogVmlld0FsbG93Qk9bXSA9IFtdO1xufVxuIl19