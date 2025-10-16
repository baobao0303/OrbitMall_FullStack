import { __decorate } from "tslib";
import { propertyMapper } from '@core/base';
export class ViewBO {
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
], ViewBO.prototype, "id", void 0);
__decorate([
    propertyMapper('title', String)
], ViewBO.prototype, "title", void 0);
__decorate([
    propertyMapper('icon', String)
], ViewBO.prototype, "icon", void 0);
__decorate([
    propertyMapper('vId', String)
], ViewBO.prototype, "vId", void 0);
__decorate([
    propertyMapper('label', String)
], ViewBO.prototype, "label", void 0);
__decorate([
    propertyMapper('parentViewId', String)
], ViewBO.prototype, "parentViewId", void 0);
__decorate([
    propertyMapper('viewChildren', ViewBO)
], ViewBO.prototype, "viewChildren", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5iby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FwcGxpY2F0aW9uL21lc3NhZ2VzL3NyYy9saWIvdmlldy92aWV3LmJvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTVDLE1BQU0sT0FBTyxNQUFNO0lBQW5CO1FBRVMsT0FBRSxHQUFXLEVBQUUsQ0FBQztRQUdoQixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBR25CLFNBQUksR0FBVyxFQUFFLENBQUM7UUFHbEIsUUFBRyxHQUFXLEVBQUUsQ0FBQztRQUdqQixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBR25CLGlCQUFZLEdBQWtCLElBQUksQ0FBQztRQUduQyxpQkFBWSxHQUFhLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0NBQUE7QUFuQlE7SUFETixjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztrQ0FDTjtBQUdoQjtJQUROLGNBQWMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO3FDQUNOO0FBR25CO0lBRE4sY0FBYyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7b0NBQ047QUFHbEI7SUFETixjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQzttQ0FDTjtBQUdqQjtJQUROLGNBQWMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO3FDQUNOO0FBR25CO0lBRE4sY0FBYyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUM7NENBQ0c7QUFHbkM7SUFETixjQUFjLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQzs0Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb3BlcnR5TWFwcGVyIH0gZnJvbSAnQGNvcmUvYmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBWaWV3Qk8ge1xuICBAcHJvcGVydHlNYXBwZXIoJ2lkJywgU3RyaW5nKVxuICBwdWJsaWMgaWQ6IHN0cmluZyA9ICcnO1xuXG4gIEBwcm9wZXJ0eU1hcHBlcigndGl0bGUnLCBTdHJpbmcpXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gJyc7XG5cbiAgQHByb3BlcnR5TWFwcGVyKCdpY29uJywgU3RyaW5nKVxuICBwdWJsaWMgaWNvbjogc3RyaW5nID0gJyc7XG5cbiAgQHByb3BlcnR5TWFwcGVyKCd2SWQnLCBTdHJpbmcpXG4gIHB1YmxpYyB2SWQ6IHN0cmluZyA9ICcnO1xuXG4gIEBwcm9wZXJ0eU1hcHBlcignbGFiZWwnLCBTdHJpbmcpXG4gIHB1YmxpYyBsYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgQHByb3BlcnR5TWFwcGVyKCdwYXJlbnRWaWV3SWQnLCBTdHJpbmcpXG4gIHB1YmxpYyBwYXJlbnRWaWV3SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eU1hcHBlcigndmlld0NoaWxkcmVuJywgVmlld0JPKVxuICBwdWJsaWMgdmlld0NoaWxkcmVuOiBWaWV3Qk9bXSA9IFtdO1xufVxuIl19