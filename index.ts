// Imports
import * as api from "./api";
import * as except from "./except";
import * as log from "./core/audit";
import * as project from "./project";
import * as router from "./router";

// Creates server
const server = Bun.serve({
    development: project.debug,
    fetch: async (request: Request): Promise<Response> => {
        // Handles fetch
        try {
            // Handles access
            const response = router.handle(request, server);
            log.access(request, response, server);
            return response;
        }
        catch(error) {
            // Handles error
            if(error instanceof except.Exception) log.exception(error);
            else if(error instanceof Error) log.error(error);
            else log.error(new Error(String(error)));

            // Handles access
            const exception = error instanceof except.Exception ?
                error :
                except.exceptions.UNKNOWN_EXCEPTION;
            const response = Response.json({
                code: exception.code,
                message: exception.message
            }, exception.status);
            log.access(request, response, server);
            return response;
        }
    },
    port: project.port
});
log.listen(server);
