// Imports
import chalk from "chalk";
import clock from "./clock";
import project from "./project";

// Defines audit handler
export function audit(head: string, body: string, style: typeof chalk): void {
    // Writes message
    const now = new Date();
    const banner = `[${clock.formatDate(now)} @ ${clock.formatTime(now)}]`;
    const content = `${head.toUpperCase()} | ${body}`;
    const message = style(`${banner} ${content}\n`);
    project.log.write(message);
}

// Exports
export default audit;
