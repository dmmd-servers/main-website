// Imports
import chalk from "chalk";
import project from "./project";

// Defines audit function
export function audit(head: string, body: string, style: typeof chalk): void {
    // Fetches now
    const now = new Date();

    // Calculates date
    const year = now.getFullYear().toString().padStart(4, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    // Calculates time
    const hour = (now.getHours() % 12 || 12).toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    const second = now.getSeconds().toString().padStart(2, "0");
    const millisecond = now.getMilliseconds().toString().padStart(3, "0");
    const meridian = now.getHours() < 12 ? "AM" : "PM";
    const time = `${hour}:${minute}:${second}.${millisecond} ${meridian}`;
    
    // Writes message
    const message = style(`[${date} @ ${time}] ${head.toUpperCase()} | ${body}\n`);
    project.log.write(message);
}

// Exports
export default audit;
