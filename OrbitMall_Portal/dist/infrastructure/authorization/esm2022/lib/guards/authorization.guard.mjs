import { inject, Injectable } from '@angular/core';
import { Router, } from '@angular/router';
import { VerifyValidVATORequest, VRTORequest, VRTOResponse, } from '@application/messages';
import { VerifyValidVATOQueryHandler, VRTOQueryHandler, } from '@application/queries';
import { BROWSER_STORAGE } from '@infrastructure/base';
import { lastValueFrom } from 'rxjs';
import { AuthorizationConstant } from '../authorization.constant';
import * as i0 from "@angular/core";
export class AuthorizationGuard {
    constructor() {
        this.router = inject(Router);
        this.storage = inject(BROWSER_STORAGE);
        this.verifyValidVATOHandler = inject(VerifyValidVATOQueryHandler);
        this.vrtoHandler = inject(VRTOQueryHandler);
    }
    /**
     * Redirects the user to the sign-in page.
     *
     * @private
     */
    redirectToSignIn() {
        this.router.navigateByUrl('/sign-in');
        return false;
    }
    /**
     * Validates the existing VATO token and refreshes it if necessary.
     *
     * @private
     * @param vrto The VRTO (refresh token) used to generate a new VATO token.
     * @returns Promise<boolean> Whether the token was refreshed successfully.
     */
    async validateAndRefreshToken(vrto) {
        let isRemember = this.storage.get(AuthorizationConstant.isRemember) === 'true';
        if (!isRemember) {
            // Remove authentication-related data to prevent auto-login
            this.storage.remove(AuthorizationConstant.contactId);
            this.storage.remove(AuthorizationConstant.vato);
            this.storage.remove(AuthorizationConstant.vrto);
            this.storage.remove(AuthorizationConstant.userId);
            this.storage.remove(AuthorizationConstant.isRemember);
            return false;
        }
        else {
            const request = new VRTORequest();
            request.vrto = vrto;
            try {
                const tokenResponse = await lastValueFrom(this.vrtoHandler.handle(request));
                if (tokenResponse instanceof VRTOResponse) {
                    this.storage.set(AuthorizationConstant.vrto, tokenResponse.vrto);
                    this.storage.set(AuthorizationConstant.vato, tokenResponse.vato);
                    return true;
                }
                else {
                    console.error(AuthorizationGuard.name, 'Error refreshing token', tokenResponse);
                }
            }
            catch (error) {
                console.error(AuthorizationGuard.name, 'Error during token refresh', error);
            }
        }
        return false;
    }
    /**
     * Checks whether the user is authorized to access a route.
     *
     * @param route The route being accessed.
     * @param state The current router state.
     * @returns Promise<boolean> Whether the route can be activated.
     */
    async canActivate(route, state) {
        const vato = this.storage.get(AuthorizationConstant.vato);
        const vrto = this.storage.get(AuthorizationConstant.vrto);
        if (!vrto || !vato) {
            return this.redirectToSignIn();
        }
        try {
            const isValidVATO = await lastValueFrom(this.verifyValidVATOHandler.handle(new VerifyValidVATORequest()));
            // If the token is still valid, there is no need to call the refresh API.
            if (isValidVATO.isValid) {
                return true;
            }
            else {
                const refreshed = await this.validateAndRefreshToken(vrto);
                if (refreshed) {
                    return true;
                }
            }
        }
        catch (error) {
            console.error(AuthorizationGuard.name, 'Error validating VATO token', error);
        }
        return this.redirectToSignIn();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthorizationGuard, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthorizationGuard, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthorizationGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbi5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2luZnJhc3RydWN0dXJlL2F1dGhvcml6YXRpb24vc3JjL2xpYi9ndWFyZHMvYXV0aG9yaXphdGlvbi5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBR0wsTUFBTSxHQUVQLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLHNCQUFzQixFQUN0QixXQUFXLEVBQ1gsWUFBWSxHQUNiLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUNMLDJCQUEyQixFQUMzQixnQkFBZ0IsR0FDakIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFLbEUsTUFBTSxPQUFPLGtCQUFrQjtJQUgvQjtRQUltQixXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLFlBQU8sR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEMsMkJBQXNCLEdBQUcsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDN0QsZ0JBQVcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQW9HekQ7SUFsR0M7Ozs7T0FJRztJQUNLLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxLQUFLLENBQUMsdUJBQXVCLENBQUMsSUFB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LENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUNYLGtCQUFrQixDQUFDLElBQUksRUFDdkIsNkJBQTZCLEVBQzdCLEtBQUssQ0FDTixDQUFDO1FBQ0osQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDakMsQ0FBQzsrR0F2R1Usa0JBQWtCO21IQUFsQixrQkFBa0IsY0FGakIsTUFBTTs7NEZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgQ2FuQWN0aXZhdGUsXG4gIFJvdXRlcixcbiAgUm91dGVyU3RhdGVTbmFwc2hvdCxcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIFZlcmlmeVZhbGlkVkFUT1JlcXVlc3QsXG4gIFZSVE9SZXF1ZXN0LFxuICBWUlRPUmVzcG9uc2UsXG59IGZyb20gJ0BhcHBsaWNhdGlvbi9tZXNzYWdlcyc7XG5pbXBvcnQge1xuICBWZXJpZnlWYWxpZFZBVE9RdWVyeUhhbmRsZXIsXG4gIFZSVE9RdWVyeUhhbmRsZXIsXG59IGZyb20gJ0BhcHBsaWNhdGlvbi9xdWVyaWVzJztcbmltcG9ydCB7IEJST1dTRVJfU1RPUkFHRSB9IGZyb20gJ0BpbmZyYXN0cnVjdHVyZS9iYXNlJztcbmltcG9ydCB7IGxhc3RWYWx1ZUZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEF1dGhvcml6YXRpb25Db25zdGFudCB9IGZyb20gJy4uL2F1dGhvcml6YXRpb24uY29uc3RhbnQnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXV0aG9yaXphdGlvbkd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlciA9IGluamVjdChSb3V0ZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IHN0b3JhZ2UgPSBpbmplY3QoQlJPV1NFUl9TVE9SQUdFKTtcbiAgcHJpdmF0ZSByZWFkb25seSB2ZXJpZnlWYWxpZFZBVE9IYW5kbGVyID0gaW5qZWN0KFZlcmlmeVZhbGlkVkFUT1F1ZXJ5SGFuZGxlcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgdnJ0b0hhbmRsZXIgPSBpbmplY3QoVlJUT1F1ZXJ5SGFuZGxlcik7XG5cbiAgLyoqXG4gICAqIFJlZGlyZWN0cyB0aGUgdXNlciB0byB0aGUgc2lnbi1pbiBwYWdlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSByZWRpcmVjdFRvU2lnbkluKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJy9zaWduLWluJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB0aGUgZXhpc3RpbmcgVkFUTyB0b2tlbiBhbmQgcmVmcmVzaGVzIGl0IGlmIG5lY2Vzc2FyeS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHZydG8gVGhlIFZSVE8gKHJlZnJlc2ggdG9rZW4pIHVzZWQgdG8gZ2VuZXJhdGUgYSBuZXcgVkFUTyB0b2tlbi5cbiAgICogQHJldHVybnMgUHJvbWlzZTxib29sZWFuPiBXaGV0aGVyIHRoZSB0b2tlbiB3YXMgcmVmcmVzaGVkIHN1Y2Nlc3NmdWxseS5cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgdmFsaWRhdGVBbmRSZWZyZXNoVG9rZW4odnJ0bzogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgbGV0IGlzUmVtZW1iZXIgPVxuICAgICAgdGhpcy5zdG9yYWdlLmdldChBdXRob3JpemF0aW9uQ29uc3RhbnQuaXNSZW1lbWJlcikgPT09ICd0cnVlJztcbiAgICBpZiAoIWlzUmVtZW1iZXIpIHtcbiAgICAgIC8vIFJlbW92ZSBhdXRoZW50aWNhdGlvbi1yZWxhdGVkIGRhdGEgdG8gcHJldmVudCBhdXRvLWxvZ2luXG4gICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKEF1dGhvcml6YXRpb25Db25zdGFudC5jb250YWN0SWQpO1xuICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZShBdXRob3JpemF0aW9uQ29uc3RhbnQudmF0byk7XG4gICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKEF1dGhvcml6YXRpb25Db25zdGFudC52cnRvKTtcbiAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUoQXV0aG9yaXphdGlvbkNvbnN0YW50LnVzZXJJZCk7XG4gICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKEF1dGhvcml6YXRpb25Db25zdGFudC5pc1JlbWVtYmVyKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBWUlRPUmVxdWVzdCgpO1xuICAgICAgcmVxdWVzdC52cnRvID0gdnJ0bztcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9rZW5SZXNwb25zZSA9IGF3YWl0IGxhc3RWYWx1ZUZyb20oXG4gICAgICAgICAgdGhpcy52cnRvSGFuZGxlci5oYW5kbGUocmVxdWVzdClcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRva2VuUmVzcG9uc2UgaW5zdGFuY2VvZiBWUlRPUmVzcG9uc2UpIHtcbiAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KEF1dGhvcml6YXRpb25Db25zdGFudC52cnRvLCB0b2tlblJlc3BvbnNlLnZydG8pO1xuICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQoQXV0aG9yaXphdGlvbkNvbnN0YW50LnZhdG8sIHRva2VuUmVzcG9uc2UudmF0byk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb25HdWFyZC5uYW1lLFxuICAgICAgICAgICAgJ0Vycm9yIHJlZnJlc2hpbmcgdG9rZW4nLFxuICAgICAgICAgICAgdG9rZW5SZXNwb25zZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgQXV0aG9yaXphdGlvbkd1YXJkLm5hbWUsXG4gICAgICAgICAgJ0Vycm9yIGR1cmluZyB0b2tlbiByZWZyZXNoJyxcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHVzZXIgaXMgYXV0aG9yaXplZCB0byBhY2Nlc3MgYSByb3V0ZS5cbiAgICpcbiAgICogQHBhcmFtIHJvdXRlIFRoZSByb3V0ZSBiZWluZyBhY2Nlc3NlZC5cbiAgICogQHBhcmFtIHN0YXRlIFRoZSBjdXJyZW50IHJvdXRlciBzdGF0ZS5cbiAgICogQHJldHVybnMgUHJvbWlzZTxib29sZWFuPiBXaGV0aGVyIHRoZSByb3V0ZSBjYW4gYmUgYWN0aXZhdGVkLlxuICAgKi9cbiAgYXN5bmMgY2FuQWN0aXZhdGUoXG4gICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gICAgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3RcbiAgKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgdmF0byA9IHRoaXMuc3RvcmFnZS5nZXQoQXV0aG9yaXphdGlvbkNvbnN0YW50LnZhdG8pO1xuICAgIGNvbnN0IHZydG8gPSB0aGlzLnN0b3JhZ2UuZ2V0KEF1dGhvcml6YXRpb25Db25zdGFudC52cnRvKTtcbiAgICBpZiAoIXZydG8gfHwgIXZhdG8pIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZGlyZWN0VG9TaWduSW4oKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgaXNWYWxpZFZBVE8gPSBhd2FpdCBsYXN0VmFsdWVGcm9tKFxuICAgICAgICB0aGlzLnZlcmlmeVZhbGlkVkFUT0hhbmRsZXIuaGFuZGxlKG5ldyBWZXJpZnlWYWxpZFZBVE9SZXF1ZXN0KCkpXG4gICAgICApO1xuICAgICAgLy8gSWYgdGhlIHRva2VuIGlzIHN0aWxsIHZhbGlkLCB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgdGhlIHJlZnJlc2ggQVBJLlxuICAgICAgaWYgKGlzVmFsaWRWQVRPLmlzVmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZWZyZXNoZWQgPSBhd2FpdCB0aGlzLnZhbGlkYXRlQW5kUmVmcmVzaFRva2VuKHZydG8pO1xuICAgICAgICBpZiAocmVmcmVzaGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgQXV0aG9yaXphdGlvbkd1YXJkLm5hbWUsXG4gICAgICAgICdFcnJvciB2YWxpZGF0aW5nIFZBVE8gdG9rZW4nLFxuICAgICAgICBlcnJvclxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZWRpcmVjdFRvU2lnbkluKCk7XG4gIH1cbn1cbiJdfQ==