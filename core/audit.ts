// Imports
import chalk from "chalk";
import stripAnsi from "strip-ansi";
import Fault from "./fault";
import Panic from "./panic";

// Defines audit class
export class Audit {
    // Defines constructor
    readonly bland: boolean;
    readonly sink: Bun.FileSink;
    constructor(sink: Bun.FileSink = Bun.stdout.writer(), bland: boolean = false) {
        // Initializes class
        this.bland = bland;
        this.sink = sink;
    }

    // Defines formatters
    static formatMessage(head: string, body: string, now: Date): string {
        // Creates message
        const stamp = this.formatStamp(now);
        const message = `[${stamp}] ${head.toUpperCase()} | ${body}`;
        return message;
    }
    static formatStamp(now: Date): string {
        // Creates stamp
        const year = now.getFullYear().toString().padStart(4, "0");
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        const hour = (now.getHours() % 12 || 12).toString().padStart(2, "0");
        const minute = now.getMinutes().toString().padStart(2, "0");
        const second = now.getSeconds().toString().padStart(2, "0");
        const meridian = now.getHours() < 12 ? "AM" : "PM";
        const stamp = `${year}-${month}-${day} @ ${hour}:${minute}:${second} ${meridian}`;
        return stamp;
    }

    // Defines loggers
    logError(error: Error): string {
        // Writes message
        const body = `${error.message} (${error.name})`;
        return this.logRaw("ERROR", body, chalk.red);
    }
    logFault(fault: Fault): string {
        // Writes message
        const status = `${fault.status} ${fault.code}`;
        const body = `${fault.message} (${status})`;
        return this.logRaw("FAULT", body, chalk.red);
    }
    logFetch(request: Request, response: Response, core: Bun.Server): string {
        // Writes message
        const url = new URL(request.url);
        const ip = request.headers.get("CF-Connecting-IP") ?? core.requestIP(request)?.address ?? "unknown";
        const endpoint = `${request.method} ${url.href}`;
        const status = `${response.status} ${response.ok ? "OK" : "FAILED"}`;
        const body = `${chalk.cyan(ip)} accessed ${chalk.cyan(endpoint)} (${status})`;
        return this.logRaw("FETCH", body, response.ok ? chalk.green : chalk.red);
    }
    logPanic(panic: Panic): string {
        // Writes message
        const body = `${panic.message} (${panic.code})`;
        return this.logRaw("PANIC", body, chalk.red);
    }
    logRaw(head: string, body: string, style: typeof chalk = chalk.white): string {
        // Writes message
        const formatted = Audit.formatMessage(head, body, new Date());
        const styled = (this.bland ? stripAnsi(formatted) : style(formatted)) + "\n";
        this.sink.write(styled);
        return styled;
    }
}

// Exports
export default Audit;
