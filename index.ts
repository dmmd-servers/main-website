// Imports
import inspect from "./library/inspect";
import project from "./library/project";

// Creates server
const server = Bun.serve({
    development: false,
    error: async (thrown) => {
        // Resolves access
        const fault = inspect.inspectFault(thrown);
        const response = Response.json({
            code: fault.code,
            message: fault.message
        }, fault.status);
        const access = inspect.inspectAccess(null, null, response, server);
        return access;
    },
    fetch: async (request) => {
        // Resolves access
        const url: URL = new URL(request.url);
        try {
            const response = await project.router(url, request, server);
            const access = inspect.inspectAccess(url, request, response, server);
            return access;
        }
        catch(thrown) {      
            const fault = inspect.inspectFault(thrown);
            const response = Response.json({
                code: fault.code,
                message: fault.message
            }, fault.status);
            const access = inspect.inspectAccess(url, request, response, server);
            return access;
        }
    },
    port: project.port
});
inspect.inspectServer(server);
