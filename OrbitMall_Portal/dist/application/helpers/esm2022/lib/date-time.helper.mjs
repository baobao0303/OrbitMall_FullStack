import moment from 'moment';
export class DateTimeHelper {
    /**
     * Formats the given date with the specified format.
     *
     * @param date - The Moment object or valid date to be formatted.
     * @param format - The format string (e.g., 'YYYY-MM-DD').
     * @returns The formatted date as a string.
     */
    static formatToDate(date) {
        return new Date(moment(date).utc().toDate()).toISOString().split('T')[0];
    }
    /**
     * Calculates the difference in minutes between the given timestamp and the current time.
     *
     * @param timestamp - The timestamp in ISO format (e.g., '2025-02-15T13:27:49.6221724Z').
     * @returns The difference in minutes as a number.
     */
    static getSecondsFromNow(timestamp) {
        const givenTime = moment.utc(timestamp);
        const now = moment.utc();
        return now.diff(givenTime, 'seconds');
    }
    /**
     * Returns the current date as a Date object.
     *
     * @returns The current date.
     */
    static today() {
        return moment().toDate();
    }
    /**
     * Returns yesterday's date as a Date object.
     *
     * @returns The date of yesterday.
     */
    static yesterday() {
        return moment().subtract(1, 'day').startOf('day').toDate();
    }
    /**
     * Converts a given UTC timestamp to local time.
     *
     * @param timestamp - The UTC timestamp to convert.
     * @returns The local time as a Moment object.
     */
    static toLocalTime(timestamp) {
        return moment.utc(timestamp).local();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FwcGxpY2F0aW9uL2hlbHBlcnMvc3JjL2xpYi9kYXRlLXRpbWUuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUM1QixNQUFNLE9BQU8sY0FBYztJQUN6Qjs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQVM7UUFDbEMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLGlCQUFpQixDQUFDLFNBQWlCO1FBQy9DLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsS0FBSztRQUNqQixPQUFPLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFNBQVM7UUFDckIsT0FBTyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3RCxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQWlDO1FBQ3pELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVIZWxwZXIge1xuICAvKipcbiAgICogRm9ybWF0cyB0aGUgZ2l2ZW4gZGF0ZSB3aXRoIHRoZSBzcGVjaWZpZWQgZm9ybWF0LlxuICAgKlxuICAgKiBAcGFyYW0gZGF0ZSAtIFRoZSBNb21lbnQgb2JqZWN0IG9yIHZhbGlkIGRhdGUgdG8gYmUgZm9ybWF0dGVkLlxuICAgKiBAcGFyYW0gZm9ybWF0IC0gVGhlIGZvcm1hdCBzdHJpbmcgKGUuZy4sICdZWVlZLU1NLUREJykuXG4gICAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZGF0ZSBhcyBhIHN0cmluZy5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZm9ybWF0VG9EYXRlKGRhdGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKG1vbWVudChkYXRlKS51dGMoKS50b0RhdGUoKSkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBkaWZmZXJlbmNlIGluIG1pbnV0ZXMgYmV0d2VlbiB0aGUgZ2l2ZW4gdGltZXN0YW1wIGFuZCB0aGUgY3VycmVudCB0aW1lLlxuICAgKlxuICAgKiBAcGFyYW0gdGltZXN0YW1wIC0gVGhlIHRpbWVzdGFtcCBpbiBJU08gZm9ybWF0IChlLmcuLCAnMjAyNS0wMi0xNVQxMzoyNzo0OS42MjIxNzI0WicpLlxuICAgKiBAcmV0dXJucyBUaGUgZGlmZmVyZW5jZSBpbiBtaW51dGVzIGFzIGEgbnVtYmVyLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRTZWNvbmRzRnJvbU5vdyh0aW1lc3RhbXA6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgZ2l2ZW5UaW1lID0gbW9tZW50LnV0Yyh0aW1lc3RhbXApO1xuICAgIGNvbnN0IG5vdyA9IG1vbWVudC51dGMoKTtcbiAgICByZXR1cm4gbm93LmRpZmYoZ2l2ZW5UaW1lLCAnc2Vjb25kcycpO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IGRhdGUgYXMgYSBEYXRlIG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybnMgVGhlIGN1cnJlbnQgZGF0ZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgdG9kYXkoKTogRGF0ZSB7XG4gICAgcmV0dXJuIG1vbWVudCgpLnRvRGF0ZSgpO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHllc3RlcmRheSdzIGRhdGUgYXMgYSBEYXRlIG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybnMgVGhlIGRhdGUgb2YgeWVzdGVyZGF5LlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyB5ZXN0ZXJkYXkoKTogRGF0ZSB7XG4gICAgcmV0dXJuIG1vbWVudCgpLnN1YnRyYWN0KDEsICdkYXknKS5zdGFydE9mKCdkYXknKS50b0RhdGUoKTtcbiAgfVxuICAvKipcbiAgICogQ29udmVydHMgYSBnaXZlbiBVVEMgdGltZXN0YW1wIHRvIGxvY2FsIHRpbWUuXG4gICAqXG4gICAqIEBwYXJhbSB0aW1lc3RhbXAgLSBUaGUgVVRDIHRpbWVzdGFtcCB0byBjb252ZXJ0LlxuICAgKiBAcmV0dXJucyBUaGUgbG9jYWwgdGltZSBhcyBhIE1vbWVudCBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHRvTG9jYWxUaW1lKHRpbWVzdGFtcDogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSk6IG1vbWVudC5Nb21lbnQge1xuICAgIHJldHVybiBtb21lbnQudXRjKHRpbWVzdGFtcCkubG9jYWwoKTtcbiAgfVxufVxuIl19