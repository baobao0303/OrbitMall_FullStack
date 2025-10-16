import { __decorate } from "tslib";
import { propertyMapper } from './mapper';
export class PagingBaseRequest {
    constructor(init = {}) {
        this.page = 1;
        this.pageSize = 16;
        this.sort = '';
        this.filters = '';
        Object.assign(this, init);
    }
}
__decorate([
    propertyMapper('Page', Number)
], PagingBaseRequest.prototype, "page", void 0);
__decorate([
    propertyMapper('PageSize', Number)
], PagingBaseRequest.prototype, "pageSize", void 0);
__decorate([
    propertyMapper('Sort', String)
], PagingBaseRequest.prototype, "sort", void 0);
__decorate([
    propertyMapper('Filters', String)
], PagingBaseRequest.prototype, "filters", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5nLmJhc2UucmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvYmFzZS9zcmMvbGliL3BhZ2luZy5iYXNlLnJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFMUMsTUFBTSxPQUFPLGlCQUFpQjtJQWE1QixZQUFZLE9BQW1DLEVBQUU7UUFYakQsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUdqQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBR3RCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFHbEIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUduQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFkQztJQURDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOytDQUNkO0FBR2pCO0lBREMsY0FBYyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUM7bURBQ2I7QUFHdEI7SUFEQyxjQUFjLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzsrQ0FDYjtBQUdsQjtJQURDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDO2tEQUNiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvcGVydHlNYXBwZXIgfSBmcm9tICcuL21hcHBlcic7XG5cbmV4cG9ydCBjbGFzcyBQYWdpbmdCYXNlUmVxdWVzdCB7XG4gIEBwcm9wZXJ0eU1hcHBlcignUGFnZScsIE51bWJlcilcbiAgcGFnZTogbnVtYmVyID0gMTtcblxuICBAcHJvcGVydHlNYXBwZXIoJ1BhZ2VTaXplJywgTnVtYmVyKVxuICBwYWdlU2l6ZTogbnVtYmVyID0gMTY7XG5cbiAgQHByb3BlcnR5TWFwcGVyKCdTb3J0JywgU3RyaW5nKVxuICBzb3J0OiBzdHJpbmcgPSAnJztcblxuICBAcHJvcGVydHlNYXBwZXIoJ0ZpbHRlcnMnLCBTdHJpbmcpXG4gIGZpbHRlcnM6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKGluaXQ6IFBhcnRpYWw8UGFnaW5nQmFzZVJlcXVlc3Q+ID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xuICB9XG59XG4iXX0=