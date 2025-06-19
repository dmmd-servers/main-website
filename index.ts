// Imports
import chalk from "chalk";
import audit from "./core/audit";
import faults from "./core/faults";
import project from "./core/project";

// Creates server
const server = Bun.serve({
    development: false,
    fetch: async (request) => {
        // Resolves access
        const url: URL = new URL(request.url);
        let response: Response;
        try {
            // Creates response
            response = await project.router(url, request, server);
        }
        catch(thrown) {            
            // Resolves thrown
            const fault = thrown instanceof faults.GenericFault ? thrown : new faults.ServerFailure();
            const error = thrown instanceof Error ? thrown : new Error(String(thrown));
            
            // Audits thrown
            if(thrown instanceof faults.GenericFault) audit("fault", `${fault.message} (${fault.code})`, chalk.red);
            else audit("error", `${error.message} (${error.name})`, chalk.red);
            
            // Creates response
            response = Response.json({
                code: fault.code,
                message: fault.message
            }, fault.status);
        }
            
        // Audits access
        const ip = request.headers.get("CF-Connecting-IP") ?? server.requestIP(request)?.address ?? "unknown";
        const endpoint = `${request.method} ${url.pathname + url.search}`;
        const status = `${response.status} ${response.ok ? "OK" : "FAILED"}`;
        const body = `${chalk.cyan(ip)} accessed ${chalk.cyan(endpoint)}. (${status})`;
        audit("access", body, response.ok ? chalk.green : chalk.red);

        // Returns response
        return response;
    },
    port: project.port
});

// Audits server
const lan = `http://localhost:${project.port}/`;
const body = `Server is now listening on ${chalk.cyan(lan)}.`;
audit("server", body, chalk.green);
