import { __decorate } from "tslib";
import { propertyMapper } from '@core/base';
export class GetAllWeatherResponse {
    constructor() {
        this.date = '';
        this.summary = '';
        this.temperatureC = 0;
        this.temperatureF = 0;
    }
}
__decorate([
    propertyMapper('date', String)
], GetAllWeatherResponse.prototype, "date", void 0);
__decorate([
    propertyMapper('summary', String)
], GetAllWeatherResponse.prototype, "summary", void 0);
__decorate([
    propertyMapper('summary', Number)
], GetAllWeatherResponse.prototype, "temperatureC", void 0);
__decorate([
    propertyMapper('summary', Number)
], GetAllWeatherResponse.prototype, "temperatureF", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWFsbC53ZWF0aGVyLnJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXBwbGljYXRpb24vbWVzc2FnZXMvc3JjL2xpYi93ZWF0aGVyL2dldC1hbGwud2VhdGhlci5yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU1QyxNQUFNLE9BQU8scUJBQXFCO0lBQWxDO1FBRUUsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUdsQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBR3JCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBR3pCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FBQTtBQVZDO0lBREMsY0FBYyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7bURBQ2I7QUFHbEI7SUFEQyxjQUFjLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQztzREFDYjtBQUdyQjtJQURDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDOzJEQUNUO0FBR3pCO0lBREMsY0FBYyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7MkRBQ1QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9wZXJ0eU1hcHBlciB9IGZyb20gJ0Bjb3JlL2Jhc2UnO1xuXG5leHBvcnQgY2xhc3MgR2V0QWxsV2VhdGhlclJlc3BvbnNlIHtcbiAgQHByb3BlcnR5TWFwcGVyKCdkYXRlJywgU3RyaW5nKVxuICBkYXRlOiBzdHJpbmcgPSAnJztcblxuICBAcHJvcGVydHlNYXBwZXIoJ3N1bW1hcnknLCBTdHJpbmcpXG4gIHN1bW1hcnk6IHN0cmluZyA9ICcnO1xuXG4gIEBwcm9wZXJ0eU1hcHBlcignc3VtbWFyeScsIE51bWJlcilcbiAgdGVtcGVyYXR1cmVDOiBudW1iZXIgPSAwO1xuXG4gIEBwcm9wZXJ0eU1hcHBlcignc3VtbWFyeScsIE51bWJlcilcbiAgdGVtcGVyYXR1cmVGOiBudW1iZXIgPSAwO1xufVxuIl19