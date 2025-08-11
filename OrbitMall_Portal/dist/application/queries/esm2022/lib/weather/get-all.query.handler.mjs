import { inject, Injectable } from '@angular/core';
import { WeatherReadableRepository } from '@infrastructure/base';
import * as i0 from "@angular/core";
export class GetAllQueryHandler {
    constructor() {
        this.repository = inject(WeatherReadableRepository);
    }
    handle(request) {
        return this.repository.getAll();
        // this.repository.getAll().subscribe({
        //   next(value) {
        //     console.log(value);
        //   },
        // });
        // return undefined;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: GetAllQueryHandler, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: GetAllQueryHandler, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: GetAllQueryHandler, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWFsbC5xdWVyeS5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXBwbGljYXRpb24vcXVlcmllcy9zcmMvbGliL3dlYXRoZXIvZ2V0LWFsbC5xdWVyeS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTW5ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUlqRSxNQUFNLE9BQU8sa0JBQWtCO0lBRC9CO1FBSVUsZUFBVSxHQUFHLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0tBVXhEO0lBVEMsTUFBTSxDQUFDLE9BQTZCO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQyx1Q0FBdUM7UUFDdkMsa0JBQWtCO1FBQ2xCLDBCQUEwQjtRQUMxQixPQUFPO1FBQ1AsTUFBTTtRQUNOLG9CQUFvQjtJQUN0QixDQUFDOytHQVpVLGtCQUFrQjttSEFBbEIsa0JBQWtCLGNBREwsTUFBTTs7NEZBQ25CLGtCQUFrQjtrQkFEOUIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnQGFwcGxpY2F0aW9uL2Jhc2UnO1xuaW1wb3J0IHtcbiAgR2V0QWxsV2VhdGhlclJlcXVlc3QsXG4gIEdldEFsbFdlYXRoZXJSZXNwb25zZSxcbn0gZnJvbSAnQGFwcGxpY2F0aW9uL21lc3NhZ2VzJztcbmltcG9ydCB7IFdlYXRoZXJSZWFkYWJsZVJlcG9zaXRvcnkgfSBmcm9tICdAaW5mcmFzdHJ1Y3R1cmUvYmFzZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgR2V0QWxsUXVlcnlIYW5kbGVyXG4gIGltcGxlbWVudHMgUmVxdWVzdEhhbmRsZXI8R2V0QWxsV2VhdGhlclJlcXVlc3QsIEdldEFsbFdlYXRoZXJSZXNwb25zZVtdPlxue1xuICBwcml2YXRlIHJlcG9zaXRvcnkgPSBpbmplY3QoV2VhdGhlclJlYWRhYmxlUmVwb3NpdG9yeSk7XG4gIGhhbmRsZShyZXF1ZXN0OiBHZXRBbGxXZWF0aGVyUmVxdWVzdCk6IE9ic2VydmFibGU8R2V0QWxsV2VhdGhlclJlc3BvbnNlW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXBvc2l0b3J5LmdldEFsbCgpO1xuICAgIC8vIHRoaXMucmVwb3NpdG9yeS5nZXRBbGwoKS5zdWJzY3JpYmUoe1xuICAgIC8vICAgbmV4dCh2YWx1ZSkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgLy8gICB9LFxuICAgIC8vIH0pO1xuICAgIC8vIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==