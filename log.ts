// Imports
import chalk from "chalk";
import * as project from "./project";

// Defines formatter
export function format(head: string, body: string, style: typeof chalk): string {
    // Creates stamp
    const date = new Date();
    const hours = (date.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const meridian = date.getHours() < 12 ? "AM" : "PM";
    const stamp = `${hours}:${minutes}:${seconds} ${meridian}`;

    // Formats message
    const message = style(`[${stamp}] ${head.toUpperCase()} | ${body}`);
    return message;
}

// Defines loggers
export function listen(server: Bun.Server, suppress: boolean = false): string {
    // Creates message
    const url = chalk.cyan(`http://localhost:${server.port ?? project.port}`);
    const body = `Server is listening on ${url}.`;
    const message = format("LISTEN", body, chalk.green);

    // Logs message
    if(!suppress) console.log(message);
    return message;
}
export function access(request: Request, response: Response, server: Bun.Server): string {
    // Creates message
    const ip = chalk.cyan(request.headers.get(""))
}