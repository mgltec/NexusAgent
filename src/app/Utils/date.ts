export function transformDate(
  value: Date | string | number,
  format: string = "medium",
  timezone?: string,
  locale: string = "en-US"
): string | null {
  if (value === null || value === undefined || value === "") return null;

  let date: Date;
  if (typeof value === "number") {
    date = new Date(value);
  } else if (typeof value === "string") {
    date = new Date(value);
    if (isNaN(date.getTime())) return null; // Invalid date string
  } else {
    date = value;
  }

  let dateOptions: Intl.DateTimeFormatOptions = {};
  let timeOptions: Intl.DateTimeFormatOptions = {};
  switch (format) {
    case "short":
      dateOptions = { year: "2-digit", month: "2-digit", day: "2-digit" };
      timeOptions = { hour: "2-digit", minute: "2-digit" };
      break;
    case "medium":
      dateOptions = { year: "numeric", month: "short", day: "numeric" };
      timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
      break;
    // ... add more cases based on Angular's DatePipe formats
    default:
      dateOptions = { year: "numeric", month: "short", day: "numeric" }; // Default to medium
      timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  }

  const datePart = date.toLocaleDateString(locale, dateOptions);

  if (timezone) {
    // Note: JavaScript's built-in date functions don't support setting a specific timezone.
    // This functionality is only available when formatting a date to a string, so we can't adjust the Date object itself.
    console.warn(
      "The timezone parameter is not supported without a third-party library like moment.js or luxon"
    );
  }

  return `${datePart}`;
}
