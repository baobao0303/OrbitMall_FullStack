import moment from 'moment';
export declare class DateTimeHelper {
    /**
     * Formats the given date with the specified format.
     *
     * @param date - The Moment object or valid date to be formatted.
     * @param format - The format string (e.g., 'YYYY-MM-DD').
     * @returns The formatted date as a string.
     */
    static formatToDate(date: any): any;
    /**
     * Calculates the difference in minutes between the given timestamp and the current time.
     *
     * @param timestamp - The timestamp in ISO format (e.g., '2025-02-15T13:27:49.6221724Z').
     * @returns The difference in minutes as a number.
     */
    static getSecondsFromNow(timestamp: string): number;
    /**
     * Returns the current date as a Date object.
     *
     * @returns The current date.
     */
    static today(): Date;
    /**
     * Returns yesterday's date as a Date object.
     *
     * @returns The date of yesterday.
     */
    static yesterday(): Date;
    /**
     * Converts a given UTC timestamp to local time.
     *
     * @param timestamp - The UTC timestamp to convert.
     * @returns The local time as a Moment object.
     */
    static toLocalTime(timestamp: string | number | Date): moment.Moment;
}
