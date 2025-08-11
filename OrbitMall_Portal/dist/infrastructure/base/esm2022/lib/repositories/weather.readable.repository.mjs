import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllWeatherResponse } from '@application/messages';
import { ResponseMapper } from '@core/base';
import { flatMap, map } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import * as i0 from "@angular/core";
export class WeatherReadableRepository extends ReadableRepository {
    getAll() {
        const endPoint = `http://192.168.1.34:40080/WeatherForecast`; //TODO: just for test
        return this.findAll(endPoint).pipe(takeUntilDestroyed(this.destroyRef), flatMap((item) => item), map((data) => {
            const responseMapper = new ResponseMapper(GetAllWeatherResponse);
            return responseMapper.map(data);
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: WeatherReadableRepository, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: WeatherReadableRepository, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: WeatherReadableRepository, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5yZWFkYWJsZS5yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaW5mcmFzdHJ1Y3R1cmUvYmFzZS9zcmMvbGliL3JlcG9zaXRvcmllcy93ZWF0aGVyLnJlYWRhYmxlLnJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztBQUc1RCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsa0JBQWtCO0lBQ3hELE1BQU07UUFDWCxNQUFNLFFBQVEsR0FBRywyQ0FBMkMsQ0FBQyxDQUFDLHFCQUFxQjtRQUNuRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUNoQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQ25DLE9BQU8sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQzVCLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1gsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNqRSxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7K0dBWFUseUJBQXlCO21IQUF6Qix5QkFBeUIsY0FEWixNQUFNOzs0RkFDbkIseUJBQXlCO2tCQURyQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbERlc3Ryb3llZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7IEdldEFsbFdlYXRoZXJSZXNwb25zZSB9IGZyb20gJ0BhcHBsaWNhdGlvbi9tZXNzYWdlcyc7XG5pbXBvcnQgeyBSZXNwb25zZU1hcHBlciB9IGZyb20gJ0Bjb3JlL2Jhc2UnO1xuaW1wb3J0IHsgZmxhdE1hcCwgbWFwLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSZWFkYWJsZVJlcG9zaXRvcnkgfSBmcm9tICcuLi9yZWFkYWJsZS5yZXBvc2l0b3J5JztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBXZWF0aGVyUmVhZGFibGVSZXBvc2l0b3J5IGV4dGVuZHMgUmVhZGFibGVSZXBvc2l0b3J5IHtcbiAgcHVibGljIGdldEFsbCgpOiBPYnNlcnZhYmxlPEdldEFsbFdlYXRoZXJSZXNwb25zZVtdPiB7XG4gICAgY29uc3QgZW5kUG9pbnQgPSBgaHR0cDovLzE5Mi4xNjguMS4zNDo0MDA4MC9XZWF0aGVyRm9yZWNhc3RgOyAvL1RPRE86IGp1c3QgZm9yIHRlc3RcbiAgICByZXR1cm4gdGhpcy5maW5kQWxsKGVuZFBvaW50KS5waXBlKFxuICAgICAgdGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZiksXG4gICAgICBmbGF0TWFwKChpdGVtOiBhbnkpID0+IGl0ZW0pLFxuICAgICAgbWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlTWFwcGVyID0gbmV3IFJlc3BvbnNlTWFwcGVyKEdldEFsbFdlYXRoZXJSZXNwb25zZSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZU1hcHBlci5tYXAoZGF0YSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==