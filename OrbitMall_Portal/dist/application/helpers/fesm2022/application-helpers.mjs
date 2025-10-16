import moment from 'moment';

class DateTimeHelper {
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

/*
 * Public API Surface of helpers
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DateTimeHelper };
//# sourceMappingURL=application-helpers.mjs.map
