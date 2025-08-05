/**
 * A centralized class for storing all authorization-related storage keys.
 * Used to access localStorage or sessionStorage values consistently throughout the application.
 */
export class AuthorizationConstant {
  /**
   * VATO token used for authorizing API calls.
   * Typically a short-lived access token.
   */
  public static readonly vato = 'vato';

  /**
   * VRTO token used for refreshing the VATO token when it expires.
   * Typically a long-lived refresh token.
   */
  public static readonly vrto = 'vrto';

  /**
   * Contact ID (usually mapped to the current user's profile or business contact).
   */
  public static readonly contactId = 'pid';

  /**
   * User ID representing the authenticated user in the system.
   */
  public static readonly userId = 'uid';

  /**
   * Flag indicating whether the user chose "Remember Me" on login.
   * Determines if token refresh should occur automatically.
   */
  public static readonly isRemember = 'is-remember';
}
