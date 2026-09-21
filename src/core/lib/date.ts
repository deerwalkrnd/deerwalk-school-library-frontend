/**
 * Date helpers for talking to the API.
 *
 * The backend stores and returns *naive* datetimes (no timezone), so a value
 * like `2026-09-21T00:00:00` is parsed by `new Date()` as local midnight.
 * Formatting that back with `toISOString()` converts to UTC and, anywhere east
 * of Greenwich (Nepal is UTC+05:45), lands on the previous calendar day.
 * Always format from the local components instead.
 */

const pad = (value: number) => String(value).padStart(2, "0");

/** `YYYY-MM-DD` built from the date's *local* calendar fields. */
export const toLocalYMD = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** Today in the viewer's timezone, as `YYYY-MM-DD`. */
export const todayYMD = (): string => toLocalYMD(new Date());

/**
 * End of the given local day, as the API expects it.
 *
 * Range filters compare `created_at <= end_date`, so sending a bare
 * `YYYY-MM-DD` (midnight) would exclude everything recorded during that day.
 */
export const toLocalEndOfDay = (date: Date): string =>
  `${toLocalYMD(date)}T23:59:59`;
