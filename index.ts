// Imports
import project from "./bunsvr/project";
import auditAccess from "./library/auditAccess";
import auditFault from "./library/auditFault";
import auditServer from "./library/auditServer";

// Creates server
const server = Bun.serve({
    development: false,
    error: async (thrown) => {
        // Resolves access
        const fault = auditFault(thrown);
        const response = Response.json({
            code: fault.code,
            message: fault.message
        }, fault.status);
        const access = auditAccess(null, null, response, server);
        return access;
    },
    fetch: async (request) => {
        // Resolves access
        const url: URL = new URL(request.url);
        try {
            const response = await project.router(url, request, server);
            const access = auditAccess(url, request, response, server);
            return access;
        }
        catch(thrown) {      
            const fault = auditFault(thrown);
            const response = Response.json({
                code: fault.code,
                message: fault.message
            }, fault.status);
            const access = auditAccess(url, request, response, server);
            return access;
        }
    },
    port: project.port
});
auditServer(server);
