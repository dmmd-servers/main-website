// Imports
import chalk from "chalk";
import audit from "../bunsvr/audit";
import track from "../bunsvr/track";

// Defines auditor
export function auditAccess(url: URL | null, request: Request | null, response: Response, server: Bun.Server): Response {    
    // Audit transparent access
    const known = url !== null && request !== null;
    const consent = known ? track.resolveConsent(request) : true;
    if(consent) {
        const ip = known ? track.resolveIP(server, request) : "::-1";
        const endpoint = known ? `${request.method} ${url.pathname + url.search}` : "NULL ?";
        const status = `${response.status} ${response.ok ? "OK" : "FAILED"}`;
        audit(
            "access",
            `${chalk.cyan(ip)} accessed ${chalk.cyan(endpoint)}. (${status})`,
            response.ok ? chalk.green : chalk.red
        );
        return response;
    }

    // Audits opaque access
    {
        const ip = "::-1";
        const endpoint = known ? `${request.method} ${url.pathname + url.search}` : "NULL ?";
        const status = `${response.status} ${response.ok ? "OK" : "FAILED"}`;
        audit(
            "access",
            `${chalk.cyan(ip)} accessed ${chalk.cyan(endpoint)}. (${status})`,
            response.ok ? chalk.green : chalk.red
        );
        return response;
    }
}

// Exports
export default auditAccess;
