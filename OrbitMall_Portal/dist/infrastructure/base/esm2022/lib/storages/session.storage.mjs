import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class SessionStorage {
    get(key) {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    remove(key) {
        sessionStorage.removeItem(key);
    }
    clear() {
        sessionStorage.clear();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SessionStorage, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SessionStorage, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SessionStorage, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaW5mcmFzdHJ1Y3R1cmUvYmFzZS9zcmMvbGliL3N0b3JhZ2VzL3Nlc3Npb24uc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUkzQyxNQUFNLE9BQU8sY0FBYztJQUNsQixHQUFHLENBQUMsR0FBVztRQUNwQixNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUNNLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBYTtRQUNuQyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNNLE1BQU0sQ0FBQyxHQUFXO1FBQ3ZCLGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNNLEtBQUs7UUFDVixjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQzsrR0FiVSxjQUFjO21IQUFkLGNBQWMsY0FERCxNQUFNOzs0RkFDbkIsY0FBYztrQkFEMUIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyU3RvcmFnZUJhc2UgfSBmcm9tICcuL2Jyb3dzZXIuc3RvcmFnZS5iYXNlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBTZXNzaW9uU3RvcmFnZSBpbXBsZW1lbnRzIEJyb3dzZXJTdG9yYWdlQmFzZSB7XG4gIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBpdGVtID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIHJldHVybiBpdGVtID8gSlNPTi5wYXJzZShpdGVtKSA6IG51bGw7XG4gIH1cbiAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICB9XG4gIHB1YmxpYyByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XG4gIH1cbn1cbiJdfQ==