// Imports
import chalk from "chalk";
import attempt from "../bunsvr/attempt";
import audit from "./audit";
import Fault from "../bunsvr/fault";
import track from "../bunsvr/track";
import faults from "../library/faults"

// Defines inspectors
export function inspectAccess(
    url: URL | null,
    request: Request | null,
    response: Response,
    server: Bun.Server
): Response {    
    // Audit transparent access
    const known = url !== null && request !== null;
    const ip = known ? attempt.now(() => track.resolveIP(server, request), "::-1") : "::-1";
    const endpoint = known ? `${request.method} ${url.pathname + url.search}` : "NULL ?";
    const status = `${response.status} ${response.ok ? "OK" : "FAILED"}`;
    audit(
        "access",
        `${chalk.cyan(ip)} accessed ${chalk.cyan(endpoint)}. (${status})`,
        response.ok ? chalk.green : chalk.red
    );
    return response;
}
export function inspectFault(thrown: unknown): Fault {
    // Inspects fault
    if(thrown instanceof Fault) {
        audit("fault", `${thrown.message} (${thrown.code})`, chalk.red);
        return thrown;
    }

    // Inspects error
    if(thrown instanceof Error) {
        audit("error", `${thrown.message} (${thrown.name})`, chalk.red);
        return new faults.ServerFailure();
    }
    
    // Inspects exception
    {
        const error = new Error(String(thrown));
        audit("error", `${error.message} (${error.name})`, chalk.red);
        return new faults.ServerFailure();
    }
}
export function inspectServer(server: Bun.Server): Bun.Server {
    // Inspects server
    audit("server", `Server is listening on ${chalk.cyan(server.url.origin)}.`, chalk.green);
    return server;
}

// Exports
export default {
    inspectAccess,
    inspectFault,
    inspectServer
};
