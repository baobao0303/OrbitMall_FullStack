import { __decorate } from "tslib";
import { HttpStatusCode } from '@angular/common/http';
import { propertyMapper } from '@core/base';
export class VRTOErrorResponse {
    constructor(title = '', status = HttpStatusCode.Unauthorized, detail = '') {
        this.title = '';
        this.status = HttpStatusCode.Unauthorized;
        this.detail = '';
        this.title = title;
        this.status = status;
        this.detail = detail;
    }
}
__decorate([
    propertyMapper('title', String)
], VRTOErrorResponse.prototype, "title", void 0);
__decorate([
    propertyMapper('status', Number)
], VRTOErrorResponse.prototype, "status", void 0);
__decorate([
    propertyMapper('detail', String)
], VRTOErrorResponse.prototype, "detail", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnJ0by5lcnJvci5yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FwcGxpY2F0aW9uL21lc3NhZ2VzL3NyYy9saWIvdnJ0by92cnRvLmVycm9yLnJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU1QyxNQUFNLE9BQU8saUJBQWlCO0lBVTVCLFlBQVksUUFBZ0IsRUFBRSxFQUFFLFNBQWlCLGNBQWMsQ0FBQyxZQUFZLEVBQUUsU0FBaUIsRUFBRTtRQVIxRixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBR25CLFdBQU0sR0FBVyxjQUFjLENBQUMsWUFBWSxDQUFDO1FBRzdDLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFHekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBYlE7SUFETixjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztnREFDTjtBQUduQjtJQUROLGNBQWMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO2lEQUNtQjtBQUc3QztJQUROLGNBQWMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO2lEQUNOIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFN0YXR1c0NvZGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBwcm9wZXJ0eU1hcHBlciB9IGZyb20gJ0Bjb3JlL2Jhc2UnO1xuXG5leHBvcnQgY2xhc3MgVlJUT0Vycm9yUmVzcG9uc2Uge1xuICBAcHJvcGVydHlNYXBwZXIoJ3RpdGxlJywgU3RyaW5nKVxuICBwdWJsaWMgdGl0bGU6IHN0cmluZyA9ICcnO1xuXG4gIEBwcm9wZXJ0eU1hcHBlcignc3RhdHVzJywgTnVtYmVyKVxuICBwdWJsaWMgc3RhdHVzOiBudW1iZXIgPSBIdHRwU3RhdHVzQ29kZS5VbmF1dGhvcml6ZWQ7XG5cbiAgQHByb3BlcnR5TWFwcGVyKCdkZXRhaWwnLCBTdHJpbmcpXG4gIHB1YmxpYyBkZXRhaWw6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHRpdGxlOiBzdHJpbmcgPSAnJywgc3RhdHVzOiBudW1iZXIgPSBIdHRwU3RhdHVzQ29kZS5VbmF1dGhvcml6ZWQsIGRldGFpbDogc3RyaW5nID0gJycpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5kZXRhaWwgPSBkZXRhaWw7XG4gIH1cbn1cbiJdfQ==