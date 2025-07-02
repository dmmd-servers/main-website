// Defines clock formatters
export function formatDate(chrono: Date = new Date()): string {
    // Resolves date
    const year = chrono.getFullYear().toString().padStart(4, "0");
    const month = (chrono.getMonth() + 1).toString().padStart(2, "0");
    const day = chrono.getDate().toString().padStart(2, "0");
    const date = `${year}-${month}-${day}`;
    return date;
}
export function formatTime(chrono: Date = new Date()): string {
    // Resolves time
    const hour = (chrono.getHours() % 12 || 12).toString().padStart(2, "0");
    const minute = chrono.getMinutes().toString().padStart(2, "0");
    const second = chrono.getSeconds().toString().padStart(2, "0");
    const millisecond = chrono.getMilliseconds().toString().padStart(3, "0");
    const meridian = chrono.getHours() < 12 ? "AM" : "PM";
    const time = `${hour}:${minute}:${second}.${millisecond} ${meridian}`;
    return time;
}

// Exports
export default {
    formatDate,
    formatTime
};
