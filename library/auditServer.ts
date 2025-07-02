// Imports
import chalk from "chalk";
import audit from "../bunsvr/audit";

// Defines auditor
export function auditServer(server: Bun.Server): Bun.Server {
    // Audits server
    audit("server", `Server is now listening on ${chalk.cyan(server.url.origin)}.`, chalk.green);
    return server;
}

// Exports
export default auditServer;
