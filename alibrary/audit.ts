// Imports
import chalk from "chalk";
import anchor from "../bunsvr/anchor";
import clock from "./clock";

// Defines audit handler
export function audit(
    head: string,
    body: string,
    style: typeof chalk = chalk.white,
    output: Bun.FileSink = anchor.output
): void {
    // Writes message
    const now = new Date();
    const banner = `[${clock.formatDate(now)} @ ${clock.formatTime(now)}]`;
    const content = `${head.toUpperCase()} | ${body}`;
    const message = style(`${banner} ${content}\n`);
    output.write(message);
}

// Exports
export default audit;
