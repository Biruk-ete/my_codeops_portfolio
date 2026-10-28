export const etb = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
});

export const when = new Intl.DateTimeFormat("en-ET", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Addis_Ababa",
});

export const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatRelative(dateString) {
    const diffInSeconds = (new Date(dateString) - new Date()) / 1000;

    if (Math.abs(diffInSeconds) < 60) return relative.format(Math.round(diffInSeconds), "second");
    if (Math.abs(diffInSeconds) < 3600) return relative.format(Math.round(diffInSeconds / 60), "minute");
    if (Math.abs(diffInSeconds) < 86400) return relative.format(Math.round(diffInSeconds / 3600), "hour");
    return relative.format(Math.round(diffInSeconds / 86400), "day");
}