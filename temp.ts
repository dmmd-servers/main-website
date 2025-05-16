
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