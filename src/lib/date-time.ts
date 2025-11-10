export const timezones = Intl.supportedValuesOf("timeZone");

export const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
