/**
 * A centralized class for storing all authorization-related storage keys.
 * Used to access localStorage or sessionStorage values consistently throughout the application.
 */
export class AuthorizationConstant {
    /**
     * VATO token used for authorizing API calls.
     * Typically a short-lived access token.
     */
    static { this.vato = 'vato'; }
    /**
     * VRTO token used for refreshing the VATO token when it expires.
     * Typically a long-lived refresh token.
     */
    static { this.vrto = 'vrto'; }
    /**
     * Contact ID (usually mapped to the current user's profile or business contact).
     */
    static { this.contactId = 'pid'; }
    /**
     * User ID representing the authenticated user in the system.
     */
    static { this.userId = 'uid'; }
    /**
     * Flag indicating whether the user chose "Remember Me" on login.
     * Determines if token refresh should occur automatically.
     */
    static { this.isRemember = 'is-remember'; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbi5jb25zdGFudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2luZnJhc3RydWN0dXJlL2F1dGhvcml6YXRpb24vc3JjL2xpYi9hdXRob3JpemF0aW9uLmNvbnN0YW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILE1BQU0sT0FBTyxxQkFBcUI7SUFDaEM7OztPQUdHO2FBQ29CLFNBQUksR0FBRyxNQUFNLENBQUM7SUFFckM7OztPQUdHO2FBQ29CLFNBQUksR0FBRyxNQUFNLENBQUM7SUFFckM7O09BRUc7YUFDb0IsY0FBUyxHQUFHLEtBQUssQ0FBQztJQUV6Qzs7T0FFRzthQUNvQixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBRXRDOzs7T0FHRzthQUNvQixlQUFVLEdBQUcsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIGNlbnRyYWxpemVkIGNsYXNzIGZvciBzdG9yaW5nIGFsbCBhdXRob3JpemF0aW9uLXJlbGF0ZWQgc3RvcmFnZSBrZXlzLlxuICogVXNlZCB0byBhY2Nlc3MgbG9jYWxTdG9yYWdlIG9yIHNlc3Npb25TdG9yYWdlIHZhbHVlcyBjb25zaXN0ZW50bHkgdGhyb3VnaG91dCB0aGUgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uQ29uc3RhbnQge1xuICAvKipcbiAgICogVkFUTyB0b2tlbiB1c2VkIGZvciBhdXRob3JpemluZyBBUEkgY2FsbHMuXG4gICAqIFR5cGljYWxseSBhIHNob3J0LWxpdmVkIGFjY2VzcyB0b2tlbi5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdmF0byA9ICd2YXRvJztcblxuICAvKipcbiAgICogVlJUTyB0b2tlbiB1c2VkIGZvciByZWZyZXNoaW5nIHRoZSBWQVRPIHRva2VuIHdoZW4gaXQgZXhwaXJlcy5cbiAgICogVHlwaWNhbGx5IGEgbG9uZy1saXZlZCByZWZyZXNoIHRva2VuLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSB2cnRvID0gJ3ZydG8nO1xuXG4gIC8qKlxuICAgKiBDb250YWN0IElEICh1c3VhbGx5IG1hcHBlZCB0byB0aGUgY3VycmVudCB1c2VyJ3MgcHJvZmlsZSBvciBidXNpbmVzcyBjb250YWN0KS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY29udGFjdElkID0gJ3BpZCc7XG5cbiAgLyoqXG4gICAqIFVzZXIgSUQgcmVwcmVzZW50aW5nIHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgaW4gdGhlIHN5c3RlbS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdXNlcklkID0gJ3VpZCc7XG5cbiAgLyoqXG4gICAqIEZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSB1c2VyIGNob3NlIFwiUmVtZW1iZXIgTWVcIiBvbiBsb2dpbi5cbiAgICogRGV0ZXJtaW5lcyBpZiB0b2tlbiByZWZyZXNoIHNob3VsZCBvY2N1ciBhdXRvbWF0aWNhbGx5LlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBpc1JlbWVtYmVyID0gJ2lzLXJlbWVtYmVyJztcbn1cbiJdfQ==