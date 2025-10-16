import { __decorate } from "tslib";
import { propertyMapper } from './mapper';
/**
 * Defines Paging BO Base
 */
export class PagingBaseResponse {
    constructor(init = {}) {
        this.activePage = 0;
        this.totalPages = 0;
        this.totalItems = 0;
        this.pageSize = 0;
        Object.assign(this, init);
    }
}
__decorate([
    propertyMapper('activePage', Number)
], PagingBaseResponse.prototype, "activePage", void 0);
__decorate([
    propertyMapper('totalPages', Number)
], PagingBaseResponse.prototype, "totalPages", void 0);
__decorate([
    propertyMapper('totalItems', Number)
], PagingBaseResponse.prototype, "totalItems", void 0);
__decorate([
    propertyMapper('pageSize', Number)
], PagingBaseResponse.prototype, "pageSize", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5nLmJhc2UucmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Jhc2Uvc3JjL2xpYi9wYWdpbmcuYmFzZS5yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUUxQzs7R0FFRztBQUNILE1BQU0sT0FBTyxrQkFBa0I7SUFhN0IsWUFBWSxPQUFvQyxFQUFFO1FBWGxELGVBQVUsR0FBVyxDQUFDLENBQUM7UUFHdkIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUd2QixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBR3ZCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHbkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBZEM7SUFEQyxjQUFjLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQztzREFDZDtBQUd2QjtJQURDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO3NEQUNkO0FBR3ZCO0lBREMsY0FBYyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7c0RBQ2Q7QUFHdkI7SUFEQyxjQUFjLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQztvREFDZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJPQmFzZSB9IGZyb20gJy4vYm8uYmFzZSc7XG5pbXBvcnQgeyBwcm9wZXJ0eU1hcHBlciB9IGZyb20gJy4vbWFwcGVyJztcblxuLyoqXG4gKiBEZWZpbmVzIFBhZ2luZyBCTyBCYXNlXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdpbmdCYXNlUmVzcG9uc2Uge1xuICBAcHJvcGVydHlNYXBwZXIoJ2FjdGl2ZVBhZ2UnLCBOdW1iZXIpXG4gIGFjdGl2ZVBhZ2U6IG51bWJlciA9IDA7XG5cbiAgQHByb3BlcnR5TWFwcGVyKCd0b3RhbFBhZ2VzJywgTnVtYmVyKVxuICB0b3RhbFBhZ2VzOiBudW1iZXIgPSAwO1xuXG4gIEBwcm9wZXJ0eU1hcHBlcigndG90YWxJdGVtcycsIE51bWJlcilcbiAgdG90YWxJdGVtczogbnVtYmVyID0gMDtcblxuICBAcHJvcGVydHlNYXBwZXIoJ3BhZ2VTaXplJywgTnVtYmVyKVxuICBwYWdlU2l6ZTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihpbml0OiBQYXJ0aWFsPFBhZ2luZ0Jhc2VSZXNwb25zZT4gPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XG4gIH1cbn1cbiJdfQ==